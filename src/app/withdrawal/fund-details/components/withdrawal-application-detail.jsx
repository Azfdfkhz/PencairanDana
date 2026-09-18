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

import { getWithdrawalDetail } from "@/api/withdrawal-api";
import useAsyncData from "@/hooks/use-async-data";
import LoadingState from "@/components/states/loading-state";
import ErrorState from "@/components/states/error-state";
import EmptyState from "@/components/states/empty-state";

export default function WithdrawalApplicationDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, status, error, reload } = useAsyncData(
    async () => {
      try {
        return await getWithdrawalDetail(id);
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
        <LoadingState variant="full" />
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

  const isRejected = data.status === "Ditolak";
  const isSuccessful = data.status === "Berhasil";
  const isProcessing = data.status === "Diproses";

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
          href="/withdrawal"
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
          No Pengajuan : <span className="font-bold">{data.submissionNumber || data.noPengajuan}</span>
        </p>

        {/* === TIMELINE STEPPER === */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            {(data.timeline || []).map((step, index) => {
              const isLast = index === data.timeline.length - 1;
              const isStepRejected = step.rejected;

              // Icon for each step
              let StepIcon = Send;
              let iconBg = "bg-[#EAF3FC] border-2 border-[#2E68B2]";
              let iconColor = "text-[#0052cc]";
              let labelColor = "text-[#2E68B2]";

              if (index === 0) {
                StepIcon = Send;
              } else if (index === 1) {
                StepIcon = Hourglass;
              } else if (isLast && isStepRejected) {
                StepIcon = X;
                iconBg = "bg-white border-2 border-red-500";
                iconColor = "text-red-500";
                labelColor = "text-red-500";
              } else if (isLast && isSuccessful) {
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
                          isRejected && index === 2
                            ? "border-t-2 border-dashed border-red-400"
                            : isProcessing && index === 2
                              ? "border-t-2 border-dashed border-gray-300"
                              : "h-0.5 bg-[#0052cc]"
                        }`}
                      />
                    )}

                    {/* Line after */}
                    {!isLast && (
                      <div
                        className={`absolute left-1/2 z-0 w-full ${
                          isRejected && index === 1
                            ? "border-t-2 border-dashed border-red-400"
                            : isProcessing && index === 1
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
                  {(step.date || step.tanggal) && (
                    <p className="mt-0.5 text-center text-[9px] text-[#94a3b8]">
                      {step.date || step.tanggal}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* === CATATAN PENOLAKAN (only for Ditolak) === */}
        {isRejected && (data.rejectionNote || data.catatanPenolakan) && (
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
              {data.rejectionNote || data.catatanPenolakan}
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
            <InfoRow icon={Wallet} label="Nominal Pencairan" value={data.withdrawalAmount || data.nominalPencairan || data.nominal} isBold />
            <InfoRow icon={MapPin} label="Lokasi Penyaluran" value={data.distributionLocation || data.lokasiPenyaluran} />
            <InfoRow icon={Calendar} label="Rencana Tanggal Penyaluran" value={data.distributionDate || data.tanggalPenyaluran} />
            <InfoRow icon={Users} label="Jumlah Penerima Manfaat" value={data.recipientCount || data.jumlahPenerima} />
            <InfoRow icon={FileText} label="Deskripsi Rencana Penyaluran" value={data.distributionDescription || data.deskripsiPenyaluran} />
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
                    {data.bankName || data.namaBank}
                  </p>
                  <p className="text-sm font-normal tracking-wider text-black md:text-base">
                    {data.accountNumber || data.nomorRekening}
                  </p>
                  <p className="text-xs text-black">{data.accountHolderName || data.namaPemilikRekening}</p>
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
                  {data.contactName || data.namaKontak}
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
                  {data.whatsappNumber || data.noWhatsapp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === DOWNLOAD BUKTI PENCAIRAN (only for Berhasil) === */}
        {isSuccessful && (
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
