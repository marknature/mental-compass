import events from "@/services/database/schema/events/events.schema";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsTimestamp,
} from "nuqs/server";
import { z } from "zod";

export const moodLogsParams = {
  id: parseAsString,
  user_id: parseAsString,
  created_at: parseAsIsoDateTime,
};

export const insightsParams = {
  user_id: parseAsString,
};

export const eventsParams = {
  user_id: parseAsString,
  status: parseAsArrayOf(z.enum(events.status.enumValues)).withDefault([]),
  limit: parseAsInteger.withDefault(10),
};

const moodLogsParamsCache = createSearchParamsCache({
  ...moodLogsParams,
});

const insightsParamsCache = createSearchParamsCache({
  ...insightsParams,
});

const eventsParamsCache = createSearchParamsCache({
  ...eventsParams,
});

export type GetMoodLogsSchema = Awaited<
  ReturnType<typeof moodLogsParamsCache.parse>
>;

export type GetInsightsSchema = Awaited<
  ReturnType<typeof insightsParamsCache.parse>
>;

export type GetEventsSchema = Awaited<
  ReturnType<typeof eventsParamsCache.parse>
>;
