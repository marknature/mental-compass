import { NextResponse } from "next/server";
import { eq, and, gte, desc } from "drizzle-orm";
import { db } from "@/services/database";
import events from "@/services/database/schema/events/events.schema";
import mood_logs from "@/services/database/schema/mood/mood-logs.schema";
import recommendations from "@/services/database/schema/recommendations.schema";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const data = await createClient();
  const { data: session } = await data.auth.getUser();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Get mood logs for the past 30 days
  const moodData = await db
    .select()
    .from(mood_logs)
    .where(
      and(
        eq(mood_logs.user_id, userId),
        gte(mood_logs.created_at, thirtyDaysAgo),
      ),
    )
    .orderBy(desc(mood_logs.created_at));

  // Get recommendations
  const userRecommendations = await db
    .select()
    .from(recommendations)
    .where(eq(recommendations.user_id, userId))
    .orderBy(desc(recommendations.created_at));

  // Get events
  const upcomingEvents = await db
    .select()
    .from(events)
    .where(eq(events.status, "upcoming"));

  return NextResponse.json({
    moodData,
    recommendations: userRecommendations,
    events: upcomingEvents,
  });
}
