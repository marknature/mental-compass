import {
  type MeditationContent,
  formatDuration,
  calculateTotalDuration,
} from "./meditation-types";

// Standardized meditation content with steps
export const guidedMeditations: MeditationContent[] = [
  {
    id: "morning-calm",
    title: "Morning Calm",
    description:
      "Start your day with clarity and purpose. This guided meditation helps you set positive intentions for the day ahead.",
    author: "Dr. Emma Rodriguez",
    category: "Morning",
    coverImage: "/placeholder.svg?height=128&width=260&text=Morning+Calm",
    steps: [
      {
        id: "intro-1",
        type: "intro",
        text: "Morning Calm",
        subtext: "Find a comfortable position and close your eyes",
        duration: 5,
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
      {
        id: "breathing-1",
        type: "breathing",
        text: "Breathing Exercise",
        duration: 20,
        action: "Breathe in",
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
      {
        id: "breathing-2",
        type: "breathing",
        text: "Breathing Exercise",
        duration: 10,
        action: "Hold",
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
      {
        id: "breathing-3",
        type: "breathing",
        text: "Breathing Exercise",
        duration: 20,
        action: "Breathe out",
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
      {
        id: "guidance-1",
        type: "guidance",
        text: "Set Your Intention",
        subtext: "Think about one positive intention for your day",
        duration: 15,
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
      {
        id: "reflection-1",
        type: "reflection",
        text: "Visualize Your Day",
        subtext: "See yourself moving through your day with ease and purpose",
        duration: 20,
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
      {
        id: "ending-1",
        type: "ending",
        text: "Bring your awareness back",
        subtext: "Slowly open your eyes and carry your intention with you",
        duration: 10,
        background: "linear-gradient(to bottom, #4f46e5, #7c3aed)",
      },
    ],
    isNew: true,
    duration: "1:40", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
  {
    id: "stress-relief",
    title: "Stress Relief",
    description:
      "Release tension and find your center with this calming meditation designed to reduce stress and anxiety.",
    author: "Michael Chen",
    category: "Anxiety",
    coverImage: "/placeholder.svg?height=128&width=260&text=Stress+Relief",
    steps: [
      {
        id: "intro-1",
        type: "intro",
        text: "Stress Relief",
        subtext: "Find a quiet space where you won't be disturbed",
        duration: 5,
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
      {
        id: "guidance-1",
        type: "guidance",
        text: "Body Scan",
        subtext: "Notice any areas of tension in your body",
        duration: 15,
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
      {
        id: "breathing-1",
        type: "breathing",
        text: "Deep Breathing",
        duration: 20,
        action: "Breathe in",
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
      {
        id: "breathing-2",
        type: "breathing",
        text: "Deep Breathing",
        duration: 20,
        action: "Breathe out",
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
      {
        id: "guidance-2",
        type: "guidance",
        text: "Release Tension",
        subtext: "With each exhale, let go of stress and worry",
        duration: 30,
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
      {
        id: "reflection-1",
        type: "reflection",
        text: "Peaceful Visualization",
        subtext: "Imagine yourself in a calm, peaceful place",
        duration: 30,
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
      {
        id: "ending-1",
        type: "ending",
        text: "Return to Awareness",
        subtext: "Bring your attention back to your surroundings",
        duration: 10,
        background: "linear-gradient(to bottom, #0ea5e9, #2563eb)",
      },
    ],
    duration: "2:10", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
  {
    id: "deep-sleep",
    title: "Deep Sleep Journey",
    description:
      "Prepare your mind and body for restful sleep with this gentle meditation designed to help you drift off peacefully.",
    author: "Sarah Johnson",
    category: "Sleep",
    coverImage: "/placeholder.svg?height=128&width=260&text=Deep+Sleep",
    steps: [
      {
        id: "intro-1",
        type: "intro",
        text: "Deep Sleep Journey",
        subtext: "Lie down comfortably in your bed",
        duration: 5,
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      {
        id: "guidance-1",
        type: "guidance",
        text: "Relax Your Body",
        subtext: "Starting from your toes, relax each part of your body",
        duration: 30,
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      {
        id: "breathing-1",
        type: "breathing",
        text: "Slow Breathing",
        duration: 15,
        action: "Breathe in",
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      {
        id: "breathing-2",
        type: "breathing",
        text: "Slow Breathing",
        duration: 20,
        action: "Breathe out",
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      {
        id: "guidance-2",
        type: "guidance",
        text: "Let Go of Thoughts",
        subtext: "Watch your thoughts float away like clouds",
        duration: 30,
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      {
        id: "reflection-1",
        type: "reflection",
        text: "Peaceful Scene",
        subtext: "Imagine a peaceful scene that brings you comfort",
        duration: 40,
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
      {
        id: "ending-1",
        type: "ending",
        text: "Drift Into Sleep",
        subtext: "Allow yourself to drift peacefully into sleep",
        duration: 20,
        background: "linear-gradient(to bottom, #1e293b, #0f172a)",
      },
    ],
    duration: "2:40", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
  {
    id: "focus-clarity",
    title: "Focus & Clarity",
    description:
      "Sharpen your concentration and mental clarity with this meditation designed for students before study sessions.",
    author: "Prof. David Williams",
    category: "Focus",
    coverImage: "/placeholder.svg?height=128&width=260&text=Focus+Clarity",
    steps: [
      {
        id: "intro-1",
        type: "intro",
        text: "Focus & Clarity",
        subtext: "Sit in a comfortable position with a straight back",
        duration: 5,
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
      {
        id: "guidance-1",
        type: "guidance",
        text: "Center Your Mind",
        subtext: "Bring your attention to the present moment",
        duration: 15,
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
      {
        id: "breathing-1",
        type: "breathing",
        text: "Focused Breathing",
        duration: 15,
        action: "Breathe in",
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
      {
        id: "breathing-2",
        type: "breathing",
        text: "Focused Breathing",
        duration: 15,
        action: "Breathe out",
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
      {
        id: "guidance-2",
        type: "guidance",
        text: "Sharpen Your Focus",
        subtext: "Direct your attention to a single point of focus",
        duration: 20,
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
      {
        id: "reflection-1",
        type: "reflection",
        text: "Mental Clarity",
        subtext: "Visualize your mind becoming clear and focused",
        duration: 20,
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
      {
        id: "ending-1",
        type: "ending",
        text: "Ready to Focus",
        subtext: "Open your eyes with renewed concentration",
        duration: 5,
        background: "linear-gradient(to bottom, #f97316, #ea580c)",
      },
    ],
    isNew: true,
    duration: "1:35", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    description:
      "Cultivate a mindset of thankfulness and appreciation with this guided gratitude meditation.",
    author: "Lisa Thompson",
    category: "Gratitude",
    coverImage: "/placeholder.svg?height=128&width=260&text=Gratitude",
    steps: [
      {
        id: "intro-1",
        type: "intro",
        text: "Gratitude Practice",
        subtext: "Find a comfortable seated position",
        duration: 5,
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
      {
        id: "guidance-1",
        type: "guidance",
        text: "Connect with Your Heart",
        subtext: "Place your hand on your heart and take a few deep breaths",
        duration: 15,
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
      {
        id: "breathing-1",
        type: "breathing",
        text: "Heart-Centered Breathing",
        duration: 15,
        action: "Breathe in",
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
      {
        id: "breathing-2",
        type: "breathing",
        text: "Heart-Centered Breathing",
        duration: 15,
        action: "Breathe out",
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
      {
        id: "guidance-2",
        type: "guidance",
        text: "Reflect on Gratitude",
        subtext: "Think of three things you're grateful for today",
        duration: 30,
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
      {
        id: "reflection-1",
        type: "reflection",
        text: "Feel the Appreciation",
        subtext: "Allow feelings of gratitude to fill your heart",
        duration: 20,
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
      {
        id: "ending-1",
        type: "ending",
        text: "Carry Gratitude Forward",
        subtext: "Take this feeling of gratitude with you throughout your day",
        duration: 10,
        background: "linear-gradient(to bottom, #16a34a, #15803d)",
      },
    ],
    duration: "1:50", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
];

// Calculate and set the duration for each meditation
guidedMeditations.forEach((meditation) => {
  meditation.totalDuration = calculateTotalDuration(meditation.steps);
  meditation.duration = formatDuration(meditation.totalDuration);
});
