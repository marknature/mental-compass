import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const activities = pgTable("activities", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  icon: text().notNull(),
  category: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;

export default activities;
