export type Event = {
  publicId: number;
  title: string;
  description: string;
  location: string;
  eventDate: string;
};

export type Ticket = {
  publicId: number;
  customerName: string;
  customerEmail: string;
  quantity: number;
  createdAt: string;
  event: Event;
};