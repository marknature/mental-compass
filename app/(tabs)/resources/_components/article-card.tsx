import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";

export default function ArticleCard({ article }) {
  return (
    <Card className="overflow-hidden bg-border transition-colors cursor-pointer border-0 w-[200px] flex-shrink-0 space-y-2 h-full">
      <div className="relative h-28 bg-primary/20">
        {article.cover_image ? (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover bg-primary/20"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-950">
            <BookOpen className="h-12 w-12 text-indigo-300" />
          </div>
        )}
      </div>
      <CardContent className="px-2">
        <div className="space-y-1 text-xs text-muted-foreground mb-2">
          <div className="flex gap-2 items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{article.read_time} min read</span>
          </div>
        </div>
        <h3 className="font-semibold line-clamp-2 mb-2 text-sm">
          {article.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {article.summary}
        </p>
      </CardContent>
    </Card>
  );
}
