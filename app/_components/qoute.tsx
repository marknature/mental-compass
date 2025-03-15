import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialCard = () => {
  return (
    <Card className="relative w-full  bg-border shadow-none border-none">
      <CardHeader className="pt-5 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <span className="capitalize text-[15px] leading-none font-semibold">
              Daily motivation
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-4 text-[15px] text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          ullamcorper, augue at commodo interdum, erat dolor egestas eros, eu
          finibus turpis nunc at purus. Sed elementum rutrum nibh, a egestas
          turpis porttitor eu.
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
