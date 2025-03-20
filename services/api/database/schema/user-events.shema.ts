import { boolean, integer, pgTable, serial } from "drizzle-orm/pg-core";
import events from "./events.schema";
import users from "./users.schema";

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

export type userEvent = typeof userEvents.$inferSelect;
export type NewUserEvent = typeof userEvents.$inferInsert;

export default userEvents;
