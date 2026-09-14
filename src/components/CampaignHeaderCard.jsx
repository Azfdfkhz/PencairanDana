"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getCampaignInfo } from "@/api/withdrawalApi";
import useAsyncData from "@/hooks/useAsyncData";
import LoadingState from "@/components/states/LoadingState";
import ErrorState from "@/components/states/ErrorState";

export default function CampaignHeaderCard() {
  const { data, status, error, reload } = useAsyncData(getCampaignInfo, {
    isEmpty: (d) => !d,
  });

  if (status === "loading") {
    return (
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-xs md:p-5">
        <LoadingState label="Memuat info campaign..." compact />
      </div>
    );
  }

  if (status === "error" || status === "empty") {
    return (
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-xs md:p-5">
        <ErrorState
          message={error || "Info campaign tidak ditemukan."}
          onRetry={reload}
          compact
        />
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-xs md:p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100 md:h-16 md:w-28">
          <Image src={data.thumbnail} alt={data.title} fill className="object-cover" />
        </div>

        {/* Campaign Title */}
        <h2 className="text-sm font-medium text-[#1e293b] md:text-base">{data.title}</h2>

      {/* Icon link to campaign page */}
        <Link
          href={data.campaignUrl}
          className="flex items-center justify-center p-2 text-[#0052cc] transition-colors hover:text-[#003d99]"
          title="Menuju halaman campaign"
          aria-label="Menuju halaman campaign"
        >
          <ExternalLink size={22} strokeWidth={2} />
        </Link>
       </div>
    </div>
  );
}
