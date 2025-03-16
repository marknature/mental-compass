"use client";

import type React from "react";

import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Gift,
  Heart,
  History,
  Settings,
  Smile,
  Star,
  Users,
} from "lucide-react";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-border"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1>Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-border"></button>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-3 !mb-8">
        <Avatar className="h-16 w-16 bg-primary rounded-xl">
          <AvatarImage
            src="/placeholder.svg?height=64&width=64"
            alt="Sarah Johnson"
          />
        </Avatar>
        <div className="flex-1">
          <h1 className="text-base font-semibold">Sarah Johnson</h1>
          <div className="mt-1 space-y-1">
            <div className="text-sm flex gap-1">
              <p>Streak: 24</p> • <p>Badges: 24</p>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Wellness Points</span>
              <span>750 / 1000</span>
            </div>
            <Progress value={75} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <NavItem
          icon={<Smile />}
          label="Mood"
          isActive={activeSection === "mood"}
          onClick={() => setActiveSection("mood")}
        />
        <NavItem
          icon={<BookOpen />}
          label="Challenges"
          isActive={activeSection === "challenges"}
          onClick={() => setActiveSection("challenges")}
        />
        <NavItem
          icon={<Gift />}
          label="Rewards"
          isActive={activeSection === "rewards"}
          onClick={() => setActiveSection("rewards")}
        />
        <NavItem
          icon={<Users />}
          label="Community"
          isActive={activeSection === "community"}
          onClick={() => setActiveSection("community")}
        />
        <NavItem
          icon={<Star />}
          label="Badges"
          isActive={activeSection === "badges"}
          onClick={() => setActiveSection("badges")}
        />
        <NavItem
          icon={<Heart />}
          label="Wellness"
          isActive={activeSection === "wellness"}
          onClick={() => setActiveSection("wellness")}
        />
        <NavItem
          icon={<History />}
          label="History"
          isActive={activeSection === "history"}
          onClick={() => setActiveSection("history")}
        />
        <NavItem
          icon={<Settings />}
          label="Settings"
          isActive={activeSection === "settings"}
          onClick={() => setActiveSection("settings")}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-4">{renderContent()}</div>
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
      className={`flex gap-3 items-center justify-start p-1 rounded-lg transition-colors ${
        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
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
