"use client";

import React from "react";
import { Wallet } from "lucide-react";

import { getRingkasanDana } from "@/api/withdrawalApi";
import useAsyncData from "@/hooks/useAsyncData";
import { formatRupiah, formatNumberInput } from "@/lib/format";
import LoadingState from "@/components/states/LoadingState";
import ErrorState from "@/components/states/ErrorState";

export default function WithdrawalAmount({
  pilihanNominal = "semua",
  setPilihanNominal,
  nominalLain = "",
  setNominalLain,
  error,
  onSaldoLoaded,
}) {
  const { data, status, error: fetchError, reload } = useAsyncData(getRingkasanDana, {
    isEmpty: (d) => !d,
  });

  const saldoTersedia = data?.bisaDicairkan ?? 0;

  React.useEffect(() => {
    if (status === "success" && onSaldoLoaded) {
      onSaldoLoaded(saldoTersedia);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, saldoTersedia]);

  const handleNominalChange = (e) => {
    setNominalLain(formatNumberInput(e.target.value));
  };

  if (status === "loading") {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[#1e293b]">Nominal Pencairan</h3>
        <div className="mt-3 rounded-xl border border-[#d0e2ff] bg-[#f0f6fe] p-4">
          <LoadingState label="Memuat saldo tersedia..." compact />
        </div>
      </div>
    );
  }

  if (status === "error" || status === "empty") {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[#1e293b]">Nominal Pencairan</h3>
        <div className="mt-3 rounded-xl border border-[#d0e2ff] bg-[#f0f6fe] p-4">
          <ErrorState
            message={fetchError || "Saldo tersedia belum dapat dimuat."}
            onRetry={reload}
            compact
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-[#1e293b]">Nominal Pencairan</h3>
      <p className="mt-0.5 mb-3 text-xs text-[#64748b]">
        Masukkan nominal dana yang ingin Anda cairkan
      </p>

      {/* Container Saldo & Pilihan Nominal */}
      <div
        className={`overflow-hidden rounded-xl border bg-[#f0f6fe] ${
          error ? "border-rose-300" : "border-[#d0e2ff]"
        }`}
      >
        {/* Header Saldo Tersedia */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d0e2ff] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#0052cc] shadow-2xs">
              <Wallet size={20} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5E5E68]">
                Saldo tersedia untuk dicairkan
              </p>
              <p className="text-lg font-semibold text-[#07B433]">
                {formatRupiah(saldoTersedia)}
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
              <span className="text-xs font-semibold text-[#5E5E68] md:text-sm">
                Cairkan semua saldo tersedia
              </span>
            </div>

            <span className="text-xs font-semibold text-[#07B433] md:text-sm">
              {formatRupiah(saldoTersedia)}
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
                <span className="text-xs font-semibold text-[#5E5E68] md:text-sm">
                  Masukkan nominal lain
                </span>
              </div>
            </button>

            {/* Input Nominal Kustom */}
            {pilihanNominal === "lain" && (
              <div className="pt-1">
                <div
                  className={`relative overflow-hidden rounded-lg border bg-white ${
                    error ? "border-rose-400" : "border-gray-300"
                  }`}
                >
                  <span className="absolute inset-y-0 left-0 flex w-12 items-center justify-center border-r border-gray-300 bg-gray-100 text-sm font-medium text-gray-500">
                    Rp
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={nominalLain}
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

      {error && (
        <p className="mt-2 text-xs font-medium text-rose-500">{error}</p>
      )}
    </div>
  );
}
