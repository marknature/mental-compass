import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import CarouselWithFooter from "@/app/_components/events";
import { getEvents } from "@/services/database/queries/events";

export default async function Events() {
  const { data: events } = await getEvents();
  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const ongoingEvents = events.filter((event) => event.status === "ongoing");
  const completedEvents = events.filter(
    (event) => event.status === "completed",
  );

  return (
    <>
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for resources..."
          className="w-full text-sm"
        />
        <Button size={"icon"} variant={"outline"}>
          <MoreHorizontal />
        </Button>
      </div>
      <CarouselWithFooter events={upcomingEvents} />
      <Tabs
        defaultValue="upcoming"
        className="relative mr-auto w-full space-y-5 !mt-2"
      >
        <TabsList className="p-0 h-auto bg-background gap-1 mt-0">
          <TabsTrigger
            value="upcoming"
            className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
          >
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {renderEventList(upcomingEvents, "No upcoming events")}
        </TabsContent>
        <TabsContent value="ongoing" className="space-y-4">
          {renderEventList(ongoingEvents, "No ongoing events")}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {renderEventList(completedEvents, "No past events")}
        </TabsContent>
      </Tabs>
    </>
  );
}

interface Event {
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

function CompactEventCard({ event }: { event: Event }) {
  const { date, time } = formatDateTime(event.date);
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-2 bg-border">
        <div className="flex">
          <div className="p-2 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="space-y-2 mb-2">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="font-sm text-xs text-muted-foreground line-clamp-3">
                    {event.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-3 mt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{date}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xs font-bold text-primary bg-transparent  p-0 rounded-sm">
                <Award className="h-3 w-3 mr-0.5" />
                {event.points}
              </div>
            </div>

            <div className="flex  gap-x-3 items-center mt-2 flex-wrap">
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>

              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{event.participants ?? "0"} joined</span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-1/3 rounded-sm h-7 text-xs px-2 border-none mt-5"
              variant={event.status === "completed" ? "outline" : "default"}
            >
              {event.status === "upcoming"
                ? "Join"
                : event.status === "ongoing"
                  ? "View"
                  : "Details"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function renderEventList(events: Event[], message: string) {
  return events.length ? (
    events.map((event, index) => <CompactEventCard key={index} event={event} />)
  ) : (
    <div className="flex justify-center items-center h-32">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
