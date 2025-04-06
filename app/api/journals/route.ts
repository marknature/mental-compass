export const dynamic = "force-static";
import { getErrorMessage } from "@/lib/utils";
import { moodLogsParams } from "@/lib/validators";
import { db } from "@/services/database";
import mood_logs, {
  moodLogSchema,
} from "@/services/database/schema/mood/mood-logs.schema";
import { generateInsights } from "@/services/database/utils/insights";
import { calculateStreak } from "@/services/database/utils/points";
import { and, eq } from "drizzle-orm";
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

    const entries = await db.select().from(mood_logs).where(where);
    return Response.json(entries, { status: 200 });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = moodLogSchema.parse(body);

    const existingEntry = await db
      .select()
      .from(mood_logs)
      .where(
        and(
          eq(mood_logs.user_id, data.user_id),
          eq(mood_logs.created_at, data.created_at),
        ),
      )
      .limit(1);

    if (existingEntry.length > 0) {
      return new Response(
        JSON.stringify({ error: "An entry already exists for this date" }),
        {
          status: 409,
        },
      );
    }

    const [entry] = await db.insert(mood_logs).values(data).returning();
    const streak = await calculateStreak(data.user_id);
    await generateInsights(data.user_id);
    return Response.json(
      { entry, streak },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error creating mood log entry:", getErrorMessage(error));
    return Response.json(
      { error: "Failed to create mood log entry" },
      { status: 500 },
    );
  }
}
