import { clsx, type ClassValue } from "clsx";
import { Smile, Meh, Frown, Dumbbell, Moon, Users } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(timestamp: string) {
  const dateObj = new Date(timestamp);

  const date = dateObj.toISOString().split("T")[0];

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 24h to 12h format

  const time = `${formattedHours}:${minutes} ${ampm}`;

  return { date, time };
}

export const getMoodText = (score: number) => {
  if (score >= 8) return "Great";
  if (score >= 6) return "Good";
  if (score >= 4) return "Okay";
  if (score >= 2) return "Low";
  return "Very Low";
};

export const getMoodColor = (score: number) => {
  if (score >= 8) return " text-green-600 dark:text-green-300";
  if (score >= 6) return " text-emerald-600  dark:text-emerald-300";
  if (score >= 4) return " text-yellow-600 dark:text-yellow-300";
  if (score >= 2) return " text-orange-600  dark:text-orange-300";
  return " text-red-600 dark:text-red-300";
};

export const getMoodIcon = (score: number) => {
  if (score >= 7) return <Smile className="h-5 w-5" />;
  if (score >= 4) return <Meh className="h-5 w-5" />;
  return <Frown className="h-5 w-5" />;
};

export const getCorrelationInsights = () => {
  return [
    {
      title: "Exercise boosts your mood",
      text: "On days you exercise, your mood score is 30% higher on average.",
      icon: <Dumbbell className="h-4 w-4" />,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Sleep affects your energy",
      text: "You report higher energy levels when you sleep more than 7 hours.",
      icon: <Moon className="h-4 w-4" />,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
    },
    {
      title: "Social time improves mood",
      text: "Your mood is typically better on days with social activities.",
      icon: <Users className="h-4 w-4" />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
  ];
};

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
