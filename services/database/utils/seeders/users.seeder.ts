import { db } from "services/api/database/index";
import users, { type NewUser } from "@models/users.schema";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const NUM_USERS = 10;

async function seedUsers() {
  console.log(`Seeding ${NUM_USERS} users...`);

  const userData: NewUser[] = Array.from({ length: NUM_USERS }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
  }));

  try {
    await db.insert(users).values(userData);
    console.log("✅ Users seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
}

seedUsers().then(() => process.exit());
