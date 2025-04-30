import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Gift } from "lucide-react";

type Props = {
  points: number;
};

export default function Rewards({ points }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Rewards</h2>
        <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded">
          <Award className="h-3 w-3 mr-1" />
          {points} pts
        </div>
      </div>

      <div className="space-y-3">
        {rewards.slice(0, 4).map((reward, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all hover:shadow-md bg-border"
          >
            <CardContent className="p-0">
              <div className="flex">
                <div className="flex items-center justify-center bg-muted p-4 w-16">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div className="p-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <div className="space-y-1 mb-2">
                        <h3 className="font-medium text-sm line-clamp-1">
                          {reward.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {reward.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-y-2">
                      <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                        <Award className="h-3 w-3 mr-1" />
                        {reward.points} pts
                      </div>
                      <Button
                        size="sm"
                        className="mt-auto text-xs px-3 rounded-sm"
                        variant={
                          reward.points <= points ? "default" : "outline"
                        }
                        disabled={reward.points > points}
                      >
                        {reward.points <= points ? "Redeem" : "Not Enough"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const rewards = [
  {
    title: "Campus Bookstore Voucher",
    description: "$10 off your next purchase",
    points: 200,
  },
  {
    title: "Coffee Shop Gift Card",
    description: "Free coffee or tea",
    points: 150,
  },
  {
    title: "Wellness Workshop Pass",
    description: "Free entry to premium workshop",
    points: 300,
  },
  {
    title: "Campus Gym Day Pass",
    description: "One day access to all facilities",
    points: 400,
  },
];
