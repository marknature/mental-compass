"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  events: Event[];
};

export default function CarouselWithFooter({ events }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full py-4 pb-0">
      <Carousel
        setApi={setApi}
        className="space-y-2 w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index}>
              <EventCard key={index} event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex items-center justify-end gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn("h-3.5 w-3.5 rounded-full border-2", {
              "border-primary": current === index + 1,
            })}
          />
        ))}
      </div>
    </div>
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

function EventCard({ event }: { event: Event }) {
  const { date, time } = formatDateTime(event.date);
  return (
    <Card className="overflow-hidden border-none">
      <CardContent className="p-0">
        <div className="relative max-h-28 h-28 bg-primary/50">
          <Image
            src={event.image || "/placeholder.svg?height=128&width=400"}
            alt={event.title}
            fill
            className="object-cover text-[0px]"
          />
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Award className="h-3 w-3 mr-1" />
            {event.points} points
          </div>
        </div>
        <div className="p-3 bg-border">
          <h3 className="font-semibold mb-1">{event.title}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {event.description}
          </p>

          <div className="grid grid-cols-2 gap-y-2 gap-x-10  mb-3">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="text-nowrap">{event.location}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              <span>{event.participants ?? "0"} joined</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
