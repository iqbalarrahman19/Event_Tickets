"use client";

type ConfirmModalProps = {
    open: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    open,
    title = "Konfirmasi",
    message = "Apakah kamu yakin ingin melanjutkan?",
    confirmText = "Ya, lanjutkan",
    cancelText = "Batal",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
        >
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
                        !
                    </div>

                    <div>
                        <h2
                            id="confirm-modal-title"
                            className="text-lg font-semibold text-gray-900"
                        >
                            {title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border px-5 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Menghapus..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}