"use client";

import { useRef } from "react";
import { MeditationProps, MeditationCard } from "./meditation-card";

interface MeditationListProps {
  meditations: MeditationProps[];
}

export function Meditations({ meditations }: MeditationListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
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
  );
}
