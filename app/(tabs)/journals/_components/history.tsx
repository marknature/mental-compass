"use client";
import Loading from "@/app/_components/loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useJournals } from "@/lib/hooks/useJournals";
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

type Props = {};

export default function History({}: Props) {
  const { data: moodHistory = [], isLoading } = useJournals();
  const [selectedDate, setDate] = useState<Date | undefined>(new Date());

  if (isLoading) return <Loading title="history" />;

  const todaysMood = selectedDate
    ? moodHistory.find(
        (day) =>
          day.created_at &&
          selectedDate &&
          isSameDay(day.created_at, selectedDate),
      )
    : null;
  return (
    <>
      <Card className="border-none shadow-none ">
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
                  (d) => d.created_at && date && isSameDay(d.created_at, date),
                );
                return (
                  <span
                    className={cn(
                      "h-8 w-8 p-1 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                      entry && getMoodColor(entry.mood_score),
                    )}
                  >
                    {date.getDate()}
                  </span>
                );
              },
            }}
          />
          <div className="mt-4 flex gap-4 space-y-1">
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
        <Card className="border-none">
          <CardHeader className="pb-2 px-0 mb-2 pt-0">
            <CardTitle className="text-base">Journal</CardTitle>
            <CardDescription>
              Viewing journal for{" "}
              <span className="text-sm text-muted-foreground">
                {format(todaysMood.created_at, "EEEE, MMMM d, yyyy")}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-border  rounded-lg p-6 space-y-3">
            {/* Date */}
            <div className="text-sm text-muted-foreground">
              {format(todaysMood.created_at, "EEEE, MMMM d, yyyy")}
            </div>

            {/* Mood Header */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-white text-base",
                  getMoodColor(todaysMood.mood_score),
                )}
              >
                {getMoodIcon(todaysMood.mood_score)}
              </div>
              <div className="text-base">
                Mood:{" "}
                <span className="font-medium">{todaysMood.mood_score}</span>
                <span className="ml-2 text-muted-foreground text-sm">
                  ({getMoodText(todaysMood.mood_score)})
                </span>
              </div>
            </div>

            {/* Activities */}
            {todaysMood.activities.length > 0 && (
              <div>
                <div className="text-sm mb-2 text-muted-foreground">
                  Activities:
                </div>
                <div className="flex flex-wrap gap-2">
                  {todaysMood.activities.map((activity, i) => (
                    <span
                      key={i}
                      className="bg-primary/80 px-3 py-1 rounded-sm text-xs"
                    >
                      {activityOptions.find((a) => a.id === activity)?.label ||
                        activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {todaysMood.entry_note && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-muted-foreground">
                  Reflection
                </h4>
                <p className="text-sm leading-relaxed">
                  {todaysMood.entry_note}
                </p>
              </div>
            )}

            {todaysMood.challenge_note && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-muted-foreground">
                  Challenge
                </h4>
                <p className="text-sm leading-relaxed">
                  {todaysMood.challenge_note}
                </p>
              </div>
            )}

            {todaysMood.gratitude_note && (
              <div>
                <h4 className="text-sm font-semibold mb-1 text-muted-foreground">
                  Gratitude
                </h4>
                <p className="text-sm leading-relaxed">
                  {todaysMood.gratitude_note}
                </p>
              </div>
            )}

            {/* Footer Stats (Sleep & Energy) */}
            <div className="text-sm text-muted-foreground pt-4 border-t border-muted/20">
              Slept for {todaysMood.sleep_hours} hours · Energy level:{" "}
              {todaysMood.energy_level}
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

        <CardContent className="pt-0 px-0">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {moodHistory.slice(0, 5).map((day, i) => (
              <AccordionItem value={`day-${i}`} key={i} className="border-none">
                <AccordionTrigger className="p-3 rounded-md bg-border no-underline hover:bg-muted/30 [&[data-state=open]]:rounded-b-none">
                  <div className="flex items-start w-full gap-3 text-left">
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        getMoodColor(day.mood_score),
                      )}
                    >
                      {getMoodIcon(day.mood_score)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">
                          {day.mood_score >= 7
                            ? "Had a great day!"
                            : day.mood_score >= 4
                              ? "Feeling okay"
                              : "Tough day"}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {format(day.created_at, "MMM d")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {day.activities?.map((activity, j) => (
                          <Badge key={j} className="text-[10px] px-1 h-4">
                            {activityOptions.find((a) => a.id === activity)
                              ?.label || activity}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Sleep: {day.sleep_hours}h • Energy: {day.energy_level}
                        /10
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-muted/10 rounded-b-md px-4 py-3 text-sm space-y-3 text-muted-foreground">
                  {day.entry_note && (
                    <div>
                      <p className="font-medium mb-1 text-foreground">
                        Reflection
                      </p>
                      <p>{day.entry_note}</p>
                    </div>
                  )}

                  {day.challenge_note && (
                    <div>
                      <p className="font-medium mb-1 text-foreground">
                        Challenge
                      </p>
                      <p>{day.challenge_note}</p>
                    </div>
                  )}

                  {day.gratitude_note && (
                    <div>
                      <p className="font-medium mb-1 text-foreground">
                        Gratitude
                      </p>
                      <p>{day.gratitude_note}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>{" "}
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
