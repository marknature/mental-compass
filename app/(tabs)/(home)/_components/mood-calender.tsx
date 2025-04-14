"use client";

import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Smile, Meh, Frown } from "lucide-react";
import { MoodLog } from "@/services/database/schema/mood/mood-logs.schema";

interface MoodCalendarProps {
  data: MoodLog[];
  className?: string;
}

export function MoodCalendar({ data, className }: MoodCalendarProps) {
  const today = new Date();
  const [currentWeekStart] = useState(startOfWeek(today, { weekStartsOn: 0 }));

  // Generate the days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i),
  );

  // Get month name if the week spans two months
  const monthName = format(weekDays[3], "MMMM");

  // Function to get mood emoji based on score
  const getMoodEmoji = (score: number | null) => {
    if (score === null)
      return (
        <div className="w-6 h-6 rounded-full border border-muted-foreground/30 border-dashed"></div>
      );
    if (score >= 7) return <Smile className="w-5 h-5 dark:text-green-300 " />;
    if (score >= 4) return <Meh className="w-5 h-5 text-yellow-500 " />;
    return <Frown className="w-5 h-5 dark:text-red-300" />;
  };

  // Function to find mood data for a specific date
  const getMoodForDate = (date: Date): number | null => {
    const entry = data.find((item) => isSameDay(item.created_at, date));
    return entry ? entry.mood_score : null;
  };

  return (
    <div className={cn("bg-border rounded-xl p-3 py-4 ", className)}>
      <div className="grid grid-cols-7 gap-2 ">
        {/* Day names */}
        {["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
          <div key={`day-${i}`} className="text-center ">
            <span className="text-xs text-muted-foreground">{day}</span>
          </div>
        ))}

        {/* Day numbers and mood indicators */}
        {weekDays.map((date, i) => {
          const isToday = isSameDay(date, today);
          const mood = getMoodForDate(date);

          return (
            <div key={`date-${i}`} className="flex flex-col items-center ">
              <div
                className={cn(
                  "w-6 h-6 rounded-sm flex items-center justify-center text-xs mb-2 ",
                  isToday
                    ? "bg-primary text-white font-medium"
                    : "text-foreground",
                )}
              >
                {format(date, "d")}
              </div>
              <div className="flex justify-center">{getMoodEmoji(mood)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
