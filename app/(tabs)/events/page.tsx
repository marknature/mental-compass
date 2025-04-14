"use client";

import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/app/_components/event-card";
import EventCarousel from "./_components/events-carousel";
import { Event } from "@/services/database/schema/events/events.schema";
import { useEventsQuery } from "@/lib/hooks/useEvents";
import { useState } from "react";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: events, isLoading } = useEventsQuery({ enabled: true });

  // Filter events based on search query
  const filterEvents = (eventsList: Event[] = []) => {
    if (!searchQuery.trim()) return eventsList;

    return eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase()),
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
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading events...</p>
        </div>
      ) : (
        <>
          {upcomingEvents.length > 0 && (
            <EventCarousel events={upcomingEvents} />
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

function renderEventList(events: Event[], message: string) {
  return events?.length ? (
    events.map((event, index) => <EventCard key={index} event={event} />)
  ) : (
    <div className="flex justify-center items-center h-32 bg-muted/20 rounded-md">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
