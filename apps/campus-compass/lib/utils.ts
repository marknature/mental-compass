import { clsx, type ClassValue } from "clsx";
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
