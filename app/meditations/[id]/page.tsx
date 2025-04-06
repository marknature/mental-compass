"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MeditationContent } from "@/lib/data/meditation-types";
import { MeditationStoryPlayer } from "@/app/(tabs)/(home)/_components/meditation-story-player";
import { guidedMeditations } from "@/lib/data/meditation-data";

export default function MeditationPlayerPage() {
  const params = useParams();
  const id = params.id as string;
  const [meditation, setMeditation] = useState<MeditationContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the meditation data from an API
    // For now, we'll use mock data
    const foundMeditation = guidedMeditations.find((m) => m.id === id);

    if (foundMeditation) {
      setMeditation(foundMeditation);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 rounded-full bg-indigo-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading meditation...</p>
        </div>
      </div>
    );
  }

  if (!meditation) {
    return (
      <div className="p-4 text-center py-12">
        <h2 className="text-xl font-bold mb-2">Meditation Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The meditation you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return <MeditationStoryPlayer meditation={meditation} />;
}
