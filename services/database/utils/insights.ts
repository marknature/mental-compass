import { eq, and, gte, desc } from "drizzle-orm";
import { subDays } from "date-fns";
import { db } from "..";
import mood_logs from "../schema/mood/mood-logs.schema";
import mood_insights from "../schema/mood/mood-insights.schema";
import recommendations from "../schema/recommendations.schema";
import { Activity } from "lucide-react";

// Generate insights based on journal entries
export async function generateInsights(userId: string): Promise<void> {
  console.log("generating insights");
  try {
    // Get entries from the last 30 days
    const lastMonth = subDays(new Date(), 30);
    const entries = await db
      .select()
      .from(mood_logs)
      .where(
        and(
          eq(mood_logs.user_id, userId),
          gte(mood_logs.created_at, lastMonth),
        ),
      );

    // Need at least 5 entries to generate insights
    if (entries.length < 5) {
      return;
    }

    // Analyze activities correlation with mood
    const activities = new Set<string>();
    entries.forEach((entry) => {
      entry.activities?.forEach((activity) => activities.add(activity));
    });

    const activityInsights: Record<
      string,
      {
        count: number;
        totalMood: number;
        avgMood: number;
        withActivityAvg: number;
        withoutActivityAvg: number;
        impact: number;
      }
    > = {};

    // Calculate average mood overall
    const overallAvgMood =
      entries.reduce((sum, entry) => sum + entry.mood_score, 0) /
      entries.length;

    // Calculate mood averages for each activity
    activities.forEach((activity) => {
      const entriesWithActivity = entries.filter((entry) =>
        entry.activities?.includes(activity),
      );
      const entriesWithoutActivity = entries.filter(
        (entry) => !entry.activities?.includes(activity),
      );

      if (entriesWithActivity.length >= 3) {
        const withActivityAvg =
          entriesWithActivity.reduce(
            (sum, entry) => sum + entry.mood_score,
            0,
          ) / entriesWithActivity.length;
        const withoutActivityAvg =
          entriesWithoutActivity.length > 0
            ? entriesWithoutActivity.reduce(
                (sum, entry) => sum + entry.mood_score,
                0,
              ) / entriesWithoutActivity.length
            : overallAvgMood;

        const impact = withActivityAvg - withoutActivityAvg;

        activityInsights[activity] = {
          count: entriesWithActivity.length,
          totalMood: entriesWithActivity.reduce(
            (sum, entry) => sum + entry.mood_score,
            0,
          ),
          avgMood: withActivityAvg,
          withActivityAvg,
          withoutActivityAvg,
          impact,
        };
      }
    });

    console.log(activityInsights);

    // Save activity insights to database
    for (const [activity, data] of Object.entries(activityInsights)) {
      if (Math.abs(data.impact) >= 0.5) {
        // Check if insight already exists
        const [existingInsight] = await db
          .select()
          .from(mood_insights)
          .where(
            and(
              eq(mood_insights.user_id, userId),
              eq(mood_insights.insight_type, "activity"),
              eq(mood_insights.contributing_factor, activity),
            ),
          )
          .limit(1);

        const normalizedImpact = data.impact / 10; // Normalize to -1 to 1 scale
        const confidence = Math.min(data.count / entries.length, 0.9); // Max confidence of 0.9

        const description =
          normalizedImpact > 0
            ? `Your mood is typically ${Math.round(normalizedImpact * 100)}% better on days with ${activity}`
            : `Your mood is typically ${Math.round(Math.abs(normalizedImpact) * 100)}% lower on days with ${activity}`;

        if (existingInsight) {
          // Update existing insight
          await db
            .update(mood_insights)
            .set({
              impact_score: normalizedImpact,
              confidence_level: confidence,
              description,
              updated_at: new Date(),
            })
            .where(eq(mood_insights.id, existingInsight.id));
        } else {
          // Create new insight

          await db.insert(mood_insights).values({
            user_id: userId,
            insight_type: "activity",
            contributing_factor: activity,
            impact_score: normalizedImpact,
            confidence_level: confidence,
            description,
          });
        }
      }
    }

    // Generate recommendations based on insights
    await generateRecommendations(userId);
  } catch (error) {
    console.error("Error generating insights:", error);
  }
}

// Generate personalized recommendations based on insights
async function generateRecommendations(userId: string): Promise<void> {
  try {
    // Get all insights for the user
    const insights = await db
      .select()
      .from(mood_insights)
      .where(eq(mood_insights.user_id, userId))
      .orderBy(desc(mood_insights.impact_score));

    // Clear existing recommendations
    await db.delete(recommendations).where(eq(recommendations.user_id, userId));

    // Generate new recommendations
    const newRecommendations = [];

    // Activity-based recommendations
    const activityInsights = insights.filter(
      (insight) => insight.insight_type === "activity",
    );

    for (const insight of activityInsights) {
      if (insight.impact_score > 0.2) {
        // Positive impact
        newRecommendations.push({
          user_id: userId,
          title: `Increase ${insight.contributing_factor}`,
          description: `${insight.description}. Try to include this activity more often in your routine.`,
          type: insight.contributing_factor.includes("exercise")
            ? "exercise"
            : insight.contributing_factor.includes("social")
              ? "social"
              : "other",
          priority: Math.round(insight.impact_score * 5), // 1-5 scale
        });
      } else if (insight.impact_score < -0.2) {
        // Negative impact
        newRecommendations.push({
          user_id: userId,
          title: `Reduce ${insight.contributing_factor}`,
          description: `${insight.description}. Consider reducing this activity or finding alternatives.`,
          type: "other",
          priority: Math.round(Math.abs(insight.impact_score) * 3), // Lower priority for negative recommendations
        });
      }
    }

    // Insert new recommendations (limit to top 5)
    for (const rec of newRecommendations.slice(0, 5)) {
      await db.insert(recommendations).values(rec);
    }
  } catch (error) {
    console.error("Error generating recommendations:", error);
  }
}
