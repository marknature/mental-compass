import { getErrorMessage } from "@/lib/utils";
import { insightsParams } from "@/lib/validators";
import { db } from "@/services/database";
import mood_insights from "@/services/database/schema/mood/mood-insights.schema";
import mood_logs from "@/services/database/schema/mood/mood-logs.schema";
import recommendations from "@/services/database/schema/recommendations.schema";
import { count } from "console";
import { subDays } from "date-fns";
import { eq, desc, and, sql, avg, max, min, gte } from "drizzle-orm";
import { NextRequest } from "next/server";
import { createLoader } from "nuqs/server";

export async function GET(request: NextRequest) {
  try {
    const loadSearchParams = createLoader(insightsParams);
    const { user_id } = loadSearchParams(request);
    const [
      insights,
      topInsights,
      weeklyStats,
      journalEntries,
      recommendations,
    ] = await Promise.all([
      getUserInsights(user_id),
      getTopInsights(user_id),
      getWeeklyStats(user_id),
      getRecentJournalEntries(user_id),
      getUserRecommendations(user_id),
    ]);

    const moodTrend = calculateMoodTrend(journalEntries);
    return new Response(
      JSON.stringify({
        insights,
        topInsights,
        weeklyStats,
        journalEntries,
        recommendations,
        moodTrend,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error in insights API:", error);
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  return [];
}

export async function getUserInsights(userId: string) {
  try {
    const insights = await db
      .select()
      .from(mood_insights) // Use the updated table reference here
      .where(eq(mood_insights.user_id, userId)) // Updated to match your schema
      .orderBy(desc(mood_insights.impact_score)); // Updated to use `impact_score` instead of `impact`

    return insights;
  } catch (error) {
    console.error("Error fetching user insights:", error);
    throw error;
  }
}

// Get top insights for a user (highest impact, positive or negative)
export async function getTopInsights(userId: string, limit = 3) {
  try {
    // Get positive insights
    const positiveInsights = await db
      .select()
      .from(mood_insights)
      .where(
        and(
          eq(mood_insights.user_id, userId),
          sql`${mood_insights.impact_score} > 0`,
        ),
      )
      .orderBy(desc(mood_insights.impact_score)) // Updated to `impact_score`
      .limit(limit);

    // Get negative insights
    const negativeInsights = await db
      .select()
      .from(mood_insights)
      .where(
        and(
          eq(mood_insights.user_id, userId),
          sql`${mood_insights.impact_score} < 0`,
        ),
      )
      .orderBy(mood_insights.impact_score) // Updated to `impact_score`
      .limit(limit);

    return [...positiveInsights, ...negativeInsights]
      .sort((a, b) => Math.abs(b.impact_score) - Math.abs(a.impact_score)) // Updated to `impact_score`
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching top insights:", error);
    throw error;
  }
}

// Get insights by type
export async function getInsightsByType(userId: string, type: string) {
  try {
    const insights = await db
      .select()
      .from(mood_insights)
      .where(
        and(
          eq(mood_insights.user_id, userId),
          eq(mood_insights.insight_type, type),
        ),
      ) // Updated column reference
      .orderBy(desc(mood_insights.impact_score)); // Updated to `impact_score`

    return insights;
  } catch (error) {
    console.error(`Error fetching insights by type ${type}:`, error);
    throw error;
  }
}

// Get insights by factor
export async function getInsightsByFactor(userId: string, factor: string) {
  try {
    const insights = await db
      .select()
      .from(mood_insights)
      .where(
        and(
          eq(mood_insights.user_id, userId),
          eq(mood_insights.contributing_factor, factor),
        ), // Updated column reference
      )
      .orderBy(desc(mood_insights.updated_at)); // Updated to use `updated_at`

    return insights;
  } catch (error) {
    console.error(`Error fetching insights by factor ${factor}:`, error);
    throw error;
  }
}

// Get weekly stats for a user
export async function getWeeklyStats(userId: string) {
  try {
    const lastWeek = subDays(new Date(), 7);

    const weeklyStats = await db
      .select({
        avgMood: avg(mood_logs.mood_score), // Updated to MoodLogs
        avgSleep: avg(mood_logs.sleep_hours), // Updated to MoodLogs
        avgEnergy: avg(mood_logs.energy_level), // Updated to MoodLogs
        maxMood: max(mood_logs.mood_score), // Updated to MoodLogs
        minMood: min(mood_logs.mood_score), // Updated to MoodLogs
      })
      .from(mood_logs) // Updated to MoodLogs
      .where(
        and(
          eq(mood_logs.user_id, userId), // Updated to MoodLogs
          gte(mood_logs.created_at, lastWeek), // Updated to MoodLogs
        ),
      );

    // Get most frequent activity
    // Placeholder for now
    const mostFrequentActivity = "exercise";

    return {
      avgMood: weeklyStats[0].avgMood || 0,
      avgSleep: weeklyStats[0].avgSleep || 0,
      avgEnergy: weeklyStats[0].avgEnergy || 0,
      mostFrequentActivity,
    };
  } catch (error) {
    console.error("Error fetching weekly stats:", error);
    throw error;
  }
}

// Get recent journal entries for a user
export async function getRecentJournalEntries(userId: string, days = 14) {
  try {
    const startDate = subDays(new Date(), days);

    const entries = await db
      .select()
      .from(mood_logs) // Updated to MoodLogs
      .where(
        and(
          eq(mood_logs.user_id, userId), // Updated to MoodLogs
          gte(mood_logs.created_at, startDate), // Updated to MoodLogs
        ),
      )
      .orderBy(desc(mood_logs.created_at)); // Updated to MoodLogs

    return entries;
  } catch (error) {
    console.error("Error fetching recent journal entries:", error);
    throw error;
  }
}

// Get recommendations for a user
export async function getUserRecommendations(userId: string) {
  try {
    const userRecommendations = await db
      .select()
      .from(recommendations)
      .where(eq(recommendations.user_id, userId))
      .orderBy(desc(recommendations.priority));

    return userRecommendations;
  } catch (error) {
    console.error("Error fetching user recommendations:", error);
    throw error;
  }
}

// Calculate mood trend
export function calculateMoodTrend(
  entries: (typeof mood_logs.$inferSelect)[], // Updated to MoodLogs
) {
  if (entries.length < 5) return "stable";

  const recentEntries = entries.slice(0, 5);
  const olderEntries = entries.slice(5, 10);

  if (recentEntries.length === 0 || olderEntries.length === 0) return "stable";

  const recentAvg =
    recentEntries.reduce((sum, entry) => sum + entry.mood_score, 0) /
    recentEntries.length;
  const olderAvg =
    olderEntries.reduce((sum, entry) => sum + entry.mood_score, 0) /
    olderEntries.length;

  const difference = recentAvg - olderAvg;

  if (difference > 0.5) return "improving";
  if (difference < -0.5) return "declining";
  return "stable";
}
