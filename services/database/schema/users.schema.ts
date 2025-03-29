import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  streak: integer("streak").default(0).notNull(),
  totalPoints: integer("total_points").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  level: integer("level").default(1).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export default users;
