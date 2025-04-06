import { getErrorMessage } from "@/lib/utils";
import { eventsParams } from "@/lib/validators";
import { db } from "@/services/database";
import events from "@/services/database/schema/events/events.schema";
import { and, inArray } from "drizzle-orm";
import { NextRequest } from "next/server";
import { createLoader } from "nuqs/server";

export async function GET(request: NextRequest) {
  try {
    const loadSearchParams = createLoader(eventsParams);
    const { status, limit } = loadSearchParams(request);

    const where = and(
      status.length > 0 ? inArray(events.status, status) : undefined,
    );

    const data = await db.select().from(events).where(where).limit(limit);
    return Response.json(data, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      { error: getErrorMessage(error) },
      {
        status: 500,
      },
    );
  }
}
