"use client";

import { createUserEvent } from "@/services/mutations/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetEventsSchema } from "../validators";
import { getArticles } from "@/services/queries/articles";

export function useArticlesQuery(options: {
  input?: Partial<GetEventsSchema>;
}) {
  const { input = {} } = options;
  return useQuery({
    queryKey: ["articles", input],
    queryFn: async () => {
      const response = await getArticles(input);
      return response.data;
    },
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
