"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Journal from "./_components/create-journal-entry";
import History from "./_components/history";
import Insights from "./_components/inights";

export default function JournalPage() {
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
          <Journal />
        </TabsContent>

        <TabsContent value="insights" className="p-4 space-y-6 px-0">
          <Insights />
        </TabsContent>

        <TabsContent value="history" className="p-4 space-y-6 px-0">
          <History />
        </TabsContent>
      </Tabs>
    </div>
  );
}
