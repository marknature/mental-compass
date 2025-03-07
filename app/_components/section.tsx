import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

type Props = { title: string; description?: string };

const cards = [
  {
    title: "Possible causes",
    lessons: 8,
    duration: "30 mins",
    description:
      "Although extensive research and clinical tests have shown various triggers, the exact cause remains unique to each individual.",
    image: (
      <div className="relative w-full h-24 bg-blue-900/10 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Person illustration */}
          <div className="relative">
            {/* Shadow/cloud */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-16">
              <div className="absolute inset-0 bg-blue-900/20 rounded-full" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-900/20 rounded-full" />
            </div>
            {/* Person */}
            <div className="relative z-10">
              <div className="w-12 h-12 bg-pink-200 rounded-full" />{" "}
              {/* Head */}
              <div className="mt-1 w-16 h-8 bg-pink-200 rounded-lg" />{" "}
              {/* Body */}
            </div>
            {/* Small waves */}
            <div className="absolute -left-6 top-2 w-3 h-1 bg-blue-900/20 rounded-full" />
            <div className="absolute -right-6 top-4 w-3 h-1 bg-blue-900/20 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Dealing with attacks",
    lessons: 6,
    duration: "25 mins",
    description:
      "Panic attacks can be unsettling. However, you can learn to manage them effectively with the right techniques and support.",
    image: (
      <div className="relative w-full h-24 bg-orange-900/10 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Person illustration */}
          <div className="relative">
            {/* Lightning effects */}
            <div className="absolute -top-4 -left-8 w-6 h-6">
              <div className="absolute inset-0 bg-yellow-400 rotate-45 transform origin-bottom-right" />
            </div>
            <div className="absolute -top-4 -right-8 w-6 h-6">
              <div className="absolute inset-0 bg-yellow-400 -rotate-45 transform origin-bottom-left" />
            </div>
            {/* Person */}
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-200 rounded-full" />{" "}
              {/* Head */}
              <div className="mt-1 w-16 h-8 bg-orange-200 rounded-lg" />{" "}
              {/* Body */}
            </div>
            {/* Additional lightning */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
              <div className="absolute inset-0 bg-yellow-400/70" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Possible causes",
    lessons: 8,
    duration: "30 mins",
    description:
      "Although extensive research and clinical tests have shown various triggers, the exact cause remains unique to each individual.",
    image: (
      <div className="relative w-full h-24 bg-blue-900/10 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Person illustration */}
          <div className="relative">
            {/* Shadow/cloud */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-16">
              <div className="absolute inset-0 bg-blue-900/20 rounded-full" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-900/20 rounded-full" />
            </div>
            {/* Person */}
            <div className="relative z-10">
              <div className="w-12 h-12 bg-pink-200 rounded-full" />{" "}
              {/* Head */}
              <div className="mt-1 w-16 h-8 bg-pink-200 rounded-lg" />{" "}
              {/* Body */}
            </div>
            {/* Small waves */}
            <div className="absolute -left-6 top-2 w-3 h-1 bg-blue-900/20 rounded-full" />
            <div className="absolute -right-6 top-4 w-3 h-1 bg-blue-900/20 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function PageSection({ title, description }: Props) {
  return (
    <Card className="bg-transparent space-y-4 max-w-4xl mx-auto border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="w-full overflow-y-scroll">
          <div className="flex space-x-4">
            {cards.map((card, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-transparent transition-colors cursor-pointer border-0 w-[150px]  flex-shrink-0 space-y-2"
              >
                <div className="group-hover:scale-105 transition-transform duration-300">
                  {card.image}
                </div>
                {/* Content */}
                <CardHeader className="p-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{card.lessons} Lessons</span>
                    <span>•</span>
                    <span>{card.duration}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{card.title}</h3>
                </CardHeader>
                <CardContent className="px-0">
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
