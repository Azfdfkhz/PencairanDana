"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

/**
 * Komponen UI error state reusable, membedakan pesan "generik" (server error)
 * dari pesan spesifik yang sudah datang dari API (mis. "data tidak ditemukan").
 * @param {{
 *   message?: string,
 *   onRetry?: () => void,
 *   className?: string,
 *   compact?: boolean,
 * }} props
 */
export default function ErrorState({
  message = "Terjadi kesalahan. Silakan coba lagi.",
  onRetry,
  className = "",
  compact = false,
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-2 text-center ${
        compact ? "py-4" : "py-10"
      } ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        <AlertTriangle size={20} />
      </div>
      <p className="max-w-xs text-sm font-medium text-rose-500">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50"
        >
          <RotateCcw size={13} />
          <span>Coba lagi</span>
        </button>
      )}
    </div>
  );
}
