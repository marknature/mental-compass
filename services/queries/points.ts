import { eq, desc, sql } from "drizzle-orm";
import { startOfDay, subDays, isSameDay, differenceInDays } from "date-fns";
import { db } from "../database";
import users from "../database/schema/users.schema";
import { mood_logs as journalEntries } from "../database/schema/mood/mood-logs.schema";

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
        date: journalEntries.created_at,
      })
      .from(journalEntries)
      .where(eq(journalEntries.user_id, userId))
      .orderBy(desc(journalEntries.created_at))
      .limit(1);

    if (!latestEntry) {
      return 0; // No entries yet
    }

    const today = startOfDay(new Date());
    // Handle null check for latestEntry.date
    const latestDate = startOfDay(new Date(latestEntry.date || new Date()));

    // If the latest entry is from today, streak is already up to date
    if (isSameDay(today, latestDate)) {
      return user?.streak || 0;
    }

    // If the latest entry is from yesterday, increment streak
    if (isSameDay(subDays(today, 1), latestDate)) {
      const currentStreak = user?.streak || 0;
      const newStreak = currentStreak + 1;

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

    return user?.streak || 0;
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
}

// Award points to a user
export async function awardPoints(
  userId: string,
  amount: number,
): Promise<void> {
  try {
    // Update the user's total points
    await db
      .update(users)
      .set({
        total_points: sql`${users.total_points} + ${amount}`,
      })
      .where(eq(users.id, userId));

    // Check if user should level up (every 500 points)
    await checkAndUpdateLevel(userId);
  } catch (error) {
    console.error("Error awarding points:", error);
  }
}

// Deduct points from a user
export async function deductPoints(
  userId: string,
  amount: number,
  category?: string,
  description?: string,
): Promise<void> {
  try {
    // Get current points to ensure we don't go negative
    const [userData] = await db
      .select({
        totalPoints: users.total_points,
      })
      .from(users)
      .where(eq(users.id, userId));

    const currentPoints = userData?.totalPoints || 0;

    // Calculate points to deduct (don't allow negative total)
    const pointsToDeduct = Math.min(currentPoints, amount);

    // Update the user's total points
    await db
      .update(users)
      .set({
        total_points: sql`${users.total_points} - ${pointsToDeduct}`,
      })
      .where(eq(users.id, userId));

    // Check if user should level down
    await checkAndUpdateLevel(userId);
  } catch (error) {
    console.error("Error deducting points:", error);
  }
}

// Helper function to check and update user level based on points
async function checkAndUpdateLevel(userId: string): Promise<void> {
  try {
    // Get current points and level
    const [userData] = await db
      .select({
        totalPoints: users.total_points,
        level: users.level,
      })
      .from(users)
      .where(eq(users.id, userId));

    const currentPoints = userData?.totalPoints || 0;
    const currentLevel = userData?.level || 1;

    // Calculate new level (every 500 points, minimum level is 1)
    const newLevel = Math.max(1, Math.floor(currentPoints / 500) + 1);

    // Update level if changed
    if (newLevel !== currentLevel) {
      await db
        .update(users)
        .set({ level: newLevel })
        .where(eq(users.id, userId));
    }
  } catch (error) {
    console.error("Error updating user level:", error);
  }
}

// Get current points and level for a user
export async function getUserPointsInfo(
  userId: string,
): Promise<{ points: number; level: number }> {
  try {
    const [userData] = await db
      .select({
        points: users.total_points,
        level: users.level,
      })
      .from(users)
      .where(eq(users.id, userId));

    return {
      points: userData?.points || 0,
      level: userData?.level || 1,
    };
  } catch (error) {
    console.error("Error getting user points info:", error);
    return { points: 0, level: 1 };
  }
}
