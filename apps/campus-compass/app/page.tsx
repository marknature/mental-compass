import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TestimonialCard from "./_components/qoute";
import PageSection from "./_components/articles-grid";
import { Bell, Bolt, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mood = "good" | "happy" | "jolly" | "sad" | "angry";
export default function Home() {
  const moods: { type: Mood; label: string; color: string }[] = [
    {
      type: "good",
      label: "Good",
      color: "bg-yellow-200 hover:bg-yellow-300",
    },
    {
      type: "happy",
      label: "Happy",
      color: "bg-pink-200 hover:bg-pink-300",
    },
    {
      type: "jolly",
      label: "Jolly",
      color: "bg-blue-300 hover:bg-blue-400",
    },
    {
      type: "sad",
      label: "Sad",
      color: "bg-blue-200 hover:bg-blue-300",
    },
    {
      type: "angry",
      label: "Angry",
      color: "bg-red-300 hover:bg-red-400",
    },
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
              >
                {/* <FaceSvg mood={mood.type} /> */}
              </button>
              <span className="text-sm">{mood.label}</span>
            </span>
          ))}
        </CardContent>
      </Card>
      <TestimonialCard />
      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-sm font-medium">Crisis Support Available</h1>
          <p className="text-sm text-muted-foreground">
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

function FaceSvg({ mood }: { mood: Mood }) {
  switch (mood) {
    case "good":
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <circle cx="30" cy="40" r="5" fill="black" />
          <circle cx="70" cy="40" r="5" fill="black" />
          <path
            d="M 30 65 Q 50 80 70 65"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "happy":
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <line
            x1="30"
            y1="40"
            x2="40"
            y2="40"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="40"
            x2="70"
            y2="40"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 30 65 Q 50 75 70 65"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "jolly":
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <circle cx="30" cy="40" r="5" fill="black" />
          <circle cx="70" cy="40" r="5" fill="black" />
          <path
            d="M 30 65 C 30 80 70 80 70 65"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "sad":
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <circle cx="30" cy="40" r="5" fill="black" />
          <circle cx="70" cy="40" r="5" fill="black" />
          <path
            d="M 30 75 Q 50 60 70 75"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "angry":
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <line
            x1="25"
            y1="35"
            x2="40"
            y2="45"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="45"
            x2="75"
            y2="35"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 30 70 L 40 75 L 50 70 L 60 75 L 70 70"
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
