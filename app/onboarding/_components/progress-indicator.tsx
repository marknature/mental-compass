"use client";

import { useOnboarding } from "@/lib/hooks/useOnboarding";

export function ProgressIndicator() {
  const { currentStep } = useOnboarding();

  const steps = [
    "welcome",
    "features",
    "assessment",
    "profile",
    "goals",
    "complete",
  ];

  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full bg-muted h-1 fixed top-0 left-0 z-50">
      <div
        className="bg-primary h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
