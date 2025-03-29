import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCorrelationInsights } from "@/lib/utils";
import CreateJournalEntry from "./_components/create-journal-entry";
import Insights from "./_components/inights";
import History from "./_components/history";
import { getJournalEntries } from "@/services/database/queries/journal-entries";

export default async function JournalPage() {
  const { data } = await getJournalEntries();
  const moodHistory = data?.map((journal) => {
    const {
      createdAt,
      moodScore,
      activities,
      sleepHours,
      energyLevel,
      journalText,
    } = journal;
    return {
      date: createdAt,
      mood: moodScore,
      journalText,
      activities,
      sleep: sleepHours,
      energy: energyLevel,
    };
  });
  const insights = getCorrelationInsights();

  return (
    <div className="pb-6">
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
