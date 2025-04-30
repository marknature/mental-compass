"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  BookOpen,
  User,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide nav if the path has more than 2 segments (e.g. /events/123)
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 1 || pathname === "/chat") return null;

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
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
      active: pathname.startsWith("/chat"),
    },
    {
      name: "Resources",
      href: "/resources",
      icon: Bookmark,
      active: pathname.startsWith("/resources"),
    },
  ];

  return (
    <div className="border-t fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-background">
      <div className="flex items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              item.active ? "text-primary font-bold" : "text-muted-foreground",
            )}
            aria-label={item.name}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
