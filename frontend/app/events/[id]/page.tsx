import Link from "next/link";
import { notFound } from "next/navigation";

import { getEventById } from "../../lib/api";
import EventBookingSection from "../../components/EventBookingSection";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EventDetailPage({
    params,
}: Props) {
    const { id } = await params;

    const publicId = Number(id);

    if (
        !Number.isInteger(publicId) ||
        publicId <= 0
    ) {
        notFound();
    }

    let event;

    try {
        event = await getEventById(publicId);
    } catch (error) {
        console.error(
            "Gagal mengambil detail event:",
            error
        );

        notFound();
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            {/* BACK */}

            <div className="mb-6">
                <Link
                    href="/"
                    className="text-sm text-gray-600 hover:text-black"
                >
                    ← Kembali ke daftar event
                </Link>
            </div>

            {/* EVENT DETAIL */}

            <section className="rounded-xl border bg-white p-6 shadow-sm">
                <h1 className="text-3xl font-bold">
                    {event.title}
                </h1>

                <p className="mt-4 text-gray-700">
                    {event.description}
                </p>

                <div className="mt-6 space-y-3 text-sm">
                    <p>
                        <strong>Lokasi:</strong>{" "}
                        {event.location}
                    </p>

                    <p>
                        <strong>Tanggal:</strong>{" "}
                        {new Date(
                            event.eventDate
                        ).toLocaleString("id-ID", {
                            dateStyle: "full",
                            timeStyle: "short",
                        })}
                    </p>
                </div>
            </section>

            {/* BOOKING */}

            <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-semibold">
                    Pesan Tiket
                </h2>

                <EventBookingSection
                    eventId={event.publicId}
                    eventDate={event.eventDate}
                />
            </section>
        </main>
    );
}