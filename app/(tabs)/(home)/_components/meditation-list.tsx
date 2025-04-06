"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeditationProps, MeditationCard } from "./meditation-card";

interface MeditationListProps {
  meditations: MeditationProps[];
}

export function MeditationList({ meditations }: MeditationListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -280 : 280;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {meditations.map((meditation) => (
          <div key={meditation.id} className="flex-shrink-0 w-[260px]">
            <MeditationCard {...meditation} />
          </div>
        ))}
      </div>
    </div>
  );
}
