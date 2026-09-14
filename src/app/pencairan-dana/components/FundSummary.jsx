"use client";

import Link from "next/link";
import { Wallet, Banknote, HandCoins, Send } from "lucide-react";

import { getRingkasanDana } from "@/api/withdrawalApi";
import useAsyncData from "@/hooks/useAsyncData";
import { formatRupiah } from "@/lib/format";
import LoadingState from "@/components/states/LoadingState";
import ErrorState from "@/components/states/ErrorState";

export default function FundSummary() {
  const { data, status, error, reload } = useAsyncData(getRingkasanDana, {
    isEmpty: (d) => !d,
  });

  if (status === "loading") {
    return (
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
        <h2 className="mb-5 text-base font-semibold text-black">Ringkasan Dana</h2>
        <LoadingState label="Memuat ringkasan dana..." compact />
      </div>
    );
  }

  if (status === "error" || status === "empty") {
    return (
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
        <h2 className="mb-5 text-base font-semibold text-black">Ringkasan Dana</h2>
        <ErrorState message={error || "Ringkasan dana belum tersedia."} onRetry={reload} compact />
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <h2 className="mb-5 text-base font-medium text-black">
        Ringkasan Dana
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-center">
        {/* 1. Dana Terkumpul */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-[#0052cc]">
            <Wallet size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#5E5E68]">Dana Terkumpul</p>
            <p className="text-lg font-semibold text-black">{formatRupiah(data.danaTerkumpul)}</p>
          </div>
        </div>

        {/* 2. Sudah Dicairkan */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-[#0052cc]">
            <Banknote size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#5E5E68]">Sudah Dicairkan</p>
            <p className="text-lg font-semibold text-black">{formatRupiah(data.sudahDicairkan)}</p>
          </div>
        </div>

        {/* 3. Bisa Dicairkan */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6f7ed] text-[#00b96b]">
            <HandCoins size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#5E5E68]">Bisa Dicairkan</p>
            <p className="text-lg font-semibold text-[#07B433]">{formatRupiah(data.bisaDicairkan)}</p>
            <p className="mt-0.5 text-[11px] text-[#5E5E68]">
              Minimal Pencairan {formatRupiah(data.minimalPencairan)}
            </p>
          </div>
        </div>  

        {/* 4. Action Button */}
        <div className="flex justify-start lg:justify-end">
          <Link
            href="/pencairan-dana/cairkan-dana"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0047b3] active:scale-[0.98] sm:w-auto"
          >
            <Send size={18} className="-rotate-12" />
            <span>Cairkan Dana</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
