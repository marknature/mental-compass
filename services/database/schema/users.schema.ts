import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  streak: integer("streak").default(0),
  total_points: integer("total_points").default(0),
  updated_at: timestamp("updated_at").defaultNow(),
  level: integer("level").default(1),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export default users;
