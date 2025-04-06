export interface MeditationStep {
  id: string;
  type: "intro" | "breathing" | "guidance" | "reflection" | "ending";
  text: string;
  subtext?: string;
  duration: number; // in seconds
  background?: string; // color or gradient
  backgroundImage?: string; // URL to image
  action?: string; // instruction like "Breathe in" or "Hold"
}

export interface MeditationContent {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  duration: string; // formatted duration (e.g., "5:30")
  totalDuration: number; // total seconds
  steps: MeditationStep[];
  isNew?: boolean;
}

// Helper function to calculate total duration from steps
export function calculateTotalDuration(steps: MeditationStep[]): number {
  return steps.reduce((total, step) => total + step.duration, 0);
}

// Helper function to format seconds to mm:ss
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
