"use client";
import { useState, useEffect, useRef } from "react";
import type { MeditationContent } from "@/lib/meditation-types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  // Function to determine if the current step has a scripture or quote
  const hasScripture = () => {
    return currentStep.scripture && currentStep.scripture.text;
  };

  // Function for action buttons like "Add Prayer" or "Review Prayer List"
  const renderActionButton = () => {
    if (currentStep.actionButton) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            variant="outline"
            className="mt-4 rounded-full border-muted"
            onClick={currentStep.actionButton.action}
          >
            {currentStep.actionButton.text}
          </Button>
        </motion.div>
      );
    }
    return null;
  };

  // Animation variants for text elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 },
    }),
  };

  // Function to determine breathing action styling based on current step
  const getBreathingInfo = () => {
    if (!currentStep.action) return { type: "breathe" };

    const action = currentStep.action.toLowerCase();

    if (action.includes("in")) {
      return {
        type: "in",
        text: "inhale",
      };
    } else if (action.includes("hold")) {
      return {
        type: "hold",
        text: "hold",
      };
    } else {
      return {
        type: "out",
        text: "exhale",
      };
    }
  };

  // Render breathing animation
  const renderBreathingAnimation = () => {
    const { type, text } = getBreathingInfo();

    const pulseVariants = {
      in: {
        scale: [1, 1.5],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
      hold: {
        scale: 1.5,
        transition: {
          duration: 0.5,
        },
      },
      out: {
        scale: [1.5, 1],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    };

    return (
      <div className="flex flex-col items-center justify-center">
        {/* Main breathing circle */}
        <div className="relative flex justify-center items-center">
          <motion.div
            className="rounded-full bg-primary/50"
            variants={pulseVariants}
            animate={type}
            initial={{ scale: type === "in" ? 1 : 1.1 }}
            style={{ width: "180px", height: "180px" }}
          >
            {/* Inner white circle */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/25 rounded-full flex items-center justify-center"
              style={{ width: "120px", height: "120px" }}
            />
          </motion.div>
        </div>

        <div className="text-center mt-20 absolute top-[500px]">
          <p className="text-xl font-medium block capitalize">{text}</p>
          <p className="text-sm font-medium text-muted-foreground block">
            Release all the stress and anxiety
          </p>
        </div>

        {/* Additional guidance text */}
        {currentStep.guidance && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-muted-foreground text-center mt-8 max-w-xs"
          >
            {currentStep.guidance}
          </motion.p>
        )}
      </div>
    );
  };

  // Optional: If you want a simple standalone version for testing
  const BreathingExercise = () => {
    const [breathingState, setBreathingState] = useState("in");

    useEffect(() => {
      const breathingCycle = () => {
        // Inhale for 4 seconds
        setBreathingState("in");
        setTimeout(() => {
          // Hold for 4 seconds
          setBreathingState("hold");
          setTimeout(() => {
            // Exhale for 4 seconds
            setBreathingState("out");
            setTimeout(() => {
              // Start the cycle again
              breathingCycle();
            }, 4000);
          }, 4000);
        }, 4000);
      };

      breathingCycle();
      return () => clearTimeout();
    }, []);

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="relative flex justify-center items-center">
          <motion.div
            className="rounded-full bg-accent"
            animate={{
              scale:
                breathingState === "in"
                  ? [1, 1.5]
                  : breathingState === "hold"
                    ? 1.5
                    : [1.5, 1],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: breathingState !== "hold" ? Infinity : 0,
              repeatType: "reverse",
            }}
            style={{ width: "280px", height: "280px" }}
          >
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-full flex items-center justify-center"
              style={{ width: "120px", height: "120px" }}
            >
              <span className="text-primary text-xl font-medium">
                {breathingState === "in"
                  ? "inhale"
                  : breathingState === "hold"
                    ? "hold"
                    : "exhale"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }; // Simple countdown timer component
  const CountdownTimer = ({
    duration,
    isPaused,
  }: {
    duration: number;
    isPaused: boolean;
  }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
      setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
      if (isPaused) return;

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [isPaused]);

    return <>{Math.ceil(timeLeft)}</>;
  };

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col bg-muted/20"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with step title and close button */}
      <div className="absolute top-0 left-0 right-0 p-4 z-40">
        <div className="flex justify-between items-center mb-4">
          <AnimatePresence mode="wait">
            <motion.h3
              key={`category-${currentStepIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="font-medium text-sm uppercase tracking-wide text-muted-foreground"
            >
              {currentStep.category || currentStep.type}
            </motion.h3>
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-muted/20"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mb-4">
          {meditation.steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index <= currentStepIndex ? "bg-primary/70" : "bg-muted/30"
              }`}
            />
          ))}
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
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${currentStepIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep.type === "breathing" ? (
                renderBreathingAnimation()
              ) : (
                <>
                  {hasScripture() && (
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      className="mb-6"
                    >
                      <Card className="border-l-4 border-l-primary bg-transparent p-4 border-t-transparent border-b-transparent border-r-transparent rounded-none shadow-none">
                        <motion.p
                          variants={fadeInUp}
                          initial="hidden"
                          animate="visible"
                          custom={1}
                          className="text-card-foreground text-lg font-medium"
                        >
                          "{currentStep.scripture?.text}"
                        </motion.p>
                        {currentStep.scripture?.reference && (
                          <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                            className="text-muted-foreground text-sm mt-2"
                          >
                            {currentStep.scripture.reference}
                          </motion.p>
                        )}
                      </Card>
                    </motion.div>
                  )}
                  <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={hasScripture() ? 3 : 0}
                    className="text-foreground text-xl font-medium mb-3"
                  >
                    {currentStep.text}
                  </motion.h2>
                  {currentStep.subtext && (
                    <motion.p
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      custom={hasScripture() ? 4 : 1}
                      className="text-muted-foreground text-base"
                    >
                      {currentStep.subtext}
                    </motion.p>
                  )}
                  {currentStep.guidance && (
                    <motion.p
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      custom={hasScripture() ? 5 : currentStep.subtext ? 2 : 1}
                      className="text-muted-foreground text-base mt-4"
                    >
                      {currentStep.guidance}
                    </motion.p>
                  )}
                  {renderActionButton()}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted/20"
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
          className="text-foreground hover:bg-muted/20"
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
