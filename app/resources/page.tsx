import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageSection from "../_components/section";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

      <section className="mb-8">
        <h2 className="text-base font-medium mb-4">Featured Content</h2>
        <Link href="#" className="block">
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <Image
                alt="Person in contemplative pose"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <p className="text-muted-foreground text-sm mb-1">
                Sunday may 7 2023
              </p>
              <h2 className="text-2xl capitalize font-medium">
                Stress not for me
              </h2>
              <p className="text-sm text-muted-foreground">
                View blogs, podcasts and stories
              </p>
            </div>
          </div>
        </Link>
      </section>

      <div className="mb-6">
        <h2 className="text-base font-medium mb-3">Search by category</h2>
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
