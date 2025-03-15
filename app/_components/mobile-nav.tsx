"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  BookOpen,
  Award,
  User,
  Bookmark,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show on detail pages
  if (pathname.includes("/[") && pathname.split("/").length > 2) {
    return null;
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      name: "Events",
      href: "/events",
      icon: Calendar,
      active: pathname.startsWith("/events"),
    },
    {
      name: "Journal",
      href: "/journals",
      icon: BookOpen,
      active: pathname.startsWith("/journals"),
    },
    {
      name: "Counselling",
      href: "/counselling",
      icon: Users,
      active: pathname.startsWith("/counselling"),
    },
    {
      name: "Resources",
      href: "/resources",
      icon: Bookmark,
      active: pathname.startsWith("/resources"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-background">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              item.active ? "text-primary" : "text-muted-foreground",
            )}
            aria-label={item.name}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
