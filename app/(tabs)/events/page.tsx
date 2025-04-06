"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Users,
  Search,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import CarouselWithFooter from "@/app/_components/events";
import { useEvents } from "@/lib/hooks/useEvents";
import { useState } from "react";
import Link from "next/link";
import events from "@/services/database/schema/events/events.schema";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "challenge" | "activity";
  date: string;
  time: string;
  location: string;
  points: number;
  participants: number;
  image: string;
  status: "upcoming" | "ongoing" | "completed";
}

export default function Events() {
  const { data: events, isLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on search query
  const filterEvents = (eventsList: Event[] = []) => {
    if (!searchQuery.trim()) return eventsList;

    return eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const upcomingEvents = filterEvents(
    events?.filter((event) => event.status === "upcoming") ?? [],
  );
  const ongoingEvents = filterEvents(
    events?.filter((event) => event.status === "ongoing") ?? [],
  );
  const completedEvents = filterEvents(
    events?.filter((event) => event.status === "completed") ?? [],
  );

  return (
    <>
      <div className="mb-6 flex gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for events..."
            className="w-full pl-10 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading events...</p>
        </div>
      ) : (
        <>
          {upcomingEvents.length > 0 && (
            <CarouselWithFooter events={upcomingEvents} />
          )}

          <Tabs
            defaultValue="upcoming"
            className="relative mr-auto w-full space-y-5 mt-6"
          >
            <TabsList className="p-0 h-auto bg-background gap-1 mt-0">
              <TabsTrigger
                value="upcoming"
                className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
              >
                Upcoming ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger
                value="ongoing"
                className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
              >
                Ongoing ({ongoingEvents.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
              >
                Past ({completedEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {renderEventList(upcomingEvents, "No upcoming events found")}
            </TabsContent>

            <TabsContent value="ongoing" className="space-y-4">
              {renderEventList(ongoingEvents, "No ongoing events found")}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {renderEventList(completedEvents, "No past events found")}
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
}

export function CompactEventCard({ event }: { event: Event }) {
  const { date, time } = formatDateTime(event.date);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-border">
      <Link href={"/events/" + event.id}>
        <CardContent className="p-0">
          <div className="flex">
            {/* Event image (if we want to display it) */}
            {event.image && (
              <div
                className="hidden sm:block h-auto w-24 bg-muted"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}

            <div className="p-3 flex-1">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <div className="space-y-1 mb-2">
                    <h3 className="font-medium text-sm line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{date}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{time}</span>
                    </div>
                  </div>

                  <div className="flex gap-x-3 items-center mt-2 flex-wrap gap-y-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{event.participants ?? "0"} joined</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-y-2">
                  <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    <Award className="h-3 w-3 mr-1" />
                    {event.points} pts
                  </div>

                  <Button
                    size="sm"
                    className="mt-auto text-xs px-3 rounded-sm"
                    variant={
                      event.status === "completed" ? "outline" : "default"
                    }
                  >
                    {event.status === "upcoming"
                      ? "Join"
                      : event.status === "ongoing"
                        ? "View"
                        : "Details"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function renderEventList(events: Event[], message: string) {
  return events?.length ? (
    events.map((event, index) => <CompactEventCard key={index} event={event} />)
  ) : (
    <div className="flex justify-center items-center h-32 bg-muted/20 rounded-md">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
