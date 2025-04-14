import { boolean, integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { events } from "./events.schema";
import { users } from "../users.schema";

export const userEvents = pgTable("user_events", {
  id: serial("id").primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  eventId: uuid("event_id")
    .references(() => events.id, {
      onDelete: "cascade",
    })
    .notNull(),

  attended: boolean("attended").default(false),

  earnedPoints: integer("earned_points").default(0),
});

export type UserEvent = typeof userEvents.$inferSelect;
export type NewUserEvent = typeof userEvents.$inferInsert;

export default userEvents;
