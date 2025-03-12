"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function StoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="container max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark
                className={`h-5 w-5 ${bookmarked ? "fill-primary" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-md mx-auto px-4 mt-4">
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src={story.image || "/placeholder.svg"}
            alt={story.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          {story.categories.map((category) => (
            <span
              key={category}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {category}
            </span>
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-4">{story.title}</h1>

        <div className="text-sm text-gray-500 mb-6">
          {new Date(story.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {story.readTime} min read
        </div>

        <div className="prose max-w-none">
          {story.content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-4">Related Stories</h3>
          <div className="grid grid-cols-2 gap-4">
            {stories
              .filter(
                (s) =>
                  s.id !== id &&
                  s.categories.some((c) => story.categories.includes(c)),
              )
              .slice(0, 2)
              .map((relatedStory) => (
                <div
                  key={relatedStory.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/stories/${relatedStory.id}`)}
                >
                  <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={relatedStory.image || "/placeholder.svg"}
                      alt={relatedStory.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-medium line-clamp-2">
                    {relatedStory.title}
                  </h4>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
