"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  title: string;
  slug: string;
  content: string;
  summary: string;
  cover_image?: string;
  author: string | { name: string; avatar?: string; role?: string };
  category: string;
  read_time: number;
  created_at: string;
}

interface ArticleDetailProps {
  article: Article;
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

  const authorName =
    typeof article.author === "string" ? article.author : article.author.name;

  const authorAvatar =
    typeof article.author === "object" && article.author.avatar
      ? article.author.avatar
      : undefined;

  const authorRole =
    typeof article.author === "object" && article.author.role
      ? article.author.role
      : "Contributor";

  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="flex-1 overflow-auto pb-20">
        {/* Hero Image */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
          {article.cover_image ? (
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-primary/30 w-full h-full flex items-center justify-center text-white">
              No Image Available
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="space-y-9 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{article.title}</h1>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {authorAvatar && (
                  <AvatarImage src={authorAvatar} alt={authorName} />
                )}
                <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{authorName}</p>
                <p className="text-xs text-muted-foreground">{authorRole}</p>
              </div>
            </div>

            <div className="flex flex-col items-end text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(article.created_at)}
              </div>
              <div className="flex items-center mt-0.5">
                <Clock className="h-3 w-3 mr-1" />
                {article.read_time} min read
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {article.content
              .trim()
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t max-w-md mx-auto flex gap-4 justify-between items-center">
          <Button className="w-full sm:w-auto h-12 text-base font-medium bg-primary text-white hover:bg-primary-dark active:bg-primary/90 transition duration-200">
            Read Article
          </Button>
        </div>
      </div>
    </div>
  );
}
