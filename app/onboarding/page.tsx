"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding, OnboardingProvider } from "@/lib/hooks/useOnboarding";
import { OnboardingFlow } from "./_components/onboarding-flow";

function OnboardingContent() {
  const { isOnboardingComplete } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (isOnboardingComplete) {
      router.push("/");
    }
  }, [isOnboardingComplete, router]);

  return <OnboardingFlow />;
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
