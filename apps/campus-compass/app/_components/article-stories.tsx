"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

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
    title: "Sustainable Architecture: Building for Tomorrow",
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

export function ArticleStories() {
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
    <div className="w-full ">
      {/* Story circles at the top */}
      <div className="flex space-x-4 overflow-x-auto py-4 px-2 scrollbar-hide">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => openStory(story, index)}
            className="flex flex-col items-center space-y-1 min-w-[72px]"
          >
            <div
              className={cn(
                "p-[2px] rounded-full",
                "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500",
              )}
            >
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarImage
                  src={story.author.avatar}
                  alt={story.author.name}
                />
                <AvatarFallback>{story.author.initials}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-center truncate w-full">
              {story.author.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
