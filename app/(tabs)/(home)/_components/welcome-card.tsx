import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const WelcomeCard = () => {
  return (
    <Card className="bg-card border !mt-5 overflow-hidden">
      {/* Image section at the top */}
      <div
        className="w-full h-32 bg-transparent relative"
        style={{
          backgroundImage: "url('/images/backgrounds/growth.png')",
          backgroundPosition: "15% 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Content section below the image */}
      <CardContent className="space-y-3 p-4">
        <div className="space-y-3">
          <h1 className="font-bold tracking-tight text-lg">
            Begin Your Mindfulness Journey
          </h1>
          <p className="text-sm text-muted-foreground">
            Start by{" "}
            <span className="text-primary font-bold">
              writing in your journal
            </span>{" "}
            and exploring community events to support your wellness.
          </p>
        </div>

        <div className="pt-1">
          <Button
            asChild
            size="sm"
            variant="default"
            className="rounded-full px-6"
          >
            <Link href="/journals">Write Journal</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
