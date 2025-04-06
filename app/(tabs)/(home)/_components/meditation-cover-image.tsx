"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MeditationCoverImageProps {
  title: string;
  category: string;
  className?: string;
}

export function MeditationCoverImage({
  title,
  category,
  className,
}: MeditationCoverImageProps) {
  // Get background gradient based on category
  const background = useMemo(() => {
    switch (category.toLowerCase()) {
      case "morning":
        return "bg-gradient-to-br from-blue-400 to-indigo-600";
      case "anxiety":
      case "stress":
        return "bg-gradient-to-br from-blue-500 to-cyan-400";
      case "sleep":
        return "bg-gradient-to-br from-indigo-900 to-blue-900";
      case "focus":
        return "bg-gradient-to-br from-orange-400 to-amber-600";
      case "gratitude":
        return "bg-gradient-to-br from-green-400 to-emerald-600";
      default:
        return "bg-gradient-to-br from-purple-500 to-indigo-600";
    }
  }, [category]);

  // Generate icon based on category
  const icon = useMemo(() => {
    switch (category.toLowerCase()) {
      case "morning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        );
      case "anxiety":
      case "stress":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <path d="M14.5 2v17M2 17l12.5 5M22 17l-12.5 5M6.5 8l11 4M6.5 12l11 4" />
          </svg>
        );
      case "sleep":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        );
      case "focus":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="12" x2="12" y1="2" y2="4" />
            <line x1="12" x2="12" y1="20" y2="22" />
            <line x1="4.93" x2="6.34" y1="4.93" y2="6.34" />
            <line x1="17.66" x2="19.07" y1="17.66" y2="19.07" />
            <line x1="2" x2="4" y1="12" y2="12" />
            <line x1="20" x2="22" y1="12" y2="12" />
            <line x1="6.34" x2="4.93" y1="17.66" y2="19.07" />
            <line x1="19.07" x2="17.66" y1="4.93" y2="6.34" />
          </svg>
        );
      case "gratitude":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
    }
  }, [category]);

  // Generate a pattern based on title
  const pattern = useMemo(() => {
    // Use the title to create a consistent pattern
    const titleHash = title
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const patternType = titleHash % 5; // 5 different pattern types

    switch (patternType) {
      case 0:
        return (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/30"></div>
            <div className="absolute top-1/4 left-0 right-0 h-px bg-white/20"></div>
            <div className="absolute top-2/4 left-0 right-0 h-px bg-white/20"></div>
            <div className="absolute top-3/4 left-0 right-0 h-px bg-white/20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30"></div>
          </div>
        );
      case 1:
        return (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 bottom-0 w-px bg-white/30"></div>
            <div className="absolute top-0 left-1/4 bottom-0 w-px bg-white/20"></div>
            <div className="absolute top-0 left-2/4 bottom-0 w-px bg-white/20"></div>
            <div className="absolute top-0 left-3/4 bottom-0 w-px bg-white/20"></div>
            <div className="absolute top-0 right-0 bottom-0 w-px bg-white/30"></div>
          </div>
        );
      case 2:
        return (
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: `${10 + i * 5}px`,
                  height: `${10 + i * 5}px`,
                  top: `${(titleHash + i * 20) % 100}%`,
                  left: `${(titleHash + i * 30) % 100}%`,
                }}
              ></div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white/20"
                  style={{
                    height: "1px",
                    width: "100%",
                    top: `${20 + i * 15}%`,
                    transform: `rotate(${((titleHash + i * 10) % 20) - 10}deg)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b border-l border-white/30"></div>
            <div className="absolute top-0 left-0 w-1/2 h-1/2 border-b border-r border-white/30"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-t border-l border-white/30"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-t border-r border-white/30"></div>
          </div>
        );
      default:
        return null;
    }
  }, [title]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        background,
        className,
      )}
    >
      {pattern}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-white/90">{icon}</div>
        <h3 className="mt-2 text-lg font-medium text-white/90">{title}</h3>
        <p className="text-xs text-white/70">{category}</p>
      </div>
    </div>
  );
}
