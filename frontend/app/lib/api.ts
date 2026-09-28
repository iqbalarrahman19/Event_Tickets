import { Event, Ticket } from "../types";

const API_URL = "http://localhost:5000";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const result = await response.json();

  return result.data;
}

export async function getEventById(
  publicId: number
): Promise<Event> {
  const response = await fetch(
    `${API_URL}/events/${publicId}`
  );

  if (!response.ok) {
    throw new Error("Event not found");
  }

  const result = await response.json();

  return result.data;
}

export async function createEvent(data: {
  title: string;
  description: string;
  location: string;
  eventDate: string;
}) {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal menambahkan event"
    );
  }

  return result.data;
}

export async function updateEvent(
  publicId: number,
  data: {
    title: string;
    description: string;
    location: string;
    eventDate: string;
  }
): Promise<Event> {
  const response = await fetch(
    `${API_URL}/events/${publicId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update event"
    );
  }

  return result.data;
}

export async function deleteEvent(
  publicId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/events/${publicId}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete event"
    );
  }
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_URL}/tickets`);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  const result = await response.json();

  return result.data;
}

export async function getTicketsByFiltering(params?: {
  eventId?: number;
  customerEmail?: string;
}): Promise<Ticket[]> {
  const searchParams = new URLSearchParams();

  if (params?.eventId) {
    searchParams.set(
      "eventId",
      String(params.eventId)
    );
  }

  if (params?.customerEmail) {
    searchParams.set(
      "customerEmail",
      params.customerEmail
    );
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API_URL}/tickets${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to filter tickets"
    );
  }

  const result = await response.json();

  return result.data;
}

export async function createTicket(data: {
  eventId: number;
  customerName: string;
  customerEmail: string;
  quantity: number;
}) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to book ticket"
    );
  }

  return result.data;
}

/* =========================
   EVENT STATISTICS
========================= */

export type EventStatisticItem = {
    publicId: number;
    title: string;
    totalTickets: number;
};

export type EventStatistic = {
    mostBooked: EventStatisticItem | null;
    leastBooked: EventStatisticItem | null;
};

export async function getEventStatistics(): Promise<EventStatistic> {
    const response = await fetch(
        `${API_URL}/events/statistics`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch event statistics"
        );
    }

    const result = await response.json();

    return result.data;
}