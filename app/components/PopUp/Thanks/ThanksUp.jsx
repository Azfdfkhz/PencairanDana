"use client";

import React from "react";
import {
  ClipboardList,
  CalendarDays,
  Clock,
  Check,
} from "lucide-react";

export default function ThanksUp({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className="flex min-h-full items-center justify-center text-center">
        <div className="w-full max-w-100 rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl">

        {/* === ILLUSTRATION === */}
        <div className="relative mx-auto mb-4 flex h-36 w-36 items-center justify-center">
          {/* Circle background */}
          <div className="absolute inset-0 rounded-full bg-[#eef4ff]" />

          {/* Clouds */}
          <div className="absolute left-3 top-7 h-4 w-7 rounded-full bg-[#dce9fb] opacity-80" />
          <div className="absolute left-6 top-5 h-3 w-5 rounded-full bg-[#dce9fb] opacity-70" />
          <div className="absolute right-4 top-10 h-4 w-7 rounded-full bg-[#dce9fb] opacity-80" />
          <div className="absolute right-7 top-8 h-2.5 w-4 rounded-full bg-[#dce9fb] opacity-70" />

          {/* Sparkles / plus signs */}
          <span className="absolute left-7 top-3 text-base font-bold text-[#f0c040]">+</span>
          <span className="absolute right-6 top-5 text-xs font-bold text-[#3dbb85]">+</span>
          <span className="absolute left-8 bottom-7 text-[10px] font-bold text-[#94a3b8]">+</span>

          {/* Dashed arc trail */}
          <svg
            className="absolute bottom-6 left-3"
            width="70"
            height="35"
            viewBox="0 0 100 50"
            fill="none"
          >
            <path
              d="M10 45 Q30 10 90 30"
              stroke="#89C3EE"
              strokeWidth="2"
              strokeDasharray="5 4"
              fill="none"
            />
          </svg>

          {/* Paper plane SVG */}
          <svg
            className="relative z-10"
            width="75"
            height="75"
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main plane body */}
            <polygon
              points="10,90 95,20 65,100"
              fill="#5B9EE8"
            />
            <polygon
              points="10,90 95,20 38,55"
              fill="#3B7DD8"
            />
            {/* Wing highlight */}
            <polygon
              points="95,20 38,55 65,100"
              fill="#89C3EE"
            />
            {/* Fold crease */}
            <line
              x1="38"
              y1="55"
              x2="65"
              y2="100"
              stroke="#2563C4"
              strokeWidth="1.5"
            />
          </svg>

          {/* Green checkmark badge */}
          <div className="absolute bottom-5 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#22c55e] shadow-md">
            <Check size={16} strokeWidth={3} className="text-white" />
          </div>
        </div>

        {/* === TITLE === */}
        <h2 className="mb-1 text-xl font-extrabold text-[#111827]">
          Terima Kasih
        </h2>

        {/* === SUB TITLE === */}
        <p className="mb-1.5 text-sm font-bold text-[#0052cc]">
          Pengajuanmu telah terkirim!
        </p>

        {/* === DESCRIPTION === */}
        <p className="mb-4 text-xs leading-relaxed text-[#64748b]">
          Tim Sharing Happiness akan melakukan verifikasi
          terlebih dahulu sebelum dana dicairkan ke rekening tujuan.
        </p>

        {/* === INFO CARD (rounded #89C3EE border) === */}
        <div className="mb-5 rounded-xl border-2 border-[#89C3EE] bg-white p-3.5 text-left">
          {/* Nomor Pengajuan */}
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ClipboardList size={15} className="shrink-0 text-[#64748b]" />
              <span className="text-xs font-medium text-[#1e293b]">
                Nomor Pengajuan
              </span>
            </div>
            <span className="text-xs font-semibold text-[#0052cc]">
              PCR138-0001
            </span>
          </div>

          {/* Tanggal Pengajuan */}
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="shrink-0 text-[#64748b]" />
              <span className="text-xs font-medium text-[#1e293b]">
                Tanggal Pengajuan
              </span>
            </div>
            <span className="text-xs font-semibold text-[#0052cc]">
              5 Juli 2026, 14:30 WIB
            </span>
          </div>

          {/* Estimasi Verifikasi */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock size={15} className="shrink-0 text-[#64748b]" />
              <span className="text-xs font-bold text-[#1e293b]">
                Estimasi Verifikasi
              </span>
            </div>
            <span className="text-xs font-semibold text-[#0052cc]">
              1–2 Hari Kerja
            </span>
          </div>
        </div>

        {/* === BUTTON TUTUP === */}
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-[#0047cc] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003bb3] active:scale-[0.98]"
        >
          Tutup
        </button>
        </div>
      </div>
    </div>
  );
}
