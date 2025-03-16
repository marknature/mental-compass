"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Story {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  coverImage: string;
  date: string;
}
type Props = { title: string; description?: string; list?: boolean };

const stories: Story[] = [
  {
    id: "1",
    title: "The Future of AI in Healthcare",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing medical diagnostics and patient care.",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    coverImage: "/placeholder.svg?height=800&width=500",
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "Building for Tomorrow",
    excerpt:
      "How eco-friendly design is changing the way we think about urban spaces.",
    author: {
      name: "Michael Torres",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
    coverImage: "/placeholder.svg?height=800&width=500",
    date: "5 hours ago",
  },
  {
    id: "3",
    title: "The Psychology of Social Media",
    excerpt:
      "Understanding the impact of digital platforms on mental health and social behavior.",
    author: {
      name: "Dr. Jamie Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
    },
    coverImage: "/placeholder.svg?height=800&width=500",
    date: "Yesterday",
  },
  {
    id: "4",
    title: "Quantum Computing Explained",
    excerpt:
      "Breaking down the complex science behind quantum computers and their potential applications.",
    author: {
      name: "Prof. Alex Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AK",
    },
    coverImage: "/placeholder.svg?height=800&width=500",
    date: "2 days ago",
  },
  {
    id: "5",
    title: "The Rise of Plant-Based Diets",
    excerpt:
      "Examining the growing trend of plant-based eating and its impact on health and environment.",
    author: {
      name: "Olivia Green",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "OG",
    },
    coverImage: "/placeholder.svg?height=800&width=500",
    date: "3 days ago",
  },
];

export default function PageSection({ title, description, list }: Props) {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const openStory = (story: Story, index: number) => {
    setActiveStory(story);
    setActiveIndex(index);
    setProgress(0);

    // Start progress timer
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          return 100;
        }
        return prev + 0.5;
      });
    }, 30);
    setIntervalId(id);
  };

  const closeStory = () => {
    setActiveStory(null);
    if (intervalId) clearInterval(intervalId);
  };

  const nextStory = () => {
    if (activeIndex < stories.length - 1) {
      openStory(stories[activeIndex + 1], activeIndex + 1);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (activeIndex > 0) {
      openStory(stories[activeIndex - 1], activeIndex - 1);
    }
  };

  // Auto advance to next story when progress reaches 100%
  if (progress >= 100) {
    nextStory();
  }
  return (
    <>
      <Card className="bg-transparent space-y-4 max-w-4xl mx-auto border-none shadow-none">
        <CardHeader className="p-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full overflow-y-scroll">
            <div className="flex w-max space-x-4 py-2">
              {stories.map((card, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-transparent transition-colors cursor-pointer border-0 w-[150px]  flex-shrink-0 space-y-2"
                  onClick={() => openStory(card, index)}
                >
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

                  {/* Content */}
                  <CardHeader className="p-0">
                    <div className="items-center gap-2 text-xs text-muted-foreground mb-1">
                      <p>{card.date} </p>
                      <p>{card.author.name}</p>
                    </div>
                    <h3 className="font-semibold text-sm">{card.title}</h3>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/*Fullscreen view*/}
      {activeStory && (
        <div className="!m-0 fixed inset-0 top-0 z-50 bg-black flex flex-col h-full">
          {/* Progress bars */}
          <div className="flex w-full px-2 pt-2 gap-1 z-10">
            {stories.map((_, index) => (
              <div key={index} className="h-1 bg-gray-700 rounded-full flex-1">
                {index === activeIndex && (
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {index < activeIndex && (
                  <div className="h-full bg-white rounded-full w-full" />
                )}
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-4 z-10">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 border">
                <AvatarImage
                  src={activeStory.author.avatar}
                  alt={activeStory.author.name}
                />
                <AvatarFallback>{activeStory.author.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white text-sm font-medium">
                  {activeStory.author.name}
                </p>
                <p className="text-gray-300 text-xs">{activeStory.date}</p>
              </div>
            </div>
            <button onClick={closeStory} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Story content */}
          <div className="flex flex-col mt-36  h-full">
            {/* Content overlay */}
            <div className="flex flex-col p-5">
              <h2 className="text-white text-2xl font-bold mb-2">
                {activeStory.title}
              </h2>
              <p className="text-gray-200 mb-6">{activeStory.excerpt}</p>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevStory}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-1"
              disabled={activeIndex === 0}
            >
              <ChevronLeft
                className={cn(
                  "h-8 w-8",
                  activeIndex === 0
                    ? "opacity-0"
                    : "opacity-70 hover:opacity-100",
                )}
              />
            </button>
            <button
              onClick={nextStory}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-1"
            >
              <ChevronRight className="h-8 w-8 opacity-0 hover:opacity-100" />
            </button>

            {/* Tap areas for navigation */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full"
              onClick={(e) => {
                e.stopPropagation();
                prevStory();
              }}
            />
            <div
              className="absolute top-0 right-0 w-1/2 h-full"
              onClick={(e) => {
                e.stopPropagation();
                nextStory();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
