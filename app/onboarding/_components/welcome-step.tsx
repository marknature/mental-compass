"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useOnboarding } from "@/lib/hooks/useOnboarding";

export function WelcomeStep() {
  const { nextStep } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-screen"
    >
      <div className="mb-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold mb-2"
        >
          Welcome to Campus Compass
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground"
        >
          Your personal guide to mental wellness on campus
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-4 w-full max-w-xs"
      >
        <p className="text-sm text-muted-foreground mb-6">
          Let's take a few moments to set up your personalized wellness journey.
        </p>
        <Button className="w-full" size="lg" onClick={nextStep}>
          Get Started
        </Button>
      </motion.div>
    </motion.div>
  );
}
