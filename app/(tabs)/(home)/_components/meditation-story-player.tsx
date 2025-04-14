"use client";

import { useState, useEffect, useRef } from "react";
import type { MeditationContent } from "@/lib/meditation-types";
import { Button } from "@/components/ui/button";
import { X, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";

interface MeditationStoryPlayerProps {
  meditation: MeditationContent;
}

export function MeditationStoryPlayer({
  meditation,
}: MeditationStoryPlayerProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentStep = meditation.steps[currentStepIndex];

  const segmentWidth = 100 / meditation.steps.length;

  useEffect(() => {
    if (!currentStep || isPaused || hasEnded) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const stepDuration = currentStep.duration * 1000;
    const startTime = Date.now();
    const initialProgress = currentStepIndex * segmentWidth;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min(elapsed / stepDuration, 1);
      const totalProgress = initialProgress + stepProgress * segmentWidth;

      setProgress(totalProgress);

      if (elapsed >= stepDuration) {
        if (currentStepIndex < meditation.steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          clearInterval(intervalRef.current!);
          setHasEnded(true);
        }
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    currentStepIndex,
    currentStep,
    isPaused,
    segmentWidth,
    meditation.steps.length,
    hasEnded,
  ]);

  useEffect(() => {
    if (hasEnded) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [hasEnded, router]);

  const handleTap = (direction: "left" | "right") => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    console.log(direction, currentStepIndex);
    if (direction === "left" && currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else if (direction === "right") {
      if (currentStepIndex < meditation.steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setHasEnded(true);
      }
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleClose = () => {
    router.push("/");
  };

  const getBackgroundStyle = () => {
    if (currentStep.backgroundImage) {
      return {
        backgroundImage: `url(${currentStep.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    return {
      background:
        currentStep.background ||
        "linear-gradient(to bottom, #4f46e5, #7c3aed)",
    };
  };

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col"
      style={getBackgroundStyle()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Progress bar and header (z-index increased to ensure it's on top of tap areas) */}
      <div className="absolute top-0 left-0 right-0 p-4 z-40">
        <div className="flex space-x-1 mb-4">
          {meditation.steps.map((step, index) => (
            <div
              key={step.id}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              {index < currentStepIndex ? (
                <div className="h-full w-full bg-white" />
              ) : index === currentStepIndex ? (
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width: `${((progress - index * segmentWidth) / segmentWidth) * 100}%`,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h3 className="font-medium text-sm">{meditation.title}</h3>
            <p className="text-xs text-white/70">By {meditation.author}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation(); // prevents tap areas from hijacking
              handleClose();
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tap areas for navigation */}
      <div className="absolute inset-0 z-20 flex">
        <div
          className="w-1/2 h-full"
          onClick={(e) => {
            e.stopPropagation();
            handleTap("left");
          }}
        />
        <div
          className="w-1/2 h-full"
          onClick={(e) => {
            e.stopPropagation();
            handleTap("right");
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-8 text-center">
        {currentStep.type === "breathing" && (
          <div className="relative">
            <div
              className={`w-40 h-40 rounded-full border-4 border-white/50 flex items-center justify-center
                ${
                  currentStep.action === "Breathe in"
                    ? "animate-[pulse_4s_ease-in-out_infinite]"
                    : currentStep.action === "Hold"
                      ? "scale-100"
                      : "animate-[pulse_4s_ease-in-out_infinite_reverse]"
                }`}
            >
              <span className="text-white text-xl font-light">
                {currentStep.action}
              </span>
            </div>
          </div>
        )}

        {currentStep.type !== "breathing" && (
          <>
            <h2 className="text-white text-2xl text-right font-medium mb-4">
              {currentStep.text}
            </h2>
            {currentStep.subtext && (
              <p className="text-white/80 text-lg text-left">
                {currentStep.subtext}
              </p>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={togglePause}
        >
          {isPaused ? (
            <Play className="h-5 w-5" />
          ) : (
            <Pause className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
