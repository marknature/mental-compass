"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format, subDays } from "date-fns";
import {
  Save,
  Smile,
  Meh,
  Frown,
  Moon,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Heart,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Mood = "good" | "happy" | "calm" | "sad" | "angry";
export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mood, setMood] = useState<string | undefined>();
  const [sleep, setSleep] = useState<string | undefined>();
  const [stress, setStress] = useState<string | undefined>();
  const [journalEntry, setJournalEntry] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const moods: { type: Mood; label: string; color: string }[] = [
    {
      type: "happy",
      label: "Happy",
      color: "bg-pink-200 hover:bg-pink-300",
    },
    {
      type: "good",
      label: "Good",
      color: "bg-yellow-200 hover:bg-yellow-300",
    },
    {
      type: "calm",
      label: "Calm",
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

  // Mock data for mood history
  const moodHistory = [
    { date: subDays(new Date(), 6), mood: "great" },
    { date: subDays(new Date(), 5), mood: "great" },
    { date: subDays(new Date(), 4), mood: "okay" },
    { date: subDays(new Date(), 3), mood: "bad" },
    { date: subDays(new Date(), 2), mood: "okay" },
    { date: subDays(new Date(), 1), mood: "great" },
    { date: new Date(), mood: mood || "unset" },
  ];

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log({ date, mood, sleep, stress, journalEntry });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getMoodRecommendation = () => {
    if (!mood) return null;

    const recommendations = {
      great: {
        title: "Maintain Your Positive Energy",
        text: "Great to hear you're feeling good! Consider journaling about what contributed to your positive mood today.",
        icon: <Smile className="h-5 w-5 text-green-500" />,
      },
      okay: {
        title: "Boost Your Mood",
        text: "Try a 10-minute walk outside or call a friend. Small actions can help improve your mood.",
        icon: <Meh className="h-5 w-5 text-yellow-500" />,
      },
      bad: {
        title: "Be Kind to Yourself",
        text: "It's okay to have difficult days. Consider a relaxing activity or reach out to someone you trust.",
        icon: <Frown className="h-5 w-5 text-red-500" />,
      },
    };

    return recommendations[mood as keyof typeof recommendations];
  };

  const getMoodColor = (moodValue: string) => {
    switch (moodValue) {
      case "great":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case "okay":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
      case "bad":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getMoodIcon = (moodValue: string) => {
    switch (moodValue) {
      case "great":
        return <Smile className="h-5 w-5" />;
      case "okay":
        return <Meh className="h-5 w-5" />;
      case "bad":
        return <Frown className="h-5 w-5" />;
      default:
        return <Meh className="h-5 w-5 opacity-30" />;
    }
  };

  const recommendation = getMoodRecommendation();

  return (
    <div className="pb-6">
      <h1 className="text-2xl mb-2 text-foreground">
        Events
        <p className="text-sm text-muted-foreground">
          View events and challenges
        </p>
      </h1>

      {/* Streak Card */}
      <Card className="border-none">
        <CardContent className="p-4 ">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">Your Streak</h3>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full rounded-md  flex items-center justify-center bg-primary text-xs"
              >
                ✓
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="today" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2 rounded">
            <TabsTrigger value="today" className="rounded">
              Today
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded">
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="today" className="p-4 px-0 space-y-6">
          {/* Quick Mood Selector */}
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
                  ></button>
                  <span className="text-sm">{mood.label}</span>
                </span>
              ))}
            </CardContent>
          </Card>

          {/* Mood-based Recommendation */}
          {recommendation && (
            <Card
              className={cn(
                "border",
                mood === "great"
                  ? "border-green-200 dark:border-green-800"
                  : mood === "okay"
                    ? "border-yellow-200 dark:border-yellow-800"
                    : "border-red-200 dark:border-red-800",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn("p-2 rounded-full", getMoodColor(mood || ""))}
                  >
                    {recommendation.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">
                      {recommendation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {recommendation.text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wellness Metrics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Track Your Wellness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Label className="text-sm">Sleep Quality</Label>
                <RadioGroup
                  value={sleep}
                  onValueChange={setSleep}
                  className="flex justify-between"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="well"
                      id="sleep-well"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="sleep-well"
                      className="cursor-pointer flex flex-col items-center space-y-1"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          sleep === "well"
                            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                            : "",
                        )}
                      >
                        <Moon className="h-6 w-6" />
                      </div>
                      <span className="text-xs">Well</span>
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="okay"
                      id="sleep-okay"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="sleep-okay"
                      className="cursor-pointer flex flex-col items-center space-y-1"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          sleep === "okay"
                            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                            : "",
                        )}
                      >
                        <Moon className="h-6 w-6" />
                      </div>
                      <span className="text-xs">Okay</span>
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="poor"
                      id="sleep-poor"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="sleep-poor"
                      className="cursor-pointer flex flex-col items-center space-y-1"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          sleep === "poor"
                            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                            : "",
                        )}
                      >
                        <Moon className="h-6 w-6" />
                      </div>
                      <span className="text-xs">Poor</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Stress Level</Label>
                <RadioGroup
                  value={stress}
                  onValueChange={setStress}
                  className="flex justify-between"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="low"
                      id="stress-low"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="stress-low"
                      className="cursor-pointer flex flex-col items-center space-y-1"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          stress === "low"
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : "",
                        )}
                      >
                        <Activity className="h-6 w-6" />
                      </div>
                      <span className="text-xs">Low</span>
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="medium"
                      id="stress-medium"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="stress-medium"
                      className="cursor-pointer flex flex-col items-center space-y-1"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          stress === "medium"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                            : "",
                        )}
                      >
                        <Activity className="h-6 w-6" />
                      </div>
                      <span className="text-xs">Medium</span>
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="high"
                      id="stress-high"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="stress-high"
                      className="cursor-pointer flex flex-col items-center space-y-1"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          stress === "high"
                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            : "",
                        )}
                      >
                        <Activity className="h-6 w-6" />
                      </div>
                      <span className="text-xs">High</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Journal Entry */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Textarea
                placeholder="Write about your day, feelings, or anything on your mind..."
                className="min-h-[120px] resize-none"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />

              <div className="mt-4 bg-muted rounded-md p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium">Writing Prompt</h4>
                    <p className="text-xs text-muted-foreground">
                      {mood === "great"
                        ? "What made today special? List three positive moments."
                        : mood === "okay"
                          ? "What's one thing that could have made today better?"
                          : mood === "bad"
                            ? "What's one small thing you can do to care for yourself right now?"
                            : "What are you grateful for today?"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {isSaved ? "Saved!" : "Save Entry"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="p-4 space-y-6">
          {/* Mood Trends */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your Mood Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-sm font-medium">Last 7 Days</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-1 mt-4">
                {moodHistory.map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        getMoodColor(day.mood),
                      )}
                    >
                      {getMoodIcon(day.mood)}
                    </div>
                    <span className="text-xs mt-1">
                      {format(day.date, "EEE")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(day.date, "d")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">Great: 3</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">Okay: 2</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">Bad: 1</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Past Entries */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Past Entries</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {moodHistory.slice(0, 5).map((day, i) => (
                <div key={i} className="flex items-start p-3 border rounded-md">
                  <div
                    className={cn(
                      "p-2 rounded-full mr-3",
                      getMoodColor(day.mood),
                    )}
                  >
                    {getMoodIcon(day.mood)}
                  </div>
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">
                        {day.mood === "great"
                          ? "Had a great day!"
                          : day.mood === "okay"
                            ? "Feeling okay"
                            : day.mood === "bad"
                              ? "Tough day"
                              : "No entry"}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {format(day.date, "MMM d")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {day.mood === "great"
                        ? "Sleep: Well • Stress: Low"
                        : day.mood === "okay"
                          ? "Sleep: Okay • Stress: Medium"
                          : day.mood === "bad"
                            ? "Sleep: Poor • Stress: High"
                            : "No details recorded"}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full text-xs">
                View All Entries
              </Button>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">
                      Your best days are after good sleep
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      We noticed you report better moods on days following 7+
                      hours of sleep.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">
                      Stress levels improving
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Your reported stress levels have decreased by 20% in the
                      past month.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
