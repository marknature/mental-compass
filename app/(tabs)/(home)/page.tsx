"use client";

import Loading from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEvents } from "@/lib/hooks/useEvents";
import { getGreeting } from "@/lib/hooks/useGreeting";
import { useUser } from "@/lib/hooks/useUsers";
import Link from "next/link";
import EventCard from "./_components/events-card";
import { MeditationList } from "./_components/meditation-list";
import { MoodCalendar } from "./_components/mood-calender";
import { useJournals } from "@/lib/hooks/useJournals";
import { Calendar, BarChart2, BookOpen } from "lucide-react";

export default function Home() {
  const { data: events = [], isLoading: eventsIsLoading } = useEvents({
    limit: 3,
    status: ["upcoming"],
  });
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data: journals = [], isLoading: journalsIsLoading } = useJournals();

  if (eventsIsLoading || userIsLoading || journalsIsLoading)
    return <Loading title="home" />;

  return (
    <div className="space-y-3">
      <header className="flex items-center mb-6   rounded-lg">
        <div>
          <h1 className="text-foreground font-semibold text-md">
            {getGreeting()}
          </h1>
          <h3 className="font-semibold text-sm text-muted-foreground">
            {user.user_metadata?.first_name || ""}{" "}
            {user.user_metadata?.last_name || ""}
          </h3>
        </div>
      </header>

      {/* Quick Actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-base mb-1 font-semibold flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-primary" />
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-primary border-none shadow-md transition-all hover:shadow-lg hover:scale-105">
            <Link
              href="/journals/"
              className="text-base/1 gap-1 items-center text-center"
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground mb-2" />
                <h3 className="font-medium text-primary-foreground">
                  Journal Entry
                </h3>
                <p className="text-xs text-primary-foreground/90 mt-1">
                  Track your mood
                </p>
              </CardContent>
            </Link>
          </Card>
          <Card className="border-none bg-accent shadow-md transition-all hover:shadow-lg hover:scale-105">
            <Link
              href="/events/"
              className="text-base/1 flex flex-col gap-1 items-center text-center"
            >
              <CardContent className="p-4">
                <Calendar className="h-5 w-5 text-accent-foreground mb-2 mx-auto" />
                <h3 className="font-medium">Events</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Join activities
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>

      <section className="px-0 py-4 overflow-x-hidden">
        <div className="space-y-1 mb-4">
          <h1 className="font-medium flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Guided Meditations
          </h1>
          <p className="text-sm text-muted-foreground">
            Start your day right with some meditations
          </p>
        </div>
        <MeditationList meditations={guidedMeditations} />
      </section>

      <div className="space-y-4 ">
        <div className="space-y-1">
          <h1 className="font-medium flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Mood Calendar
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your mood over the past weeks
          </p>
        </div>
        <MoodCalendar data={journals} />
      </div>

      {/* Upcoming Events */}
      <section className="py-4 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            Upcoming Events
          </h2>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full shadow-sm hover:shadow-md"
          >
            <Link href="/events">View all</Link>
          </Button>
        </div>

        <div className="space-y-3">
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <Card className="bg-muted/50 border border-border">
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground">
                  No upcoming events found
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

// Add this mock data for guided meditations
const guidedMeditations = [
  {
    id: "morning-calm",
    title: "Morning Calm",
    description:
      "Start your day with clarity and purpose. This guided meditation helps you set positive intentions for the day ahead.",
    duration: "5:30",
    author: "Dr. Emma Rodriguez",
    category: "Morning",
    coverImage: "/placeholder.svg?height=128&width=260&text=Morning+Calm",
    isNew: true,
  },
  {
    id: "stress-relief",
    title: "Stress Relief",
    description:
      "Release tension and find your center with this calming meditation designed to reduce stress and anxiety.",
    duration: "8:45",
    author: "Michael Chen",
    category: "Anxiety",
    coverImage: "/placeholder.svg?height=128&width=260&text=Stress+Relief",
  },
  {
    id: "deep-sleep",
    title: "Deep Sleep Journey",
    description:
      "Prepare your mind and body for restful sleep with this gentle meditation designed to help you drift off peacefully.",
    duration: "12:20",
    author: "Sarah Johnson",
    category: "Sleep",
    coverImage: "/placeholder.svg?height=128&width=260&text=Deep+Sleep",
  },
  {
    id: "focus-clarity",
    title: "Focus & Clarity",
    description:
      "Sharpen your concentration and mental clarity with this meditation designed for students before study sessions.",
    duration: "7:15",
    author: "Prof. David Williams",
    category: "Focus",
    coverImage: "/placeholder.svg?height=128&width=260&text=Focus+Clarity",
    isNew: true,
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description:
      "Cultivate a mindset of thankfulness and appreciation with this guided gratitude meditation.",
    duration: "6:50",
    author: "Lisa Thompson",
    category: "Gratitude",
    coverImage: "/placeholder.svg?height=128&width=260&text=Gratitude",
  },
];
