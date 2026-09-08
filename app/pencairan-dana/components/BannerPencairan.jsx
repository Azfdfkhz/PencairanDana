"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export default function BannerPencairan() {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#d2e4ff] bg-[#f0f6fe] p-5 md:flex-row md:p-6 shadow-xs">
      <div className="flex items-center gap-4 md:gap-5">
        {/* Wallet & Money SVG Icon (Easy to swap out with custom SVG) */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-xs md:h-16 md:w-16">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* Blue Wallet */}
            <rect
              x="6"
              y="20"
              width="48"
              height="36"
              rx="8"
              fill="#0052cc"
            />
            <rect
              x="10"
              y="24"
              width="40"
              height="28"
              rx="6"
              fill="#0066ff"
            />

            {/* Money notes popping out */}
            <rect
              x="12"
              y="10"
              width="36"
              height="20"
              rx="3"
              fill="#22c55e"
              transform="rotate(-6 12 10)"
            />
            <circle cx="28" cy="18" r="4" fill="#86efac" />

            {/* Gold coins */}
            <circle cx="48" cy="44" r="9" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
            <path
              d="M45 44L47.5 46.5L51.5 41.5"
              stroke="#78350f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Wallet Clasp */}
            <path
              d="M40 32C40 29.7909 41.7909 28 44 28H54V40H44C41.7909 40 40 38.2091 40 36V32Z"
              fill="#003d99"
            />
            <circle cx="47" cy="34" r="2.5" fill="#ffffff" />
          </svg>
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-base font-bold text-[#1e293b] md:text-lg">
            Salurkan Kebaikan Tanpa Menunggu
          </h3>
          <p className="mt-1 text-xs text-[#64748b] md:text-sm leading-relaxed">
            Pastikan setiap donasi tersalurkan dengan baik dan wujudkan setiap
            amanah donatur menjadi manfaat nyata bagi mereka yang membutuhkan.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href="/pencairan-dana/cairkan-dana"
        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0047b3] active:scale-[0.98] md:w-auto"
      >
        <Send size={18} className="-rotate-12" />
        <span>Cairkan Dana Sekarang</span>
      </Link>
    </div>
  );
}
