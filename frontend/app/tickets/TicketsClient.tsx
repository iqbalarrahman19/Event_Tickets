"use client";

import {
    useEffect,
    useState,
} from "react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    getEvents,
    getTickets,
    getTicketsByFiltering,
} from "../lib/api";

import { Event, Ticket } from "../types";

export default function TicketsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const urlEventId =
        searchParams.get("eventId") ?? "";

    const urlCustomerEmail =
        searchParams.get("customerEmail") ?? "";

    // =========================
    // DATA
    // =========================

    const [events, setEvents] =
        useState<Event[]>([]);

    const [tickets, setTickets] =
        useState<Ticket[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // =========================
    // DRAFT FILTER
    // =========================
    //
    // Ini TIDAK langsung mengubah tickets.
    //

    const [selectedEventId, setSelectedEventId] =
        useState(urlEventId);

    const [emailInput, setEmailInput] =
        useState(urlCustomerEmail);

    // =========================
    // LOAD EVENTS
    // =========================

    useEffect(() => {
        let cancelled = false;

        async function loadEvents() {
            try {
                const data = await getEvents();

                if (!cancelled) {
                    setEvents(data);
                }
            } catch (error) {
                console.error(error);

                if (!cancelled) {
                    setError(
                        "Gagal mengambil daftar event."
                    );
                }
            }
        }

        void loadEvents();

        return () => {
            cancelled = true;
        };
    }, []);

    // =========================
    // LOAD TICKETS
    // =========================
    //
    // HANYA berdasarkan URL.
    //
    // Jadi perubahan dropdown/input
    // tidak menyebabkan request.
    //

    useEffect(() => {
        let cancelled = false;

        async function loadTickets() {
            try {
                setLoading(true);
                setError("");

                let data: Ticket[];

                if (
                    urlEventId ||
                    urlCustomerEmail
                ) {
                    data =
                        await getTicketsByFiltering({
                            eventId: urlEventId
                                ? Number(urlEventId)
                                : undefined,

                            customerEmail:
                                urlCustomerEmail ||
                                undefined,
                        });
                } else {
                    data = await getTickets();
                }

                if (!cancelled) {
                    setTickets(data);
                }
            } catch (error) {
                console.error(error);

                if (!cancelled) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Gagal mengambil tiket."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadTickets();

        return () => {
            cancelled = true;
        };
    }, [urlEventId, urlCustomerEmail]);

    // =========================
    // FILTER
    // =========================

    function handleFilter() {
        const params =
            new URLSearchParams();

        if (selectedEventId) {
            params.set(
                "eventId",
                selectedEventId
            );
        }

        if (emailInput.trim()) {
            params.set(
                "customerEmail",
                emailInput.trim()
            );
        }

        const query = params.toString();

        router.push(
            query
                ? `/tickets?${query}`
                : "/tickets"
        );
    }

    // =========================
    // RESET
    // =========================

    function handleReset() {
        setSelectedEventId("");
        setEmailInput("");

        router.push("/tickets");
    }

    // =========================
    // RENDER
    // =========================

    return (
        <main className="mx-auto max-w-6xl px-6 py-10">

            {/* HEADER */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Tickets
                </h1>

                <p className="mt-2 text-gray-600">
                    Daftar tiket yang telah dipesan.
                </p>
            </div>

            {/* FILTER */}

            <section className="mb-8 rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-lg font-semibold">
                    Filter Tiket
                </h2>

                <div className="grid gap-4 md:grid-cols-3">

                    {/* EVENT */}

                    <div>
                        <label
                            htmlFor="event"
                            className="mb-2 block text-sm font-medium"
                        >
                            Event
                        </label>

                        <select
                            id="event"
                            value={selectedEventId}
                            onChange={(event) =>
                                setSelectedEventId(
                                    event.target.value
                                )
                            }
                            className="w-full rounded-lg border px-3 py-2"
                        >
                            <option value="">
                                Semua Event
                            </option>

                            {events.map((event) => (
                                <option
                                    key={event.publicId}
                                    value={event.publicId}
                                >
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* EMAIL */}

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium"
                        >
                            Email Customer
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={emailInput}
                            onChange={(event) =>
                                setEmailInput(
                                    event.target.value
                                )
                            }
                            placeholder="customer@example.com"
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    {/* BUTTON */}

                    <div className="flex items-end gap-2">

                        <button
                            type="button"
                            onClick={handleFilter}
                            className="rounded-lg bg-black px-5 py-2 text-white"
                        >
                            Filter
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-lg border px-5 py-2"
                        >
                            Reset
                        </button>

                    </div>

                </div>
            </section>

            {/* ERROR */}

            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* LOADING */}

            {loading && (
                <div className="rounded-xl border bg-white p-10 text-center">
                    Memuat tiket...
                </div>
            )}

            {/* EMPTY */}

            {!loading && tickets.length === 0 && (
                <div className="rounded-xl border bg-white p-10 text-center">
                    <h2 className="text-lg font-semibold">
                        Tidak ada tiket
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Tidak ditemukan tiket sesuai filter.
                    </p>
                </div>
            )}

            {/* TICKETS */}

            {!loading && tickets.length > 0 && (
                <div className="space-y-4">

                    {tickets.map((ticket) => (
                        <article
                            key={ticket.publicId}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {ticket.event.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Ticket #{ticket.publicId}
                                    </p>
                                </div>

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                    {ticket.quantity} tiket
                                </span>

                            </div>

                            <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">

                                <p>
                                    <strong>Customer:</strong>{" "}
                                    {ticket.customerName}
                                </p>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {ticket.customerEmail}
                                </p>

                                <p>
                                    <strong>Lokasi:</strong>{" "}
                                    {ticket.event.location}
                                </p>

                                <p>
                                    <strong>Tanggal Event:</strong>{" "}
                                    {new Date(
                                        ticket.event.eventDate
                                    ).toLocaleString("id-ID")}
                                </p>

                            </div>
                        </article>
                    ))}

                </div>
            )}
        </main>
    );
}