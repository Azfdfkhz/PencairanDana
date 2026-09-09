"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function CampaignHeaderCard() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-xs md:p-5">
      <div className="flex items-center gap-4">
        {/* Campaign Thumbnail with corner radius 6px */}
        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100 md:h-16 md:w-28">
          <Image
            src="/images/SH-Rohingnya.png"
            alt="Bantu Pengungsi Rohingya"
            fill
            className="object-cover"
          />
        </div>

        {/* Campaign Title */}
        <h2 className="text-sm font-bold text-[#1e293b] md:text-base">
          Bantu Pengungsi Rohingya Bertahan di Musim Dingin
        </h2>
      </div>

      {/* Icon link to campaign page */}
      <Link
        href="/campaign/rohingya"
        className="flex items-center justify-center p-2 text-[#0052cc] transition-colors hover:text-[#003d99]"
        title="Menuju halaman campaign"
        aria-label="Menuju halaman campaign"
      >
        <ExternalLink size={22} strokeWidth={2} />
      </Link>
    </div>
  );
}
