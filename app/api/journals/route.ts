export const dynamic = "force-static";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/services/database";
import { getJournalEntries } from "@/services/database/queries/journal-entries";
import journalEntries from "@/services/database/schema/journal-entries.schema";
import { calculateStreak } from "@/services/database/utils/points";
import { eq, and } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await getJournalEntries();
    if (!error) throw Error(error);
    return Response.json(
      { data },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return Response.json(
      { error: "Failed to fetch journal entries" },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const body = await req.json();
    const {
      selectedDate,
      moodScore,
      journalEntry,
      gratitude,
      challenge,
      sleepHours,
      energyLevel,
      activities,
    } = body;

    if (!selectedDate || !moodScore) {
      new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const existingEntry = await db
      .select()
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.userId, user?.id),
          eq(journalEntries.date, new Date(selectedDate)),
        ),
      )
      .limit(1);

    if (existingEntry.length > 0) {
      new Response(
        JSON.stringify({ error: "An entry already exists for this date" }),
        {
          status: 409,
        },
      );
    }

    const pointsEarned = 10;

    const [entry] = await db
      .insert(journalEntries)
      .values({
        userId: user.id,
        date: new Date(selectedDate),
        moodScore,
        journalText: journalEntry || "",
        gratitudeText: gratitude || "",
        challengeText: challenge || "",
        sleepHours: sleepHours || null,
        energyLevel: energyLevel || null,
        activities: activities || [],
        pointsEarned,
      })
      .returning();

    const streak = await calculateStreak(user.id);
    // await awardPoints(
    //   user.id,
    //   pointsEarned,
    //   "journal_entry",
    //   "Completed journal entry",
    // );
    // await generateInsights(user.id);

    return new Response(JSON.stringify({ entry, streak, pointsEarned }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create journal entry" }),
      {
        status: 500,
      },
    );
  }
}
