"use client";

import { useEffect, useState } from "react";
import BookTicketForm from "./BookTicketForm";

type Props = {
    eventId: number;
    eventDate: string;
};

export default function EventBookingSection({
    eventId,
    eventDate,
}: Props) {
    const [isExpired, setIsExpired] =
        useState(false);

    useEffect(() => {
        function checkExpired() {
            setIsExpired(
                new Date(eventDate).getTime() <=
                Date.now()
            );
        }

        checkExpired();

        const interval = setInterval(
            checkExpired,
            1000
        );

        return () => {
            clearInterval(interval);
        };
    }, [eventDate]);

    if (isExpired) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-700">
                    Event sudah kadaluarsa.
                </p>

                <p className="mt-1 text-sm text-red-600">
                    Tiket tidak dapat dipesan karena
                    tanggal event sudah terlewati.
                </p>
            </div>
        );
    }

    return (
        <BookTicketForm
            eventId={eventId}
            eventDate={eventDate}
        />
    );
}