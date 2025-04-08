"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/hooks/useOnboarding";

export function CompleteStep() {
  const { completeOnboarding, userData } = useOnboarding();
  const router = useRouter();

  const handleComplete = () => {
    completeOnboarding();
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-screen"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold mb-2"
      >
        You're All Set!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground mb-8"
      >
        Your personalized wellness journey is ready to begin
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4 w-full max-w-xs"
      >
        <p className="text-sm text-muted-foreground mb-6">
          We've customized your experience based on your preferences. Start
          exploring Campus Compass to improve your mental well-being.
        </p>
        <Button className="w-full" size="lg" onClick={handleComplete}>
          Get Started
        </Button>
      </motion.div>
    </motion.div>
  );
}
