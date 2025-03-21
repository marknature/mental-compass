"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subDays } from "date-fns";
import { getCorrelationInsights } from "@/lib/utils";
import CreateJournalEntry from "./_components/create-journal-entry";
import Insights from "./_components/inights";
import History from "./_components/history";

export default function JournalPage() {
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

  const insights = getCorrelationInsights();

  return (
    <div className="pb-6">
      <h1 className="text-2xl mb-2 text-foreground">
        Journal
        <p className="text-sm text-muted-foreground">
          View track your mood, see your insights and history
        </p>
      </h1>
      <Tabs defaultValue="today" className="w-full">
        <div className="pt-4">
          <TabsList className="grid w-full grid-cols-3 p-0 h-auto bg-background gap-1 mt-0">
            <TabsTrigger
              value="today"
              className="border border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="border border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="border border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="today" className="p-4 px-0 space-y-4">
          <CreateJournalEntry />
        </TabsContent>

        <TabsContent value="insights" className="p-4 space-y-6 px-0">
          <Insights insights={insights} />
        </TabsContent>

        <TabsContent value="history" className="p-4 space-y-6 px-0">
          <History moodHistory={moodHistory} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
