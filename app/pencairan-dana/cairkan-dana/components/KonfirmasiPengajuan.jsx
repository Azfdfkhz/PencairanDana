"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VerifWhatsapp from "@/app/components/PopUp/VerifWhatsapp/VerifWhatsapp";
import ThanksUp from "@/app/components/PopUp/Thanks/ThanksUp";
import {
  AlertCircle,
  Wallet,
  MapPin,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Landmark,
  User,
  Phone,
  ArrowLeft,
  Send,
  ShieldCheck,

} from "lucide-react";

export default function KonfirmasiPengajuan({ onBack, formData }) {
  const router = useRouter();
  const [setuju, setSetuju] = useState(false);
  const [isVerifOpen, setIsVerifOpen] = useState(false);
  const [isThanksOpen, setIsThanksOpen] = useState(false);

  const displayData = {
    nominal: formData?.nominal || "Rp 190.788.000",
    lokasi: formData?.lokasi || "Palu, Sulawesi Tengah",
    tanggal: formData?.tanggal || "30–04–2027",
    jumlahPenerima: formData?.jumlahPenerima || "150 Orang",
    deskripsi:
      formData?.deskripsi ||
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
  };

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-8">
      {/* Header Pengajuan Pencairan Dana */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#1e293b] md:text-2xl">
          Pengajuan Pencairan Dana
        </h2>
        <p className="mt-1 text-xs text-[#64748b] md:text-sm">
          Lengkapi informasi berikut untuk mengajukan pencairan dana campaign
          Anda
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="mb-8 flex justify-center w-full">
        <div className="flex items-start justify-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md">
          {/* Step 1: Informasi Pencairan */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052cc] text-sm font-bold text-white shadow-xs">
              1
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-bold text-[#0052cc] text-center leading-tight">
              Informasi Pencairan
            </span>
          </div>

          {/* Stepper Connecting Line */}
          <div className="mt-4 flex-1 h-0.5 bg-[#0052cc]" />

          {/* Step 2: Konfirmasi Pengajuan (Active) */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052cc] text-sm font-bold text-white shadow-xs">
              2
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-bold text-[#0052cc] text-center leading-tight">
              Konfirmasi Pengajuan
            </span>
          </div>
        </div>
      </div>

      {/* Konfirmasi Pengajuan Section */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-[#1e293b] md:text-lg">
          Konfirmasi Pengajuan
        </h3>
        <p className="mt-1 text-xs text-[#64748b] md:text-sm">
          Pastikan kembali seluruh informasi pencairan sebelum diajukan.
        </p>
      </div>

      {/* Hal yang Perlu Diperhatikan */}
      <div className="mb-6 rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0 text-[#f59e0b]" />
          <h4 className="text-sm font-bold text-[#92400e]">
            Hal yang Perlu Diperhatikan
          </h4>
        </div>
        <ul className="space-y-1.5 pl-6 text-[11px] text-[#78350f] md:text-xs">
          <li className="list-disc">
            Nominal pencairan telah sesuai dengan Rencana Anggaran Biaya (RAB).
          </li>
          <li className="list-disc">
            Rekening tujuan pencairan sudah benar dan masih aktif.
          </li>
          <li className="list-disc">
            Nomor WhatsApp yang terdaftar masih aktif untuk menerima kode
            verifikasi (OTP).
          </li>
          <li className="list-disc">
            Apabila rekening berubah, silahkan hubungi Customer Service sebelum
            mengajukan pencairan.
          </li>
          <li className="list-disc">
            Pengajuan yang telah dikirim tidak dapat diubah selama proses
            verifikasi.
          </li>
        </ul>
      </div>

      {/* Informasi Pencairan */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
          <h4 className="text-sm font-bold text-[#0052cc]">
            Informasi Pencairan
          </h4>
          <CheckCircle size={22} className="text-[#00b96b]" />
        </div>

        {/* Content */}
        <div className="space-y-4 bg-white p-5 md:p-6">
          {/* Nominal Pencairan */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
              <Wallet size={18} />
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-semibold text-[#334155] md:text-sm">
                Nominal Pencairan
              </span>
              <div className="flex flex-1 items-start gap-2">
                <span className="hidden sm:inline text-xs font-semibold text-[#334155] md:text-sm">
                  :
                </span>
                <span className="flex-1 text-xs font-extrabold text-[#1e293b] md:text-sm text-left">
                  {displayData.nominal}
                </span>
              </div>
            </div>
          </div>

          {/* Lokasi Penyaluran */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
              <MapPin size={18} />
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-semibold text-[#334155] md:text-sm">
                Lokasi Penyaluran
              </span>
              <div className="flex flex-1 items-start gap-2">
                <span className="hidden sm:inline text-xs font-semibold text-[#334155] md:text-sm">
                  :
                </span>
                <span className="flex-1 text-xs font-semibold text-[#1e293b] md:text-sm text-left">
                  {displayData.lokasi}
                </span>
              </div>
            </div>
          </div>

          {/* Rencana Tanggal Penyaluran */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
              <Calendar size={18} />
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-semibold text-[#334155] md:text-sm">
                Rencana Tanggal Penyaluran
              </span>
              <div className="flex flex-1 items-start gap-2">
                <span className="hidden sm:inline text-xs font-semibold text-[#334155] md:text-sm">
                  :
                </span>
                <span className="flex-1 text-xs font-semibold text-[#1e293b] md:text-sm text-left">
                  {displayData.tanggal}
                </span>
              </div>
            </div>
          </div>

          {/* Jumlah Penerima Manfaat */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
              <Users size={18} />
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-semibold text-[#334155] md:text-sm">
                Jumlah Penerima Manfaat
              </span>
              <div className="flex flex-1 items-start gap-2">
                <span className="hidden sm:inline text-xs font-semibold text-[#334155] md:text-sm">
                  :
                </span>
                <span className="flex-1 text-xs font-semibold text-[#1e293b] md:text-sm text-left">
                  {displayData.jumlahPenerima}
                </span>
              </div>
            </div>
          </div>

          {/* Deskripsi Rencana Penyaluran */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
              <FileText size={18} />
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-semibold text-[#334155] md:text-sm">
                Deskripsi Rencana Penyaluran
              </span>
              <div className="flex flex-1 items-start gap-2">
                <span className="hidden sm:inline text-xs font-semibold text-[#334155] md:text-sm">
                  :
                </span>
                <span className="flex-1 text-xs leading-relaxed font-semibold text-[#1e293b] md:text-sm text-left">
                  {displayData.deskripsi}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rekening Pencairan */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
          <h4 className="text-sm font-bold text-[#0052cc]">
            Rekening Pencairan
          </h4>
          <CheckCircle size={22} className="text-[#00b96b]" />
        </div>

        {/* Content */}
        <div className="relative overflow-hidden bg-white p-5 md:p-6">
          {/* Decorative Shield Background */}
          <div className="pointer-events-none absolute right-7 bottom-7 opacity-[0.07]">
            <ShieldCheck size={100} className="text-[#0052cc]" />
          </div>

          <div className="rounded-xl bg-gradient-to-r from-[#f0f6fe] to-[#e8f0fe] p-4 md:p-5">
            <div className="flex items-center gap-4">
              {/* Bank Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-sm">
                <Landmark size={24} />
              </div>

              {/* Bank Info */}
              <div>
                <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00b96b]" />
                  <span className="text-[10px] font-semibold text-[#059669]">
                    Terverifikasi
                  </span>
                </div>
                <p className="text-sm font-bold text-[#1e293b] md:text-base">
                  Bank BCA
                </p>
                <p className="text-sm font-semibold tracking-wider text-[#334155] md:text-base">
                  1234 5678 90
                </p>
                <p className="text-xs text-[#64748b]">Nama Pemilik Rekening</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Kontak */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
          <h4 className="text-sm font-bold text-[#0052cc]">
            Informasi Kontak
          </h4>
          <CheckCircle size={22} className="text-[#00b96b]" />
        </div>

        {/* Content */}
        <div className="space-y-4 bg-white p-5 md:p-6">
          {/* Nama */}
          <div className="flex items-center gap-3">
            <User size={16} className="shrink-0 text-[#64748b]" />
            <div className="flex flex-1 items-center justify-between gap-2">
              <span className="text-xs text-[#64748b] md:text-sm">Nama</span>
              <span className="text-xs font-bold text-[#1e293b] md:text-sm">
                : Nur Fatilah
              </span>
            </div>
          </div>

          {/* No Whatsapp Terdaftar */}
          <div className="flex items-center gap-3">
            <Phone size={16} className="shrink-0 text-[#64748b]" />
            <div className="flex flex-1 items-center justify-between gap-2">
              <span className="text-xs text-[#64748b] md:text-sm">
                No Whatsapp Terdaftar
              </span>
              <span className="text-xs font-bold text-[#1e293b] md:text-sm">
                : 081231781812
              </span>
            </div>
          </div>

          {/* Info Note */}
          <p className="text-[10px] italic text-[#f59e0b] md:text-[11px]">
            * Nomor WhatsApp aktif sudah berubah? silakan perbarui data melalui{" "}
            <Link
              href="#"
              className="font-semibold text-[#0052cc] underline hover:text-[#0047b3]"
            >
              Profil Akun
            </Link>
          </p>
        </div>
      </div>

      {/* Checkbox Syarat & Ketentuan */}
      <div className="mb-2 flex items-start gap-3">
        <input
          type="checkbox"
          id="syarat-ketentuan"
          checked={setuju}
          onChange={(e) => setSetuju(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#0052cc]"
        />
        <label
          htmlFor="syarat-ketentuan"
          className="cursor-pointer text-xs text-[#475569] md:text-sm"
        >
          Saya telah membaca dan menyetujui{" "}
          <Link
            href="#"
            className="font-semibold text-[#0052cc] underline hover:text-[#0047b3]"
          >
            Syarat & Ketentuan Pencairan Dana
          </Link>
          .
        </label>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-8 flex items-center justify-between">
        {/* Button Back / Kembali */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border-2 border-[#0052cc] bg-white px-6 py-3 text-xs font-bold text-[#0052cc] transition-all hover:bg-[#f0f6fe] active:scale-[0.98] cursor-pointer md:text-sm"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </button>

        {/* Button Ajukan Pencairan */}
        <button
          type="button"
          disabled={!setuju}
          onClick={() => setuju && setIsVerifOpen(true)}
          className={`flex items-center gap-2 rounded-xl px-8 py-3.5 text-xs font-bold text-white shadow-xs transition-all active:scale-[0.98] md:text-sm ${
            setuju
              ? "bg-[#0052cc] hover:bg-[#0047b3] cursor-pointer"
              : "bg-[#94a3b8] cursor-not-allowed"
          }`}
        >
          <span>Ajukan Pencairan</span>
          <Send size={18} />
        </button>
      </div>

      {/* PopUp Verifikasi WhatsApp */}
      <VerifWhatsapp
        isOpen={isVerifOpen}
        onClose={() => setIsVerifOpen(false)}
        onSuccess={() => {
          setIsVerifOpen(false);
          setIsThanksOpen(true);
        }}
      />

      {/* PopUp Terima Kasih */}
      <ThanksUp
        isOpen={isThanksOpen}
        onClose={() => {
          setIsThanksOpen(false);
          router.push("/pencairan-dana");
        }}
      />
    </div>
  );
}
