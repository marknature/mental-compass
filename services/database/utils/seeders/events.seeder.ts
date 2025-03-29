import { db } from "../..";
import events from "../../schema/events.schema";

const seedEvents = async () => {
  console.log(data);
  await db.insert(events).values(data);
  console.log("✅ Events seeded successfully!");
};

const data = [
  {
    title: "Mindfulness Meditation Session",
    description:
      "A guided meditation session to help students reduce stress and improve focus.",
    date: new Date("2025-04-10T10:00:00"),
    points: 200,
    location: "Wellness Center, Room 101",
    status: "upcoming",
  },
  {
    title: "Yoga for Stress Relief",
    description:
      "Join our expert yoga instructor for a relaxing session to ease anxiety and improve mental clarity.",
    date: new Date("2025-04-15T08:30:00"),
    points: 250,
    location: "University Gym",
    status: "upcoming",
  },
  {
    title: "Managing Exam Anxiety Workshop",
    description:
      "A practical session with a psychologist on handling stress during exams.",
    date: new Date("2025-04-20T14:00:00"),
    points: 300,
    location: "Library Conference Room",
    status: "upcoming",
  },
  {
    title: "Art Therapy for Emotional Wellbeing",
    description:
      "Express yourself creatively and explore how art can be a form of self-care.",
    date: new Date("2025-04-25T16:00:00"),
    points: 200,
    location: "Student Lounge",
    status: "upcoming",
  },
  {
    title: "Mental Health Awareness Panel",
    description:
      "Hear from mental health experts and students about coping strategies and support resources.",
    date: new Date("2025-03-30T18:00:00"),
    points: 350,
    location: "Auditorium",
    status: "completed",
  },
  {
    title: "Journaling for Self-Reflection",
    description:
      "A guided journaling workshop to help students process their thoughts and emotions.",
    date: new Date("2025-04-05T12:00:00"),
    points: 150,
    location: "TBA",
    status: "upcoming",
  },
  {
    title: "Sound Healing and Relaxation",
    description:
      "Experience the calming effects of sound therapy to reduce stress and improve mental clarity.",
    date: new Date("2025-04-12T17:00:00"),
    points: 250,
    location: "Zen Garden",
    status: "upcoming",
  },
  {
    title: "Group Therapy Session",
    description:
      "A safe space to share experiences and gain support from fellow students.",
    date: new Date("2025-04-08T15:00:00"),
    points: 300,
    location: "Counseling Center",
    status: "ongoing",
  },
];

seedEvents()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
