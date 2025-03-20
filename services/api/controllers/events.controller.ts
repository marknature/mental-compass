import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "@db/index";
import events from "@models/events.schema";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await db.select().from(events);
    res.json(allEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  try {
    const event = await db.select().from(events).where(eq(events.id, eventId));
    if (!event.length)
      return res.status(404).json({ message: "Event not found" });
    res.json(event[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, points, location, status } = req.body;
    const [newEvent] = await db
      .insert(events)
      .values({
        title,
        description,
        date: new Date(date),
        points,
        location,
        status,
      })
      .returning();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  try {
    const { title, description, date, points, location, status } = req.body;
    const [updatedEvent] = await db
      .update(events)
      .set({
        title,
        description,
        date: new Date(date),
        points,
        location,
        status,
      })
      .where(eq(events.id, eventId))
      .returning();
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating event" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  try {
    const deletedEvent = await db
      .delete(events)
      .where(eq(events.id, eventId))
      .returning();
    if (!deletedEvent.length)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting event" });
  }
};
