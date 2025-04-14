import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  uuid,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const status_enum = pgEnum("status", [
  "upcoming",
  "ongoing",
  "completed",
]);

export const events = pgTable("events", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  title: text("title").notNull(),
  image: text("image").notNull(),
  organizer: text("organizer").notNull(),
  description: text("description").notNull(),
  date: date("date"),
  time: time("time"),
  points: integer("points").default(0),
  location: text("location").default("TBA"),
  status: status_enum("status").default("upcoming"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  organizer: z.string().min(3, "Organizer must be at least 3 characters long"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
    .optional(),
  time: z.string().optional(),
  points: z.number().min(0, "Points must be a positive number").default(0),
  location: z.string().default("TBA"),
  status: z.enum(["upcoming", "ongoing", "completed"]).default("upcoming"),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventInput = z.infer<typeof eventSchema>;

export default events;
