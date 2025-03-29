import { FeaturedArticle } from "@/app/_components/featured-article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sliders } from "lucide-react";
import { mockArticles } from "@/lib/mock-articles";
import ArticlesWrapper from "./_components/articles-wrapper";
import ArticleCard from "./_components/article-card";
import Link from "next/link";

export default function Resources() {
  const categories = ["calm", "happy", "sad", "peace", "stress", "anger"];
  const resources = ["articles", "podcasts"];

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
      <div className="grid grid-cols-4 gap-2 mb-6">
        {resources.map((category) => {
          return (
            <Button
              key={category}
              variant="secondary"
              className="text-sm rounded-lg capitalize"
            >
              {category}
            </Button>
          );
        })}
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
      <ArticlesWrapper
        title="Sad"
        description="Because you have been down the last days"
      >
        {mockArticles.map((article) => (
          <Link href={`/resources/articles/${article.slug}`} key={article.slug}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </ArticlesWrapper>
    </>
  );
}
