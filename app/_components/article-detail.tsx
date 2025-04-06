"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";

interface ArticleDetailProps {
  article: any;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="flex-1 overflow-auto pb-20">
        {/* Hero Image */}
        <div className="relative w-full h-48">
          <div className="bg-primary/30 rounded-lg h-full w-full object-cover" />
        </div>

        {/* Article Content */}
        <div className=" py-4">
          <h1 className="text-2xl font-bold mb-3">{article.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={article.author.avatar}
                  alt={article.author.name}
                />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center mt-0.5">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime} min read
              </div>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
