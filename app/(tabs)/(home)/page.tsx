"use client";

import EmptyDataList from "@/app/_components/empty-data-list";
import EventCard from "@/app/_components/event-card";
import Loading from "@/app/_components/loading";
import PageSection from "@/app/_components/page-section";
import { guidedMeditations } from "@/lib/data/meditation-data";
import { useJournals } from "@/lib/hooks/useJournals";
import { Meditations } from "./_components/meditations";
import { MoodCalendar } from "./_components/mood-calender";
import { useEventsQuery } from "@/lib/hooks/useEvents";
import WelcomeCard from "./_components/welcome-card";

export default function Home() {
  const { data: journals = [], isLoading: journalsIsLoading } = useJournals();
  const { data: events = [], isLoading: eventsIsLoading } = useEventsQuery({
    input: {
      limit: 3,
      status: ["upcoming"],
    },
  });

  const isStillLoading = eventsIsLoading || journalsIsLoading;

  return (
    <>
      {isStillLoading ? (
        <div className="px-4">
          <Loading title="home" />
        </div>
      ) : (
        <>
          <WelcomeCard />
          <PageSection
            title="Weekly moods"
            description="Showing moods for April 2025"
          >
            <MoodCalendar data={journals} />
          </PageSection>
          <PageSection
            title="Guided Meditations"
            description="Start your day right with some meditations"
          >
            <Meditations meditations={guidedMeditations} />
          </PageSection>
          <PageSection title="Upcoming Events" layout="list">
            {events && events.length > 0 ? (
              events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            ) : (
              <EmptyDataList message="No upcoming events found" />
            )}
          </PageSection>
        </>
      )}
    </>
  );
}
