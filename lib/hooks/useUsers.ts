import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/client";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        if (error) throw new Error(error.message);
        return data.user;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
