"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from "@/app/_components/loading";
import {
  useCreateUserEventMutation,
  useEventsQuery,
} from "@/lib/hooks/useEvents";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useUser } from "@/lib/hooks/useUsers";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();

  const mutation = useCreateUserEventMutation();
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data, isLoading } = useEventsQuery({
    input: {
      id,
      user_id: user?.id,
    },
    enabled: user?.id ? true : false,
  });

  const event = data ? data[0] : null;
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading || isUserLoading) return <Loading title="event" />;
  if (!event) return <h1>Could not load event data</h1>;

  const handleRegister = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return toast.error("You need to be logged in to perform this action");
    }

    return mutation.mutate(
      { userId: data.user.id, eventId: event.id },
      {
        onSuccess(data) {
          toast.success("Success!", {
            description: data.data.message,
          });
        },
        onError() {
          toast.error("Failed to register for event");
        },
      },
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header / Banner */}
      <div className="relative w-full h-48 bg-primary rounded-lg mb-4">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover text-[0px] rounded-lg"
        />
      </div>

      {/* Content */}
      <div className=" space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organized by {event.organizer}
          </p>
        </div>

        {/* Key Info Section */}
        <div className="grid grid-cols-2 gap-3">
          <EventInfoRow icon={Calendar} label={event.date ?? "TBA"} />
          <EventInfoRow icon={Clock} label={event.time ?? "TBA"} />
          <EventInfoRow
            icon={Users}
            label={`${event.participants} participants`}
          />
        </div>

        <EventInfoRow icon={MapPin} label={event.location ?? "TBA"} />
        {/* Description */}
        <div>
          <h2 className="text-base font-semibold mb-2">About Event</h2>
          <div className="relative">
            <p
              className={cn(
                "text-sm text-muted-foreground whitespace-pre-line",
                !isExpanded && "line-clamp-4",
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

        {/* Rewards */}
        <div>
          <h2 className="text-base font-semibold mb-2">Rewards</h2>
          <div className="flex items-center gap-3 text-primary">
            <Award className="h-5 w-5" />
            <span className="text-lg font-bold">{event.points}</span>
            <span className="text-sm text-foreground">
              points on completion
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Points will be added to your account after attending
          </p>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t max-w-md mx-auto">
        <Button
          className="w-full h-12 text-base font-medium"
          disabled={mutation.isPending}
          onClick={handleRegister}
        >
          {event.isRegistered ? "Already Registered" : "Register Now"}
        </Button>
      </div>
    </div>
  );
}

function EventInfoRow({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-primary mt-0.5" />
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );
}
