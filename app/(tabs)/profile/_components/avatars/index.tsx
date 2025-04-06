import { MindfulnessAvatar } from "./mindfulness-avatar";
import { GrowthAvatar } from "./growth-avatar";
import { CalmAvatar } from "./calm-avatar";
import { HealingAvatar } from "./healing-avatar";
import { ResilienceAvatar } from "./resilience-avatar";
import { BalanceAvatar } from "./balance-avatar";

// Mental health themed avatars
export const avatarOptions = [
  {
    id: "mindfulness",
    component: MindfulnessAvatar,
    alt: "Mindfulness meditation avatar",
  },
  {
    id: "growth",
    component: GrowthAvatar,
    alt: "Personal growth avatar",
  },
  {
    id: "balance",
    component: BalanceAvatar,
    alt: "Balance and harmony avatar",
  },
  {
    id: "calm",
    component: CalmAvatar,
    alt: "Calm and peaceful avatar",
  },
  {
    id: "resilience",
    component: ResilienceAvatar,
    alt: "Resilience avatar",
  },
  {
    id: "healing",
    component: HealingAvatar,
    alt: "Healing journey avatar",
  },
];
