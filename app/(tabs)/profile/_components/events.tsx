import Loading from "@/app/_components/loading";
import { Card, CardContent } from "@/components/ui/card";
import { useEvents } from "@/lib/hooks/useEvents";
import { CompactEventCard } from "../../events/page";

export default function Events() {
  const { data: events, isLoading } = useEvents({ limit: 5 });

  return (
    <section className="py-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Events history</h2>
        <p className="text-sm text-muted-foreground">
          Events you are current and previous registered events
        </p>
      </div>

      {isLoading ? (
        <Loading title="events" />
      ) : (
        <div className="space-y-3">
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <CompactEventCard key={index} event={event} />
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
