import React, { useState, useEffect } from "react";
import { Calendar, Trophy, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GrowthTree = ({
  lastLoginDate,
  streakDays = 15,
  missedDaysLimit = 3,
  daysToFullGrowth = 30,
  onTreeDeath = () => {},
  onTreeFullGrowth = () => {},
  // Optional custom image paths
  treeImages = {
    seedling: "/images/seedling.png",
    sprout: "/images/sprout.png",
    small: "/images/small.png",
    medium: "/images/medium.png",
    full: "/images/full.png",
    dead: "/images/dead.png",
  },
}) => {
  const [treeStage, setTreeStage] = useState(1);
  const [isAlive, setIsAlive] = useState(true);
  const [daysSinceLastLogin, setDaysSinceLastLogin] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate tree state based on streak and last login
  useEffect(() => {
    // Calculate days since last login
    const today = new Date();
    const lastLogin = lastLoginDate ? new Date(lastLoginDate) : today;
    const timeDiff = today.getTime() - lastLogin.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    setDaysSinceLastLogin(daysDiff);

    // Check if tree is dead (missed too many days)
    if (daysDiff > missedDaysLimit) {
      setIsAlive(false);
      onTreeDeath();
    } else {
      setIsAlive(true);

      // Calculate growth percentage
      const growthPercent = Math.min(
        100,
        (streakDays / daysToFullGrowth) * 100,
      );
      setGrowthPercentage(growthPercent);

      // Set tree stage based on growth percentage
      if (growthPercent >= 100) {
        setTreeStage(5);
        setShowReward(true);
        onTreeFullGrowth();
      } else if (growthPercent >= 75) {
        setTreeStage(4);
      } else if (growthPercent >= 50) {
        setTreeStage(3);
      } else if (growthPercent >= 25) {
        setTreeStage(2);
      } else {
        setTreeStage(1);
      }
    }
  }, [
    lastLoginDate,
    streakDays,
    missedDaysLimit,
    daysToFullGrowth,
    onTreeDeath,
    onTreeFullGrowth,
  ]);

  // Get current tree image based on stage
  const getCurrentTreeImage = () => {
    if (!isAlive) return treeImages.dead;

    switch (treeStage) {
      case 1:
        return treeImages.seedling;
      case 2:
        return treeImages.sprout;
      case 3:
        return treeImages.small;
      case 4:
        return treeImages.medium;
      case 5:
        return treeImages.full;
      default:
        return treeImages.seedling;
    }
  };

  // Animation frames for tree growth
  const renderTree = () => {
    if (!isAlive) {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-4 relative">
            <Image
              width={150}
              height={150}
              src={treeImages.dead}
              alt="Dead tree"
              className="h-48 w-48 object-contain"
            />
          </div>
          <p className="text-destructive font-bold">Your tree died!</p>
          <p className="text-muted-foreground text-sm">
            You missed {daysSinceLastLogin} days
          </p>
          <button
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-full transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            Plant a new tree
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          {/* Tree image with growth animation */}
          <div className="relative transition-all duration-500 flex items-center justify-center">
            <Image
              width={150}
              height={150}
              src={getCurrentTreeImage()}
              alt={`Tree growth stage ${treeStage}`}
              className="h-48 w-48 object-contain self-center"
            />

            {/* Add sparkles to fully grown tree */}
            {treeStage === 5 && (
              <>
                <div className="absolute top-0 right-0 w-8 h-8 animate-pulse">
                  <img
                    src="/api/placeholder/32/32"
                    alt="sparkle"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute top-10 left-0 w-6 h-6 animate-pulse delay-300">
                  <img
                    src="/api/placeholder/24/24"
                    alt="sparkle"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute bottom-10 right-10 w-7 h-7 animate-pulse delay-500">
                  <img
                    src="/api/placeholder/28/28"
                    alt="sparkle"
                    className="w-full h-full object-contain"
                  />
                </div>
              </>
            )}
          </div>

          {/* Progress indicator using shadcn/ui Progress component */}
          <div className="mt-6 w-64">
            <Progress
              value={growthPercentage}
              className="h-4 transition-all duration-700 ease-out"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {growthPercentage.toFixed(0)}% Growth • Day {streakDays} of{" "}
            {daysToFullGrowth}
          </p>
        </div>

        {/* Streak information */}
        <div className="flex items-center space-x-2 text-muted-foreground mb-4">
          <Calendar size={16} className="text-primary" />
          <span>
            {streakDays} day{streakDays !== 1 ? "s" : ""} streak
          </span>
        </div>

        {/* Warning if approaching death */}
        {daysSinceLastLogin > 0 && daysSinceLastLogin <= missedDaysLimit && (
          <div className="flex items-center text-amber-400 bg-secondary p-2 rounded-lg mt-2">
            <AlertTriangle size={16} className="mr-2" />
            <span className="text-sm">
              {missedDaysLimit - daysSinceLastLogin} day
              {missedDaysLimit - daysSinceLastLogin !== 1 ? "s" : ""} left
              before your tree dies!
            </span>
          </div>
        )}

        {/* Reward notification */}
        {showReward && (
          <div className="mt-6 bg-secondary border border-primary/30 rounded-lg p-4 text-center">
            <div className="flex justify-center mb-2">
              <Trophy size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Congratulations!</h3>
            <p className="text-sm text-muted-foreground">
              Your tree is fully grown! Visit our store to claim your reward.
            </p>
            <button className="mt-3 bg-primary hover:bg-primary/90 text-primary-foreground py-1 px-4 rounded-full text-sm">
              Claim Reward
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardContent>
        {renderTree()}
        <div className=" text-xs text-center text-muted-foreground">
          {isAlive && !showReward && (
            <p>Log in daily to keep your tree growing and earn rewards!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthTree;
