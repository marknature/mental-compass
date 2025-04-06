"use client";

import type React from "react";

import { Progress } from "@/components/ui/progress";
import {
  Award,
  Calendar,
  Gift,
  Heart,
  LogOut,
  Settings,
  Smile,
} from "lucide-react";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUsers";
import Loading from "@/app/_components/loading";
import EditProfile from "./_components/edit-profile";
import { avatarOptions } from "./_components/avatars";
import Rewards from "./_components/rewards";
import Events from "./_components/events";
import MoodTracker from "./_components/mood-tracker";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const { data: user, isLoading } = useUser();

  const logout = async () => {
    setActiveSection("logout");
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (!error) router.push("/sign-in");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "events":
        return <Events />;
      case "rewards":
        return <Rewards />;
      case "mood":
        return <MoodTracker />;
      case "settings":
        return (
          <EditProfile user={user} onUpdate={() => console.log("edited")} />
        );
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) return <Loading title="profile" />;

  // Find the avatar component based on the user's avatar_id
  const avatarId = user.user_metadata?.avatar_id || "mindfulness";
  const avatarOption = avatarOptions.find((option) => option.id === avatarId);
  const UserAvatar = avatarOption
    ? avatarOption.component
    : avatarOptions[0].component;

  return (
    <>
      {/* Profile Header */}
      <div className="flex items-start gap-3 !mb-8">
        <Avatar className="h-20 w-20  rounded-xl overflow-hidden">
          <UserAvatar />
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">
              {user.user_metadata?.first_name || ""}{" "}
              {user.user_metadata?.last_name || ""}
            </h1>
            <Badge className="text-xs rounded-sm">Level 5</Badge>
          </div>
          <div className="mt-1 space-y-1">
            <div className="text-muted-foreground text-sm flex gap-1">
              <p>Streak: 24</p> • <p>Points: 24</p>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level 6</span>
              <span>750 / 1000</span>
            </div>
            <Progress value={75} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-2 mb-8">
        <NavItem
          icon={<Heart />}
          label="Activity"
          isActive={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        <NavItem
          icon={<Calendar />}
          label="Events"
          isActive={activeSection === "events"}
          onClick={() => setActiveSection("events")}
        />
        <NavItem
          icon={<Gift />}
          label="Rewards"
          isActive={activeSection === "rewards"}
          onClick={() => setActiveSection("rewards")}
        />
        <NavItem
          icon={<Smile />}
          label="Mood"
          isActive={activeSection === "mood"}
          onClick={() => setActiveSection("mood")}
        />

        <NavItem
          icon={<Settings />}
          label="Edit Profile"
          isActive={activeSection === "settings"}
          onClick={() => setActiveSection("settings")}
        />
        <NavItem
          icon={<LogOut />}
          label="Logout"
          isActive={activeSection === "logout"}
          onClick={logout}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-4 w-full">{renderContent()}</div>
    </>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex gap-3 items-center justify-start p-2 px-4 rounded-lg transition-colors ${
        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted bg-muted/30"
      }`}
      onClick={onClick}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </button>
  );
}

function Dashboard() {
  const activities = [
    {
      id: 1,
      message: "You completed day 3 of the Mindful Mornings challenge",
      time: "1h",
    },
    {
      id: 2,
      message: "You earned the 'Sleep Pro' badge for consistent sleep tracking",
      time: "5h",
    },
    {
      id: 3,
      message: "You reached 750 wellness points! Keep going!",
      time: "1d",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 p-4 bg-muted/30 rounded-lg"
          >
            <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">{activity.message}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
