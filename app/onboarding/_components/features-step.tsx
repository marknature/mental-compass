"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Calendar, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/lib/hooks/useOnboarding";

const features = [
  {
    icon: BookOpen,
    title: "Daily Journal",
    description: "Track your mood and reflect on your day",
    color: "bg-primary",
  },
  {
    icon: Headphones,
    title: "Guided Meditations",
    description: "Reduce stress with guided meditation sessions",
    color: "bg-primary/80",
  },
  {
    icon: TrendingUp,
    title: "Personalized Insights",
    description: "Gain insights into your mental well-being patterns",
    color: "bg-primary/50",
  },
  {
    icon: Calendar,
    title: "Wellness Events",
    description: "Join campus events and earn rewards",
    color: "bg-primary/30",
  },
];

export function FeaturesStep() {
  const { nextStep } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col px-6 py-8 min-h-screen"
    >
      <h2 className="text-xl font-bold mt-16 mb-5">Key Features</h2>
      <p className="text-muted-foreground mb-6">
        Here's how Mental Compass will help you on your wellness journey
      </p>

      <div className="flex-1 space-y-4 mb-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="flex items-start"
          >
            <div className={`p-3 rounded-full mr-4 ${feature.color}`}>
              <feature.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Button className="w-full" onClick={nextStep}>
        Continue
      </Button>
    </motion.div>
  );
}
