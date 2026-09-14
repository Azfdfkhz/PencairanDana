"use client";

import React from "react";
import { X, FileText } from "lucide-react";

export default function TermsAndConditions({ isOpen, onClose, onAgree }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#0052cc]" />
            <h3 className="text-sm font-bold text-black md:text-base">
              Syarat & Ketentuan Pencairan Dana
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4 text-xs leading-relaxed text-[#475569] md:text-sm">
          <p className="mb-3">
            Dengan mengajukan pencairan dana, Anda menyetujui hal-hal berikut:
          </p>
          <ol className="list-decimal space-y-2 pl-4">
            <li>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas urna dolor, dictum et sollicitudin sed, egestas quis nibh. Pellentesque porttitor enim leo.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas urna dolor, dictum et sollicitudin sed, egestas quis nibh. Pellentesque porttitor enim leo.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas urna dolor, dictum et sollicitudin sed, egestas quis nibh. Pellentesque porttitor enim leo.
            </li>
            <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas urna dolor, dictum et sollicitudin sed, egestas quis nibh. Pellentesque porttitor enim leo.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas urna dolor, dictum et sollicitudin sed, egestas quis nibh. Pellentesque porttitor enim leo.
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-5 py-4">

          <button
            type="button"
            onClick={onAgree}
            className="rounded-xl bg-[#0052cc] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0047b3] cursor-pointer md:text-sm"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}