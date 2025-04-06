import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface MeditationProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  author: string;
  category: string;
  coverImage: string;
  isNew?: boolean;
}

export function MeditationCard({
  id,
  title,
  description,
  duration,
  author,
  category,
  coverImage,
}: MeditationProps) {
  return (
    <Card className="overflow-hidden border-none shadow-none bg-border">
      <div className="relative h-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="bg-white/90 text-black text-xs mb-1"
            >
              {category}
            </Badge>
            <h3 className="text-white font-medium text-sm line-clamp-1">
              {title}
            </h3>
          </div>
          <Badge
            variant="outline"
            className="bg-black/50 text-white border-none text-xs"
          >
            {duration}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">By {author}</span>
          <Button asChild size="sm" className="h-8 w-8 rounded-full p-0">
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
