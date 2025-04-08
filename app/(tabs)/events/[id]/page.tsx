"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
  Calendar,
  ArrowLeft,
  Clock,
  Users,
  Share2,
  CalendarPlus,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EventDetailProps = {};

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
    attendees: 250,
  };

  const [isRegistered, setIsRegistered] = useState(event.isRegistered || false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    setIsRegistered(true);
    toast.success("Registered!", {
      description: `You'll earn ${event.points} points upon completion.`,
    });
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast.success(
      isSaved ? "Removed from saved events" : "Added to saved events",
    );
  };

  const addToCalendar = () => {
    toast.success("Added to calendar");
  };

  const shareEvent = () => {
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Back button and header */}
      <div className="sticky top-0 z-10 bg-background flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="m-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-48">
        {/* <Image */}
        {/*   src={event.image || "/placeholder.svg"} */}
        {/*   alt={""} */}
        {/*   fill */}
        {/*   className="object-cover" */}
        {/*   priority */}
        {/* /> */}
        <div className="absolute inset-0 bg-primary rounded-lg" />

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          {/* <Badge className="bg-primary hover:bg-primary text-white border-none capitalize"> */}
          {/*   {event.category} */}
          {/* </Badge> */}
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 px-0 space-y-6">
        {/* Title and organizer */}
        <div>
          <h1 className="text-xl font-bold">{event.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {event.organizer}
          </p>
        </div>

        {/* Quick info cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center justify-center">
            <Calendar className="h-5 w-5 text-primary mb-1" />
            <p className="text-xs text-center font-medium">{event.date}</p>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center justify-center">
            <Clock className="h-5 w-5 text-primary mb-1" />
            <p className="text-xs text-center font-medium">{event.time}</p>
          </div>
        </div>

        {/* Attendees */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{event.attendees} joined</span>
          </div>
        </div>

        {/* About section */}
        <div>
          <h2 className="text-base font-semibold mb-2">About Event</h2>
          <div className="relative">
            <p
              className={cn(
                "text-sm text-muted-foreground",
                !isExpanded && "line-clamp-3",
              )}
            >
              {event.description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-primary mt-2 font-medium"
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

        {/* Location */}
        <div>
          <h2 className="text-base font-semibold mb-6">Location</h2>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{event.location}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Enter through the main entrance, take the elevator to the second
                floor
              </p>
            </div>
          </div>
        </div>

        {/* Points/Rewards */}
        <div>
          <h2 className="text-base font-semibold mb-6">Rewards</h2>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary mr-2">
                  {event.points}
                </span>
                <span className="text-sm">points upon completion</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Points will be added to your account after attending the event
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="flex-1 h-10"
            onClick={toggleSave}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isSaved && "fill-[#7CBA01] text-[#7CBA01]",
              )}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex-1 h-10"
            onClick={addToCalendar}
          >
            <CalendarPlus className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex-1 h-10"
            onClick={shareEvent}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Fixed bottom button */}
      <Button
        className="w-full h-12 rounded-lg text-base font-medium bg-primary pt-10 "
        onClick={handleRegister}
        disabled={isRegistered}
      >
        {isRegistered ? "Already Registered" : "Register Now"}
      </Button>
    </div>
  );
}
