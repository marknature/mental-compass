"use client";

import { FeaturedArticle } from "@/app/_components/featured-article";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import ArticleCard from "./_components/article-card";
import ArticlesWrapper from "./_components/articles-wrapper";
import PodcastCard from "./_components/podcast-list";
import { useState } from "react";
import { useArticlesQuery } from "@/lib/hooks/useArticles";
import Loading from "@/app/_components/loading";
import { usePodcastsQuery } from "@/lib/hooks/usePodcasts";
import { Mail, Phone } from "lucide-react";
import QuickActions from "../(home)/_components/quick-actions";

type Podcast = {
  id: string;
  title: string;
  description: string;
  image: string;
  spotifyUrl: string;
  publisher: string;
};

export default function Resources() {
  const actions = [
    {
      icon: Mail,
      title: "Email Counselor",
      description: "Get professional advice",
      href: "mailto:counselling@africau.edu",
      color: "secondary",
      isExternal: true,
    },
    {
      icon: Phone,
      title: "Call Counselor",
      description: "Call for immediate help",
      href: "tel:+263719562825",
      color: "secondary",
      isExternal: true,
    },
  ];

  const { data = [], isLoading } = useArticlesQuery({});
  const { data: podcasts = [], isLoading: podcastsLoading } =
    usePodcastsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading || podcastsLoading) return <Loading title="Resouces" />;

  const filteredArticles = data?.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === null || article.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesSearch =
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === null || podcast.category?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const nist = filteredArticles?.filter(
    (article) => article.author === "National Institutes of Health",
  );

  const au = filteredArticles?.filter(
    (article) => article.author === "Africa University",
  );

  return (
    <>
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for resources..."
          className="w-full text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <QuickActions actions={actions} title="Crisis Support" />
      {!searchTerm && <FeaturedArticle article={data[0]} />}

      <ArticlesWrapper
        title="Africa University"
        description="Resources created by africa University"
      >
        {au.map((article) => (
          <Link href={article.url} key={article.url}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </ArticlesWrapper>

      <ArticlesWrapper
        title="National institutes of health"
        description="Turn discovery into health"
      >
        {nist?.length ? (
          nist.map((article) => (
            <Link href={article.url} key={article.url}>
              <ArticleCard article={article} />
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center h-32 bg-muted/20 rounded-md">
            <p className="text-muted-foreground text-sm">No articles found</p>
          </div>
        )}
      </ArticlesWrapper>

      <Card className="bg-transparent space-y-4 max-w-4xl mx-auto border-none shadow-none w-full">
        <CardHeader className="p-0">
          <CardTitle>Podcasts</CardTitle>
          <CardDescription>
            Listen to some podcasts to brighten up your day
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="space-y-4 w-full">
            {filteredPodcasts.length ? (
              filteredPodcasts.map((podcast) => (
                <PodcastCard podcast={podcast} key={podcast.id} />
              ))
            ) : (
              <div className="flex justify-center items-center h-32 bg-muted/20 rounded-md w-full">
                <p className="text-muted-foreground text-sm">
                  No podcasts found
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
