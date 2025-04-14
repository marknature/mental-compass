"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Image from "next/image";

export function FeaturedArticle({ article }) {
  const router = useRouter();
  const featuredArticle = article;

  if (!featuredArticle) return null;

  return (
    <div className="py-0">
      <Card
        className="border-none overflow-hidden cursor-pointer active:opacity-90"
        onClick={() => router.push(`/resources/articles/${featuredArticle.id}`)}
      >
        <div className="relative h-40 w-full">
          <Image
            src={featuredArticle.cover_image || "/placeholder.svg"}
            alt={featuredArticle.title}
            fill
            className="object-cover text-[0px]"
          />

          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 hover:bg-primary/90 text-white">
              Featured
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 bg-border space-y-3">
          <h3 className="font-bold text-lg mb-1">{featuredArticle.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {featuredArticle.summary}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="text-xs font-normal">
              {featuredArticle.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {featuredArticle.read_time} min read
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
