import "dotenv/config";
import express from "express";
import cors from "cors";

import eventRouter from "./routes/event.router";
import ticketRouter from "./routes/ticket.router";

const app = express();

const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Event Ticket API is running",
  });
});

app.use("/events", eventRouter);
app.use("/tickets", ticketRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});