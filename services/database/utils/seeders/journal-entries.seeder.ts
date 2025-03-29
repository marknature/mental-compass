import { db } from "@db/index";
import journalEntries from "@models/journal-entries.schema";
import users from "@models/users.schema";

async function seedJournalEntries() {
  const [user] = await db.select({ id: users.id }).from(users).limit(1);
  try {
    for (const entry of journalData) {
      await db
        .insert(journalEntries)
        .values({ ...entry, userId: user.id.toString() });
    }

    console.log(`Seeded ${journalData.length} journal entries.`);
  } catch (error) {
    console.error("Error seeding journal entries:", error);
    process.exit(1);
  }
}

seedJournalEntries()
  .then(() => {
    console.log("Seeding completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding journal entries:", error);
    process.exit(1);
  });

const journalData = [
  {
    date: new Date("2023-10-01T08:00:00Z"),
    moodScore: 7,
    journalText:
      "Had a productive day at work and went for a run in the evening.",
    gratitudeText: "Grateful for my supportive team.",
    challengeText: "Struggled with time management.",
    sleepHours: 7.5,
    energyLevel: 8,
    activities: ["Exercise", "Productive"],
    pointsEarned: 50,
  },
  {
    date: new Date("2023-10-02T09:00:00Z"),
    moodScore: 9,
    journalText: "Spent time meditating and reading a good book.",
    gratitudeText: "Thankful for a peaceful morning.",
    challengeText: "None today.",
    sleepHours: 8.0,
    energyLevel: 9,
    activities: ["Meditation", "Reading"],
    pointsEarned: 60,
  },
  {
    date: new Date("2023-10-03T10:00:00Z"),
    moodScore: 6,
    journalText: "Had a busy day with meetings and social time.",
    gratitudeText: "Grateful for good friends.",
    challengeText: "Felt a bit overwhelmed.",
    sleepHours: 6.5,
    energyLevel: 7,
    activities: ["Social Time", "Productive"],
    pointsEarned: 40,
  },
  {
    date: new Date("2023-10-04T11:00:00Z"),
    moodScore: 8,
    journalText: "Enjoyed some music and spent time outdoors.",
    gratitudeText: "Thankful for good weather.",
    challengeText: "None today.",
    sleepHours: 7.0,
    energyLevel: 8,
    activities: ["Music", "Outdoors"],
    pointsEarned: 70,
  },
  {
    date: new Date("2023-10-05T12:00:00Z"),
    moodScore: 5,
    journalText:
      "Had a challenging day at work but managed to stay productive.",
    gratitudeText: "Grateful for my resilience.",
    challengeText: "Dealing with a difficult project.",
    sleepHours: 6.0,
    energyLevel: 6,
    activities: ["Productive"],
    pointsEarned: 30,
  },
];
