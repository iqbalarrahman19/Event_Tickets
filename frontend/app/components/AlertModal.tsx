"use client";

type AlertModalProps = {
    open: boolean;
    title: string;
    message: string;
    type?: "success" | "error" | "warning";
    onClose: () => void;
};

export default function AlertModal({
    open,
    title,
    message,
    type = "success",
    onClose,
}: AlertModalProps) {
    if (!open) {
        return null;
    }

    const config = {
        success: {
            icon: "✓",
            iconClass: "bg-green-100 text-green-600",
        },
        error: {
            icon: "✕",
            iconClass: "bg-red-100 text-red-600",
        },
        warning: {
            icon: "!",
            iconClass: "bg-yellow-100 text-yellow-600",
        },
    };

    const current = config[type];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-modal-title"
        >
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="flex items-start gap-4">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${current.iconClass}`}
                    >
                        {current.icon}
                    </div>

                    <div className="flex-1">
                        <h2
                            id="alert-modal-title"
                            className="text-lg font-semibold text-gray-900"
                        >
                            {title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}