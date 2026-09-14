"use client";

import { Loader2 } from "lucide-react";

/**
 * Komponen UI loading state reusable.
 * @param {{ label?: string, className?: string, compact?: boolean }} props
 */
export default function LoadingState({
  label = "Memuat data...",
  className = "",
  compact = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-2.5 py-8 text-sm text-[#64748b] ${
        compact ? "py-4" : "py-10"
      } ${className}`}
    >
      <Loader2 size={18} className="animate-spin text-[#0052cc]" />
      <span className="font-medium">{label}</span>
    </div>
  );
}
