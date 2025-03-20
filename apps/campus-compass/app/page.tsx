import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Bell } from "lucide-react";
import PageSection from "./_components/articles-grid";
import TestimonialCard from "./_components/qoute";
import Link from "next/link";

const queryUserData = async () => {
  const response = await fetch("http://localhost:5000/api/users/1");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export default async function Home() {
  const data = await queryUserData();
  const upcomingEvents = [
    {
      title: "Mindfulness Meditation",
      month: "Jun",
      day: "15",
      time: "2:00 PM",
      location: "Student Center",
      points: 50,
    },
    {
      title: "Stress Management Workshop",
      month: "Jun",
      day: "20",
      time: "3:30 PM",
      location: "Health Center",
      points: 75,
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className=" text-foreground">Good Afternoon</h1>
          <h3 className="font-semibold text-sm text-muted-foreground">
            {data.firstName} {data.lastName}
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
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="bg-border">
              <CardContent className="p-4">
                <div className="flex flex-col items-start">
                  <div className="flex-1">
                    <h1 className="text-muted-foreground text-sm mb-2">
                      Thursday 22 April
                    </h1>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {event.time} • {event.location}
                    </p>
                    <div className="flex items-center text-xs">
                      <Award className="h-3 w-3 mr-1 text-primary" />
                      <span>{event.points} points</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
