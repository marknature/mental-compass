import { FeaturedArticle } from "@/app/_components/featured-article";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockArticles } from "@/lib/data/mock-articles";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Sliders } from "lucide-react";
import Link from "next/link";
import ArticleCard from "./_components/article-card";
import ArticlesWrapper from "./_components/articles-wrapper";
import PodcastCard from "./_components/podcast-list";

export default function Resources() {
  const categories = ["calm", "happy", "sad", "peace", "stress", "anger"];

  return (
    <>
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for resources..."
          className="w-full text-sm"
        />
        <Button size={"icon"} variant={"outline"}>
          <Sliders />
        </Button>
      </div>
      <FeaturedArticle />
      <div className="mb-6">
        <h2 className="capitalize text-base font-medium mb-3">
          Search by category
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map((category) => {
            return (
              <Button
                variant="secondary"
                className="rounded-md capitalize"
                key={category}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>
      <ArticlesWrapper
        title="Happy"
        description="Insights to maintaining happinnes"
      >
        {mockArticles.map((article) => (
          <Link href={`/resources/articles/${article.slug}`} key={article.slug}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </ArticlesWrapper>
      <Card className="bg-transparent space-y-4 max-w-4xl mx-auto border-none shadow-none">
        <CardHeader className="p-0">
          <CardTitle>Podcasts</CardTitle>
          <CardDescription>
            Listen to some pocasts to brighten up your day
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="space-y-4 w-full">
            {mockPodcasts.map((podcast) => (
              <PodcastCard podcast={podcast} key={podcast.id} />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

// Mock data for podcasts
const mockPodcasts = [
  {
    id: "pod1",
    title: "Finding Inner Peace in a Busy World",
    description: "Learn practical mindfulness techniques for daily life",
    author: "Dr. Maya Singh",
    authorAvatar: "/avatars/maya-singh.jpg",
    duration: "24 min",
    publishedDate: "Apr 2, 2025",
    categories: ["meditation", "mindfulness", "calm"],
    image: "/podcasts/inner-peace.jpg",
  },
  {
    id: "pod2",
    title: "Overcoming Anxiety Through Breathwork",
    description: "Simple breathing exercises to reduce stress and anxiety",
    author: "James Wilson",
    authorAvatar: "/avatars/james-wilson.jpg",
    duration: "18 min",
    publishedDate: "Mar 28, 2025",
    categories: ["anxiety", "breathing", "stress"],
    image: "/podcasts/breathwork.jpg",
  },
  {
    id: "pod3",
    title: "The Science of Happiness",
    description: "Research-backed strategies to increase your well-being",
    author: "Dr. Lisa Chen",
    authorAvatar: "/avatars/lisa-chen.jpg",
    duration: "32 min",
    publishedDate: "Mar 21, 2025",
    categories: ["happiness", "science", "well-being"],
    image: "/podcasts/happiness.jpg",
  },
  {
    id: "pod4",
    title: "Sleep Better Tonight",
    description: "Practical tips for improving your sleep quality",
    author: "Michael Torres",
    authorAvatar: "/avatars/michael-torres.jpg",
    duration: "26 min",
    publishedDate: "Mar 15, 2025",
    categories: ["sleep", "health", "relaxation"],
    image: "/podcasts/sleep.jpg",
  },
];
