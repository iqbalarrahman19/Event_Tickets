"use client";

import {
    FormEvent,
    useEffect,
    useState,
} from "react";
import { useParams, useRouter } from "next/navigation";

import AlertModal from "../../../components/AlertModal";
import {
    getEventById,
    updateEvent,
} from "../../../lib/api";

type AlertState = {
    open: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning";
};

export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();

    const id = Number(params.id);

    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");
    const [location, setLocation] =
        useState("");
    const [eventDate, setEventDate] =
        useState("");

    const [loading, setLoading] =
        useState(true);
    const [saving, setSaving] =
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

    /*
     * LOAD EVENT
     */
    useEffect(() => {
        let cancelled = false;

        async function loadEvent() {
            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {
                if (!cancelled) {
                    setLoading(false);

                    showAlert(
                        "Event Tidak Valid",
                        "ID event tidak valid.",
                        "error"
                    );
                }

                return;
            }

            try {
                const event =
                    await getEventById(id);

                if (cancelled) {
                    return;
                }

                setTitle(event.title);
                setDescription(
                    event.description
                );
                setLocation(event.location);

                const date = new Date(
                    event.eventDate
                );

                const localDate = new Date(
                    date.getTime() -
                    date.getTimezoneOffset() *
                    60000
                )
                    .toISOString()
                    .slice(0, 16);

                setEventDate(localDate);
            } catch (error) {
                console.error(error);

                if (!cancelled) {
                    showAlert(
                        "Gagal Memuat Event",
                        error instanceof Error
                            ? error.message
                            : "Gagal mengambil event.",
                        "error"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadEvent();

        return () => {
            cancelled = true;
        };
    }, [id]);

    /*
     * SUBMIT
     */
    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {
            showAlert(
                "Event Tidak Valid",
                "ID event tidak valid.",
                "error"
            );
            return;
        }

        // =========================
        // VALIDASI JUDUL
        // =========================

        if (!title.trim()) {
            showAlert(
                "Data Tidak Lengkap",
                "Judul event wajib diisi.",
                "warning"
            );
            return;
        }

        // =========================
        // VALIDASI DESKRIPSI
        // =========================

        if (!description.trim()) {
            showAlert(
                "Data Tidak Lengkap",
                "Deskripsi event wajib diisi.",
                "warning"
            );
            return;
        }

        // =========================
        // VALIDASI LOKASI
        // =========================

        if (!location.trim()) {
            showAlert(
                "Data Tidak Lengkap",
                "Lokasi event wajib diisi.",
                "warning"
            );
            return;
        }

        // =========================
        // VALIDASI TANGGAL
        // =========================

        if (!eventDate) {
            showAlert(
                "Data Tidak Lengkap",
                "Tanggal event wajib diisi.",
                "warning"
            );
            return;
        }

        const parsedDate =
            new Date(eventDate);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            showAlert(
                "Tanggal Tidak Valid",
                "Tanggal event tidak valid.",
                "warning"
            );
            return;
        }

        if (parsedDate <= new Date()) {
            showAlert(
                "Tanggal Tidak Valid",
                "Tanggal event harus lebih besar dari sekarang.",
                "warning"
            );
            return;
        }

        try {
            setSaving(true);

            await updateEvent(id, {
                title: title.trim(),
                description:
                    description.trim(),
                location: location.trim(),
                eventDate:
                    parsedDate.toISOString(),
            });

            showAlert(
                "Event Berhasil Diperbarui",
                "Perubahan event berhasil disimpan.",
                "success"
            );
        } catch (error) {
            console.error(error);

            showAlert(
                "Gagal Mengubah Event",
                error instanceof Error
                    ? error.message
                    : "Gagal mengubah event.",
                "error"
            );
        } finally {
            setSaving(false);
        }
    }

    /*
     * ALERT CLOSE
     */
    function handleAlertClose() {
        const shouldRedirect =
            alert.type === "success";

        closeAlert();

        if (shouldRedirect) {
            router.push(`/events/${id}`);
            router.refresh();
        }
    }

    /*
     * LOADING
     */
    if (loading) {
        return (
            <main className="mx-auto max-w-3xl px-6 py-10">
                <div className="rounded-xl border p-10 text-center">
                    <p className="text-gray-500">
                        Memuat event...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="mx-auto max-w-3xl px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Edit Event
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Ubah informasi event.
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
                                setTitle(
                                    event.target.value
                                )
                            }
                            disabled={saving}
                            className="w-full rounded-lg border px-3 py-2"
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
                                setDescription(
                                    event.target.value
                                )
                            }
                            rows={5}
                            disabled={saving}
                            className="w-full rounded-lg border px-3 py-2"
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
                                setLocation(
                                    event.target.value
                                )
                            }
                            disabled={saving}
                            className="w-full rounded-lg border px-3 py-2"
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
                                setEventDate(
                                    event.target.value
                                )
                            }
                            disabled={saving}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    {/* BUTTON */}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Menyimpan..."
                                : "Simpan Perubahan"}
                        </button>

                        <button
                            type="button"
                            disabled={saving}
                            onClick={() =>
                                router.push(
                                    `/events/${id}`
                                )
                            }
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