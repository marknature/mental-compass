"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Smile, Meh, Frown, Moon, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/lib/hooks/useOnboarding";

export function AssessmentStep() {
  const { nextStep, userData, updateUserData } = useOnboarding();
  const [mood, setMood] = useState(userData.initialMood);
  const [sleep, setSleep] = useState(userData.sleepQuality);
  const [stress, setStress] = useState(userData.stressLevel);

  const handleContinue = () => {
    updateUserData({
      initialMood: mood,
      sleepQuality: sleep,
      stressLevel: stress,
    });
    nextStep();
  };

  const getMoodIcon = (value: number) => {
    if (value >= 7) return <Smile className="h-6 w-6" />;
    if (value >= 4) return <Meh className="h-6 w-6" />;
    return <Frown className="h-6 w-6" />;
  };

  const getMoodColor = (value: number) => {
    if (value >= 7) return "text-green-500";
    if (value >= 4) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col px-6 py-8 min-h-screen"
    >
      <h2 className="text-xl font-bold mt-16 mb-5">Quick Assessment</h2>
      <p className="text-muted-foreground mb-6">
        Let's understand how you're feeling to personalize your experience
      </p>

      <div className="flex-1 space-y-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">How are you feeling today?</h3>
            <div className={getMoodColor(mood)}>{getMoodIcon(mood)}</div>
          </div>
          <Slider
            value={[mood]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setMood(value[0])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Not great</span>
            <span>Okay</span>
            <span>Great</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">How's your sleep quality?</h3>
            <Moon className="h-5 w-5 text-primary" />
          </div>
          <Slider
            value={[sleep]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setSleep(value[0])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Poor</span>
            <span>Average</span>
            <span>Excellent</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Current stress level?</h3>
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <Slider
            value={[stress]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setStress(value[0])}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
        </motion.div>
      </div>

      <Button className="w-full" onClick={handleContinue}>
        Continue
      </Button>
    </motion.div>
  );
}
