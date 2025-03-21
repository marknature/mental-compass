"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format, isSameDay, subDays } from "date-fns";
import {
  Save,
  Smile,
  Meh,
  Frown,
  Moon,
  Lightbulb,
  Activity,
  BookIcon,
  Calendar,
  CloudRain,
  Coffee,
  Dumbbell,
  Music,
  Sun,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

type Mood = "good" | "happy" | "calm" | "sad" | "angry";
export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [moodScore, setMoodScore] = useState<number>(5);
  const [sleep, setSleep] = useState<string | undefined>();
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [stress, setStress] = useState<string | undefined>();
  const [journalEntry, setJournalEntry] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [activities, setActivities] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState("");
  const [challenge, setChallenge] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [journalStreak, setJournalStreak] = useState(7);
  const [showTip, setShowTip] = useState(false);

  // Mock data for mood history
  const moodHistory = [
    {
      date: new Date(subDays(new Date(), 6).getTime()),
      mood: 8,
      activities: ["exercise", "meditation"],
      sleep: 7,
      energy: 7,
    },
    {
      date: new Date(subDays(new Date(), 5).getTime()),
      mood: 7,
      activities: ["social", "reading"],
      sleep: 8,
      energy: 8,
    },
    {
      date: new Date(subDays(new Date(), 4).getTime()),
      mood: 5,
      activities: ["work"],
      sleep: 6,
      energy: 5,
    },
    {
      date: new Date(subDays(new Date(), 3).getTime()),
      mood: 3,
      activities: ["work"],
      sleep: 5,
      energy: 4,
    },
    {
      date: new Date(subDays(new Date(), 2).getTime()),
      mood: 6,
      activities: ["exercise", "social"],
      sleep: 7,
      energy: 6,
    },
    {
      date: new Date(subDays(new Date(), 1).getTime()),
      mood: 8,
      activities: ["meditation", "reading"],
      sleep: 8,
      energy: 7,
    },
  ];

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

  // Show random tips
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log({
      date,
      moodScore,
      sleep,
      sleepHours,
      energyLevel,
      stress,
      activities,
      gratitude,
      challenge,
      journalEntry,
    });
    setIsSaved(true);
    setShowConfetti(true);
    setTimeout(() => {
      setIsSaved(false);
      setShowConfetti(false);
    }, 3000);
  };

  const getMoodText = (score: number) => {
    if (score >= 8) return "Great";
    if (score >= 6) return "Good";
    if (score >= 4) return "Okay";
    if (score >= 2) return "Low";
    return "Very Low";
  };

  const getMoodColor = (score: number) => {
    if (score >= 8)
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    if (score >= 6)
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300";
    if (score >= 4)
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
    if (score >= 2)
      return "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300";
    return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
  };

  const getMoodIcon = (score: number) => {
    if (score >= 7) return <Smile className="h-5 w-5" />;
    if (score >= 4) return <Meh className="h-5 w-5" />;
    return <Frown className="h-5 w-5" />;
  };

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

  const getCorrelationInsights = () => {
    return [
      {
        title: "Exercise boosts your mood",
        text: "On days you exercise, your mood score is 30% higher on average.",
        icon: <Dumbbell className="h-4 w-4" />,
        color:
          "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      },
      {
        title: "Sleep affects your energy",
        text: "You report higher energy levels when you sleep more than 7 hours.",
        icon: <Moon className="h-4 w-4" />,
        color:
          "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
      },
      {
        title: "Social time improves mood",
        text: "Your mood is typically better on days with social activities.",
        icon: <Users className="h-4 w-4" />,
        color:
          "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      },
    ];
  };

  const recommendation = getMoodRecommendation();
  const insights = getCorrelationInsights();

  const nextPrompt = () => {
    setPromptIndex((promptIndex + 1) % journalPrompts.length);
  };

  const todaysMood = date
    ? moodHistory.find((day) => day.date && date && isSameDay(day.date, date))
    : null;

  return (
    <div className="pb-6">
      <h1 className="text-2xl mb-2 text-foreground">
        Events
        <p className="text-sm text-muted-foreground">
          View events and challenges
        </p>
      </h1>
      <Tabs defaultValue="today" className="w-full">
        <div className="pt-4">
          <TabsList className="grid w-full grid-cols-3 p-0 h-auto bg-background gap-1 mt-0">
            <TabsTrigger
              value="today"
              className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="today" className="p-4 px-0 space-y-4">
          {/* Interactive Mood Slider */}
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
                      {getMoodText(moodScore)} ({moodScore}/10)
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
              <CardTitle className="text-base">
                What did you do today?
              </CardTitle>
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
                        "w-full h-auto py-2 px-1 flex flex-col items-center gap-1 border-none ",
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
                  <span className="text-sm font-medium">
                    {sleepHours} hours
                  </span>
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
                {showConfetti && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="confetti-animation">🎉</div>
                  </div>
                )}
                <Save className="mr-2 h-4 w-4" />
                {isSaved ? "Saved! +10 points" : "Save Entry"}
              </Button>
            </CardFooter>
          </Card>

          {/* Mood-based Recommendation */}
          {recommendation && (
            <Card className={cn("border-none", getMoodColor(moodScore))}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn("p-2 rounded-full", getMoodColor(moodScore))}
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
        </TabsContent>

        <TabsContent value="insights" className="p-4 space-y-3">
          {/* Correlation Insights */}
          <Card className="border-none">
            <CardHeader className="pb-2 px-0 mb-3">
              <CardTitle className="text-base">
                Your Wellness Patterns
              </CardTitle>
              <CardDescription>
                See the patterns between your activities and overall wellness.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-0">
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-full", insight.color)}>
                      {insight.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{insight.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {insight.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mood Factors */}
          <Card className="border-none">
            <CardHeader className="pb-2 px-0">
              <CardTitle className="text-base">
                What Affects Your Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-0">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Exercise</span>
                    <span className="text-sm text-muted-foreground">
                      Strong positive
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Sleep Quality</span>
                    <span className="text-sm text-muted-foreground">
                      Positive
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Social Time</span>
                    <span className="text-sm text-muted-foreground">
                      Moderate positive
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Caffeine</span>
                    <span className="text-sm text-muted-foreground">
                      Slight negative
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-muted p-3 rounded-md">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium">Insight</h4>
                    <p className="text-xs text-muted-foreground">
                      Exercise has the strongest positive impact on your mood.
                      Consider scheduling regular physical activity to maintain
                      good mental health.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Mood Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your Mood Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[160px] flex items-end justify-between gap-1 mt-4 mb-2">
                {moodHistory.map((day, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "w-full rounded-t-sm",
                        getMoodColor(day.mood),
                      )}
                      style={{ height: `${(day.mood / 10) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">
                      {format(day.date, "EEE")}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-full rounded-t-sm",
                      getMoodColor(moodScore),
                    )}
                    style={{ height: `${(moodScore / 10) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-1">Today</span>
                </div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Last 7 Days</span>
                <span>Average Mood: 6.2/10</span>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-start p-3 border rounded-md">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300 mr-3">
                  <Dumbbell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Morning Exercise</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on your patterns, morning exercise significantly
                    improves your mood for the rest of the day.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-1 text-xs text-indigo-600"
                  >
                    Try a 7-day challenge
                  </Button>
                </div>
              </div>

              <div className="flex items-start p-3 border rounded-md">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
                  <Moon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Sleep Consistency</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your data shows that consistent sleep times (even on
                    weekends) lead to better mood and energy levels.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-1 text-xs text-indigo-600"
                  >
                    View sleep tips
                  </Button>
                </div>
              </div>

              <div className="flex items-start p-3 border rounded-md">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300 mr-3">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Social Connection</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your mood improves after social activities. Consider
                    scheduling regular social time, even brief interactions.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-1 text-xs text-indigo-600"
                  >
                    View campus events
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="p-4 space-y-6">
          {/* Calendar View */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your Journal Calendar</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  Day: ({ day, ...props }) => {
                    // Make sure day is a valid Date object
                    if (
                      !day ||
                      !(day instanceof Date) ||
                      isNaN(day.getTime())
                    ) {
                      return <button {...props}>{props.children}</button>;
                    }

                    // Find matching entry
                    const entry = moodHistory.find(
                      (d) => d.date && isSameDay(d.date, day),
                    );

                    return (
                      <button
                        {...props}
                        className={cn(
                          props.className,
                          entry && getMoodColor(entry.mood),
                          "relative",
                        )}
                      >
                        {props.children}
                        {entry && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                        )}
                      </button>
                    );
                  },
                }}
              />
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs">Great</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                  <span className="text-xs">Okay</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          {todaysMood && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {format(todaysMood.date, "MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "p-2 rounded-full",
                      getMoodColor(todaysMood.mood),
                    )}
                  >
                    {getMoodIcon(todaysMood.mood)}
                  </div>
                  <div>
                    <span className="font-medium">
                      Mood: {todaysMood.mood}/10
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({getMoodText(todaysMood.mood)})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-1 text-indigo-600" />
                    <span>Sleep: {todaysMood.sleep} hours</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-1 text-indigo-600" />
                    <span>Energy: {todaysMood.energy}/10</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Activities:</h3>
                  <div className="flex flex-wrap gap-1">
                    {todaysMood.activities.map((activity, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {activityOptions.find((a) => a.id === activity)
                          ?.label || activity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-2 mt-2">
                  <h3 className="text-sm font-medium mb-1">Journal Entry:</h3>
                  <p className="text-sm text-muted-foreground">
                    Today was a productive day. I managed to finish my
                    assignment ahead of schedule and had time to go for a run in
                    the evening. Feeling accomplished!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Past Entries */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Entries</CardTitle>
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
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">
                        {day.mood >= 7
                          ? "Had a great day!"
                          : day.mood >= 4
                            ? "Feeling okay"
                            : "Tough day"}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {format(day.date, "MMM d")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 my-1">
                      {day.activities.map((activity, j) => (
                        <Badge
                          key={j}
                          variant="outline"
                          className="text-[10px] px-1 h-4"
                        >
                          {activityOptions.find((a) => a.id === activity)
                            ?.label || activity}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sleep: {day.sleep}h • Energy: {day.energy}/10
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full text-xs">
                View All Entries
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>{" "}
    </div>
  );
}

function Cloud(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
