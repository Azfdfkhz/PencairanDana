"use client";

import React from "react";
import Image from "next/image";
import {
  ClipboardList,
  CalendarDays,
  Clock,
  Check,
} from "lucide-react";

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   data?: {
 *     noPengajuan: string,
 *     tanggalPengajuan: string,
 *     jamPengajuan: string,
 *     estimasiVerifikasi: string,
 *   } | null,
 * }} props
 */
export default function ThankYouModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const submissionNumber = data?.submissionNumber || data?.noPengajuan || "-";
  const submissionDate =
    (data?.submissionDate || data?.tanggalPengajuan) && (data?.submissionTime || data?.jamPengajuan)
      ? `${data?.submissionDate || data?.tanggalPengajuan}, ${data?.submissionTime || data?.jamPengajuan}`
      : data?.submissionDate || data?.tanggalPengajuan || "-";
  const verificationEstimate = data?.verificationEstimate || data?.estimasiVerifikasi || "1–2 Hari Kerja";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 md:p-8">
      <div className="flex min-h-full items-center justify-center text-center">
        <div className="w-full max-w-100 rounded-3xl bg-white p-6 text-center shadow-xl sm:p-8 md:max-w-120 md:p-10">

        {/* === ILLUSTRATION === */}
        <div className="relative mx-auto mb-4 flex h-36 w-36 items-center justify-center md:mb-6 md:h-40 md:w-40">
          {/* Circle background */}
          <div className="absolute inset-0 rounded-full bg-[#eef4ff]" />

          <Image
            src="/images/paper-plane.svg"
            alt="paper-plane"
            width={160}
            height={160}
            className="relative z-10 h-full w-full object-contain"
          />

          {/* Green checkmark badge */}
          <div className="absolute bottom-5 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#22c55e] shadow-md">
            <Check size={16} strokeWidth={3} className="text-white" />
          </div>
        </div>

        {/* === TITLE === */}
        <h2 className="mb-1 text-xl font-extrabold text-[#111827] md:text-2xl">
          Terima Kasih
        </h2>

        {/* === SUB TITLE === */}
        <p className="mb-1.5 text-sm font-bold text-[#0047CA] md:text-base">
          Pengajuanmu telah terkirim!
        </p>

        {/* === DESCRIPTION === */}
        <p className="mb-4 text-xs leading-relaxed text-[#64748b] md:text-sm">
          Tim Sharing Happiness akan melakukan verifikasi
          terlebih dahulu sebelum dana dicairkan ke rekening tujuan.
        </p>

        {/* === INFO CARD (rounded #89C3EE border) === */}
        <div className="mb-5 rounded-xl border-2 border-[#89C3EE] bg-white p-3.5 text-left md:p-4">
          {/* Nomor Pengajuan */}
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <ClipboardList size={15} className="shrink-0 text-[#64748b]" />
              <span className="text-xs font-medium text-[#545353]">
                Nomor Pengajuan
              </span>
            </div>
            <span className="max-w-[48%] wrap-break-words text-right text-xs font-medium leading-snug text-[#2671CE]">
              {submissionNumber}
            </span>
          </div>

          {/* Tanggal Pengajuan */}
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <CalendarDays size={15} className="shrink-0 text-[#64748b]" />
              <span className="text-xs font-medium text-[#545353]">
                Tanggal Pengajuan
              </span>
            </div>
            <span className="max-w-[48%] wrap-break-words text-right text-xs font-medium leading-snug text-[#2671CE]">
              {submissionDate}
            </span>
          </div>

          {/* Estimasi Verifikasi */}
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Clock size={15} className="shrink-0 text-[#64748b]" />
              <span className="text-xs font-medium text-[#545353]">
                Estimasi Verifikasi
              </span>
            </div>
            <span className="max-w-[48%] wrap-break-words text-right text-xs font-medium leading-snug text-[#2671CE]">
              {verificationEstimate}
            </span>
          </div>
        </div>

        {/* BUTTON TUTUP */}
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
