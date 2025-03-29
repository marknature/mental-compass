import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { cn, getCorrelationInsights } from "@/lib/utils";
import { Lightbulb, Dumbbell, Moon, Users, SearchSlash } from "lucide-react";

type Props = {
  insights: ReturnType<typeof getCorrelationInsights>;
};

export default function Insights({ insights }: Props) {
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
      <Card className="border-none bg-border">
        <CardHeader className="pb-2  mb-6">
          <CardTitle className="text-base">Your Wellness Patterns</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 mb-6 ">
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
    </>
  );
}
