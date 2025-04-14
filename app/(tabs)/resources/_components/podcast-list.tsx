import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkPlus, Headphones, Play } from "lucide-react";
import Image from "next/image";

type Podcast = {
  id: string;
  title: string;
  description: string;
  duration: string;
  spotifyUrl: string;
  image?: string;
};

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Card className="bg-border overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          {podcast.image && (
            <div className="relative w-24 h-28 flex-shrink-0">
              <Image
                src={podcast.image}
                alt={podcast.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="px-4 py-3 flex-1">
            <h3 className="font-medium line-clamp-1 text-sm">
              {podcast.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {podcast.description}
            </p>
            <div className="flex items-center text-xs mt-2">
              <Headphones className="h-3 w-3 mr-1" />
              <span>{podcast.duration}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <a
                href={podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-primary hover:underline"
              >
                <Play className="h-3 w-3 mr-1" />
                <span>Play on Spotify</span>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
