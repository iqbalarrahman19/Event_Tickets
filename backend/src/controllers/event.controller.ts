import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// ========================================
// GET /events
// ========================================

export const getEvents = async (
  _req: Request,
  res: Response
) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        publicId: true,
        title: true,
        description: true,
        location: true,
        eventDate: true,
        createdAt: true,
        updatedAt: true,
      },

      orderBy: {
        eventDate: "asc",
      },
    });

    return res.json({
      data: events,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};


// ========================================
// POST /events
// ========================================

export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      location,
      eventDate,
    } = req.body;

    // =========================
    // REQUIRED FIELDS
    // =========================

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof location !== "string" ||
      !location.trim() ||
      !eventDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // =========================
    // EVENT DATE
    // =========================

    const parsedEventDate = new Date(eventDate);

    if (isNaN(parsedEventDate.getTime())) {
      return res.status(400).json({
        message: "Invalid eventDate",
      });
    }

    // =========================
    // CREATE
    // =========================

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        eventDate: parsedEventDate,
      },

      select: {
        publicId: true,
        title: true,
        description: true,
        location: true,
        eventDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create event",
    });
  }
};


// ========================================
// GET /events/:id
// id = PUBLIC ID
// ========================================

export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const publicId = Number(req.params.id);

    // =========================
    // VALIDATE PUBLIC ID
    // =========================

    if (
      !Number.isInteger(publicId) ||
      publicId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    // =========================
    // FIND BY PUBLIC ID
    // =========================

    const event = await prisma.event.findUnique({
      where: {
        publicId,
      },

      select: {
        publicId: true,
        title: true,
        description: true,
        location: true,
        eventDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.json({
      data: event,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get event",
    });
  }
};


// ========================================
// PUT /events/:id
// id = PUBLIC ID
// ========================================

export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const publicId = Number(req.params.id);

    const {
      title,
      description,
      location,
      eventDate,
    } = req.body;

    // =========================
    // VALIDATE PUBLIC ID
    // =========================

    if (
      !Number.isInteger(publicId) ||
      publicId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    // =========================
    // REQUIRED FIELDS
    // =========================

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof location !== "string" ||
      !location.trim() ||
      !eventDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // =========================
    // EVENT DATE
    // =========================

    const parsedEventDate = new Date(eventDate);

    if (isNaN(parsedEventDate.getTime())) {
      return res.status(400).json({
        message: "Invalid eventDate",
      });
    }

    // =========================
    // FIND EVENT
    // =========================

    const existingEvent = await prisma.event.findUnique({
      where: {
        publicId,
      },

      select: {
        id: true,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // =========================
    // UPDATE
    // =========================

    const event = await prisma.event.update({
      where: {
        // INTERNAL UUID
        id: existingEvent.id,
      },

      data: {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        eventDate: parsedEventDate,
      },

      select: {
        publicId: true,
        title: true,
        description: true,
        location: true,
        eventDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update event",
    });
  }
};


// ========================================
// DELETE /events/:id
// id = PUBLIC ID
// ========================================

export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const publicId = Number(req.params.id);

    // =========================
    // VALIDATE PUBLIC ID
    // =========================

    if (
      !Number.isInteger(publicId) ||
      publicId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    // =========================
    // FIND EVENT
    // =========================

    const event = await prisma.event.findUnique({
      where: {
        publicId,
      },

      select: {
        id: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // =========================
    // DELETE
    // =========================

    await prisma.event.delete({
      where: {
        // INTERNAL UUID
        id: event.id,
      },
    });

    return res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete event",
    });
  }
};


// ========================================
// GET /events/statistics
// ========================================

export const getEventStatistics = async (
  _req: Request,
  res: Response
) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        publicId: true,
        title: true,

        tickets: {
          select: {
            quantity: true,
          },
        },
      },
    });

    if (events.length === 0) {
      return res.json({
        data: {
          mostBooked: null,
          leastBooked: null,
        },
      });
    }

    const eventStatistics = events.map((event) => {
      const totalTickets = event.tickets.reduce(
        (total, ticket) => total + ticket.quantity,
        0
      );

      return {
        publicId: event.publicId,
        title: event.title,
        totalTickets,
      };
    });

    const mostBooked = eventStatistics.reduce(
      (max, event) =>
        event.totalTickets > max.totalTickets
          ? event
          : max
    );

    const leastBooked = eventStatistics.reduce(
      (min, event) =>
        event.totalTickets < min.totalTickets
          ? event
          : min
    );

    return res.json({
      data: {
        mostBooked,
        leastBooked,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get event statistics",
    });
  }
};