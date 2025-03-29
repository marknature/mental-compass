"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, getMoodColor, getMoodIcon, getMoodText } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import {
  Activity,
  BookIcon,
  Coffee,
  Dumbbell,
  Moon,
  Music,
  Sun,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

type Props = {
  moodHistory: {
    date: Date;
    mood: number;
    activities: string[];
    journalText: string;
    sleep: number;
    energy: number;
  }[];
};

export default function History({ moodHistory }: Props) {
  const [selectedDate, setDate] = useState<Date | undefined>(new Date());
  const todaysMood = selectedDate
    ? moodHistory.find(
        (day) => day.date && selectedDate && isSameDay(day.date, selectedDate),
      )
    : null;
  return (
    <>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-2 px-0 mb-2 pt-0">
          <CardTitle className="text-base">Your Journal Calendar</CardTitle>
          <CardDescription>
            A timeline of your experiences to help you grow.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setDate}
            className="bg-border rounded-md border p-4 w-full"
            components={{
              DayContent: ({ date, displayMonth, ...props }) => {
                const entry = moodHistory.find(
                  (d) => d.date && date && isSameDay(d.date, date),
                );
                return (
                  <span
                    className={cn(
                      "h-8 w-8 p-2 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                      entry && getMoodColor(entry.mood),
                    )}
                  >
                    {date.getDate()}
                    {entry && (
                      <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                    )}
                  </span>
                );
              },
            }}
          />
          <div className="flex justify-center gap-16 mt-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs">Great</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
              <span className="text-xs">Okay</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-xs">Low</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Details */}
      {todaysMood && (
        <Card className="bg-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {format(todaysMood.date, "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3 ">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "py-1 rounded-full",
                  getMoodColor(todaysMood.mood),
                )}
              >
                {getMoodIcon(todaysMood.mood)}
              </div>
              <div>
                <span className="font-medium">Mood: {todaysMood.mood}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({getMoodText(todaysMood.mood)})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm ">
              <div className="flex items-center">
                <Moon className="h-4 w-4 mr-1 text-primary" />
                <span>Sleep: {todaysMood.sleep} hours</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1 text-primary" />
                <span>Energy: {todaysMood.energy}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Activities:</h3>
              <div className="flex flex-wrap gap-1">
                {todaysMood.activities.map((activity, i) => (
                  <Badge key={i} className="text-xs">
                    {activityOptions.find((a) => a.id === activity)?.label ||
                      activity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <p className="text-sm text-muted-foreground">
                {todaysMood.journalText}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Past Entries */}
      <Card className="border-none">
        <CardHeader className="pb-2 px-0 pt-0 m-0">
          <CardTitle className="text-base">Recent Entries</CardTitle>
          <CardDescription>
            Your latest reflections at a glance.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3 px-0">
          {moodHistory.slice(0, 5).map((day, i) => (
            <div key={i} className="flex items-start p-3 bg-border rounded-md">
              <div
                className={cn("p-2 rounded-full mr-3", getMoodColor(day.mood))}
              >
                {getMoodIcon(day.mood)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-sm">
                    {day.mood >= 7
                      ? "Had a great day!"
                      : day.mood >= 4
                        ? "Feeling okay"
                        : "Tough day"}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {format(day.date, "MMM d")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 my-1">
                  {day.activities.map((activity, j) => (
                    <Badge key={j} className="text-[10px] px-1 h-4">
                      {activityOptions.find((a) => a.id === activity)?.label ||
                        activity}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sleep: {day.sleep}h • Energy: {day.energy}/10
                </p>
              </div>
            </div>
          ))}

          <Button className="w-full text-xs">View All Entries</Button>
        </CardContent>
      </Card>
    </>
  );
}

const activityOptions = [
  {
    id: "exercise",
    label: "Exercise",
    icon: <Dumbbell className="h-4 w-4" />,
  },
  {
    id: "meditation",
    label: "Meditation",
    icon: <Moon className="h-4 w-4" />,
  },
  { id: "social", label: "Social Time", icon: <Users className="h-4 w-4" /> },
  { id: "reading", label: "Reading", icon: <BookIcon className="h-4 w-4" /> },
  { id: "music", label: "Music", icon: <Music className="h-4 w-4" /> },
  { id: "work", label: "Productive", icon: <Zap className="h-4 w-4" /> },
  { id: "outdoors", label: "Outdoors", icon: <Sun className="h-4 w-4" /> },
  { id: "caffeine", label: "Caffeine", icon: <Coffee className="h-4 w-4" /> },
  { id: "meal", label: "Good Meal", icon: <Utensils className="h-4 w-4" /> },
];
