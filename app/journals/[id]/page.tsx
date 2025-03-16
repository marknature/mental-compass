import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function JournalPage() {
  return (
    <>
      <div className="space-y-4">
        <h5 className="text-sm text-muted-foreground">
          Edited Wednesday 5 July
        </h5>
        <h1 className="text-4xl mb-2 text-foreground font-semibold">
          Thanking God for the small things
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-6">
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="secondary" className="text-sm rounded-lg">
          Podcasts
        </Button>
        <Button variant="outline" size={"icon"} className="text-sm rounded-lg">
          <Plus />
        </Button>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitatiLorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitatiLorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati
      </p>
    </>
  );
}
