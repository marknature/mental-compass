"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { mockArticles } from "@/lib/mock-articles";

export function FeaturedArticle() {
  const router = useRouter();
  const featuredArticle = mockArticles.find((article) => article.featured);

  if (!featuredArticle) return null;

  return (
    <div className="py-0">
      <Card
        className="border-none overflow-hidden cursor-pointer active:opacity-90"
        onClick={() =>
          router.push(`/resources/articles/${featuredArticle.slug}`)
        }
      >
        <div className="relative h-40 w-full">
          <div alt="" className="h-full w-full object-cover bg-primary/30" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 hover:bg-primary/90 text-white">
              Featured
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 bg-border">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs font-normal">
              {featuredArticle.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {featuredArticle.readTime} min read
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">{featuredArticle.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {featuredArticle.excerpt}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
