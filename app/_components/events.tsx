"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock } from "lucide-react";

export default function CarouselWithFooter() {
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
    <div className=" w-full py-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className=" overflow-hidden rounded-xl bg-border p-5">
                {/* Content Section */}
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <h2 className="text-xl font-semibold ">
                      Reflect on your inner self
                    </h2>
                    <p className="mt-1 text-sm ">
                      Join our transformative wellness event and discover
                      powerful techniques to manage stress, improve mental
                      clarity, and cultivate lasting inner peace.
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Beginner</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>March 15</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>4 Hours</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex gap-3">
                    <Button className="bg-primary px-6 text-sm">
                      Learn More
                    </Button>
                    <Button className="px-6 text-sm" variant={"secondary"}>
                      View Detials
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0" />
        <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" />
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
