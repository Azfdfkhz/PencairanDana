"use client";

import { Landmark, Info, Pencil, ShieldCheck } from "lucide-react";

export default function RekeningPencairanDana({ onSubmit }) {
  return (
    <div className="mb-6 flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <div>
        <h2 className="mb-5 text-base font-bold text-[#1e293b]">
          Rekening Pencairan Dana
        </h2>

        {/* Bank Account Container */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-[#f2f9f4] p-5">
          {/* Background Shield Watermark Graphic */}
          <div className="pointer-events-none absolute -right-6 -top-6 text-emerald-500/10">
            <ShieldCheck size={160} strokeWidth={1.2} />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            {/* Bank Building Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-[#0052cc]">
              <Landmark size={26} strokeWidth={2} />
            </div>

            {/* Account Info */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#475569]">Bank BCA</p>
              <p className="text-xl md:text-2xl font-extrabold tracking-wide text-[#1e293b]">
                1234 5678 90
              </p>
              <p className="text-xs font-medium text-[#475569]">
                Yayasan Berbagi Bahagia
              </p>

              {/* Verified Badge */}
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  <span className="text-xs">✓</span> Terverifikasi
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Notice Box */}
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] p-3 text-xs text-[#0052cc]">
          <Info size={18} className="mt-0.5 shrink-0" />
          <p className="font-medium leading-relaxed">
            Setiap pengajuan pencairan dana yang berhasil akan ditransfer ke
            rekening ini
          </p>
        </div>
      </div>

      {/* Ubah Rekening Button */}
      <div className="mt-5">
        <button
          type="button"
          onClick={onSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0052cc] bg-white py-2.5 text-sm font-bold text-[#0052cc] shadow-2xs transition-colors hover:bg-[#f0f6fe] active:scale-[0.99]"
        >
          <Pencil size={16} />
          <span>Ubah Rekening</span>
        </button>
      </div>
    </div>
  );
}