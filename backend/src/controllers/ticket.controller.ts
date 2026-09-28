import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /tickets
// GET /tickets?eventId=1
// GET /tickets?customerEmail=lukman@example.com
export const getTickets = async (
  req: Request,
  res: Response
) => {
  try {
    const { eventId, customerEmail } = req.query;

    const where: {
      eventId?: string;
      customerEmail?: string;
    } = {};

    // eventId dari frontend adalah PUBLIC ID
    if (typeof eventId === "string" && eventId.trim()) {
      const publicEventId = Number(eventId);

      if (
        !Number.isInteger(publicEventId) ||
        publicEventId <= 0
      ) {
        return res.status(400).json({
          message: "Invalid event ID",
        });
      }

      const event = await prisma.event.findUnique({
        where: {
          publicId: publicEventId,
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

      // UUID hanya digunakan internal
      where.eventId = event.id;
    }

    if (
      typeof customerEmail === "string" &&
      customerEmail.trim()
    ) {
      where.customerEmail = customerEmail.trim();
    }

    const tickets = await prisma.ticket.findMany({
      where,

      select: {
        // PUBLIC ID saja
        publicId: true,

        customerName: true,
        customerEmail: true,
        quantity: true,
        createdAt: true,

        event: {
          select: {
            publicId: true,
            title: true,
            description: true,
            location: true,
            eventDate: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      data: tickets,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get tickets",
    });
  }
};


// POST /tickets
export const createTicket = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      eventId,
      customerName,
      customerEmail,
      quantity,
    } = req.body;

    // =========================
    // REQUIRED FIELDS
    // =========================

    if (
      eventId === undefined ||
      eventId === null ||
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof customerEmail !== "string" ||
      !customerEmail.trim() ||
      quantity === undefined ||
      quantity === null
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // =========================
    // PUBLIC EVENT ID
    // =========================

    const publicEventId = Number(eventId);

    if (
      !Number.isInteger(publicEventId) ||
      publicEventId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    // =========================
    // QUANTITY
    // =========================

    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    // =========================
    // EMAIL
    // =========================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(customerEmail.trim())) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // =========================
    // FIND EVENT BY PUBLIC ID
    // =========================

    const event = await prisma.event.findUnique({
      where: {
        publicId: publicEventId,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // =========================
    // EXPIRED EVENT
    // =========================

    if (event.eventDate <= new Date()) {
      return res.status(400).json({
        message: "Cannot book ticket for an expired event",
      });
    }

    // =========================
    // CREATE TICKET
    // =========================

    const ticket = await prisma.ticket.create({
      data: {
        // INTERNAL UUID
        eventId: event.id,

        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        quantity,
      },

      select: {
        // Jangan kirim internal id
        publicId: true,

        customerName: true,
        customerEmail: true,
        quantity: true,
        createdAt: true,

        event: {
          select: {
            publicId: true,
            title: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Ticket booked successfully",
      data: ticket,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to book ticket",
    });
  }
};


// GET /tickets/:id
export const getTicketById = async (
  req: Request,
  res: Response
) => {
  try {
    const publicId = Number(req.params.id);

    if (
      !Number.isInteger(publicId) ||
      publicId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    const ticket = await prisma.ticket.findUnique({
      where: {
        publicId,
      },

      select: {
        publicId: true,

        customerName: true,
        customerEmail: true,
        quantity: true,
        createdAt: true,

        event: {
          select: {
            publicId: true,
            title: true,
            description: true,
            location: true,
            eventDate: true,
          },
        },
      },
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    return res.json({
      data: ticket,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get ticket",
    });
  }
};


// DELETE /tickets/:id
export const deleteTicket = async (
  req: Request,
  res: Response
) => {
  try {
    const publicId = Number(req.params.id);

    if (
      !Number.isInteger(publicId) ||
      publicId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid ticket ID",
      });
    }

    // Cari menggunakan PUBLIC ID
    const ticket = await prisma.ticket.findUnique({
      where: {
        publicId,
      },

      select: {
        id: true,
      },
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    // Hapus menggunakan INTERNAL UUID
    await prisma.ticket.delete({
      where: {
        id: ticket.id,
      },
    });

    return res.json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete ticket",
    });
  }
};