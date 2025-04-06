"use client";

import { useQuery } from "@tanstack/react-query";
import { GetMoodLogsSchema } from "../validators";
import { MoodLog } from "@/services/database/schema/mood/mood-logs.schema";
import { getMoodLogs } from "@/services/queries/mood-logs";

export function useJournals(input: Partial<GetMoodLogsSchema> = {}) {
  return useQuery<MoodLog[]>({
    queryKey: ["journals"],
    queryFn: async () => {
      try {
        const events = await getMoodLogs(input);
        if (!events) throw new Error("Failed to fetch journals");
        return events.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
