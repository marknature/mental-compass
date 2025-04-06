import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { Event } from "@/services/database/schema/events/events.schema";
import { Award } from "lucide-react";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  const { date } = formatDateTime(event.created_at);

  return (
    <Card className="bg-border">
      <CardContent className="p-4">
        <div className="flex flex-col items-start">
          <div className="flex-1">
            <h1 className="text-muted-foreground text-sm mb-2">{date}</h1>
            <h3 className="font-medium">{event.title}</h3>
            <p className="text-xs text-muted-foreground mb-1">
              {date} • {event.location}
            </p>
            <div className="flex items-center text-xs">
              <Award className="h-3 w-3 mr-1 text-primary" />
              <span>{event.points} points</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
