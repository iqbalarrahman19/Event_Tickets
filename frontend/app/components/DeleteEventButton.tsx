"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";

import { deleteEvent } from "../lib/api";

type AlertState = {
  open: boolean;
  title: string;
  message: string;
  type:
  | "success"
  | "error"
  | "warning";
};

type Props = {
  publicId: number;
};

export default function DeleteEventButton({
  publicId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showConfirm, setShowConfirm] =
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

  function handleDeleteClick() {
    if (loading) return;

    setShowConfirm(true);
  }

  function handleCancelDelete() {
    if (loading) return;

    setShowConfirm(false);
  }

  async function handleConfirmDelete() {
    try {
      setLoading(true);

      await deleteEvent(publicId);

      setShowConfirm(false);

      showAlert(
        "Event Berhasil Dihapus",
        "Event berhasil dihapus dari sistem.",
        "success"
      );
    } catch (error) {
      console.error(error);

      setShowConfirm(false);

      showAlert(
        "Gagal Menghapus Event",
        error instanceof Error
          ? error.message
          : "Gagal menghapus event.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAlertClose() {
    const isSuccess =
      alert.type === "success";

    setAlert((current) => ({
      ...current,
      open: false,
    }));

    if (isSuccess) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDeleteClick}
        disabled={loading}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Menghapus..."
          : "Hapus Event"}
      </button>

      <ConfirmModal
        open={showConfirm}
        title="Hapus Event?"
        message="Event ini akan dihapus secara permanen. Apakah kamu yakin ingin melanjutkan?"
        confirmText="Hapus"
        cancelText="Batal"
        loading={loading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

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