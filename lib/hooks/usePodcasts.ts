import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "@/services/queries/podcasts";

export function usePodcastsQuery() {
  return useQuery({
    queryKey: ["podcasts"],
    queryFn: getPodcasts,
  });
}
