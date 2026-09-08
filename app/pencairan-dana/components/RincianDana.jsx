"use client";

import { Clock, Play } from "lucide-react";

export default function RincianDana() {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <div>
        <h2 className="mb-5 text-base font-bold text-[#1e293b]">Rincian Dana</h2>

        {/* Outer summary box */}
        <div className="rounded-xl border border-slate-100 bg-[#fafafa] p-4 md:p-5">
          {/* Header row */}
          <div className="flex items-center justify-between pb-2 text-sm font-semibold text-[#1e293b]">
            <span>Dana Terkumpul</span>
            <span>Rp 213.788.000</span>
          </div>

          {/* Inner details container (Light Blue Box) */}
          <div className="my-2 space-y-2.5 rounded-lg border border-[#d2e4ff] bg-[#f2f7fe] p-4 text-xs font-medium text-[#334155]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                Biaya Optimasi
                <Play size={10} className="fill-[#0052cc] text-[#0052cc]" />
              </span>
              <span>Rp 30.000.000</span>
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
