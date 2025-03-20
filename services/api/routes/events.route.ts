import express from "express";
import { validate } from "../middlewares/validate";
import { eventSchema } from "@models/events.schema";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@controllers/events.controller";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", validate(eventSchema), createEvent);
router.put("/:id", validate(eventSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
