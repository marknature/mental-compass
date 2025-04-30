"use client";

import type React from "react";

import { Award, Calendar, Gift, LogOut, Settings, Zap } from "lucide-react";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Loading from "@/app/_components/loading";
import EditProfile from "./_components/edit-profile";
import Rewards from "./_components/rewards";
import Events from "./_components/events";
import MoodTracker from "./_components/mood-tracker";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useProfile } from "@/lib/hooks/useProfile";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeSection, setActiveSection] = useState<string>("events");
  const { data: user, isLoading } = useProfile();

  const logout = async () => {
    setActiveSection("logout");
    localStorage.removeItem("onboardingComplete");
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (!error) router.push("/sign-in");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "events":
        return <Events />;
      case "rewards":
        return <Rewards points={user?.total_points ?? 0} />;
      case "mood":
        return <MoodTracker />;
      case "settings":
        return (
          <EditProfile user={user} onUpdate={() => console.log("edited")} />
        );
      default:
        return <Events />;
    }
  };

  if (isLoading) return <Loading title="profile" />;

  return (
    <>
      <div className="flex gap-3 !mb-0">
        <Avatar className="bg-card h-20 w-20 rounded-lg">
          <AvatarFallback className="text-2xl w-full h-full flex items-center justify-center">
            {user.first_name[0] || ""}
            {user.last_name[0] || ""}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 justify-center flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-sm font-semibold">
              {user.first_name || ""} {user.last_name || ""}
            </h1>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center rounded-lg  py-1 gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium text-xs">Streak: </span>
              <span className="text-xs ml-1 font-bold">{user?.streak}</span>
            </div>
            <div className="flex gap-2 items-center  rounded-lg  py-1 ml-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-medium text-xs">Points: </span>
              <span className="text-xs ml-1 font-bold">
                {user?.total_points}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
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
        isActive ? "bg-card" : "hover:bg-muted bg-muted/30"
      }`}
      onClick={onClick}
    >
      <div className="mb-1 text-primary">{icon}</div>
      <span className="text-xs">{label}</span>
    </button>
  );
}
