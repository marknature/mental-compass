"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn, getMoodColor } from "@/lib/utils";
import { moodLogSchema } from "@/services/database/schema/mood/mood-logs.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Loading from "@/app/_components/loading";
import { useCreateOrUpdateMoodLog, useJournals } from "@/lib/hooks/useJournals";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/hooks/useUsers";

type MoodLogFormValues = z.infer<typeof moodLogSchema> & {
  created_at?: Date;
};

export default function Journal() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data, isLoading } = useJournals();
  const [promptIndex, setPromptIndex] = useState<number>(0);
  const [activities, setActivities] = useState<string[]>([]);

  const [defaultValues, setDefaultValues] = useState<MoodLogFormValues>({
    id: "",
    user_id: "",
    mood_score: 5,
    sleep_hours: 7,
    energy_level: 5,
    entry_note: "",
    gratitude_note: "",
    challenge_note: "",
    activities: [],
    created_at: new Date(),
  });

  const today = new Date().toISOString().split("T")[0];
  const todaysJournal =
    data?.find((entry) => {
      return entry.created_at && entry.created_at.split("T")[0] === today;
    }) ?? null;

  const form = useForm<MoodLogFormValues>({
    resolver: zodResolver(moodLogSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    async function loadDefaultValues() {
      try {
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();

        // Create a new Date object for today if there's no existing journal entry
        const createdAt = todaysJournal?.created_at
          ? new Date(todaysJournal.created_at)
          : new Date();

        setDefaultValues({
          id: todaysJournal?.id ?? "",
          user_id: userData.user?.id || "",
          mood_score: todaysJournal?.mood_score ?? 5,
          sleep_hours: todaysJournal?.sleep_hours ?? 7,
          energy_level: todaysJournal?.energy_level ?? 5,
          entry_note: todaysJournal?.entry_note ?? "",
          gratitude_note: todaysJournal?.gratitude_note ?? "",
          challenge_note: todaysJournal?.challenge_note ?? "",
          activities: todaysJournal?.activities ?? [],
          created_at: createdAt,
        });

        if (todaysJournal?.activities) {
          setActivities(todaysJournal.activities);
        }
      } catch (error) {
        console.error("Error loading default values:", error);
      }
    }

    loadDefaultValues();
  }, [todaysJournal]);

  // Reset form when default values change
  useEffect(() => {
    if (!isLoading) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, isLoading]);

  const mutation = useCreateOrUpdateMoodLog();

  const nextPrompt = () => {
    setPromptIndex((promptIndex + 1) % journalPrompts.length);
  };

  function onSubmit(values: MoodLogFormValues) {
    // Ensure created_at is set for new entries
    const submitValues = {
      ...values,
      activities,
      created_at: values.created_at || new Date(),
    };

    return mutation.mutate(submitValues, {
      onSuccess() {
        toast.success("Journal entry has been recorded");
      },
      onError(error) {
        console.error(error);
        toast.error("Journal entry has not been recorded");
      },
    });
  }

  if (isLoading) return <Loading title="Journal" />;

  return (
    <>
      {todaysJournal && (
        <Alert className="border-primary">
          <AlertTitle className="text-sm">Today's entry completed</AlertTitle>
          <AlertDescription className="text-xs">
            You have already entered today's entry. If you want to edit it just
            adjust the information below.
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-border border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                How are you feeling today?
              </CardTitle>
              <CardDescription>
                Track your mood, sleep and activities today
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sad</span>
                    <span className="text-sm text-muted-foreground">Calm</span>
                    <span className="text-sm text-muted-foreground">Happy</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="mood_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            {...field}
                            value={field.value ? [field.value] : undefined}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="py-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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

          <Card className="border-none bg-border">
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
                        "w-full h-auto py-2 px-1 flex flex-col items-center gap-1 border-none bg-primary/15",
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

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card className="bg-border border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Track Your Wellness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Sleep Hours</Label>
                </div>
                <FormField
                  control={form.control}
                  name="sleep_hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          min={0}
                          max={12}
                          step={0.5}
                          {...field}
                          onValueChange={(value) => field.onChange(value[0])}
                          value={field.value ? [field.value] : undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                </div>
                <FormField
                  control={form.control}
                  name="energy_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          min={0}
                          max={12}
                          step={1}
                          {...field}
                          onValueChange={(value) => field.onChange(value[0])}
                          value={field.value ? [field.value] : undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none">
            <CardHeader className="pb-2 px-0 pt-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Journal Entry</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextPrompt}
                  className="h-8 text-xs"
                  type="button"
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
              <FormField
                control={form.control}
                name="entry_note"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write about your day, feelings, or anything on your mind..."
                        className="min-h-[100px] resize-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">
                    What are you grateful for today?
                  </Label>
                  <FormField
                    control={form.control}
                    name="gratitude_note"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="List one or more things you're grateful for..."
                            className="min-h-[60px] resize-none mt-1 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label className="text-sm">
                    What's challenging you right now?
                  </Label>
                  <FormField
                    control={form.control}
                    name="challenge_note"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Describe a challenge you're facing..."
                            className="min-h-[60px] resize-none mt-1 text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-0">
              <Button
                type="submit"
                className="w-full relative overflow-hidden"
                disabled={mutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {mutation.isPending ? "Saving..." : "Save Entry"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
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
