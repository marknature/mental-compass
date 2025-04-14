import { getErrorMessage } from "@/lib/utils";
import { eventsParams } from "@/lib/validators";
import { db } from "@/services/database";
import articles from "@/services/database/schema/articles.schema";
import events from "@/services/database/schema/events/events.schema";
import userEvents from "@/services/database/schema/events/users-events.shema";
import { takeFirstOrNull } from "@/services/database/utils/utils";
import { and, eq, inArray } from "drizzle-orm";
import { NextRequest } from "next/server";
import { createLoader } from "nuqs/server";

export async function GET(request: NextRequest) {
  try {
    const loadSearchParams = createLoader(eventsParams);
    const { id, status, limit } = loadSearchParams(request);

    const where = and(
      id ? eq(events.id, id) : undefined,
      status.length > 0 ? inArray(events.status, status) : undefined,
    );

    const data = await db.select().from(articles).where(where).limit(limit);

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

export async function POST(request: NextRequest) {
  try {
    const { eventId, userId } = await request.json();

    if (!eventId) {
      return Response.json({ error: "Event ID is required" }, { status: 400 });
    }

    const existingEvent = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .then(takeFirstOrNull);

    if (!existingEvent) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    const existingRegistration = await db
      .select()
      .from(userEvents)
      .where(
        and(eq(userEvents.eventId, eventId), eq(userEvents.userId, userId)),
      )
      .then(takeFirstOrNull);

    if (existingRegistration) {
      const data = await db
        .delete(userEvents)
        .where(
          and(eq(userEvents.eventId, eventId), eq(userEvents.userId, userId)),
        )
        .returning();

      return Response.json(
        { message: "You unregistered for this event", userEvent: data[0] },
        { status: 200 },
      );
    }

    const newUserEvent = await db
      .insert(userEvents)
      .values({
        userId,
        eventId,
        attended: false,
        earnedPoints: 0,
      })
      .returning();

    return Response.json(
      {
        message: "Successfully registered for event",
        userEvent: newUserEvent[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering for event:", error);
    return Response.json(
      { error: "Failed to register for event" },
      { status: 500 },
    );
  }
}
