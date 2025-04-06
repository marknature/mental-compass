"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EventDetailProps {}

export default function EventDetail({}: EventDetailProps) {
  const event = {
    id: "1",
    title: "Stress Management Challenge",
    description:
      "Learn meditation techniques to reduce stress and improve focus. Perfect for beginners and experienced practitioners alike. This workshop will teach you how to incorporate mindfulness into your daily routine to manage academic stress and improve your overall mental well-being.\n\nThe session will be led by Dr. Sarah Chen, a clinical psychologist specializing in mindfulness-based stress reduction techniques for college students. You'll learn practical exercises that can be done in just 5-10 minutes a day, even in a busy dorm room or between classes.",
    date: "March 15, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Student Center, Room 204",
    category: "mindfulness",
    points: 50,
    image: "/placeholder.svg?height=200&width=400&text=Meditation+Workshop",
    organizer: "Student Wellness Center",
    isRegistered: false,
  };

  const [isRegistered, setIsRegistered] = useState(event.isRegistered || false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    setIsRegistered(true);
    toast("Registered!", {
      description: `You'll earn ${event.points} points upon completion.`,
    });
  };

  return (
    <div className="flex flex-col flex-1 grow h-full bg-background">
      {/* Hero Image Section with navigation */}
      <div className="relative w-full h-64 bg-primary/20 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-5 left-0 right-0 px-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 text-foreground"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Event type and title overlay */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="text-sm font-medium text-primary-foreground/80">
            {event.organizer}
          </div>
          <h1 className="text-xl font-bold text-primary-foreground">
            {event.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-primary-foreground/70">
            <Badge>{event.category}</Badge>
            <span className="capitalize">• 250 people Joined</span>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1  pt-6">
        {/* Description Section */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <div>
              <h2 className="text-base font-medium">Description</h2>
              <div className="relative mt-1">
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    !isExpanded && "line-clamp-4",
                  )}
                >
                  {event.description}
                </p>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-sm text-primary mt-2"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className=" border-border pb-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-3 rounded bg-primary/80">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-medium">Location</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {event.location}
              </p>
            </div>
          </div>
        </div>

        {/* Date & Time Section */}
        <div className=" border-border pb-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-3 rounded bg-primary/80">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-medium">Date & Time</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {event.date}, {event.time}
              </p>
            </div>
          </div>
        </div>

        {/* Points Section */}
        <div className=" border-border pb-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-3 rounded bg-primary/80">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-medium">Reward</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Earn {event.points} points upon completion of this event
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="mt-8 mb-4">
          <Button
            className="w-full h-12 rounded-lg text-base font-medium"
            onClick={handleRegister}
            disabled={isRegistered}
          >
            {isRegistered ? "Already Registered" : "Register Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
