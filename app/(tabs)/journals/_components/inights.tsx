"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, getCorrelationInsights } from "@/lib/utils";
import { format, subDays } from "date-fns";
import {
  Lightbulb,
  Dumbbell,
  Moon,
  Users,
  SearchSlash,
  TrendingUp,
  Activity,
  BookOpen,
  Brain,
  CloudIcon,
  Coffee,
  Music,
} from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  insights: ReturnType<typeof getCorrelationInsights>;
};

interface MoodInsight {
  id: string;
  type: "activity" | "sleep" | "weather" | "social";
  factor: string;
  impact: number; // -1 to 1, negative to positive
  confidence: number; // 0-1
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "exercise" | "sleep" | "social" | "mindfulness" | "other";
  priority: number; // 1-5
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface JournalEntry {
  id: string;
  date: string;
  moodScore: number;
  sleepHours: number | null;
  energyLevel: number | null;
  activities: string[];
}

interface WeeklyStats {
  avgMood: number;
  avgSleep: number;
  avgEnergy: number;
  mostFrequentActivity: string;
  moodVariance: number;
}

export default function Insights({}: Props) {
  const [insights, setInsights] = useState<MoodInsight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be actual API calls
        // const insightsResponse = await fetch('/api/insights')
        // const journalResponse = await fetch('/api/journal?startDate=...')
        // const statsResponse = await fetch('/api/stats')

        // For demo purposes, use mock data
        setInsights(mockInsights);
        setRecommendations(mockRecommendations);
        setJournalEntries(mockJournalEntries);
        setWeeklyStats(mockWeeklyStats);
      } catch (error) {
        console.error("Error fetching insights data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  // Mark recommendation as completed
  const completeRecommendation = (id: string) => {
    setRecommendations(
      recommendations.map((rec) =>
        rec.id === id ? { ...rec, completed: true } : rec,
      ),
    );
    // In a real app, this would call an API to update the database
  };

  // Calculate mood trend (improving, stable, declining)
  const calculateMoodTrend = (): "improving" | "stable" | "declining" => {
    if (journalEntries.length < 5) return "stable";

    const recentEntries = journalEntries.slice(0, 5);
    const olderEntries = journalEntries.slice(5, 10);

    if (recentEntries.length === 0 || olderEntries.length === 0)
      return "stable";

    const recentAvg =
      recentEntries.reduce((sum, entry) => sum + entry.moodScore, 0) /
      recentEntries.length;
    const olderAvg =
      olderEntries.reduce((sum, entry) => sum + entry.moodScore, 0) /
      olderEntries.length;

    const difference = recentAvg - olderAvg;

    if (difference > 0.5) return "improving";
    if (difference < -0.5) return "declining";
    return "stable";
  };

  const moodTrend = calculateMoodTrend();

  // Get color for mood trend
  const getMoodTrendColor = () => {
    if (moodTrend === "improving") return "text-green-600 dark:text-green-400";
    if (moodTrend === "declining") return "text-red-600 dark:text-red-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  // Get icon for mood trend
  const getMoodTrendIcon = () => {
    if (moodTrend === "improving") return <TrendingUp className="h-4 w-4" />;
    if (moodTrend === "declining")
      return <TrendingUp className="h-4 w-4 rotate-180" />;
    return <Activity className="h-4 w-4" />;
  };

  // Format mood data for chart
  const moodChartData = journalEntries
    .map((entry) => ({
      date: format(new Date(entry.date), "MMM d"),
      mood: entry.moodScore,
      sleep: entry.sleepHours || 0,
      energy: entry.energyLevel || 0,
    }))
    .reverse();

  // Get activity frequency data
  const getActivityFrequencyData = () => {
    const activityCount: Record<string, number> = {};

    journalEntries.forEach((entry) => {
      entry.activities.forEach((activity) => {
        activityCount[activity] = (activityCount[activity] || 0) + 1;
      });
    });

    return Object.entries(activityCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const activityFrequencyData = getActivityFrequencyData();

  // Get mood by activity data
  const getMoodByActivityData = () => {
    const activityMoods: Record<string, number[]> = {};

    journalEntries.forEach((entry) => {
      entry.activities.forEach((activity) => {
        if (!activityMoods[activity]) activityMoods[activity] = [];
        activityMoods[activity].push(entry.moodScore);
      });
    });

    return Object.entries(activityMoods)
      .map(([name, moods]) => ({
        name,
        avgMood: moods.reduce((sum, mood) => sum + mood, 0) / moods.length,
        count: moods.length,
      }))
      .filter((item) => item.count >= 3) // Only include activities with enough data
      .sort((a, b) => b.avgMood - a.avgMood);
  };

  const moodByActivityData = getMoodByActivityData();

  // Get sleep vs mood correlation
  const getSleepMoodCorrelation = () => {
    const sleepMoodData: Record<number, number[]> = {};

    journalEntries.forEach((entry) => {
      if (entry.sleepHours === null) return;

      const roundedSleep = Math.round(entry.sleepHours);
      if (!sleepMoodData[roundedSleep]) sleepMoodData[roundedSleep] = [];
      sleepMoodData[roundedSleep].push(entry.moodScore);
    });

    return Object.entries(sleepMoodData)
      .map(([hours, moods]) => ({
        hours: Number.parseInt(hours),
        avgMood: moods.reduce((sum, mood) => sum + mood, 0) / moods.length,
        count: moods.length,
      }))
      .filter((item) => item.count >= 2) // Only include sleep hours with enough data
      .sort((a, b) => a.hours - b.hours);
  };

  const sleepMoodCorrelation = getSleepMoodCorrelation();

  // Get activity icon
  const getActivityIcon = (activity: string) => {
    const iconMap: Record<string, JSX.Element> = {
      exercise: <Dumbbell className="h-4 w-4" />,
      meditation: <Brain className="h-4 w-4" />,
      social: <Users className="h-4 w-4" />,
      reading: <BookOpen className="h-4 w-4" />,
      music: <Music className="h-4 w-4" />,
      sleep: <Moon className="h-4 w-4" />,
      caffeine: <Coffee className="h-4 w-4" />,
    };

    return iconMap[activity] || <Activity className="h-4 w-4" />;
  };

  // Get recommendation icon
  const getRecommendationIcon = (type: string) => {
    const iconMap: Record<string, JSX.Element> = {
      exercise: <Dumbbell className="h-5 w-5" />,
      sleep: <Moon className="h-5 w-5" />,
      social: <Users className="h-5 w-5" />,
      mindfulness: <Brain className="h-5 w-5" />,
    };

    return iconMap[type] || <Lightbulb className="h-5 w-5" />;
  };

  // Get recommendation color
  const getRecommendationColor = (type: string) => {
    const colorMap: Record<string, string> = {
      exercise:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      sleep: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      social:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      mindfulness:
        "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
    };

    return (
      colorMap[type] ||
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
    );
  };

  // Get insight icon
  const getInsightIcon = (type: string, factor: string) => {
    if (type === "activity") return getActivityIcon(factor);
    if (type === "sleep") return <Moon className="h-4 w-4" />;
    if (type === "social") return <Users className="h-4 w-4" />;
    if (type === "weather") return <CloudIcon className="h-4 w-4" />;

    return <Lightbulb className="h-4 w-4" />;
  };

  // Get insight color
  const getInsightColor = (impact: number) => {
    if (impact > 0.5)
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    if (impact > 0.2)
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300";
    if (impact > -0.2)
      return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300";
    if (impact > -0.5)
      return "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300";
    return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
  };

  // Get mood color
  const getMoodColor = (score: number) => {
    if (score >= 8) return "#22c55e"; // green-500
    if (score >= 6) return "#10b981"; // emerald-500
    if (score >= 4) return "#eab308"; // yellow-500
    if (score >= 2) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  if (!insights.length) {
    return (
      <div className="space-y-5 pt-20 flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
        <SearchSlash size={"35"} />
        <p>Create some entries inorder to get insights</p>
      </div>
    );
  }

  return (
    <>
      {/* Mood Factors */}

      <Card className="bg-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Wellness Summary</CardTitle>
          <CardDescription>An overview of your mental wellness</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Mood Trend
              </h3>
              <div className={`flex items-center mt-1 ${getMoodTrendColor()}`}>
                {getMoodTrendIcon()}
                <span className="ml-1 text-sm capitalize">{moodTrend}</span>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-medium text-muted-foreground">
                Average Mood
              </h3>
              <span className="text-xl font-semibold">
                {weeklyStats?.avgMood.toFixed(1)}/10
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Mood Consistency</span>
                <span className="text-muted-foreground">
                  {weeklyStats?.moodVariance < 2
                    ? "Excellent"
                    : weeklyStats?.moodVariance < 3
                      ? "Good"
                      : weeklyStats?.moodVariance < 4
                        ? "Fair"
                        : "Needs Improvement"}
                </span>
              </div>
              <Progress
                value={Math.max(0, 100 - (weeklyStats?.moodVariance || 0) * 20)}
                className="h-3"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Sleep Quality</span>
                <span className="text-muted-foreground">
                  {weeklyStats?.avgSleep && weeklyStats.avgSleep >= 7
                    ? "Good"
                    : weeklyStats?.avgSleep && weeklyStats.avgSleep >= 6
                      ? "Average"
                      : "Below Average"}
                </span>
              </div>
              <Progress
                value={((weeklyStats?.avgSleep || 0) / 9) * 100}
                className="h-3"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Energy Level</span>
                <span className="text-muted-foreground">
                  {weeklyStats?.avgEnergy && weeklyStats.avgEnergy >= 7
                    ? "High"
                    : weeklyStats?.avgEnergy && weeklyStats.avgEnergy >= 5
                      ? "Moderate"
                      : "Low"}
                </span>
              </div>
              <Progress
                value={((weeklyStats?.avgEnergy || 0) / 10) * 100}
                className="h-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-none">
        <CardHeader className="pb-2 px-0 pt-0">
          <CardTitle className="text-base">
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Smart suggestions based on your habits and mood patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3 px-0">
          <div className="flex items-start p-3 bg-border rounded-md">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300 mr-3">
              <Dumbbell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Morning Exercise</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your patterns, morning exercise significantly improves
                your mood for the rest of the day.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto mt-1 text-xs text-indigo-600"
              >
                Try a 7-day challenge
              </Button>
            </div>
          </div>

          <div className="flex items-start p-3 bg-border rounded-md">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300 mr-3">
              <Moon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Sleep Consistency</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your data shows that consistent sleep times (even on weekends)
                lead to better mood and energy levels.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto mt-1 text-xs text-indigo-600"
              >
                View sleep tips
              </Button>
            </div>
          </div>

          <div className="flex items-start p-3 bg-border rounded-md">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300 mr-3">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Social Connection</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your mood improves after social activities. Consider scheduling
                regular social time, even brief interactions.
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

      <Card className="border-none shadow-none">
        <CardHeader className="pb-2 px-0 pt-0">
          <CardTitle className="text-base">What Affects Your Mood</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="space-y-5">
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
                <span className="text-sm text-muted-foreground">Positive</span>
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
                  Consider scheduling regular physical activity to maintain good
                  mental health.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Mock data for development
const mockInsights: MoodInsight[] = [
  {
    id: "1",
    type: "activity",
    factor: "exercise",
    impact: 0.8,
    confidence: 0.9,
    description: "Your mood is typically 80% better on days with exercise",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "2",
    type: "sleep",
    factor: "sleep_duration",
    impact: 0.6,
    confidence: 0.85,
    description: "You report higher mood scores when you sleep 7 or more hours",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "3",
    type: "activity",
    factor: "social",
    impact: 0.5,
    confidence: 0.75,
    description:
      "Your mood is typically 50% better on days with social activities",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "4",
    type: "activity",
    factor: "caffeine",
    impact: -0.3,
    confidence: 0.65,
    description:
      "Your mood is typically 30% lower on days with high caffeine consumption",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "5",
    type: "weather",
    factor: "sunny",
    impact: 0.4,
    confidence: 0.7,
    description: "Your mood tends to be better on sunny days",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
];

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Morning Exercise Routine",
    description:
      "Based on your data, morning exercise significantly improves your mood for the rest of the day. Try a 15-minute workout before breakfast.",
    type: "exercise",
    priority: 5,
    completed: false,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Consistent Sleep Schedule",
    description:
      "Your data shows that consistent sleep times lead to better mood and energy levels. Try to go to bed and wake up at the same time each day.",
    type: "sleep",
    priority: 4,
    completed: false,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Social Connection Time",
    description:
      "Your mood improves after social activities. Schedule at least one social interaction each day, even if it's just a brief conversation.",
    type: "social",
    priority: 3,
    completed: false,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "4",
    title: "Mindfulness Practice",
    description:
      "Try a 5-minute mindfulness meditation each day to improve focus and reduce stress.",
    type: "mindfulness",
    priority: 2,
    completed: true,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-10T00:00:00Z",
  },
  {
    id: "5",
    title: "Reduce Caffeine After Noon",
    description:
      "Your data suggests caffeine in the afternoon may affect your sleep quality. Try limiting caffeine to mornings only.",
    type: "other",
    priority: 3,
    completed: true,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-05T00:00:00Z",
  },
];

const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    date: subDays(new Date(), 0).toISOString(),
    moodScore: 8,
    sleepHours: 7.5,
    energyLevel: 7,
    activities: ["exercise", "meditation", "social"],
  },
  {
    id: "2",
    date: subDays(new Date(), 1).toISOString(),
    moodScore: 7,
    sleepHours: 7,
    energyLevel: 6,
    activities: ["reading", "social"],
  },
  {
    id: "3",
    date: subDays(new Date(), 2).toISOString(),
    moodScore: 6,
    sleepHours: 6.5,
    energyLevel: 5,
    activities: ["caffeine", "work"],
  },
  {
    id: "4",
    date: subDays(new Date(), 3).toISOString(),
    moodScore: 9,
    sleepHours: 8,
    energyLevel: 8,
    activities: ["exercise", "meditation", "social"],
  },
  {
    id: "5",
    date: subDays(new Date(), 4).toISOString(),
    moodScore: 5,
    sleepHours: 5.5,
    energyLevel: 4,
    activities: ["caffeine", "work"],
  },
  {
    id: "6",
    date: subDays(new Date(), 5).toISOString(),
    moodScore: 7,
    sleepHours: 7,
    energyLevel: 6,
    activities: ["reading", "music"],
  },
  {
    id: "7",
    date: subDays(new Date(), 6).toISOString(),
    moodScore: 8,
    sleepHours: 7.5,
    energyLevel: 7,
    activities: ["exercise", "social"],
  },
  {
    id: "8",
    date: subDays(new Date(), 7).toISOString(),
    moodScore: 6,
    sleepHours: 6,
    energyLevel: 5,
    activities: ["caffeine", "work"],
  },
  {
    id: "9",
    date: subDays(new Date(), 8).toISOString(),
    moodScore: 7,
    sleepHours: 7,
    energyLevel: 6,
    activities: ["reading", "music"],
  },
  {
    id: "10",
    date: subDays(new Date(), 9).toISOString(),
    moodScore: 8,
    sleepHours: 8,
    energyLevel: 7,
    activities: ["exercise", "meditation"],
  },
  {
    id: "11",
    date: subDays(new Date(), 10).toISOString(),
    moodScore: 9,
    sleepHours: 8,
    energyLevel: 8,
    activities: ["exercise", "social", "meditation"],
  },
  {
    id: "12",
    date: subDays(new Date(), 11).toISOString(),
    moodScore: 7,
    sleepHours: 7,
    energyLevel: 6,
    activities: ["reading", "music"],
  },
  {
    id: "13",
    date: subDays(new Date(), 12).toISOString(),
    moodScore: 6,
    sleepHours: 6,
    energyLevel: 5,
    activities: ["caffeine", "work"],
  },
  {
    id: "14",
    date: subDays(new Date(), 13).toISOString(),
    moodScore: 8,
    sleepHours: 7.5,
    energyLevel: 7,
    activities: ["exercise", "social"],
  },
];

const mockWeeklyStats: WeeklyStats = {
  avgMood: 7.2,
  avgSleep: 7.1,
  avgEnergy: 6.3,
  mostFrequentActivity: "exercise",
  moodVariance: 1.8,
};
