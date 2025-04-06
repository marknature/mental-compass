import {
  uuid,
  pgTable,
  integer,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import users from "../users.schema";
import { z } from "zod";

export const mood_logs = pgTable("mood_logs", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  mood_score: integer().notNull(),
  entry_note: text(),
  gratitude_note: text(),
  challenge_note: text(),
  sleep_hours: real(),
  energy_level: integer(),
  activities: text().array(),
  points_earned: integer().default(0),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});

export const moodLogSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  mood_score: z.coerce.number().int().min(1).max(10),
  entry_note: z.string().optional(),
  gratitude_note: z.string().optional(),
  challenge_note: z.string().optional(),
  sleep_hours: z.coerce.number().optional(),
  energy_level: z.coerce.number().int().min(1).max(10).optional(),
  activities: z.array(z.string()).optional(),
  points_earned: z.number().int().default(0).optional(),
  created_at: z.coerce
    .date()
    .optional()
    .default(() => new Date()),
  updated_at: z.coerce.date().optional(),
});

export type MoodLog = typeof mood_logs.$inferSelect;
export type NewMoodLog = typeof mood_logs.$inferInsert;
export type CreateMoodLogSchema = z.infer<typeof moodLogSchema>;

export default mood_logs;
