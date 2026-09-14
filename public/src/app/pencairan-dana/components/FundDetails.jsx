"use client";

import { useState } from "react";
import { Clock, Play } from "lucide-react";

import { getRincianDana } from "@/api/withdrawalApi";
import useAsyncData from "@/hooks/useAsyncData";
import { formatRupiah } from "@/lib/format";
import LoadingState from "@/components/states/LoadingState";
import ErrorState from "@/components/states/ErrorState";

export default function FundDetails() {
  const [showRincianOptimasi, setShowRincianOptimasi] = useState(false);
  const { data, status, error, reload } = useAsyncData(getRincianDana, {
    isEmpty: (d) => !d,
  });

  if (status === "loading" || status === "error" || status === "empty") {
    return (
      <div className="flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
        <h2 className="mb-5 text-base font-bold text-[#1e293b]">Rincian Dana</h2>
        {status === "loading" ? (
          <LoadingState label="Memuat rincian dana..." compact />
        ) : (
          <ErrorState
            message={error || "Rincian dana belum tersedia."}
            onRetry={reload}
            compact
          />
        )}
      </div>
    );
  }

  const lastUpdatedLabel = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(data.lastUpdated));

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <div>
        <h2 className="mb-5 text-base font-semibold text-black">Rincian Dana</h2>

        <div className="rounded-xl border border-slate-100 bg-[#fafafa] p-4 md:p-5">
          {/* Header row */}
          <div className="flex items-center justify-between pb-2 text-sm font-medium text-[#1e293b]">
            <span>Dana Terkumpul</span>
            <span>{formatRupiah(data.danaTerkumpul)}</span>
          </div>

          <div className="my-2 space-y-2.5 rounded-lg border border-[#d2e4ff] bg-[#f2f7fe] p-4 text-xs font-medium text-[#334155]">
            <div>
              <button
                type="button"
                onClick={() => setShowRincianOptimasi((prev) => !prev)}
                aria-expanded={showRincianOptimasi}
                className="flex w-full items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  Biaya Optimasi
                  <Play
                    size={10}
                    className={`fill-[#89C3EE] text-[#89C3EE] transition-transform duration-200 ${
                      showRincianOptimasi ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </span>
                <span>{formatRupiah(data.biayaOptimasi.total)}</span>
              </button>

              {/* Sub-rincian Biaya Optimasi */}
              {showRincianOptimasi && (
                <div className="mt-2 ml-4 space-y-1.5 border-l border-[#d2e4ff] pl-3">
                  {data.biayaOptimasi.rincian.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-[11px] text-[#64748b]"
                    >
                      <span>{item.label}</span>
                      <span>{formatRupiah(item.nominal)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span>Biaya Payment Gateway</span>
              <span>{formatRupiah(data.biayaPaymentGateway)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Biaya Platform</span>
              <span>{formatRupiah(data.biayaPlatform)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Sudah Dicairkan</span>
              <span>{formatRupiah(data.sudahDicairkan)}</span>
            </div>
          </div>

          {/* Bisa Dicairkan Total */}
          <div className="flex items-center justify-between pt-4 text-base md:text-lg font-extrabold text-[#1e293b]">
            <span>Bisa Dicairkan</span>
            <span>{formatRupiah(data.bisaDicairkan)}</span>
          </div>
        </div>
      </div>

      {/* Footer info update */}
      <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#94a3b8]">
        <Clock size={15} />
        <span>Data terakhir di update pada {lastUpdatedLabel} WIB</span>
      </div>
    </div>
  );
}
