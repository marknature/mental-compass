import {
  type MeditationContent,
  formatDuration,
  calculateTotalDuration,
} from "./meditation-types";

// Updated meditation content with steps that follow the guided prayer format
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
        id: "welcome-1",
        type: "intro",
        category: "WELCOME",
        text: "Right now, invite peace into this time of meditation, and allow any distractions to fade away.",
        subtext: "This is a safe space to connect with your inner self.",
        duration: 10,
        background: "#FAE8E1",
      },
      {
        id: "mindfulness-1",
        type: "guidance",
        category: "MINDFULNESS",
        text: "Bring awareness to your breathing",
        subtext:
          "Notice how your breath flows in and out naturally, without effort.",
        guidance: "Keep your attention centered on the present moment.",
        duration: 15,
        background: "#FAE8E1",
      },
      {
        id: "breathing-1",
        type: "breathing",
        category: "BREATHWORK",
        text: "Deep Breathing",
        action: "Breathe in",
        duration: 4,
        background: "#FAE8E1",
      },
      {
        id: "breathing-2",
        type: "breathing",
        category: "BREATHWORK",
        text: "Deep Breathing",
        action: "Hold",
        duration: 4,
        background: "#FAE8E1",
      },
      {
        id: "breathing-3",
        type: "breathing",
        category: "BREATHWORK",
        text: "Deep Breathing",
        action: "Breathe out",
        duration: 6,
        background: "#FAE8E1",
      },
      {
        id: "intention-1",
        type: "reflection",
        category: "SET INTENTION",
        text: "Set your intention for the day",
        subtext: "What quality would you like to bring into your day?",
        guidance: "Perhaps clarity, compassion, courage, or patience.",
        duration: 20,
        background: "#FAE8E1",
      },
      {
        id: "gratitude-1",
        type: "guidance",
        category: "GRATITUDE",
        text: "Take a moment to appreciate",
        subtext: "Notice three things you're grateful for right now.",
        guidance:
          "They can be simple: your breath, the comfort of where you're sitting, or the quiet moment you're experiencing.",
        duration: 25,
        background: "#FAE8E1",
      },
      {
        id: "ending-1",
        type: "ending",
        category: "CLOSING",
        text: "Carry this peaceful energy with you",
        subtext: "Slowly bring your awareness back to your surroundings.",
        guidance:
          "Remember you can return to this calm state anytime during your day.",
        duration: 10,
        background: "#FAE8E1",
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
        id: "welcome-1",
        type: "intro",
        category: "WELCOME",
        text: "In this moment, invite calm into your mind and body.",
        subtext: "This is a safe space to release tension and find peace.",
        duration: 10,
        background: "#FAE8E1",
      },
      {
        id: "wisdom-1",
        type: "reflection",
        category: "WISDOM",
        text: "Our temporary struggles are teaching us resilience.",
        subtext: "You are growing stronger through each challenge you face.",
        scripture: {
          text: "For our light and momentary troubles are achieving for us an eternal strength that far outweighs them all.",
          reference: "Ancient Wisdom",
        },
        duration: 20,
        background: "#FAE8E1",
      },
      {
        id: "body-scan",
        type: "guidance",
        category: "BODY AWARENESS",
        text: "Notice where you're holding tension",
        subtext: "Scan your body from head to toe, observing without judgment.",
        guidance:
          "As you identify areas of tension, imagine them softening and releasing with each breath.",
        duration: 30,
        background: "#FAE8E1",
      },
      {
        id: "breathing-1",
        type: "breathing",
        category: "BREATHWORK",
        text: "Calming Breath",
        action: "Breathe in",
        duration: 4,
        background: "#FAE8E1",
      },
      {
        id: "breathing-2",
        type: "breathing",
        category: "BREATHWORK",
        text: "Calming Breath",
        action: "Breathe out",
        duration: 6,
        background: "#FAE8E1",
      },
      {
        id: "concerns-1",
        type: "reflection",
        category: "MY CONCERNS",
        text: "Acknowledge what's troubling you",
        subtext: "You are not alone in your struggles.",
        guidance:
          "Bring awareness to your concerns, then imagine releasing them with each exhale.",
        actionButton: {
          text: "Note a Concern",
          action: () => console.log("Note concern clicked"),
        },
        duration: 25,
        background: "#FAE8E1",
      },
      {
        id: "protection-1",
        type: "guidance",
        category: "MENTAL PROTECTION",
        text: "Create a boundary around your mind",
        subtext:
          "I choose to let go of thoughts that don't serve my wellbeing. I make room for peace and clarity in my mind.",
        guidance:
          "Visualize a protective bubble around you, keeping stress out and calm in.",
        duration: 20,
        background: "#FAE8E1",
      },
      {
        id: "ending-1",
        type: "ending",
        category: "CLOSING",
        text: "Return to awareness with renewed calm",
        subtext:
          "Carry this peaceful feeling with you as you continue your day.",
        duration: 15,
        background: "#FAE8E1",
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
        id: "welcome-1",
        type: "intro",
        category: "WELCOME",
        text: "As you prepare for sleep, allow your body to sink into comfort.",
        subtext: "This is a safe space to let go of the day's concerns.",
        duration: 15,
        background: "#FAE8E1",
      },
      {
        id: "gratitude-1",
        type: "reflection",
        category: "EVENING GRATITUDE",
        text: "Reflect on moments of grace from today",
        subtext:
          "Even in challenging days, there are small blessings to acknowledge.",
        guidance:
          "Think of three good things, however small, that happened today.",
        duration: 20,
        background: "#FAE8E1",
      },
      {
        id: "body-scan",
        type: "guidance",
        category: "RELEASE TENSION",
        text: "Let your body grow heavy and relaxed",
        subtext:
          "Starting from your toes and moving upward, release all tension.",
        guidance:
          "With each exhale, feel yourself sinking deeper into relaxation.",
        duration: 30,
        background: "#FAE8E1",
      },
      {
        id: "breathing-1",
        type: "breathing",
        category: "SLEEP BREATH",
        text: "Slow, Deep Breathing",
        action: "Breathe in",
        duration: 4,
        background: "#FAE8E1",
      },
      {
        id: "breathing-2",
        type: "breathing",
        category: "SLEEP BREATH",
        text: "Slow, Deep Breathing",
        action: "Breathe out",
        duration: 8,
        background: "#FAE8E1",
      },
      {
        id: "protection-1",
        type: "guidance",
        category: "NIGHT PROTECTION",
        text: "Create a peaceful space for your sleep",
        subtext:
          "I release worries about tomorrow. My mind is calm, my body is safe, and I welcome deep, restful sleep.",
        guidance:
          "Imagine a gentle, protective light surrounding you as you prepare to sleep.",
        duration: 25,
        background: "#FAE8E1",
      },
      {
        id: "ending-1",
        type: "ending",
        category: "DRIFTING OFF",
        text: "Allow yourself to drift toward sleep",
        subtext: "There's nothing more you need to do now except rest.",
        guidance:
          "Your body knows how to sleep. Simply allow it to happen naturally.",
        duration: 20,
        background: "#FAE8E1",
      },
    ],
    duration: "2:02", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
  {
    id: "focus-clarity",
    title: "Focus & Clarity",
    description:
      "Sharpen your concentration and mental clarity with this meditation designed for enhanced focus and productivity.",
    author: "Prof. David Williams",
    category: "Focus",
    coverImage: "/placeholder.svg?height=128&width=260&text=Focus+Clarity",
    steps: [
      {
        id: "welcome-1",
        type: "intro",
        category: "WELCOME",
        text: "This is a time to sharpen your mind and enhance your focus.",
        subtext: "Let go of distractions and prepare for clear thinking.",
        duration: 10,
        background: "#FAE8E1",
      },
      {
        id: "wisdom-1",
        type: "reflection",
        category: "MENTAL CLARITY",
        text: "A focused mind is a powerful tool",
        scripture: {
          text: "Where attention goes, energy flows. Direct your focus wisely and your mind will serve you well.",
          reference: "Modern Wisdom",
        },
        duration: 15,
        background: "#FAE8E1",
      },
      {
        id: "breathing-1",
        type: "breathing",
        category: "ATTENTION BREATH",
        text: "Focus on Breath",
        action: "Breathe in",
        duration: 4,
        background: "#FAE8E1",
      },
      {
        id: "breathing-2",
        type: "breathing",
        category: "ATTENTION BREATH",
        text: "Focus on Breath",
        action: "Breathe out",
        duration: 6,
        background: "#FAE8E1",
      },
      {
        id: "guidance-1",
        type: "guidance",
        category: "CONCENTRATION",
        text: "Direct your attention to a single point",
        subtext:
          "Like training a muscle, focus requires practice and patience.",
        guidance:
          "Choose one point of focus - perhaps your breath, a mental image, or a feeling of purpose.",
        duration: 25,
        background: "#FAE8E1",
      },
      {
        id: "intention-1",
        type: "reflection",
        category: "SET PURPOSE",
        text: "Set your intention for your task ahead",
        subtext: "What do you hope to accomplish? Why is it meaningful?",
        guidance:
          "Clearly visualize successfully completing your upcoming task.",
        actionButton: {
          text: "Note Task Priority",
          action: () => console.log("Note priority clicked"),
        },
        duration: 20,
        background: "#FAE8E1",
      },
      {
        id: "ending-1",
        type: "ending",
        category: "ACTIVATION",
        text: "Bring this focused energy into your next activity",
        subtext: "You're now prepared to engage with clarity and purpose.",
        guidance:
          "Take this mental clarity with you as you transition to your task.",
        duration: 10,
        background: "#FAE8E1",
      },
    ],
    isNew: true,
    duration: "1:30", // Will be calculated
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
        id: "welcome-1",
        type: "intro",
        category: "WELCOME",
        text: "This is a time to recognize and appreciate the good in your life.",
        subtext: "Gratitude opens our hearts and calms our minds.",
        duration: 10,
        background: "#FAE8E1",
      },
      {
        id: "wisdom-1",
        type: "reflection",
        category: "APPRECIATION",
        text: "Gratitude transforms our perspective",
        scripture: {
          text: "When we focus on our gratitude, the tide of disappointment goes out and the tide of love rushes in.",
          reference: "Kristin Armstrong",
        },
        duration: 15,
        background: "#FAE8E1",
      },
      {
        id: "breathing-1",
        type: "breathing",
        category: "HEART BREATH",
        text: "Heart-Centered Breathing",
        action: "Breathe in",
        duration: 4,
        background: "#FAE8E1",
      },
      {
        id: "breathing-2",
        type: "breathing",
        category: "HEART BREATH",
        text: "Heart-Centered Breathing",
        action: "Breathe out",
        duration: 6,
        background: "#FAE8E1",
      },
      {
        id: "gratitude-1",
        type: "guidance",
        category: "RECOGNIZE BLESSINGS",
        text: "Think of three specific things you're grateful for",
        subtext: "They can be significant or simple everyday blessings.",
        guidance:
          "For each one, take time to really feel the appreciation in your body.",
        actionButton: {
          text: "Add to Gratitude Journal",
          action: () => console.log("Add to journal clicked"),
        },
        duration: 30,
        background: "#FAE8E1",
      },
      {
        id: "gratitude-2",
        type: "reflection",
        category: "APPRECIATE YOURSELF",
        text: "Acknowledge your own positive qualities",
        subtext: "What strengths or efforts can you appreciate about yourself?",
        guidance: "Practice self-appreciation without judgment or criticism.",
        duration: 20,
        background: "#FAE8E1",
      },
      {
        id: "ending-1",
        type: "ending",
        category: "CLOSING",
        text: "Carry this feeling of gratitude forward",
        subtext:
          "Notice how appreciation can shift your perspective throughout the day.",
        guidance: "Return to gratitude whenever you need to center yourself.",
        duration: 15,
        background: "#FAE8E1",
      },
    ],
    duration: "1:50", // Will be calculated
    totalDuration: 0, // Will be calculated
  },
];

