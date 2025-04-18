import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { eq } from "drizzle-orm";
import { db } from "@/services/database";
import events from "@/services/database/schema/events/events.schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const data = await createClient();
  const { data: session } = await data.auth.getUser();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { moodData } = await request.json();

    if (!moodData || moodData.length === 0) {
      return NextResponse.json(
        { error: "No mood data provided" },
        { status: 400 },
      );
    }

    // Prepare data for analysis
    const moodEntries = moodData.map((entry) => ({
      date: new Date(entry.created_at).toLocaleDateString(),
      mood: entry.mood_score,
      energy: entry.energy_level || null,
      sleep: entry.sleep_hours || null,
      activities: entry.activities || [],
      gratitude: entry.gratitude_note || null,
      challenge: entry.challenge_note || null,
    }));

    // Calculate weeklyStats to match component
    const weeklyStats = calculateWeeklyStats(moodEntries);

    // Calculate activity impact scores
    const activityImpact = calculateActivityImpact(moodEntries);

    // Fetch upcoming events
    const upcomingEvents = await db
      .select()
      .from(events)
      .where(eq(events.status, "upcoming"))
      .limit(5);

    // Generate personalized insights and recommendations
    const aiResponse = await generateAIInsights(
      moodEntries,
      weeklyStats,
      activityImpact,
      upcomingEvents,
    );

    return NextResponse.json({
      weeklyStats,
      activityImpact,
      insights: aiResponse.insights,
      recommendations: aiResponse.recommendations,
      eventRecommendations: aiResponse.eventRecommendations || [],
      moodTrend: calculateMoodTrend(moodEntries),
    });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 },
    );
  }
}

// Calculate weekly stats to match component's expected format
function calculateWeeklyStats(entries) {
  // Use recent entries (last 7 days if available)
  const recentEntries = entries.slice(0, Math.min(entries.length, 7));

  // Calculate average mood
  const avgMood =
    recentEntries.reduce((sum, entry) => sum + entry.mood, 0) /
    recentEntries.length;

  // Calculate sleep stats
  const sleepEntries = recentEntries.filter((entry) => entry.sleep !== null);
  const avgSleep =
    sleepEntries.length > 0
      ? sleepEntries.reduce((sum, entry) => sum + entry.sleep, 0) /
        sleepEntries.length
      : 0;

  // Calculate energy stats
  const energyEntries = recentEntries.filter((entry) => entry.energy !== null);
  const avgEnergy =
    energyEntries.length > 0
      ? energyEntries.reduce((sum, entry) => sum + entry.energy, 0) /
        energyEntries.length
      : 0;

  // Calculate mood variance (consistency)
  const moodVariance =
    recentEntries.length > 1
      ? Math.sqrt(
          recentEntries.reduce(
            (sum, entry) => sum + Math.pow(entry.mood - avgMood, 2),
            0,
          ) / recentEntries.length,
        )
      : 0;

  // Find most frequent activity
  const activityCount = {};
  recentEntries.forEach((entry) => {
    if (entry.activities) {
      entry.activities.forEach((activity) => {
        activityCount[activity] = (activityCount[activity] || 0) + 1;
      });
    }
  });

  const mostFrequentActivity =
    Object.entries(activityCount)
      .sort(([, countA], [, countB]) => Number(countB) - Number(countA))
      .shift()?.[0] || "";

  return {
    avgMood,
    avgSleep,
    avgEnergy,
    moodVariance,
    mostFrequentActivity,
  };
}

// Calculate mood trend: improving, stable, or declining
function calculateMoodTrend(entries) {
  if (entries.length < 5) return "stable";

  const recentEntries = entries.slice(0, Math.min(5, entries.length));
  const olderEntries = entries.slice(
    Math.min(5, entries.length),
    Math.min(10, entries.length),
  );

  if (olderEntries.length === 0) return "stable";

  const recentAvg =
    recentEntries.reduce((sum, entry) => sum + entry.mood, 0) /
    recentEntries.length;
  const olderAvg =
    olderEntries.reduce((sum, entry) => sum + entry.mood, 0) /
    olderEntries.length;

  const difference = recentAvg - olderAvg;

  if (difference > 0.5) return "improving";
  if (difference < -0.5) return "declining";
  return "stable";
}

// Calculate impact scores for different activities
function calculateActivityImpact(entries) {
  const activityMoodMap = {};
  const baselineMood =
    entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length;
  // Group moods by activity
  entries.forEach((entry) => {
    if (entry.activities && entry.activities.length > 0) {
      entry.activities.forEach((activity) => {
        if (!activityMoodMap[activity]) {
          activityMoodMap[activity] = { total: 0, count: 0, moods: [] };
        }
        activityMoodMap[activity].total += entry.mood;
        activityMoodMap[activity].count += 1;
        activityMoodMap[activity].moods.push(entry.mood);
      });
    }
  });

  // Calculate impact scores (how much above/below baseline)
  const activityImpact = [];

  Object.entries(activityMoodMap).forEach(([activity, data]) => {
    if (data.count >= 2) {
      // Only include activities with enough data
      const avgMood = data.total / data.count;
      const impact = (avgMood - baselineMood) / 5; // Normalize to -1 to 1 range
      const confidence = Math.min(data.count / 5, 1); // More entries = higher confidence

      let impactLabel;
      if (impact > 0.6) impactLabel = "Strong positive";
      else if (impact > 0.3) impactLabel = "Positive";
      else if (impact > 0.1) impactLabel = "Moderate positive";
      else if (impact > -0.1) impactLabel = "Neutral";
      else if (impact > -0.3) impactLabel = "Slight negative";
      else if (impact > -0.6) impactLabel = "Negative";
      else impactLabel = "Strong negative";

      activityImpact.push({
        factor: activity,
        impact: impact,
        confidence: confidence,
        impactLabel: impactLabel,
        percentageScore: Math.min(
          Math.max(Math.round((impact + 1) * 50), 10),
          90,
        ), // Convert to 10-90% range for UI
      });
    }
  });

  // Sort by absolute impact (most impactful first)
  return activityImpact.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}

