"use client";

import React, { useState } from "react";
import { Wallet } from "lucide-react";

export default function NominalPencairan() {
  const [pilihanNominal, setPilihanNominal] = useState("semua"); // 'semua' | 'lain'
  const [nominalLain, setNominalLain] = useState("");
  const saldoTersedia = "Rp 190.788.000";

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
            onClick={() => setPilihanNominal("semua")}
            className={`flex w-full items-center justify-between rounded-lg border p-3.5 text-left transition-all ${
              pilihanNominal === "semua"
                ? "border-[#0052cc] bg-[#f8fafc] ring-1 ring-[#0052cc]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  pilihanNominal === "semua"
                    ? "border-[#0052cc] bg-[#0052cc]"
                    : "border-gray-300"
                }`}
              >
                {pilihanNominal === "semua" && (
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
              onClick={() => setPilihanNominal("lain")}
              className={`flex w-full items-center justify-between rounded-lg border p-3.5 text-left transition-all ${
                pilihanNominal === "lain"
                  ? "border-[#0052cc] bg-[#f8fafc] ring-1 ring-[#0052cc]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    pilihanNominal === "lain"
                      ? "border-[#0052cc] bg-[#0052cc]"
                      : "border-gray-300"
                  }`}
                >
                  {pilihanNominal === "lain" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-xs font-semibold text-[#1e293b] md:text-sm">
                  Masukkan nominal lain
                </span>
              </div>
            </button>

            {/* Input Nominal Kustom */}
            {pilihanNominal === "lain" && (
              <div className="pt-1">
                <div className="relative rounded-lg border border-gray-300 bg-white">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={nominalLain}
                    onChange={(e) => setNominalLain(e.target.value)}
                    placeholder="Contoh: 50.000.000"
                    className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm font-semibold text-[#1e293b] outline-hidden focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
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
