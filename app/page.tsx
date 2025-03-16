import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TestimonialCard from "./_components/qoute";
import PageSection from "./_components/articles-grid";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const moods = [
    { label: "Happy", color: "bg-pink-300/30" },
    { label: "Calm", color: "bg-purple-300/30" },
    { label: "Manic", color: "bg-cyan-300/30" },
    { label: "Angry", color: "bg-orange-300/30" },
    { label: "Angry", color: "bg-orange-300/30" },
  ];
  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className=" text-foreground">Good Afternoon</h1>
          <h3 className="font-semibold text-sm text-muted-foreground">
            Saira Brown
          </h3>
        </div>
        <div className="flex gap-2 items-center">
          <Button size={"icon"}>
            <Bell />
          </Button>
        </div>
      </header>
      <Card className="border-none bg-transparent shadow-none mb-0">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="font-normal text-sm">
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-5 gap-2 items-center place-items-center">
          {moods.map((mood, index) => (
            <span className="text-center" key={`${mood}${index}`}>
              <button
                key={index}
                className={`bg-primary w-14 h-14 rounded-lg flex mb-1 items-center justify-center `}
                aria-label={`Select mood: ${mood.label}`}
              />
              <span className="text-sm">{mood.label}</span>
            </span>
          ))}
        </CardContent>
      </Card>
      <TestimonialCard />
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-sm font-medium">Crisis Support Available</h1>
          <p className="text-xs text-muted-foreground">
            If you're experiencing a mental health emergency, immediate support
            is available.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button size={"lg"}>Call</Button>
          <Button size={"lg"}>Email</Button>
        </div>{" "}
      </section>
      <PageSection
        title="Because you are happy"
        description="Articles based on your mood today."
      />
    </div>
  );
}
