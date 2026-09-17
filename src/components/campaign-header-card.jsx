"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getCampaignInfo } from "@/api/withdrawal-api";
import useAsyncData from "@/hooks/use-async-data";
import LoadingState from "@/components/states/loading-state";
import ErrorState from "@/components/states/error-state";

export default function CampaignHeaderCard() {
  const { data, status, error, reload } = useAsyncData(getCampaignInfo, {
    isEmpty: (d) => !d,
  });

  if (status === "loading") {
    return (
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-xs md:p-5">
        <LoadingState variant="campaign" />
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
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-3.5 shadow-xs sm:p-4 md:p-5">
      <div className="flex flex-row items-center gap-3.5 sm:gap-4">
        {/* Campaign Thumbnail Image (larger on mobile) */}
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-36 md:h-16 md:w-28">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Campaign Title & Link on the Right for Mobile & Desktop */}
        <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
          <h2 className="text-sm font-semibold text-[#1e293b] sm:text-base md:font-medium leading-snug line-clamp-2 md:line-clamp-none">
            {data.title}
          </h2>

          {/* Icon link to campaign page */}
          <Link
            href={data.campaignUrl}
            className="flex shrink-0 items-center justify-center rounded-lg p-2 text-[#0052cc] transition-colors hover:bg-slate-50 hover:text-[#003d99]"
            title="Menuju halaman campaign"
            aria-label="Menuju halaman campaign"
          >
            <ExternalLink size={20} strokeWidth={2} className="md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
