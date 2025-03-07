"use client";

import { Home, User, Edit, Users2, Sparkle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    color: "text-primary",
  },
  {
    name: "Challanges",
    href: "/packs",
    icon: Sparkle,
  },
  {
    name: "Journal",
    href: "/scan",
    icon: Edit,
    isMain: true,
  },
  {
    name: "Counselling",
    href: "/menu",
    icon: Users2,
  },
  {
    name: "Profile",
    href: "/orders",
    icon: User,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg ">
      <div className="flex items-center justify-around h-16 px-4 max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isMain) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "bg-primary text-white p-4 rounded-full shadow-lg",
                  "hover:bg-primary transition-all duration-200",
                  "active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
                aria-label={item.name}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2",
                "transition-colors duration-200",
                "active:scale-95",
                isActive
                  ? item.color || "text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
