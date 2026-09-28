"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import AlertModal from "../../components/AlertModal";
import { createEvent } from "../../lib/api";

type AlertState = {
    open: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning";
};

export default function NewEventPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [eventDate, setEventDate] = useState("");

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState<AlertState>({
        open: false,
        title: "",
        message: "",
        type: "success",
    });

    function showAlert(
        title: string,
        message: string,
        type: AlertState["type"]
    ) {
        setAlert({
            open: true,
            title,
            message,
            type,
        });
    }

    function closeAlert() {
        setAlert((prev) => ({
            ...prev,
            open: false,
        }));
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        // =========================
        // VALIDASI
        // =========================

        if (!title.trim()) {
            showAlert(
                "Data Tidak Lengkap",
                "Judul event wajib diisi.",
                "warning"
            );
            return;
        }

        if (!description.trim()) {
            showAlert(
                "Data Tidak Lengkap",
                "Deskripsi event wajib diisi.",
                "warning"
            );
            return;
        }

        if (!location.trim()) {
            showAlert(
                "Data Tidak Lengkap",
                "Lokasi event wajib diisi.",
                "warning"
            );
            return;
        }

        if (!eventDate) {
            showAlert(
                "Data Tidak Lengkap",
                "Tanggal event wajib diisi.",
                "warning"
            );
            return;
        }

        const selectedDate = new Date(eventDate);

        if (selectedDate <= new Date()) {
            showAlert(
                "Tanggal Tidak Valid",
                "Tanggal event harus lebih besar dari sekarang.",
                "warning"
            );
            return;
        }

        try {
            setLoading(true);

            await createEvent({
                title: title.trim(),
                description: description.trim(),
                location: location.trim(),
                eventDate: selectedDate.toISOString(),
            });

            showAlert(
                "Event Berhasil Dibuat",
                "Event baru berhasil ditambahkan.",
                "success"
            );
        } catch (error) {
            console.error(error);

            showAlert(
                "Gagal Menambahkan Event",
                error instanceof Error
                    ? error.message
                    : "Gagal menambahkan event.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    }

    function handleAlertClose() {
        const shouldRedirect =
            alert.type === "success";

        closeAlert();

        if (shouldRedirect) {
            router.push("/");
            router.refresh();
        }
    }

    return (
        <>
            <main className="mx-auto max-w-3xl px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Tambah Event
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Tambahkan event baru ke dalam sistem.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
                >
                    {/* JUDUL */}

                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block text-sm font-medium"
                        >
                            Judul Event
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Contoh: Tech Conference 2027"
                            className="w-full rounded-lg border px-3 py-2"
                            disabled={loading}
                        />
                    </div>

                    {/* DESKRIPSI */}

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium"
                        >
                            Deskripsi
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Deskripsi event..."
                            rows={5}
                            className="w-full rounded-lg border px-3 py-2"
                            disabled={loading}
                        />
                    </div>

                    {/* LOKASI */}

                    <div>
                        <label
                            htmlFor="location"
                            className="mb-2 block text-sm font-medium"
                        >
                            Lokasi
                        </label>

                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            placeholder="Contoh: Jakarta Convention Center"
                            className="w-full rounded-lg border px-3 py-2"
                            disabled={loading}
                        />
                    </div>

                    {/* TANGGAL */}

                    <div>
                        <label
                            htmlFor="eventDate"
                            className="mb-2 block text-sm font-medium"
                        >
                            Tanggal Event
                        </label>

                        <input
                            id="eventDate"
                            type="datetime-local"
                            value={eventDate}
                            onChange={(event) =>
                                setEventDate(event.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                            disabled={loading}
                        />
                    </div>

                    {/* BUTTON */}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Menyimpan..."
                                : "Tambah Event"}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={loading}
                            className="rounded-lg border px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </main>

            <AlertModal
                open={alert.open}
                title={alert.title}
                message={alert.message}
                type={alert.type}
                onClose={handleAlertClose}
            />
        </>
    );
}