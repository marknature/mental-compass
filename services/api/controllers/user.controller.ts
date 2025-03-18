import { db } from "@db/index";
import users from "@db/schema/users.schema";

import { eq } from "drizzle-orm";
import { Request, Response } from "express";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const newUser = await db
      .insert(users)
      .values({ name, email, password })
      .returning();
    res.status(201).json(newUser[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Update user details
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await db
      .update(users)
      .set({ name, email, password })
      .where(eq(users.id, id))
      .returning();
    if (updatedUser.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    if (deletedUser.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully", user: deletedUser[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
