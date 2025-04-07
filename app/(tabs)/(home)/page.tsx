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
import { Flame } from "lucide-react";

export default function Home() {
  const { data: events = [], isLoading: eventsIsLoading } = useEvents({
    limit: 3,
    status: ["upcoming"],
  });
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data: journals = [], isLoading: journalsIsLoading } = useJournals();

  const streakCount = 5;

  if (eventsIsLoading || userIsLoading || journalsIsLoading)
    return <Loading title="home" />;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">{getGreeting()}</h1>
          <h3 className="font-semibold text-sm text-muted-foreground">
            {user.user_metadata?.first_name || ""}{" "}
            {user.user_metadata?.last_name || ""}
          </h3>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Flame className="h-5 w-5 text-primary animate-pulse" />
          <div className="font-semibold text-xs flex flex-col items-center justify-center">
            {streakCount} day streak!
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="py-2">
        <div className="mb-4">
          <h2 className="text-base mb-1 font-semibold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-primary/80 border-none">
            <Link
              href="/journals/"
              className="text-base/1 gap-1 items-center text-center"
            >
              <CardContent className="p-3 flex flex-col items-center justify-center">
                <h3 className="font-medium">Journal Entry</h3>
                <p className="text-xs text-foreground/80 mb-2">
                  Track your mood
                </p>
              </CardContent>
            </Link>
          </Card>
          <Card className="border-none bg-border">
            <Link
              href="/events/"
              className="text-base/1 flex flex-col gap-1 items-center text-center"
            >
              <CardContent className="p-3 ">
                <h3 className="font-medium">Events</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Join activities
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>

      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className=" font-medium">Mood Calender</h1>
          <p className="text-sm text-muted-foreground">
            Track your mood over the past weeks
          </p>
        </div>
        <MoodCalendar data={journals} />
      </div>

      <section className="px-0 py-6">
        <div className="space-y-1 mb-3">
          <h1 className=" font-medium">Guided Meditations</h1>
          <p className="text-sm text-muted-foreground">
            Start your day right with some meditations
          </p>
        </div>
        <MeditationList meditations={guidedMeditations} />
      </section>

      {/* Crisis Support */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="font-medium">Crisis Support Available</h1>
          <p className="text-sm text-muted-foreground">
            If you're experiencing a mental health emergency, immediate support
            is available.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button size="lg" asChild>
            <a href="tel:+1234567890">Call</a>
          </Button>
          <Button size="lg" asChild>
            <a href="mailto:support@example.com">Email</a>
          </Button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/events">View all</Link>
          </Button>
        </div>

        <div className="space-y-3">
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <Card className="bg-muted/50">
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
