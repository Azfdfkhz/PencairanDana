"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  MapPin,
  Calendar,
  Users,
  FileText,
  User,
  Phone,
  BadgeCheck,
  ShieldCheck,
  Send,
  Hourglass,
  X,
  Download,
  Landmark,
  SearchX,
} from "lucide-react";

import { getDetailPencairan } from "@/api/withdrawalApi";
import useAsyncData from "@/hooks/useAsyncData";
import LoadingState from "@/components/states/LoadingState";
import ErrorState from "@/components/states/ErrorState";
import EmptyState from "@/components/states/EmptyState";

export default function WithdrawalApplicationDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, status, error, reload } = useAsyncData(
    async () => {
      try {
        return await getDetailPencairan(id);
      } catch (err) {
        if (err?.status === 404) return null;
        throw err;
      }
    },
    { deps: [id], enabled: Boolean(id), isEmpty: (d) => !d }
  );

  if (!id) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-xs">
        <EmptyState
          icon={SearchX}
          title="Data tidak ditemukan"
          description="Nomor pengajuan tidak ditemukan pada tautan ini."
        />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-xs">
        <LoadingState label="Memuat detail pengajuan..." />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-xs">
        <ErrorState
          message="Terjadi kesalahan pada server. Silakan coba lagi."
          onRetry={reload}
        />
      </div>
    );
  }

  if (status === "empty" || !data) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-xs">
        <EmptyState
          icon={SearchX}
          title="Data tidak ditemukan"
          description="Pengajuan pencairan dengan nomor ini tidak ditemukan."
        />
      </div>
    );
  }

  const isDitolak = data.status === "Ditolak";
  const isBerhasil = data.status === "Berhasil";
  const isDiproses = data.status === "Diproses";

  // Badge color config
  const badgeConfig = {
    Ditolak: "border-rose-300 bg-rose-50 text-rose-500",
    Berhasil: "border-emerald-300 bg-emerald-50 text-emerald-600",
    Diproses: "border-amber-300 bg-amber-50 text-amber-600",
  };

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-8">
      {/* Back + Title */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/pencairan-dana"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-black transition-colors hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-lg font-semibold text-black md:text-xl">
          Detail Pengajuan Pencairan
        </h2>
      </div>

      {/* Content Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-7">
        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`inline-block rounded-full border px-4 py-1 text-xs font-medium ${
              badgeConfig[data.status] || badgeConfig.Diproses
            }`}
          >
            {data.status}
          </span>
        </div>

        {/* No Pengajuan */}
        <p className="mb-6 text-sm text-black">
          No Pengajuan : <span className="font-bold">{data.noPengajuan}</span>
        </p>

        {/* === TIMELINE STEPPER === */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            {data.timeline.map((step, index) => {
              const isLast = index === data.timeline.length - 1;
              const isRejected = step.rejected;

              // Icon for each step
              let StepIcon = Send;
              let iconBg = "bg-[#EAF3FC] border-2 border-[#2E68B2]";
              let iconColor = "text-[#0052cc]";
              let labelColor = "text-[#2E68B2]";

              if (index === 0) {
                StepIcon = Send;
              } else if (index === 1) {
                StepIcon = Hourglass;
              } else if (isLast && isRejected) {
                StepIcon = X;
                iconBg = "bg-white border-2 border-red-500";
                iconColor = "text-red-500";
                labelColor = "text-red-500";
              } else if (isLast && isBerhasil) {
                StepIcon = BadgeCheck;
                iconBg = "bg-[#EAF3FC] border-2 border-[#2E68B2]";
              } else if (!step.done) {
                StepIcon = BadgeCheck;
                iconBg = "bg-white border-2 border-gray-300";
                iconColor = "text-gray-400";
                labelColor = "text-gray-400";
              }

              return (
                <div key={index} className="flex flex-1 flex-col items-center">
                  {/* Icon + Connecting Line */}
                  <div className="relative flex w-full items-center justify-center">
                    {/* Line before */}
                    {index > 0 && (
                      <div
                        className={`absolute right-1/2 z-0 w-full ${
                          isDitolak && index === 2
                            ? "border-t-2 border-dashed border-red-400"
                            : isDiproses && index === 2
                              ? "border-t-2 border-dashed border-gray-300"
                              : "h-0.5 bg-[#0052cc]"
                        }`}
                      />
                    )}

                    {/* Line after */}
                    {!isLast && (
                      <div
                        className={`absolute left-1/2 z-0 w-full ${
                          isDitolak && index === 1
                            ? "border-t-2 border-dashed border-red-400"
                            : isDiproses && index === 1
                              ? "border-t-2 border-dashed border-gray-300"
                              : "h-0.5 bg-[#0052cc]"
                        }`}
                      />
                    )}

                    {/* Step circle */}
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${iconBg} shadow-xs`}
                    >
                      <StepIcon size={28} className={iconColor} />
                    </div>
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-2 text-center text-[12px] font-medium ${labelColor} md:text-xs`}
                  >
                    {step.label}
                  </p>

                  {/* Date */}
                  {step.tanggal && (
                    <p className="mt-0.5 text-center text-[9px] text-[#94a3b8]">
                      {step.tanggal}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* === CATATAN PENOLAKAN (only for Ditolak) === */}
        {isDitolak && data.catatanPenolakan && (
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Header */}
          <div className="bg-[#FCEAEA] px-5 py-4">
            <h4 className="text-sm font-semibold text-black">
              Catatan dari Tim Sharing Happiness
            </h4>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-xs leading-relaxed text-black md:text-sm">
              {data.catatanPenolakan}
            </p>
          </div>
        </div>
        )}

        {/* === INFORMASI PENCAIRAN === */}
        <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
          <div className="border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
            <h4 className="text-sm font-semibold text-[#2E68B2]">
              Informasi Pencairan
            </h4>
          </div>
          <div className="space-y-4 bg-white p-5 md:p-6">
            <InfoRow icon={Wallet} label="Nominal Pencairan" value={data.nominalPencairan} isBold />
            <InfoRow icon={MapPin} label="Lokasi Penyaluran" value={data.lokasiPenyaluran} />
            <InfoRow icon={Calendar} label="Rencana Tanggal Penyaluran" value={data.tanggalPenyaluran} />
            <InfoRow icon={Users} label="Jumlah Penerima Manfaat" value={data.jumlahPenerima} />
            <InfoRow icon={FileText} label="Deskripsi Rencana Penyaluran" value={data.deskripsiPenyaluran} />
          </div>
        </div>

        {/* === REKENING PENCAIRAN === */}
        <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
          <div className="border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
            <h4 className="text-sm font-bold text-[#0052cc]">
              Rekening Pencairan
            </h4>
          </div>
          <div className="relative overflow-hidden bg-white p-5 md:p-6">
            {/* Decorative Shield */}
            <div className="pointer-events-none absolute right-7 bottom-7 opacity-[0.07]">
              <ShieldCheck size={100} className="text-[#0052cc]" />
            </div>
            <div className="rounded-xl bg-gradient-to-r from-[#f0f6fe] to-[#e8f0fe] p-4 md:p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-sm">
                  <Landmark size={24} />
                </div>
                <div>
                  <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00b96b]" />
                    <span className="text-[10px] font-semibold text-[#059669]">
                      Terverifikasi
                    </span>
                  </div>
                  <p className="text-sm font-bold text-black md:text-base">
                    {data.namaBank}
                  </p>
                  <p className="text-sm font-normal tracking-wider text-black md:text-base">
                    {data.nomorRekening}
                  </p>
                  <p className="text-xs text-black">{data.namaPemilikRekening}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === INFORMASI KONTAK === */}
        <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
          <div className="border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
            <h4 className="text-sm font-bold text-[#0052cc]">
              Informasi Kontak
            </h4>
          </div>
          <div className="space-y-4 bg-white p-5 md:p-6">
            <div className="flex items-center gap-3">
              <User size={16} className="shrink-0 text-black" />
              <div className="flex flex-1 items-center gap-2">
                <span className="w-40 shrink-0 text-xs font-medium text-black md:w-48 md:text-sm">
                  Nama
                </span>
                <span className="text-xs text-black md:text-sm">:</span>
                <span className="text-xs font-normal text-black md:text-sm">
                  {data.namaKontak}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-black" />
              <div className="flex flex-1 items-center gap-2">
                <span className="w-40 shrink-0 text-xs font-medium text-black md:w-48 md:text-sm">
                  No Whatsapp Terdaftar
                </span>
                <span className="text-xs text-black md:text-sm">:</span>
                <span className="text-xs font-normal text-black md:text-sm">
                  {data.noWhatsapp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === DOWNLOAD BUKTI PENCAIRAN (only for Berhasil) === */}
        {isBerhasil && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="text-sm font-semibold text-black">
              Download Bukti Pencairan :
            </span>
            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0052cc] px-6 py-2.5 text-sm font-semibold text-[#0052cc] transition-all hover:bg-[#f0f6fe] active:scale-[0.98]">
              <span>Bukti Pencairan</span>
              <Download size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Helper Component ── */
function InfoRow({ icon: Icon, label, value, isBold = false }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      {/* Icon Badge */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
        <Icon size={18} />
      </div>

      {/* Content Grid */}
      <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
        {/* Label */}
        <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-medium text-black md:text-sm">
          {label}
        </span>

        {/* Colon + Value */}
        <div className="flex flex-1 items-start gap-2">
          <span className="hidden sm:inline text-xs font-medium text-black md:text-sm">
            :
          </span>
          <span
            className={`flex-1 text-xs leading-relaxed text-medium  md:text-sm text-left ${
              isBold ? "font-bold text-black" : "font-semibold"
            }`}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
