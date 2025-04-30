import { Award, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MeditationProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  author: string;
  category: string;
}

export function MeditationCard({
  id,
  title,
  description,
  duration,
  author,
  category,
}: MeditationProps) {
  // Get background image URL based on category
  const backgroundImage = getBackgroundImage(category);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-32">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-primary"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-white font-medium text-sm line-clamp-1">
              {title}
            </h3>
          </div>
        </div>
      </div>

      <CardContent className="p-3">
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </div>
            <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
              <Award className="h-3 w-3 mr-1" />
              10 pts
            </div>
          </div>
          <Button asChild size="sm" className="h-8 w-8 rounded-md p-0">
            <Link href={`/meditations/${id}`}>
              <Play className="h-4 w-4" />
              <span className="sr-only">Play meditation</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get background image based on category
function getBackgroundImage(category: string): string {
  const lowerCategory = category.toLowerCase();

  switch (lowerCategory) {
    case "morning":
      return "/images/backgrounds/morning.png";
    case "anxiety":
    case "stress":
      return "/images/backgrounds/student.png";
    case "sleep":
      return "/images/backgrounds/sleep.png";
    case "focus":
      return "/images/backgrounds/meditate.png";
    case "gratitude":
      return "/images/backgrounds/pray.png";
    default:
      return "/images/backgrounds/confidence.png";
  }
}
