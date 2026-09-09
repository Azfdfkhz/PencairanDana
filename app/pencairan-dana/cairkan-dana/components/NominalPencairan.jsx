"use client";

import React, { useState } from "react";
import { Wallet } from "lucide-react";

export default function NominalPencairan({
  pilihanNominal = "semua",
  setPilihanNominal,
  nominalLain = "",
  setNominalLain,
}) {
  const [internalPilihan, setInternalPilihan] = useState("semua");
  const [internalLain, setInternalLain] = useState("");

  const selectedPilihan = setPilihanNominal ? pilihanNominal : internalPilihan;
  const setSelectedPilihan = setPilihanNominal || setInternalPilihan;
  const valLain = setNominalLain ? nominalLain : internalLain;
  const setValLain = setNominalLain || setInternalLain;

  const saldoTersedia = "Rp 190.788.000";

  const formatRupiah = (val) => {
    const raw = val.replace(/\D/g, "");
    if (!raw) return "";
    return new Intl.NumberFormat("id-ID").format(raw);
  };

  const handleNominalChange = (e) => {
    setValLain(formatRupiah(e.target.value));
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-[#1e293b]">Nominal Pencairan</h3>
      <p className="mt-0.5 mb-3 text-xs text-[#64748b]">
        Masukkan nominal dana yang ingin Anda cairkan
      </p>

      {/* Container Saldo & Pilihan Nominal */}
      <div className="overflow-hidden rounded-xl border border-[#d0e2ff] bg-[#f0f6fe]">
        {/* Header Saldo Tersedia */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d0e2ff] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#0052cc] shadow-2xs">
              <Wallet size={20} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#475569]">
                Saldo tersedia untuk dicairkan
              </p>
              <p className="text-lg font-extrabold text-[#00b96b]">
                {saldoTersedia}
              </p>
            </div>
          </div>
        </div>

        {/* Pilihan Button / Radio Options */}
        <div className="space-y-3 bg-white p-4">
          {/* Option 1: Cairkan Semua Saldo Tersedia */}
          <button
            type="button"
            onClick={() => setSelectedPilihan("semua")}
            className={`flex w-full items-center justify-between rounded-lg border p-3.5 text-left transition-all ${
              selectedPilihan === "semua"
                ? "border-[#0052cc] bg-[#f8fafc] ring-1 ring-[#0052cc]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  selectedPilihan === "semua"
                    ? "border-[#0052cc] bg-[#0052cc]"
                    : "border-gray-300"
                }`}
              >
                {selectedPilihan === "semua" && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-xs font-semibold text-[#1e293b] md:text-sm">
                Cairkan semua saldo tersedia
              </span>
            </div>

            <span className="text-xs font-bold text-[#00b96b] md:text-sm">
              {saldoTersedia}
            </span>
          </button>

          {/* Option 2: Masukkan Nominal Lain */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setSelectedPilihan("lain")}
              className={`flex w-full items-center justify-between rounded-lg border p-3.5 text-left transition-all ${
                selectedPilihan === "lain"
                  ? "border-[#0052cc] bg-[#f8fafc] ring-1 ring-[#0052cc]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    selectedPilihan === "lain"
                      ? "border-[#0052cc] bg-[#0052cc]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPilihan === "lain" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-xs font-semibold text-[#1e293b] md:text-sm">
                  Masukkan nominal lain
                </span>
              </div>
            </button>

            {/* Input Nominal Kustom */}
            {selectedPilihan === "lain" && (
              <div className="pt-1">
                <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white">
                  <span className="absolute inset-y-0 left-0 flex w-12 items-center justify-center border-r border-gray-300 bg-gray-100 text-sm font-medium text-gray-500">
                    Rp
                  </span>
                  
                  <input
                    type="text"
                    inputMode="numeric"
                    value={valLain}
                    onChange={handleNominalChange}
                    placeholder="Contoh: 50.000.000"
                    className="w-full rounded-lg py-2.5 pl-15 pr-4 text-sm font-semibold text-[#1e293b] outline-hidden focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
                  />
                </div>
                <p className="mt-1 text-[11px] text-[#94a3b8]">
                  Minimal pencairan Rp 100.000
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
