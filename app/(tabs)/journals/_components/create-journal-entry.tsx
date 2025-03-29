"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn, getMoodColor, getMoodText } from "@/lib/utils";
import {
  Frown,
  Meh,
  Smile,
  Lightbulb,
  Save,
  BookIcon,
  Coffee,
  Dumbbell,
  Moon,
  Music,
  Sun,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateJournalEntry() {
  const [selectedDate, setDate] = useState<Date | undefined>(new Date());
  const [moodScore, setMoodScore] = useState<number>(5);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [journalEntry, setJournalEntry] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [activities, setActivities] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState("");
  const [challenge, setChallenge] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  const getMoodRecommendation = () => {
    if (moodScore >= 8) {
      return {
        title: "Maintain Your Positive Energy",
        text: "You're feeling great! Consider journaling about what contributed to your positive mood today.",
        icon: <Smile className="h-5 w-5 text-green-500" />,
      };
    } else if (moodScore >= 6) {
      return {
        title: "You're Doing Well",
        text: "Your mood is good. What activities helped you feel this way?",
        icon: <Smile className="h-5 w-5 text-emerald-500" />,
      };
    } else if (moodScore >= 4) {
      return {
        title: "Boost Your Mood",
        text: "Try a 10-minute walk outside or call a friend. Small actions can help improve your mood.",
        icon: <Meh className="h-5 w-5 text-yellow-500" />,
      };
    } else {
      return {
        title: "Be Kind to Yourself",
        text: "It's okay to have difficult days. Consider a relaxing activity or reach out to someone you trust.",
        icon: <Frown className="h-5 w-5 text-red-500" />,
      };
    }
  };

  const nextPrompt = () => {
    setPromptIndex((promptIndex + 1) % journalPrompts.length);
  };

  const recommendation = getMoodRecommendation();

  const handleSave = async () => {
    const journalData = {
      selectedDate,
      moodScore,
      sleepHours,
      energyLevel,
      activities,
      gratitude,
      challenge,
      journalEntry,
    };

    try {
      const response = await fetch("http://localhost:3000/api/journals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(journalData),
      });

      if (!response.ok) {
        toast.error("Failed to save journal entry");
        throw new Error("Failed to save journal entry");
      }

      setIsSaved(true);
      toast.success("Saved journal entry");
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };
  return (
    <>
      <Card className="bg-border border-none ">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            How are you feeling today?
          </CardTitle>
          <CardDescription>
            Track your mood, sleep and actities today
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Low</span>
                <span className="text-sm font-medium">
                  {getMoodText(moodScore)} ({moodScore})
                </span>
                <span className="text-sm text-muted-foreground">High</span>
              </div>
              <Slider
                value={[moodScore]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setMoodScore(value[0])}
                className="py-2"
              />
              <div className="flex justify-between mt-2">
                <div className={cn("p-2 rounded-full", getMoodColor(1))}>
                  <Frown className="h-5 w-5" />
                </div>
                <div className={cn("p-2 rounded-full", getMoodColor(5))}>
                  <Meh className="h-5 w-5" />
                </div>
                <div className={cn("p-2 rounded-full", getMoodColor(10))}>
                  <Smile className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities Tracking */}
      <Card className=" border-none bg-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">What did you do today?</CardTitle>
          <CardDescription>
            Reflect on your day! Select the activities you engaged in today.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-2">
            {activityOptions.map((activity) => (
              <div key={activity.id} className="text-center">
                <Button
                  type="button"
                  variant={
                    activities.includes(activity.id) ? "default" : "outline"
                  }
                  className={cn(
                    "w-full h-auto py-2 px-1 flex flex-col items-center gap-1 border-none bg-primary/15 ",
                    activities.includes(activity.id) ? "bg-primary" : "",
                  )}
                  onClick={() => {
                    if (activities.includes(activity.id)) {
                      setActivities(
                        activities.filter((a) => a !== activity.id),
                      );
                    } else {
                      setActivities([...activities, activity.id]);
                    }
                  }}
                >
                  {activity.icon}
                  <span className="text-xs">{activity.label}</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Metrics */}
      <Card className="boder-none bg-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Track Your Wellness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm">Sleep Hours</Label>
              <span className="text-sm font-medium">{sleepHours} hours</span>
            </div>
            <Slider
              value={[sleepHours]}
              min={0}
              max={12}
              step={0.5}
              onValueChange={(value) => setSleepHours(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm">Energy Level</Label>
              <span className="text-sm font-medium">{energyLevel}/10</span>
            </div>
            <Slider
              value={[energyLevel]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setEnergyLevel(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guided Journaling */}
      <Card className="border-none">
        <CardHeader className="pb-2 px-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Journal Entry</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPrompt}
              className="h-8 text-xs"
            >
              New Prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4 px-0">
          <div className="bg-muted rounded-md p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <h4 className="text-xs font-medium">Writing Prompt</h4>
                <p className="text-xs text-muted-foreground">
                  {journalPrompts[promptIndex]}
                </p>
              </div>
            </div>
          </div>

          <Textarea
            placeholder="Write about your day, feelings, or anything on your mind..."
            className="min-h-[100px] resize-none text-sm"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />

          <div className="space-y-3">
            <div>
              <Label className="text-sm">
                What are you grateful for today?
              </Label>
              <Textarea
                placeholder="List one or more things you're grateful for..."
                className="min-h-[60px] resize-none mt-1 text-sm"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm">
                What's challenging you right now?
              </Label>
              <Textarea
                placeholder="Describe a challenge you're facing..."
                className="min-h-[60px] resize-none mt-1 text-sm"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <Button
            onClick={handleSave}
            className="w-full relative overflow-hidden"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaved ? "Saved! +10 points" : "Save Entry"}
          </Button>
        </CardFooter>
      </Card>

      {/* Mood-based Recommendation */}
      {recommendation && (
        <Card className={cn("border-none bg-border", getMoodColor(moodScore))}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={cn("p-2 rounded-full", getMoodColor(moodScore))}>
                {recommendation.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm">{recommendation.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {recommendation.text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

const journalPrompts = [
  "What made you smile today?",
  "What's something you're looking forward to?",
  "What's a challenge you're facing right now?",
  "What's something you're grateful for today?",
  "What's something you learned recently?",
  "What's a goal you're working towards?",
  "What's something that brought you peace today?",
  "What's a small win you had recently?",
];

const activityOptions = [
  {
    id: "exercise",
    label: "Exercise",
    icon: <Dumbbell className="h-4 w-4" />,
  },
  {
    id: "meditation",
    label: "Meditation",
    icon: <Moon className="h-4 w-4" />,
  },
  { id: "social", label: "Social Time", icon: <Users className="h-4 w-4" /> },
  { id: "reading", label: "Reading", icon: <BookIcon className="h-4 w-4" /> },
  { id: "music", label: "Music", icon: <Music className="h-4 w-4" /> },
  { id: "work", label: "Productive", icon: <Zap className="h-4 w-4" /> },
  { id: "outdoors", label: "Outdoors", icon: <Sun className="h-4 w-4" /> },
  { id: "caffeine", label: "Caffeine", icon: <Coffee className="h-4 w-4" /> },
  { id: "meal", label: "Good Meal", icon: <Utensils className="h-4 w-4" /> },
];
