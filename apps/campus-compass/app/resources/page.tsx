import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageSection from "../_components/section";
import { Sliders } from "lucide-react";
import { FeaturedArticle } from "../_components/featured-article";

export default function Resources() {
  return (
    <>
      <h1 className="text-2xl mb-2 text-foreground">
        Resources
        <p className="text-sm text-muted-foreground">
          View blogs, podcasts and stories
        </p>
      </h1>
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
      <FeaturedArticle />
      <div className="mb-6">
        <h2 className="capitalize text-base font-medium mb-3">
          Search by category
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button variant="secondary" className="rounded-md">
            Podcasts
          </Button>
          <Button variant="secondary" className="rounded-md">
            Podcasts
          </Button>
          <Button variant="secondary" className="rounded-md">
            Podcasts
          </Button>
          <Button variant="secondary" className="rounded-md">
            Podcasts
          </Button>
          <Button variant="secondary" className="rounded-md">
            Podcasts
          </Button>
          <Button variant="secondary" className="rounded-md">
            Podcasts
          </Button>
        </div>
      </div>
      <PageSection title="Happy" />
      <PageSection title="Calm" />
    </>
  );
}
