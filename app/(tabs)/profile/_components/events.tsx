import EventCard from "@/app/_components/event-card";
import Loading from "@/app/_components/loading";
import { Card, CardContent } from "@/components/ui/card";
import { useEventsQuery } from "@/lib/hooks/useEvents";

export default function Events() {
  const { data: events, isLoading } = useEventsQuery({ limit: 5 });

  return (
    <section className="py-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Your Events</h2>
      </div>

      {isLoading ? (
        <Loading title="events" />
      ) : (
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
      )}
    </section>
  );
}
