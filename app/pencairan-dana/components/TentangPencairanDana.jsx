"use client";

import { Calendar, ShieldCheck, HelpCircle, PhoneCall } from "lucide-react";

export default function TentangPencairanDana() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <h2 className="mb-5 text-base font-bold text-[#1e293b]">
        Tentang Pencairan Dana
      </h2>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        {/* Left Column: Info List & CS Button */}
        <div className="space-y-4 md:col-span-7">
          {/* Item 1: Proses Cepat */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] text-[#0052cc]">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1e293b]">Proses Cepat</h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748b]">
                Pencairan dana diproses maks. 7 hari kerja setelah pengajuan
              </p>
            </div>
          </div>

          {/* Item 2: Aman & Terpercaya */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] text-[#0052cc]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1e293b]">
                Aman & Terpercaya
              </h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748b]">
                Dana anda dijamin aman dan hanya dicairkan ke rekening
                terverifikasi
              </p>
            </div>
          </div>

          {/* Item 3: Butuh Bantuan? */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] text-[#0052cc]">
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1e293b]">
                Butuh Bantuan?
              </h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#64748b]">
                Jika ada kendala, silahkan hubungi customer service kami
              </p>
            </div>
          </div>

          {/* Hubungi CS Button */}
          <div className="pt-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] py-2 text-xs font-bold text-[#0052cc] transition-colors hover:bg-[#e2eeff] active:scale-[0.99]">
              <PhoneCall size={14} />
              <span>Hubungi CS</span>
            </button>
          </div>
        </div>

        {/* Right Column: Custom Clean SVG Illustration */}
        <div className="flex justify-center md:col-span-5">
          <svg
            className="w-full max-w-[200px] h-auto"
            viewBox="0 0 240 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Monitor Base & Stand */}
            <path
              d="M120 135V155M90 155H150"
              stroke="#0052cc"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Monitor Body */}
            <rect
              x="30"
              y="35"
              width="180"
              height="100"
              rx="8"
              fill="#ffffff"
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Monitor Screen Top Bar */}
            <path
              d="M30 55H210"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            {/* Screen Icons / Flow UI */}
            <circle cx="50" cy="45" r="3" fill="#ff5f56" />
            <circle cx="60" cy="45" r="3" fill="#ffbd2e" />
            <circle cx="70" cy="45" r="3" fill="#27c93f" />

            {/* Dashboard Flow Line */}
            <rect x="50" y="70" width="30" height="25" rx="4" fill="#f0f6fe" stroke="#0052cc" strokeWidth="1.5" />
            <path d="M57 82.5L62 87.5L73 76.5" stroke="#0052cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            <path d="M85 82.5H105" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />

            <rect x="110" y="70" width="30" height="25" rx="4" fill="#f0f6fe" stroke="#0052cc" strokeWidth="1.5" />
            <circle cx="125" cy="82.5" r="6" stroke="#0052cc" strokeWidth="1.5" />

            <path d="M145 82.5H165" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />

            <rect x="170" y="70" width="30" height="25" rx="4" fill="#0052cc" />
            <path d="M178 82.5L182 86.5L192 77.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Person at Desk Illustration */}
            <circle cx="20" cy="115" r="10" fill="#1e293b" />
            <path d="M5 145C5 130 15 125 25 125H35L45 145" fill="#0052cc" />

            {/* Floating Gold Coin Badge */}
            <circle cx="205" cy="140" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <text x="205" y="144" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">
              Rp
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
