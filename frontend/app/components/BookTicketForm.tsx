"use client";

import {
    FormEvent,
    useState,
} from "react";
import { useRouter } from "next/navigation";

import AlertModal from "./AlertModal";
import { createTicket } from "../lib/api";

type Props = {
    eventId: number;
    eventDate: string;
};

type AlertType =
    | "success"
    | "error"
    | "warning";

type AlertState = {
    open: boolean;
    title: string;
    message: string;
    type: AlertType;
};

export default function BookTicketForm({
    eventId,
    eventDate,
}: Props) {
    const router = useRouter();

    const [customerName, setCustomerName] =
        useState("");

    const [customerEmail, setCustomerEmail] =
        useState("");

    const [quantity, setQuantity] =
        useState("1");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [alert, setAlert] =
        useState<AlertState>({
            open: false,
            title: "",
            message: "",
            type: "success",
        });

    function showAlert(
        title: string,
        message: string,
        type: AlertType
    ) {
        setAlert({
            open: true,
            title,
            message,
            type,
        });
    }

    function closeAlert() {
        const type = alert.type;

        setAlert((current) => ({
            ...current,
            open: false,
        }));

        // Jika event expired/error,
        // kembali ke detail event
        if (
            type === "warning" ||
            type === "error"
        ) {
            router.push(`/events/${eventId}`);
            router.refresh();
        }

        // Jika booking berhasil,
        // ke halaman tickets
        if (type === "success") {
            router.push("/tickets");
            router.refresh();
        }
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        /*
         * CEK EXPIRED
         */

        const isExpired =
            new Date(eventDate).getTime() <=
            Date.now();

        if (isExpired) {
            showAlert(
                "Event Sudah Kadaluarsa",
                "Event ini sudah melewati tanggal pelaksanaan sehingga tiket tidak dapat dipesan.",
                "warning"
            );

            return;
        }

        /*
         * VALIDASI NAMA
         */

        if (!customerName.trim()) {
            setError(
                "Nama customer wajib diisi."
            );

            return;
        }

        /*
         * VALIDASI EMAIL
         */

        if (!customerEmail.trim()) {
            setError(
                "Email customer wajib diisi."
            );

            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailRegex.test(
                customerEmail.trim()
            )
        ) {
            setError(
                "Format email tidak valid."
            );

            return;
        }

        /*
         * VALIDASI QUANTITY
         */

        const parsedQuantity =
            Number(quantity);

        if (
            !Number.isInteger(
                parsedQuantity
            ) ||
            parsedQuantity <= 0
        ) {
            setError(
                "Jumlah tiket harus berupa bilangan bulat lebih dari 0."
            );

            return;
        }

        /*
         * BOOKING
         */

        try {
            setLoading(true);

            await createTicket({
                eventId,
                customerName:
                    customerName.trim(),
                customerEmail:
                    customerEmail.trim(),
                quantity:
                    parsedQuantity,
            });

            showAlert(
                "Booking Berhasil",
                "Tiket berhasil dipesan.",
                "success"
            );
        } catch (error) {
            console.error(error);

            const message =
                error instanceof Error
                    ? error.message
                    : "Gagal memesan tiket.";

            const normalizedMessage =
                message.toLowerCase();

            /*
             * EXPIRED DARI BACKEND
             */

            if (
                normalizedMessage.includes(
                    "expired"
                ) ||
                normalizedMessage.includes(
                    "kadaluarsa"
                )
            ) {
                showAlert(
                    "Event Sudah Kadaluarsa",
                    "Event ini sudah melewati tanggal pelaksanaan sehingga tiket tidak dapat dipesan.",
                    "warning"
                );

                return;
            }

            /*
             * ERROR LAIN
             */

            showAlert(
                "Gagal Memesan Tiket",
                message,
                "error"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal
                open={alert.open}
                title={alert.title}
                message={alert.message}
                type={alert.type}
                onClose={closeAlert}
            />

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* ERROR VALIDASI */}

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* NAMA */}

                <div>
                    <label
                        htmlFor="customerName"
                        className="mb-2 block text-sm font-medium"
                    >
                        Nama Customer
                    </label>

                    <input
                        id="customerName"
                        type="text"
                        value={customerName}
                        onChange={(event) =>
                            setCustomerName(
                                event.target.value
                            )
                        }
                        placeholder="Nama lengkap"
                        disabled={loading}
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    />
                </div>

                {/* EMAIL */}

                <div>
                    <label
                        htmlFor="customerEmail"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email Customer
                    </label>

                    <input
                        id="customerEmail"
                        type="email"
                        value={customerEmail}
                        onChange={(event) =>
                            setCustomerEmail(
                                event.target.value
                            )
                        }
                        placeholder="nama@example.com"
                        disabled={loading}
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    />
                </div>

                {/* JUMLAH */}

                <div>
                    <label
                        htmlFor="quantity"
                        className="mb-2 block text-sm font-medium"
                    >
                        Jumlah Tiket
                    </label>

                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        step="1"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(
                                event.target.value
                            )
                        }
                        disabled={loading}
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
                    />
                </div>

                {/* BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Memproses..."
                        : "Pesan Tiket"}
                </button>
            </form>
        </>
    );
}