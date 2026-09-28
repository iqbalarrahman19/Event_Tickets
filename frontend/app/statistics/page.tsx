"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    EventStatistic,
    getEventStatistics,
} from "../lib/api";

export default function StatisticsPage() {
    const [statistics, setStatistics] =
        useState<EventStatistic | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadStatistics() {
            try {
                setLoading(true);
                setError("");

                const result =
                    await getEventStatistics();

                if (!cancelled) {
                    setStatistics(result);
                }
            } catch (error) {
                console.error(error);

                if (!cancelled) {
                    setError(
                        error instanceof Error
                            ? error.message
                            : "Gagal mengambil statistik event."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadStatistics();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <main className="mx-auto max-w-5xl px-6 py-10">
                <p className="text-gray-500">
                    Memuat statistik...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-5xl px-6 py-10">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-5xl px-6 py-10">
            <div className="mb-8">
                <Link
                    href="/"
                    className="text-sm text-gray-600 hover:text-black"
                >
                    ← Kembali
                </Link>

                <h1 className="mt-4 text-3xl font-bold">
                    Statistik Event
                </h1>

                <p className="mt-2 text-gray-600">
                    Statistik pemesanan tiket event.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* MOST BOOKED */}

                <section className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Event dengan tiket terbanyak
                    </p>

                    {statistics?.mostBooked ? (
                        <>
                            <h2 className="mt-3 text-2xl font-bold">
                                {
                                    statistics
                                        .mostBooked
                                        .title
                                }
                            </h2>

                            <p className="mt-3 text-gray-600">
                                Total tiket:
                            </p>

                            <p className="text-3xl font-bold">
                                {
                                    statistics
                                        .mostBooked
                                        .totalTickets
                                }
                            </p>
                        </>
                    ) : (
                        <p className="mt-4 text-gray-500">
                            Belum ada data.
                        </p>
                    )}
                </section>

                {/* LEAST BOOKED */}

                <section className="rounded-xl border bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Event dengan tiket paling sedikit
                    </p>

                    {statistics?.leastBooked ? (
                        <>
                            <h2 className="mt-3 text-2xl font-bold">
                                {
                                    statistics
                                        .leastBooked
                                        .title
                                }
                            </h2>

                            <p className="mt-3 text-gray-600">
                                Total tiket:
                            </p>

                            <p className="text-3xl font-bold">
                                {
                                    statistics
                                        .leastBooked
                                        .totalTickets
                                }
                            </p>
                        </>
                    ) : (
                        <p className="mt-4 text-gray-500">
                            Belum ada data.
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}