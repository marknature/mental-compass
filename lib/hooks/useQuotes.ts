import { getQoute } from "@/services/queries/qoute";
import { useQuery } from "@tanstack/react-query";

export function useQuotes() {
  return useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      try {
        return await getQoute();
      } catch (error) {
        console.error("Error fetching quotes:", error);
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
