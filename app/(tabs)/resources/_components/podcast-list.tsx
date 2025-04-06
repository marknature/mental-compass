// _components/podcast-list.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkPlus, Headphones, Play } from "lucide-react";

export default function PodcastCard({ podcast }) {
  return (
    <Card className="bg-border">
      <CardContent className="p-0">
        <div className="flex">
          <div className="px-4 py-2 flex-1">
            <h3 className="font-medium line-clamp-1 text-sm">
              {podcast.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {podcast.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <div className="flex items-center text-xs">
                  <Headphones className="h-3 w-3 mr-1" />
                  <span>{podcast.duration}</span>
                </div>
                <div className="flex items-center text-xs">
                  <Play className="h-3 w-3 mr-1" />
                  <span>Play on spotify</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