// Generate AI insights and recommendations using OpenAI
async function generateAIInsights(
  entries,
  weeklyStats,
  activityImpact,
  upcomingEvents,
) {
  // Prepare activity insights summary
  const activityInsights = activityImpact
    .slice(0, 3)
    .map(
      (a) =>
        `${a.factor}: ${a.impactLabel} (${Math.round(a.impact * 100)}% impact)`,
    )
    .join(", ");

  // Prepare sleep insights
  const sleepEntries = entries.filter((entry) => entry.sleep !== null);
  const sleepInsight =
    sleepEntries.length >= 3
      ? analyzeOptimalSleep(sleepEntries)
      : "Insufficient sleep data";

  // Format upcoming events for AI analysis
  const eventsInfo = upcomingEvents.map((event) => ({
    id: event.id,
    title: event.title,
    organizer: event.organizer,
    description: event.description,
    date: event.date ? new Date(event.date).toLocaleDateString() : "TBA",
    time: event.time || "TBA",
    location: event.location,
    points: event.points,
  }));

  // Prepare prompt for OpenAI
  const prompt = `
    You are an AI wellness coach analyzing mental health data. Based on the following summary of a user's mood logs and upcoming events,
    provide insights, recommendations, and suggest relevant events formatted as JSON.
    
    Data summary:
    - Number of mood entries: ${entries.length}
    - Average mood score (0-10 scale): ${weeklyStats.avgMood.toFixed(1)}
    - Average sleep hours (if available): ${weeklyStats.avgSleep.toFixed(1)}
    - Average energy level (0-10 scale): ${weeklyStats.avgEnergy.toFixed(1)}
    - Mood consistency: ${weeklyStats.moodVariance.toFixed(1)} (lower is better)
    - Most frequent activity: ${weeklyStats.mostFrequentActivity}
    - Mood trend: ${calculateMoodTrend(entries)}
    
    Top activity impacts on mood:
    ${activityInsights}
    
    Sleep insight:
    ${sleepInsight}
    
    Upcoming Events:
    ${JSON.stringify(eventsInfo, null, 2)}
    
    Return a JSON object with the following structure:
    {
      "insights": [
        {
          "type": "activity/sleep/social/weather",
          "factor": "specific factor name", 
          "impact": number from -1 to 1,
          "confidence": number from 0 to 1,
          "description": "description of insight"
        },
        (2-3 more insights...)
      ],
      "recommendations": [
        {
          "title": "short recommendation title",
          "description": "2-3 sentence description",
          "type": "exercise/sleep/social/mindfulness/other",
          "priority": number from 1-5
        },
        (2-3 more recommendations...)
      ],
      "eventRecommendations": [
        {
          "eventId": "id of the recommended event",
          "title": "Event title",
          "reasoning": "Why this event might benefit the user based on their mood data and patterns",
          "relevanceScore": number from 0 to 1 indicating how relevant this event is to the user
        },
        (1-2 more event recommendations...)
      ]
    }`;

  // Call OpenAI to generate insights
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful wellness coach that provides insights based on mood tracking data. Always respond with valid JSON.",
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000,
  });

  try {
    const parsedResponse = JSON.parse(response.choices[0].message.content);
    return {
      insights: parsedResponse.insights || [],
      recommendations: parsedResponse.recommendations.map((rec) => ({
        ...rec,
        id: generateId(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
      eventRecommendations: parsedResponse.eventRecommendations || [],
    };
  } catch (error) {
    console.error("Error parsing OpenAI response:", error);
    return { insights: [], recommendations: [], eventRecommendations: [] };
  }
}

// Analyze optimal sleep hours
function analyzeOptimalSleep(sleepEntries) {
  const sleepMood = {};
  sleepEntries.forEach((entry) => {
    const roundedHours = Math.round(entry.sleep);
    if (!sleepMood[roundedHours]) {
      sleepMood[roundedHours] = { total: 0, count: 0 };
    }
    sleepMood[roundedHours].total += entry.mood;
    sleepMood[roundedHours].count += 1;
  });

  const sleepAnalysis = Object.entries(sleepMood)
    .filter(([, data]) => data.count >= 2)
    .map(([hours, data]) => ({
      hours: parseInt(hours),
      avgMood: data.total / data.count,
    }))
    .sort((a, b) => b.avgMood - a.avgMood);

  if (sleepAnalysis.length > 0) {
    return `Optimal sleep appears to be around ${sleepAnalysis[0].hours} hours (avg mood: ${sleepAnalysis[0].avgMood.toFixed(1)})`;
  }
  return "Not enough consistent sleep data";
}

// Generate a simple ID for new recommendations
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}
