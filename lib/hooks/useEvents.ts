"use client";

import { Event } from "@/services/database/schema/events/events.schema";
import { getEvents } from "@/services/queries/events";
import { useQuery } from "@tanstack/react-query";
import { GetEventsSchema } from "../validators";

export function useEvents(input: Partial<GetEventsSchema> = {}) {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const events = await getEvents(input);
        if (!events) throw new Error("Failed to fetch events");
        return events.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
    },
  });
}
