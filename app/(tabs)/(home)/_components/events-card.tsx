import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/services/database/schema/events/events.schema";
import { format } from "date-fns";
import { Award } from "lucide-react";
import Link from "next/link";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  const date = format(event.created_at, "EEEE, MMMM d, yyyy");

  return (
    <Card className="bg-border">
      <CardContent className="p-4">
        <Link href={"/events/" + event.id} className="mb-3">
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
        </Link>
      </CardContent>
    </Card>
  );
}
