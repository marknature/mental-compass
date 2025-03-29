import {
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import users from "./users.schema";

export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(),
  moodScore: integer("mood_score").notNull(),
  journalText: text("journal_text"),
  gratitudeText: text("gratitude_text"),
  challengeText: text("challenge_text"),
  sleepHours: real("sleep_hours"),
  energyLevel: integer("energy_level"),
  activities: text("activities").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  pointsEarned: integer("points_earned").default(0).notNull(),
});

export type journalEntry = typeof journalEntries.$inferSelect;
export type NewJournalEntry = typeof journalEntries.$inferInsert;

export default journalEntries;
