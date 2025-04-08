"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function PageHeader({}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // Define titles and descriptions for each page
  const pageDetails: Record<string, { title: string; description: string }> = {
    "/events": { title: "Events", description: "Explore upcoming events" },
    "/journals": { title: "Journal", description: "Read and write journals" },
    "/resources": {
      title: "Resources",
      description: "Find useful ariticles and podcasts",
    },
    "/profile": {
      title: "Profile",
      description: "View and edit your profile.",
    },
  };

  // Hide header on home page
  if (pathname === "/" || pathname === "/events/1") return null;

  // Get current page details or fallback to default
  const currentPage = pageDetails[pathname] || {
    title: pathname.replace("/", ""),
    description: `Viewing ${pathname.replace("/", "")} page`,
  };

  return (
    <div className="sticky top-0 z-50 bg-background py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-border"
            aria-label="Back"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="capitalize">{currentPage.title}</h1>
            <p className="text-sm text-muted-foreground">
              {currentPage.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
