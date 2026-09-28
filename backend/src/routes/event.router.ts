import { Router } from "express";
import { createEvent, deleteEvent, getEventById, getEvents, getEventStatistics, updateEvent } from "../controllers/event.controller";

const router = Router();

router.get("/", getEvents);
router.get("/statistics", getEventStatistics);
router.post("/", createEvent);

router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;