import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Bell } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PageSection from "../_components/articles-grid";
import TestimonialCard from "../_components/qoute";
import { getEvents } from "@/services/database/queries/events";
import { format } from "date-fns";
import { formatDateTime } from "@/lib/utils";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }

  const { data: events } = await getEvents();
  const upcomingEvents = events
    .filter((event) => event.status === "upcoming")
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className=" text-foreground">Good Afternoon</h1>
          <h3 className="font-semibold text-sm text-muted-foreground">
            {data.user.user_metadata.first_name}{" "}
            {data.user.user_metadata.last_name}
          </h3>
        </div>
        <div className="flex gap-2 items-center">
          <Button size={"icon"}>
            <Bell />
          </Button>
        </div>
      </header>
      <section className="py-2">
        <div className="mb-4">
          <h2 className="text-base mb-1 font-semibold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-primary/80 border-none">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Link href={"/journals/"}>
                <h3 className="font-medium">Journal Entry</h3>
                <p className="text-xs text-foreground/80 mb-2">
                  Track your mood
                </p>
              </Link>
            </CardContent>
          </Card>
          <Card className="border-none bg-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Link href={"/events/"}>
                <h3 className="font-medium">Events</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Join activities
                </p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <TestimonialCard />
      <PageSection
        title="Because you are happy"
        description="Articles based on your mood today."
      />
      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-sm font-medium">Crisis Support Available</h1>
          <p className="text-sm text-muted-foreground">
            If you're experiencing a mental health emergency, immediate support
            is available.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button size={"lg"} asChild>
            <a href="tel:+1234567890">Call</a>
          </Button>

          <Button size={"lg"} asChild>
            <a href="mailto:support@example.com">Email</a>
          </Button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/events">View all</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => {
            const { date, time } = formatDateTime(event.createdAt);
            return (
              <Card key={index} className="bg-border">
                <CardContent className="p-4">
                  <div className="flex flex-col items-start">
                    <div className="flex-1">
                      <h1 className="text-muted-foreground text-sm mb-2">
                        Thursday 22 April
                      </h1>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        {date} • {event.location}
                      </p>
                      <div className="flex items-center text-xs">
                        <Award className="h-3 w-3 mr-1 text-primary" />
                        <span>{event.points} points</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
