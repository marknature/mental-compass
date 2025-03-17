import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Moods Table
export const moods = pgTable("moods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., Happy, Sad, Anxious
});

// Mood Entries Table
export const moodEntries = pgTable("mood_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  moodId: integer("mood_id").references(() => moods.id, {
    onDelete: "cascade",
  }),
  note: text("note"), // Optional journal-like note
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Resources Table
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "blog", "podcast", "counseling_contact"
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Journals Table
export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Surveys Table
export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  result: text("result").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Challenges Table
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(), // Reward points
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Events Table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  points: integer("points").notNull(), // Reward points
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// User Challenges Table (Tracks Participation)
export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  challengeId: integer("challenge_id").references(() => challenges.id, {
    onDelete: "cascade",
  }),
  completed: boolean("completed").default(false),
  earnedPoints: integer("earned_points").default(0),
});

// User Events Table (Tracks Participation)
export const userEvents = pgTable("user_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  eventId: integer("event_id").references(() => events.id, {
    onDelete: "cascade",
  }),
  attended: boolean("attended").default(false),
  earnedPoints: integer("earned_points").default(0),
});

// Appointments Table (Counseling Sessions)
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  counselorId: integer("counselor_id"), // Assuming a counselor system
  dateTime: timestamp("date_time").notNull(),
  status: text("status").default("pending"), // Pending, Confirmed, Completed
});
