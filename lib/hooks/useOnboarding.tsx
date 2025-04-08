"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type OnboardingStep =
  | "welcome"
  | "features"
  | "assessment"
  | "profile"
  | "goals"
  | "complete";

interface OnboardingContextType {
  currentStep: OnboardingStep;
  setCurrentStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  completeOnboarding: () => void;
  isOnboardingComplete: boolean;
}

interface UserData {
  name: string;
  avatar?: string;
  initialMood: number;
  sleepQuality: number;
  stressLevel: number;
  goals: string[];
  interests: string[];
}

const defaultUserData: UserData = {
  name: "",
  avatar: undefined,
  initialMood: 5,
  sleepQuality: 5,
  stressLevel: 5,
  goals: [],
  interests: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

const steps: OnboardingStep[] = [
  "welcome",
  "features",
  "assessment",
  "goals",
  "complete",
];

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // Check if onboarding is complete from localStorage on initial load
  useEffect(() => {
    const onboardingStatus = localStorage.getItem("onboardingComplete");
    if (onboardingStatus === "true") {
      setIsOnboardingComplete(true);
    }
  }, []);

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const completeOnboarding = () => {
    // Save user data to backend (in a real app)
    // For now, just mark onboarding as complete in localStorage
    localStorage.setItem("onboardingComplete", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        userData,
        updateUserData,
        completeOnboarding,
        isOnboardingComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
