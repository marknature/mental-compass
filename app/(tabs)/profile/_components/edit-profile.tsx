import type React from "react";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { avatarOptions } from "./avatars";

interface EditProfileProps {
  user: User;
  onUpdate: () => void;
}

export default function EditProfile({ user, onUpdate }: EditProfileProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.user_metadata?.first_name || "",
    last_name: user.user_metadata?.last_name || "",
    bio: user.user_metadata?.bio || "",
    avatar_id: user.user_metadata?.avatar_id || "mindfulness",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectAvatar = (id: string) => {
    setFormData({
      ...formData,
      avatar_id: id,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: formData,
      });

      if (error) {
        throw error;
      }

      toast.success("Your profile has been updated successfully.");

      onUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("There was an error updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
