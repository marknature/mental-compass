"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/lib/hooks/useOnboarding";
import { motion } from "framer-motion";

const wellnessGoals = [
  { id: "stress", label: "Reduce stress and anxiety" },
  { id: "mindfulness", label: "Practice mindfulness" },
  { id: "mood", label: "Improve mood" },
  { id: "focus", label: "Enhance focus and concentration" },
  { id: "social", label: "Build better social connections" },
  { id: "resilience", label: "Develop emotional resilience" },
  { id: "balance", label: "Create better work-life balance" },
];

const interests = [
  { id: "meditation", label: "Meditation" },
  { id: "journaling", label: "Journaling" },
  { id: "exercise", label: "Physical exercise" },
  { id: "reading", label: "Reading" },
  { id: "music", label: "Music" },
];

export function GoalsStep() {
  const { nextStep, userData, updateUserData } = useOnboarding();

  const toggleGoal = (goalId: string) => {
    const updatedGoals = userData.goals.includes(goalId)
      ? userData.goals.filter((id) => id !== goalId)
      : [...userData.goals, goalId];
    updateUserData({ goals: updatedGoals });
  };

  const toggleInterest = (interestId: string) => {
    const updatedInterests = userData.interests.includes(interestId)
      ? userData.interests.filter((id) => id !== interestId)
      : [...userData.interests, interestId];
    updateUserData({ interests: updatedInterests });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col px-6 py-8 h-full"
    >
      <h2 className="text-xl font-bold mb-2">Your Wellness Goals</h2>
      <p className="text-muted-foreground mb-6">
        Select what you'd like to focus on (choose at least one)
      </p>

      <div className="flex-1 space-y-6 mb-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="font-medium">Goals</h3>
          <div className="grid grid-cols-1 gap-2">
            {wellnessGoals.map((goal, index) => (
              <div
                key={goal.id}
                className="flex items-center space-x-2 rounded-md border p-3"
              >
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={userData.goals.includes(goal.id)}
                  onCheckedChange={() => toggleGoal(goal.id)}
                />
                <Label
                  htmlFor={`goal-${goal.id}`}
                  className="flex-1 cursor-pointer"
                >
                  {goal.label}
                </Label>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h3 className="font-medium">Interests</h3>
          <div className="grid grid-cols-1 gap-2">
            {interests.map((interest) => (
              <div
                key={interest.id}
                className="flex items-center space-x-2 rounded-md border p-3"
              >
                <Checkbox
                  id={`interest-${interest.id}`}
                  checked={userData.interests.includes(interest.id)}
                  onCheckedChange={() => toggleInterest(interest.id)}
                />
                <Label
                  htmlFor={`interest-${interest.id}`}
                  className="flex-1 cursor-pointer"
                >
                  {interest.label}
                </Label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Button
        className="w-full"
        onClick={nextStep}
        disabled={userData.goals.length === 0}
      >
        Continue
      </Button>
    </motion.div>
  );
}
