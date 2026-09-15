"use client";

import { Inbox } from "lucide-react";

/**
 * Komponen UI empty state reusable.
 * @param {{
 *   icon?: React.ElementType,
 *   title?: string,
 *   description?: string,
 *   className?: string,
 *   compact?: boolean,
 * }} props
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = "Belum ada data",
  description,
  className = "",
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 text-center ${
        compact ? "py-6" : "py-12"
      } ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon size={20} />
      </div>
      <p className="text-sm font-bold text-[#1e293b]">{title}</p>
      {description && (
        <p className="max-w-xs text-xs text-[#94a3b8]">{description}</p>
      )}
    </div>
  );
}
