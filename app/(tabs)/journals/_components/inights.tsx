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
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {};

interface MoodInsight {
  id?: string;
  type: "activity" | "sleep" | "weather" | "social";
  factor: string;
  impact: number; // -1 to 1, negative to positive
  confidence: number; // 0-1
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ActivityImpact {
  factor: string;
  impact: number;
  confidence: number;
  impactLabel: string;
  percentageScore: number;
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

interface EventRecommendation {
  eventId: string;
  title: string;
  reasoning: string;
  relevanceScore: number;
  eventDetails?: {
    date?: string;
    time?: string;
    location?: string;
    organizer?: string;
    points?: number;
    image?: string;
  };
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
  const [activityImpact, setActivityImpact] = useState<ActivityImpact[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [eventRecommendations, setEventRecommendations] = useState<
    EventRecommendation[]
  >([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moodTrend, setMoodTrend] = useState<
    "improving" | "stable" | "declining"
  >("stable");
  const [timeRange, setTimeRange] = useState("month");

  // Fetch data from API
  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch journal entries first
        const journalResponse = await fetch("/api/journals");
        if (!journalResponse.ok) {
          throw new Error("Failed to fetch journal entries");
        }

        const journalData = await journalResponse.json();
        setJournalEntries(journalData);

        // Only proceed with insights if we have journal data
        if (journalData && journalData.length > 0) {
          // Get AI insights based on mood data
          const insightsResponse = await fetch("/api/insights/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              moodData: journalData,
              timeRange,
            }),
          });

          if (!insightsResponse.ok) {
            throw new Error("Failed to generate insights");
          }

          const insightsData = await insightsResponse.json();
          // Update state with the fetched data
          if (insightsData.insights) setInsights(insightsData.insights);
          if (insightsData.activityImpact)
            setActivityImpact(insightsData.activityImpact);
          if (insightsData.recommendations)
            setRecommendations(insightsData.recommendations);
          if (insightsData.eventRecommendations)
            setEventRecommendations(insightsData.eventRecommendations);
          if (insightsData.weeklyStats)
            setWeeklyStats(insightsData.weeklyStats);
          if (insightsData.moodTrend) setMoodTrend(insightsData.moodTrend);
        }
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [timeRange]);

  // Mark recommendation as completed
  const completeRecommendation = async (id: string) => {
    try {
      // Optimistically update UI
      setRecommendations(
        recommendations.map((rec) =>
          rec.id === id ? { ...rec, completed: true } : rec,
        ),
      );

      // Call API to update in database
      const response = await fetch(`/api/recommendations/${id}/complete`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to update recommendation");
      }
    } catch (err) {
      console.error("Error completing recommendation:", err);
      // Revert the optimistic update if the API call fails
      setRecommendations(
        recommendations.map((rec) =>
          rec.id === id ? { ...rec, completed: false } : rec,
        ),
      );
    }
  };

  // Get mood trend icon
  const getMoodTrendIcon = () => {
    if (moodTrend === "improving") return <TrendingUp className="h-4 w-4" />;
    if (moodTrend === "declining")
      return <TrendingUp className="h-4 w-4 rotate-180" />;
    return <Activity className="h-4 w-4" />;
  };

  // Get mood trend color
  const getMoodTrendColor = () => {
    if (moodTrend === "improving") return "text-green-600 dark:text-green-400";
    if (moodTrend === "declining") return "text-red-600 dark:text-red-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

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

    return iconMap[activity.toLowerCase()] || <Activity className="h-4 w-4" />;
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

  // Display loading state
  if (loading) {
    return (
      <div className="space-y-5 pt-20 flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
        <Loader2 size="35" className="animate-spin" />
        <p>Analyzing your mood patterns...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="space-y-5 pt-20 flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
        <SearchSlash size="35" />
        <p>Error loading insights: {error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  // Display empty state
  if (!insights.length || !weeklyStats) {
    return (
      <div className="space-y-5 pt-20 flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
        <SearchSlash size="35" />
        <p>Create some entries in order to get insights</p>
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
      <Card className="border-none shadow-none">
        <CardHeader className="pb-2 px-0 pt-0">
          <CardTitle className="text-base">What Affects Your Mood</CardTitle>
          <CardDescription>An overview of your mental wellness</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="space-y-5">
            {activityImpact.slice(0, 4).map((activity, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm capitalize">{activity.factor}</span>
                  <span className="text-sm text-muted-foreground">
                    {activity.impactLabel}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      activity.impact > 0
                        ? activity.impact > 0.5
                          ? "bg-green-500"
                          : activity.impact > 0.3
                            ? "bg-indigo-500"
                            : "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                    style={{ width: `${activity.percentageScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {insights.length > 0 && (
            <div className="mt-4 bg-muted p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-xs font-medium">Insight</h4>
                  <p className="text-xs text-muted-foreground">
                    {insights[0].description}
                  </p>
                </div>
              </div>
            </div>
          )}
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
          {recommendations.length > 0 ? (
            recommendations.slice(0, 3).map((recommendation) => (
              <div
                key={recommendation.id}
                className="flex items-start p-3 bg-border rounded-md"
              >
                <div
                  className={`p-2 ${getRecommendationColor(recommendation.type)} rounded-full mr-3`}
                >
                  {getRecommendationIcon(recommendation.type)}
                </div>
                <div>
                  <h3 className="text-sm font-medium">
                    {recommendation.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {recommendation.description}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-1 text-xs text-indigo-600"
                    onClick={() => completeRecommendation(recommendation.id)}
                    disabled={recommendation.completed}
                  >
                    {recommendation.completed ? "Completed" : "Try this"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground text-sm py-4">
              No personalized recommendations available yet.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Events */}
      {eventRecommendations.length > 0 && (
        <Card className="border-none">
          <CardHeader className="pb-2 px-0 pt-0">
            <CardTitle className="text-base">
              Recommended Events For You
            </CardTitle>
            <CardDescription>
              Events that might improve your mood based on your patterns.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-3 px-0">
            {eventRecommendations.slice(0, 2).map((event) => (
              <div
                key={event.eventId}
                className="flex items-start p-3 bg-border rounded-md"
              >
                <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full mr-3">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{event.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.reasoning}
                  </p>

                  {event.eventDetails && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {event.eventDetails.date && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.eventDetails.date}
                        </div>
                      )}
                      {event.eventDetails.time && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.eventDetails.time}
                        </div>
                      )}
                      {event.eventDetails.location && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.eventDetails.location}
                        </div>
                      )}
                      {event.eventDetails.points && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Award className="h-3 w-3 mr-1" />
                          {event.eventDetails.points} points
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-2">
                    <Link href={`/events/${event.eventId}`}>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs text-indigo-600"
                      >
                        View Event
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
