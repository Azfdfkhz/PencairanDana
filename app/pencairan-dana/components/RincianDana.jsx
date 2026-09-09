"use client";

import { useState } from "react";
import { Clock, Play } from "lucide-react";

const rincianBiayaOptimasi = [
  { label: "PPh Iklan", nominal: "Rp 5.000.000" },
  { label: "Biaya Iklan", nominal: "Rp 15.000.000" },
  { label: "Biaya Optimasi", nominal: "Rp 10.000.000" },
];

export default function RincianDana() {
  const [showRincianOptimasi, setShowRincianOptimasi] = useState(false);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <div>
        <h2 className="mb-5 text-base font-bold text-[#1e293b]">Rincian Dana</h2>

        <div className="rounded-xl border border-slate-100 bg-[#fafafa] p-4 md:p-5">
          {/* Header row */}
          <div className="flex items-center justify-between pb-2 text-sm font-semibold text-[#1e293b]">
            <span>Dana Terkumpul</span>
            <span>Rp 213.788.000</span>
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
                <span>Rp 30.000.000</span>
              </button>

              {/* Sub-rincian Biaya Optimasi */}
              {showRincianOptimasi && (
                <div className="mt-2 ml-4 space-y-1.5 border-l border-[#d2e4ff] pl-3">
                  {rincianBiayaOptimasi.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-[11px] text-[#64748b]"
                    >
                      <span>{item.label}</span>
                      <span>{item.nominal}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span>Biaya Payment Gateway</span>
              <span>Rp 67.000.000</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Biaya Platform</span>
              <span>Rp 67.000.000</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Sudah Dicairkan</span>
              <span>Rp 31.788.000</span>
            </div>
          </div>

          {/* Bisa Dicairkan Total */}
          <div className="flex items-center justify-between pt-4 text-base md:text-lg font-extrabold text-[#1e293b]">
            <span>Bisa Dicairkan</span>
            <span>Rp 147.000.000</span>
          </div>
        </div>
      </div>

      {/* Footer info update */}
      <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#94a3b8]">
        <Clock size={15} />
        <span>Data terakhir di update pada 7 July 2026 - 08:00 WIB</span>
      </div>
    </div>
  );
}