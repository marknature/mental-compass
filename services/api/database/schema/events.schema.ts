import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const statusEnum = pgEnum("status", [
  "upcoming",
  "ongoing",
  "completed",
]);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  points: integer("points").notNull(),
  location: text("location").notNull().default("TBA"),
  status: statusEnum(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  points: z.number().min(0, "Points must be a positive number"),
  location: z.string().default("TBA"),
  status: z.enum(["upcoming", "ongoing", "completed"]),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventInput = z.infer<typeof eventSchema>;

export default events;
