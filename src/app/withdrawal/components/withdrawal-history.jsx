"use client";

import Link from "next/link";
import { ChevronRight, History } from "lucide-react";

import StatusBadge from "@/app/withdrawal/components/status-badge";
import { getWithdrawalHistory } from "@/api/withdrawal-api";
import useAsyncData from "@/hooks/use-async-data";
import LoadingState from "@/components/states/loading-state";
import ErrorState from "@/components/states/error-state";
import EmptyState from "@/components/states/empty-state";

export default function WithdrawalHistory() {
  const {
    data: historyData,
    status,
    error,
    reload,
  } = useAsyncData(getWithdrawalHistory, {
    isEmpty: (d) => !d || d.length === 0,
  });

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <h2 className="mb-4 text-base font-semibold text-black">
        Riwayat Pencairan
      </h2>

      {status === "loading" && (
        <LoadingState variant="history" />
      )}

      {status === "error" && (
        <ErrorState message={error} onRetry={reload} compact />
      )}

      {status === "empty" && (
        <EmptyState
          icon={History}
          title="Belum ada riwayat pencairan"
          description="Pengajuan pencairan dana yang Anda buat akan muncul di sini."
          compact
        />
      )}

      {status === "success" && (
        <>
          <div className="max-h-112 space-y-3 overflow-y-auto pr-1 md:hidden">
            {historyData.map((item) => (
              <Link
                key={item.id}
                href={item.detailUrl}
                className="block rounded-xl border border-gray-100 bg-[#fafafa] p-3.5 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium text-black">{item.date}</p>
                    <p className="text-[11px] text-[#8C8C8C]">{item.time}</p>
                  </div>
                  <StatusBadge status={item.status} type={item.statusType} />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-[#1e293b]">{item.nominal}</p>
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0052cc]">
                    <span>Lihat detail</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop / tablet: table */}
          <div className="hidden max-h-96 overflow-auto md:block">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-black">
                  <th className="pb-3 font-bold">Tanggal Pengajuan</th>
                  <th className="pb-3 font-bold">Nominal</th>
                  <th className="pb-3 text-center font-bold">Status</th>
                  <th className="pb-3 text-right font-bold">Detail</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {historyData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5">
                      <p className="font-medium text-black">{item.date}</p>
                      <p className="text-[11px] text-[#8C8C8C]">{item.time}</p>
                    </td>

                    <td className="py-3.5 font-medium text-black">{item.nominal}</td>

                    <td className="py-3.5 text-center">
                      <StatusBadge status={item.status} type={item.statusType} />
                    </td>

                    <td className="py-3.5 text-right">
                      <Link
                        href={item.detailUrl}
                        className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0052cc] hover:underline"
                      >
                        <span>Lihat detail</span>
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
