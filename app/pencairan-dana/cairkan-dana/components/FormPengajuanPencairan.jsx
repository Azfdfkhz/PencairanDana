"use client";

import KonfirmasiPengajuan from  "@/app/pencairan-dana/cairkan-dana/components/KonfirmasiPengajuan";
import React, { useState } from "react";
import Link from "next/link";
import NominalPencairan from "./NominalPencairan";
import {
  Users,
  MapPin,
  FileText,
  Info,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function FormPengajuanPencairan() {
  const [step, setStep] = useState(1);
  const [pilihanNominal, setPilihanNominal] = useState("semua");
  const [nominalLain, setNominalLain] = useState("");
  const [tanggalPenyaluran, setTanggalPenyaluran] = useState("");
  const [jumlahPenerima, setJumlahPenerima] = useState("");
  const [lokasiPenyaluran, setLokasiPenyaluran] = useState("");
  const [deskripsiPenyaluran, setDeskripsiPenyaluran] = useState("");

  const formData = {
    nominal:
      pilihanNominal === "semua"
        ? "Rp 190.788.000"
        : nominalLain
        ? `Rp ${nominalLain}`
        : "Rp 190.788.000",
    tanggal: tanggalPenyaluran || "30–04–2027",
    jumlahPenerima: jumlahPenerima ? `${jumlahPenerima} Orang` : "150 Orang",
    lokasi: lokasiPenyaluran || "Palu, Sulawesi Tengah",
    deskripsi:
      deskripsiPenyaluran ||
      "Jelaskan secara singkat rencana penyaluran. Jelaskan secara singkat rencana penyaluran.",
  };

  if (step === 2) {
    return (
      <KonfirmasiPengajuan formData={formData} onBack={() => setStep(1)} />
    );
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-8">
      {/* Header Pengajuan Pencairan Dana */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#1e293b] md:text-2xl">
          Pengajuan Pencairan Dana
        </h2>
        <p className="mt-1 text-xs text-[#64748b] md:text-sm">
          Lengkapi informasi berikut untuk mengajukan pencairan dana campaign Anda
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="mb-8 flex justify-center w-full">
        <div className="flex items-start justify-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md">
          {/* Informasi Pencairan */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052cc] text-sm font-bold text-white shadow-xs">
              1
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-bold text-[#0052cc] text-center leading-tight">
              Informasi Pencairan
            </span>
          </div>

          {/* Line */}
          <div className="mt-4 flex-1 h-0.5 bg-gray-200" />

          {/* Konfirmasi Pengajuan */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-400">
              2
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-medium text-[#94a3b8] text-center leading-tight">
              Konfirmasi Pengajuan
            </span>
          </div>
        </div>
      </div>

      {/* Box Utama Form dengan Border Biru */}
      <div className="space-y-6 rounded-2xl border border-[#d0e2ff] bg-white p-5 md:p-7">
        {/* Component Nominal Pencairan */}
        <NominalPencairan
          pilihanNominal={pilihanNominal}
          setPilihanNominal={setPilihanNominal}
          nominalLain={nominalLain}
          setNominalLain={setNominalLain}
        />

        {/* Inputs Grid (Rencana Tanggal, Jumlah Penerima, Lokasi, Deskripsi) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Field: Rencana Tanggal Penyaluran */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#1e293b] md:text-sm">
              Rencana Tanggal Penyaluran
            </label>
            <input
              type="date"
              value={tanggalPenyaluran}
              onChange={(e) => setTanggalPenyaluran(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-[#1e293b] placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm cursor-pointer"
            />
          </div>

          {/* Field: Jumlah Penerima Manfaat */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#1e293b] md:text-sm">
              Jumlah Penerima Manfaat
            </label>
            <div className="relative">
              <input
                type="text"
                value={jumlahPenerima}
                onChange={(e) => setJumlahPenerima(e.target.value)}
                placeholder="Contoh: 150"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-xs text-[#1e293b] placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm"
              />
              <Users
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
              />
            </div>
          </div>

          {/* Field: Lokasi Penyaluran */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#1e293b] md:text-sm">
              Lokasi Penyaluran
            </label>
            <div className="relative">
              <input
                type="text"
                value={lokasiPenyaluran}
                onChange={(e) => setLokasiPenyaluran(e.target.value)}
                placeholder="Contoh: Desa ABC, Kec. BED"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-xs text-[#1e293b] placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm"
              />
              <MapPin
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
              />
            </div>
          </div>

          {/* Field: Deskripsi Penyaluran */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#1e293b] md:text-sm">
              Deskripsi Penyaluran
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={deskripsiPenyaluran}
                onChange={(e) => setDeskripsiPenyaluran(e.target.value)}
                placeholder="Jelaskan tentang rencana penyaluran"
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-xs text-[#1e293b] placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm"
              />
              <FileText
                size={18}
                className="absolute right-3.5 bottom-3 pointer-events-none text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Info Callout Banner */}
        <div className="inline-flex items-center gap-2 rounded-lg bg-[#ebf4fe] px-3.5 py-2 text-xs font-medium text-[#0052cc]">
          <Info size={16} className="shrink-0" />
          <span>Informasi ini akan digunakan sebagai dasar pencairan dana</span>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/pencairan-dana"
          className="flex items-center gap-2 rounded-xl border-2 border-[#0052cc] bg-white px-6 py-3 text-xs font-bold text-[#0052cc] transition-all hover:bg-[#f0f6fe] active:scale-[0.98] md:text-sm"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </Link>

        {/* Button Selanjutnya */}
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex items-center gap-2 rounded-xl bg-[#0052cc] px-8 py-3.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#0047b3] active:scale-[0.98] cursor-pointer md:text-sm"
        >
          <span>Selanjutnya</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
