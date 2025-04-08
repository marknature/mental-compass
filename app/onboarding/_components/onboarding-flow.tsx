"use client";

import { AnimatePresence } from "framer-motion";
import { WelcomeStep } from "./welcome-step";
import { FeaturesStep } from "./features-step";
import { AssessmentStep } from "./assessment-step";
import { GoalsStep } from "./goals-step";
import { CompleteStep } from "./complete-step";
import { ProgressIndicator } from "./progress-indicator";
import { useOnboarding } from "@/lib/hooks/useOnboarding";

export function OnboardingFlow() {
  const { currentStep } = useOnboarding();

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator />

      <AnimatePresence mode="wait">
        {currentStep === "welcome" && <WelcomeStep key="welcome" />}
        {currentStep === "features" && <FeaturesStep key="features" />}
        {currentStep === "assessment" && <AssessmentStep key="assessment" />}
        {currentStep === "goals" && <GoalsStep key="goals" />}
        {currentStep === "complete" && <CompleteStep key="complete" />}
      </AnimatePresence>
    </div>
  );
}
