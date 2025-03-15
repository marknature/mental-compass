import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";

export default function Journal() {
  const journals = [
    {
      title: "Thanking God for the small things",
      content: `
            Always thank God for the small things in life, waking up being
            healthy having food on the table. Even when you have little or
            nothing as long as you got breath in your lungs you got something to
            thank God for and a mission you have to complete. Use the little you
            have to get more and God will reward you with much more
      `,
      url: "/journals/1",
    },
    {
      title: "Thanking God for the small things",
      content: `
            Always thank God for the small things in life, waking up being
            healthy having food on the table. Even when you have little or
            nothing as long as you got breath in your lungs you got something to
            thank God for and a mission you have to complete. Use the little you
            have to get more and God will reward you with much more
      `,
      url: "/journals/2",
    },
    {
      title: "Thanking God for the small things",
      content: `
            Always thank God for the small things in life, waking up being
            healthy having food on the table. Even when you have little or
            nothing as long as you got breath in your lungs you got something to
            thank God for and a mission you have to complete. Use the little you
            have to get more and God will reward you with much more
      `,
      url: "/journals/3",
    },
    {
      title: "Thanking God for the small things",
      content: `
            Always thank God for the small things in life, waking up being
            healthy having food on the table. Even when you have little or
            nothing as long as you got breath in your lungs you got something to
            thank God for and a mission you have to complete. Use the little you
            have to get more and God will reward you with much more
      `,
      url: "/journals/4",
    },
  ];
  return (
    <>
      <h1 className="text-2xl mb-2 text-foreground">
        Journal
        <p className="text-sm text-muted-foreground">
          Get professional help from the Africa university counselor
        </p>
      </h1>
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for jornals..."
          className="w-full text-sm"
        />
        <Button size={"icon"} variant={"outline"}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-6">
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {journals.map(({ url, content, title }) => {
          return (
            <Link href={url} key={url}>
              <Card className="p-4 space-y-2 bg-border border-none">
                <CardTitle>{title}</CardTitle>
                <CardContent className="p-0 text-sm line-clamp-3">
                  {content}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Button size={"icon"} className="z-40 bottom-20 absolute right-5">
        <Plus size={"50"} />
      </Button>
    </>
  );
}
