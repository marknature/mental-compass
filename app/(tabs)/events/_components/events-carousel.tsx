import FeaturedEvent from "@/app/_components/featured-event";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Event } from "@/services/database/schema/events/events.schema";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import React from "react";

type Props = {
  events: Event[];
};

export default function EventCarousel({ events }: Props) {
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
    <div className="w-full py-4 pb-0 h-full">
      <Carousel
        setApi={setApi}
        className="space-y-2 w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="h-full">
          {events.map((event, index) => (
            <CarouselItem key={index} className="h-auto">
              <Link href={`/events/${event.id}`} className="block">
                <FeaturedEvent key={index} event={event} />
              </Link>
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
