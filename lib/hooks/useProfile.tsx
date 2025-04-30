"use client";
import { User } from "@/services/database/schema/users.schema";
import { getUserProfile, updateUserProfile } from "@/services/queries/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../supabase/client";

export interface UpdateUserProfileInput {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  level?: number;
  streak?: number;
  total_points?: number;
}

export function useProfile() {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        console.log(data.user?.id);
        const profile = await getUserProfile(data.user.id);
        if (!profile) throw new Error("Failed to fetch user profile");
        return profile.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }
    },
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserProfileInput) => updateUserProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile", data.id] });
    },
  });
}
