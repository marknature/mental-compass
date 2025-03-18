"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MapPin, ChevronDown, ChevronUp, Ribbon, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wellness":
        return "bg-green-100 text-green-800";
      case "mindfulness":
        return "bg-blue-100 text-blue-800";
      case "social":
        return "bg-purple-100 text-purple-800";
      case "academic":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Mock participants data
  const participants = [
    { name: "User 1", image: "/placeholder.svg?height=32&width=32&text=U1" },
    { name: "User 2", image: "/placeholder.svg?height=32&width=32&text=U2" },
    { name: "User 3", image: "/placeholder.svg?height=32&width=32&text=U3" },
    { name: "User 4", image: "/placeholder.svg?height=32&width=32&text=U4" },
    { name: "User 5", image: "/placeholder.svg?height=32&width=32&text=U5" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background ">
      {/* Hero Image Section */}
      <div className="relative w-full h-52 rounded-lg border-none outline-none">
        <div className="bg-border border-none outline-none h-full w-full object-cover rounded-lg " />
      </div>

      {/* Content Section */}
      <div className="flex-1  pt-6 ">
        <h1 className="text-xl font-bold">{event.title}</h1>

        {/* Location */}
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{event.location || "Online Event"}</span>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex -space-x-2">
            {participants.map((participant, i) => (
              <Avatar key={i} className=" bg-border  w-6 h-6">
                <AvatarImage src={participant.image} alt={participant.name} />
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">250</span> people are
            joined
          </span>
        </div>
        {/* Points Badge */}
        <div className="mt-6 inline-block">
          <Badge
            variant="secondary"
            className="flex gap-2 justify-center items-center text-sm px-3 py-1"
          >
            <Award /> {event.points} points upon completion
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-2 my-6">
          <Button
            variant="secondary"
            className="text-xs rounded-lg"
            size={"sm"}
          >
            Podcasts
          </Button>
          <Button
            variant="secondary"
            className="text-xs rounded-lg"
            size={"sm"}
          >
            Podcasts
          </Button>
          <Button
            variant="secondary"
            className="text-xs rounded-lg"
            size={"sm"}
          >
            Podcasts
          </Button>
          <Button
            variant="secondary"
            className="text-xs rounded-lg"
            size={"sm"}
          >
            Podcasts
          </Button>
        </div>

        {/* Description */}
        <div className="mt-6">
          <div className="relative">
            <p
              className={cn(
                "text-sm text-muted-foreground",
                !isExpanded && "line-clamp-6",
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

        {/* Fixed Bottom Section */}
        <div className="flex space-x-3">
          <Button
            className="w-full h-12 text-sm mt-6"
            variant={isRegistered ? "outline" : "default"}
            onClick={handleRegister}
            disabled={isRegistered}
          >
            {isRegistered ? "Registered" : "Register"}
          </Button>
          <Button className="w-full h-12 text-sm mt-6" variant={"secondary"}>
            Contact organizer
          </Button>
        </div>
      </div>
    </div>
  );
}
