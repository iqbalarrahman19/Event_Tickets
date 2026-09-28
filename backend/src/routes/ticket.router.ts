import { Router } from "express";
import { createTicket, deleteTicket, getTicketById, getTickets } from "../controllers/ticket.controller";

const router = Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.get("/:id", getTicketById);
router.delete("/:id", deleteTicket);

export default router;