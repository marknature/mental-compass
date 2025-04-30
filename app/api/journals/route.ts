export const dynamic = "force-static";
import { getErrorMessage } from "@/lib/utils";
import { moodLogsParams } from "@/lib/validators";
import { db } from "@/services/database";
import mood_logs from "@/services/database/schema/mood/mood-logs.schema";
import { awardPoints } from "@/services/queries/points";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { createLoader } from "nuqs/server";

export async function GET(request: NextRequest) {
  try {
    const loadSearchParams = createLoader(moodLogsParams);
    const { id, user_id, created_at } = loadSearchParams(request);
    const where = and(
      id ? eq(mood_logs.id, id) : undefined,
      user_id ? eq(mood_logs.user_id, user_id) : undefined,
      created_at ? eq(mood_logs.created_at, created_at) : undefined,
    );
    const entries = await db
      .select()
      .from(mood_logs)
      .where(where)
      .orderBy(desc(mood_logs.created_at));
    return Response.json(entries, { status: 200 });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    let result;
    if (data.id) {
      result = await db
        .update(mood_logs)
        .set({
          mood_score: data.mood_score,
          sleep_hours: data.sleep_hours,
          energy_level: data.energy_level,
          entry_note: data.entry_note,
          gratitude_note: data.gratitude_note,
          challenge_note: data.challenge_note,
          activities: data.activities,
          updated_at: new Date(),
        })
        .where(eq(mood_logs.id, data.id))
        .returning();

      if (result.length === 0) {
        return Response.json({ error: "Log not found" }, { status: 404 });
      }
    } else {
      db.transaction(async (tx) => {
        result = await tx
          .insert(mood_logs)
          .values({
            user_id: data.user_id,
            mood_score: data.mood_score,
            sleep_hours: data.sleep_hours,
            energy_level: data.energy_level,
            entry_note: data.entry_note,
            gratitude_note: data.gratitude_note,
            challenge_note: data.challenge_note,
            activities: data.activities,
          })
          .returning();
        await awardPoints(data.user_id, 50);
      });
    }

    return Response.json(result[0], { status: 200 });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
