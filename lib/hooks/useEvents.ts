"use client";

import { createUserEvent } from "@/services/mutations/events";
import { getEvents } from "@/services/queries/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetEventsSchema } from "../validators";

export function useEventsQuery(options: {
  input?: Partial<GetEventsSchema>;
  enabled?: boolean;
}) {
  const { input = {}, enabled } = options;
  return useQuery({
    queryKey: input.id ? ["event", input.id] : ["events", input],
    queryFn: async () => {
      const events = await getEvents(input);
      return events.data;
    },
    enabled,
  });
}

export function useCreateUserEventMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({
        queryKey: ["event", data.data.userEvent.eventId],
      });
    },
  });
}
