import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { Event } from "@/services/database/schema/events/events.schema";
import { toast } from "sonner";
import { useCreateUserEventMutation } from "@/lib/hooks/useEvents";
import { createClient } from "@/lib/supabase/client";
import { getEvents } from "@/services/queries/events";

type Props = {
  event: Awaited<ReturnType<typeof getEvents>>["data"];
};

export default function EventCard({ event }: Props) {
  const { date, time } = formatDateTime(event.date);
  const statusLabel = getStatusLabel(event.status);
  const mutation = useCreateUserEventMutation();

  const handleJoin = async () => {
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
    <Card className="overflow-hidden transition-all hover:shadow-md bg-border">
      <Link href={`/events/${event.id}`} className="block">
        <CardContent className="p-0">
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="space-y-1">
                <h3 className="text-sm font-medium line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Info icon={<Calendar className="h-3 w-3" />} text={date} />
                <Info icon={<Clock className="h-3 w-3" />} text={time} />
                <Info
                  icon={<MapPin className="h-3 w-3" />}
                  text={event.location}
                />
                <Info
                  icon={<Users className="h-3 w-3" />}
                  text={`${event.participants ?? 0} joined`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                <Award className="h-3 w-3 mr-1" />
                {event.points} pts
              </div>

              <Button
                size="sm"
                className="text-xs px-3 rounded-sm"
                variant={event.status === "completed" ? "outline" : "default"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleJoin();
                }}
              >
                {mutation.isPending
                  ? "Joining event"
                  : event.isRegistered
                    ? "Joined"
                    : statusLabel}
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1 truncate">
      {icon}
      <span className="truncate">{text}</span>
    </div>
  );
}

function getStatusLabel(status: Event["status"]) {
  switch (status) {
    case "upcoming":
      return "Join";
    case "ongoing":
      return "View";
    case "completed":
      return "Details";
    default:
      return "Unknown";
  }
}
