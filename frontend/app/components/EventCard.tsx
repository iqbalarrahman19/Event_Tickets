"use client";

import Link from "next/link";
import { Event } from "../types";

type Props = {
    event: Event;
};

export default function EventCard({
    event,
}: Props) {
    return (
        <div>
            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>{event.location}</p>

            <p>
                {new Date(
                    event.eventDate
                ).toLocaleString("id-ID")}
            </p>

            <Link href={`/events/${event.publicId}`}>
                Lihat Detail
            </Link>
        </div>
    );
}