// Add a new meditation focused on self-compassion
const selfCompassionMeditation = {
  id: "self-compassion",
  title: "Self-Compassion",
  description:
    "Develop kindness toward yourself and nurture your emotional wellbeing with this gentle meditation.",
  author: "Dr. Maya Collins",
  category: "Self-Care",
  coverImage: "/placeholder.svg?height=128&width=260&text=Self+Compassion",
  steps: [
    {
      id: "welcome-1",
      type: "intro",
      category: "WELCOME",
      text: "This is a time to be gentle with yourself.",
      subtext: "You deserve the same compassion you offer to others.",
      duration: 10,
      background: "#FAE8E1",
    },
    {
      id: "wisdom-1",
      type: "reflection",
      category: "SELF-KINDNESS",
      text: "Practice speaking to yourself with kindness",
      scripture: {
        text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
        reference: "Buddha",
      },
      duration: 20,
      background: "#FAE8E1",
    },
    {
      id: "breathing-1",
      type: "breathing",
      category: "COMPASSION BREATH",
      text: "Soothing Breath",
      action: "Breathe in care",
      duration: 4,
      background: "#FAE8E1",
    },
    {
      id: "breathing-2",
      type: "breathing",
      category: "COMPASSION BREATH",
      text: "Soothing Breath",
      action: "Release judgment",
      duration: 6,
      background: "#FAE8E1",
    },
    {
      id: "guidance-1",
      type: "guidance",
      category: "INNER KINDNESS",
      text: "Place a hand on your heart",
      subtext: "Feel the warmth and care in your own touch.",
      guidance:
        "Offer yourself words of kindness that you need to hear right now.",
      duration: 25,
      background: "#FAE8E1",
    },
    {
      id: "concerns-1",
      type: "reflection",
      category: "ACKNOWLEDGE DIFFICULTY",
      text: "Recognize that everyone struggles",
      subtext: "Suffering is part of the shared human experience.",
      guidance:
        "What challenge are you facing that you can meet with kindness?",
      actionButton: {
        text: "Write a Self-Compassion Note",
        action: () => console.log("Write note clicked"),
      },
      duration: 20,
      background: "#FAE8E1",
    },
    {
      id: "protection-1",
      type: "guidance",
      category: "EMOTIONAL SAFETY",
      text: "I am worthy of kindness and understanding",
      subtext:
        "I choose to release self-criticism and embrace self-compassion.",
      guidance:
        "Imagine wrapping yourself in a warm blanket of acceptance and care.",
      duration: 20,
      background: "#FAE8E1",
    },
    {
      id: "ending-1",
      type: "ending",
      category: "CLOSING",
      text: "Carry this self-compassion with you",
      subtext: "Remember to treat yourself with the kindness you deserve.",
      guidance: "You can return to this practice whenever you need support.",
      duration: 10,
      background: "#FAE8E1",
    },
  ],
  duration: "1:55", // Will be calculated
  totalDuration: 0, // Will be calculated
};

// Add the new meditation to the array
guidedMeditations.push(selfCompassionMeditation);

// Calculate and set the duration for each meditation
guidedMeditations.forEach((meditation) => {
  meditation.totalDuration = calculateTotalDuration(meditation.steps);
  meditation.duration = formatDuration(meditation.totalDuration);
});
