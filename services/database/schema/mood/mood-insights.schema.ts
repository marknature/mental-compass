import { pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import users from "../users.schema";

export const mood_insights = pgTable("mood_insights", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  insight_type: text().notNull(),
  contributing_factor: text().notNull(),
  impact_score: real().notNull(),
  confidence_level: real().notNull(),
  description: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export type MoodInsight = typeof mood_insights.$inferSelect;
export type NewMoodInsight = typeof mood_insights.$inferInsert;

export default mood_insights;
