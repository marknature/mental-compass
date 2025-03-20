import { faker } from "@faker-js/faker";
import events from "@models/events.schema";
import { sql } from "drizzle-orm";
import { db } from "services/api/database";

const getRandomStatus = () => {
  const statuses = ["upcoming", "ongoing", "completed"];
  return statuses[Math.floor(Math.random() * statuses.length)] as any;
};

const seedEvents = async () => {
  const eventData = Array.from({ length: 10 }).map(() => ({
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    date: faker.date.future(),
    points: faker.number.int({ min: 5, max: 50 }),
    location: faker.location.city(),
    status: getRandomStatus(),
    createdAt: sql`CURRENT_TIMESTAMP`,
  }));

  await db.insert(events).values(eventData);

  console.log("✅ Events seeded successfully!");
};

seedEvents()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
