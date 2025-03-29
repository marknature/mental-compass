import { eq, desc } from "drizzle-orm";
import { startOfDay, subDays, isSameDay, differenceInDays } from "date-fns";
import { db } from "..";
import journalEntries from "../schema/journal-entries.schema";
import users from "../schema/users.schema";
// Calculate user streak based on journal entries
export async function calculateStreak(userId: string): Promise<number> {
  try {
    // Get the user's current streak
    const [user] = await db
      .select({
        streak: users.streak,
      })
      .from(users)
      .where(eq(users.id, userId));

    // Get the most recent journal entry
    const [latestEntry] = await db
      .select({
        date: journalEntries.date,
      })
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(desc(journalEntries.date))
      .limit(1);

    if (!latestEntry) {
      return 0; // No entries yet
    }

    const today = startOfDay(new Date());
    const latestDate = startOfDay(new Date(latestEntry.date));

    // If the latest entry is from today, streak is already up to date
    if (isSameDay(today, latestDate)) {
      return user.streak;
    }

    // If the latest entry is from yesterday, increment streak
    if (isSameDay(subDays(today, 1), latestDate)) {
      const newStreak = user.streak + 1;

      // Update the user's streak
      await db
        .update(users)
        .set({ streak: newStreak })
        .where(eq(users.id, userId));

      // Award streak bonus points if applicable (e.g., every 5 days)
      if (newStreak % 5 === 0) {
        await awardPoints(
          userId,
          50,
          "streak",
          `${newStreak} day streak bonus`,
        );
      }

      return newStreak;
    }

    // If the latest entry is older than yesterday, reset streak to 1
    if (differenceInDays(today, latestDate) > 1) {
      await db.update(users).set({ streak: 1 }).where(eq(users.id, userId));

      return 1;
    }

    return user.streak;
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
}

// Award points to a user
export async function awardPoints(
  userId: string,
  amount: number,
  type: "journal_entry" | "streak" | "achievement" | "event" | "redemption",
  description: string,
): Promise<void> {
  try {
    // Create a points transaction
    await db.insert(pointsTransactions).values({
      userId,
      amount,
      type,
      description,
    });

    // Update the user's total points
    await db
      .update(users)
      .set({
        totalPoints: users.totalPoints + amount,
      })
      .where(eq(users.id, userId));

    // Check if user should level up (every 500 points)
    const [userData] = await db
      .select({
        totalPoints: users.totalPoints,
        level: users.level,
      })
      .from(users)
      .where(eq(users.id, userId));

    const newLevel = Math.floor(userData.totalPoints / 500) + 1;

    if (newLevel > userData.level) {
      await db
        .update(users)
        .set({ level: newLevel })
        .where(eq(users.id, userId));

      // Could trigger a notification or achievement here
    }
  } catch (error) {
    console.error("Error awarding points:", error);
  }
}
