import { eq, and, gte, desc } from "drizzle-orm";
import { subDays } from "date-fns";
import { db } from "..";
import journalEntries from "../schema/journal-entries.schema";
import moodInsights from "../schema/mood-insights.schema";
import recommendations from "../schema/recommendations.schema";

// Generate insights based on journal entries
export async function generateInsights(userId: string): Promise<void> {
  try {
    // Get entries from the last 30 days
    const lastMonth = subDays(new Date(), 30);
    const entries = await db
      .select()
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.userId, userId),
          gte(journalEntries.date, lastMonth),
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
      entries.reduce((sum, entry) => sum + entry.moodScore, 0) / entries.length;

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
          entriesWithActivity.reduce((sum, entry) => sum + entry.moodScore, 0) /
          entriesWithActivity.length;
        const withoutActivityAvg =
          entriesWithoutActivity.length > 0
            ? entriesWithoutActivity.reduce(
                (sum, entry) => sum + entry.moodScore,
                0,
              ) / entriesWithoutActivity.length
            : overallAvgMood;

        const impact = withActivityAvg - withoutActivityAvg;

        activityInsights[activity] = {
          count: entriesWithActivity.length,
          totalMood: entriesWithActivity.reduce(
            (sum, entry) => sum + entry.moodScore,
            0,
          ),
          avgMood: withActivityAvg,
          withActivityAvg,
          withoutActivityAvg,
          impact,
        };
      }
    });

    // Generate sleep insights
    const sleepData = entries.filter((entry) => entry.sleepHours !== null);
    let sleepInsight = null;

    if (sleepData.length >= 5) {
      const goodSleepEntries = sleepData.filter(
        (entry) => entry.sleepHours >= 7,
      );
      const poorSleepEntries = sleepData.filter(
        (entry) => entry.sleepHours < 7,
      );

      if (goodSleepEntries.length >= 3 && poorSleepEntries.length >= 3) {
        const goodSleepMoodAvg =
          goodSleepEntries.reduce((sum, entry) => sum + entry.moodScore, 0) /
          goodSleepEntries.length;
        const poorSleepMoodAvg =
          poorSleepEntries.reduce((sum, entry) => sum + entry.moodScore, 0) /
          poorSleepEntries.length;

        const sleepImpact = goodSleepMoodAvg - poorSleepMoodAvg;

        if (Math.abs(sleepImpact) >= 1) {
          sleepInsight = {
            factor: "sleep_duration",
            impact: sleepImpact / 10, // Normalize to -1 to 1 scale
            confidence: Math.min(sleepData.length / 10, 0.9), // Max confidence of 0.9
            description:
              sleepImpact > 0
                ? "You report higher mood scores when you sleep 7 or more hours"
                : "Your mood appears to be better with less sleep, which is unusual",
          };
        }
      }
    }

    // Save activity insights to database
    for (const [activity, data] of Object.entries(activityInsights)) {
      if (Math.abs(data.impact) >= 0.5) {
        // Only save significant insights
        // Check if insight already exists
        const [existingInsight] = await db
          .select()
          .from(moodInsights)
          .where(
            and(
              eq(moodInsights.userId, userId),
              eq(moodInsights.type, "activity"),
              eq(moodInsights.factor, activity),
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
            .update(moodInsights)
            .set({
              impact: normalizedImpact,
              confidence,
              description,
              updatedAt: new Date(),
            })
            .where(eq(moodInsights.id, existingInsight.id));
        } else {
          // Create new insight
          await db.insert(moodInsights).values({
            userId,
            type: "activity",
            factor: activity,
            impact: normalizedImpact,
            confidence,
            description,
          });
        }
      }
    }

    // Save sleep insight if it exists
    if (sleepInsight) {
      const [existingSleepInsight] = await db
        .select()
        .from(moodInsights)
        .where(
          and(
            eq(moodInsights.userId, userId),
            eq(moodInsights.type, "sleep"),
            eq(moodInsights.factor, sleepInsight.factor),
          ),
        )
        .limit(1);

      if (existingSleepInsight) {
        // Update existing insight
        await db
          .update(moodInsights)
          .set({
            impact: sleepInsight.impact,
            confidence: sleepInsight.confidence,
            description: sleepInsight.description,
            updatedAt: new Date(),
          })
          .where(eq(moodInsights.id, existingSleepInsight.id));
      } else {
        // Create new insight
        await db.insert(moodInsights).values({
          userId,
          type: "sleep",
          factor: sleepInsight.factor,
          impact: sleepInsight.impact,
          confidence: sleepInsight.confidence,
          description: sleepInsight.description,
        });
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
      .from(moodInsights)
      .where(eq(moodInsights.userId, userId))
      .orderBy(desc(moodInsights.impact));

    // Clear existing recommendations
    await db.delete(recommendations).where(eq(recommendations.userId, userId));

    // Generate new recommendations
    const newRecommendations = [];

    // Activity-based recommendations
    const activityInsights = insights.filter(
      (insight) => insight.type === "activity",
    );

    for (const insight of activityInsights) {
      if (insight.impact > 0.2) {
        // Positive impact
        newRecommendations.push({
          userId,
          title: `Increase ${insight.factor}`,
          description: `${insight.description}. Try to include this activity more often in your routine.`,
          type: insight.factor.includes("exercise")
            ? "exercise"
            : insight.factor.includes("social")
              ? "social"
              : "other",
          priority: Math.round(insight.impact * 5), // 1-5 scale
        });
      } else if (insight.impact < -0.2) {
        // Negative impact
        newRecommendations.push({
          userId,
          title: `Reduce ${insight.factor}`,
          description: `${insight.description}. Consider reducing this activity or finding alternatives.`,
          type: "other",
          priority: Math.round(Math.abs(insight.impact) * 3), // Lower priority for negative recommendations
        });
      }
    }

    // Sleep-based recommendations
    const sleepInsights = insights.filter(
      (insight) => insight.type === "sleep",
    );

    for (const insight of sleepInsights) {
      if (insight.impact > 0.2) {
        newRecommendations.push({
          userId,
          title: "Improve Sleep Quality",
          description: `${insight.description}. Aim for 7-8 hours of quality sleep each night.`,
          type: "sleep",
          priority: Math.round(insight.impact * 5), // 1-5 scale
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
