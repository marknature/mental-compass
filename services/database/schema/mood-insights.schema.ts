import { pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import users from "./users.schema";

export const moodInsights = pgTable("mood_insights", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  factor: text("factor").notNull(),
  impact: real("impact").notNull(),
  confidence: real("confidence").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type MoodInsight = typeof moodInsights.$inferSelect;
export type NewMoodInsight = typeof moodInsights.$inferInsert;

export default moodInsights;
