import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { Event } from "@/services/database/schema/events/events.schema";
import { Award, Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";

type Props = {
  event: Event[];
};

export default function FeaturedEvent({ event }: Props) {
  const { date, time } = formatDateTime(event.date);
  return (
    <Card className="overflow-hidden border-none h-full">
      <CardContent className="p-0 h-full">
        <div className="relative max-h-28 h-28 bg-primary/50">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover text-[0px]"
          />
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Award className="h-3 w-3 mr-1" />
            {event.points} points
          </div>
        </div>

        <div className="h-full  p-3 bg-border">
          <h3 className="font-semibold mb-1 line-clamp-2">{event.title}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {event.description}
          </p>

          <div className="grid grid-cols-2 gap-y-2 gap-x-10 mb-3">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              <span>{event.participants ?? "0"} joined</span>
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{event.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <Button
              className="w-full rounded-sm"
              size="sm"
              variant={event.status === "completed" ? "outline" : "default"}
            >
              {event.status === "upcoming"
                ? "Register"
                : event.status === "ongoing"
                  ? "Join Now"
                  : "View Details"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
