import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageSection from "../_components/section";
import { Calendar, Clock, MoreHorizontal, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarouselWithFooter from "../_components/events";

export default function Events() {
  return (
    <>
      <h1 className="text-2xl mb-2 text-foreground">
        Events
        <p className="text-sm text-muted-foreground">
          View events and challenges
        </p>
      </h1>
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for resources..."
          className="w-full text-sm"
        />
        <Button size={"icon"} variant={"outline"}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-6">
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
      </div>

      <CarouselWithFooter />

      <Tabs
        defaultValue="account"
        className="relative mr-auto w-full space-y-5 !mt-2"
      >
        <TabsList className="p-0 h-auto bg-background gap-1 mt-0">
          <TabsTrigger
            value="account"
            className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="border border-transparent data-[state=active]:border-border data-[state=active]:shadow-none"
          >
            Challenges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-0">
          <PageSection
            title="Events"
            description="View events and challenges"
            list
          />
        </TabsContent>
        <TabsContent value="password">
          <PageSection
            title="Challenges"
            description="View events and challenges"
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
