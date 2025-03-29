import { db } from "services/api/database/index";
import events from "@models/events.schema";
import userEvents from "@models/user-events.shema";
import users from "@models/users.schema";
import { faker } from "@faker-js/faker";

async function seedUserEvents() {
  console.log("🌱 Seeding user_events...");

  // Fetch existing users and events from the database
  const existingUsers = await db.select({ id: users.id }).from(users);
  const existingEvents = await db.select({ id: events.id }).from(events);

  if (!existingUsers.length || !existingEvents.length) {
    console.log("⚠️ No users or events found. Seed users and events first!");
    return;
  }

  const userEventData = Array.from({ length: 20 }, () => ({
    userId: faker.helpers.arrayElement(existingUsers).id,
    eventId: faker.helpers.arrayElement(existingEvents).id,
    attended: faker.datatype.boolean(),
    earnedPoints: faker.number.int({ min: 5, max: 50 }),
  }));

  try {
    await db.insert(userEvents).values(userEventData);
    console.log("✅ user_events seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding user_events:", error);
  }
}

seedUserEvents();
