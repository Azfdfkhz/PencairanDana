"use client";

import Image from "next/image";
import { Calendar, ShieldCheck, HelpCircle, PhoneCall } from "lucide-react";

const CS_WHATSAPP_NUMBER = "6281234567890";

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
              <a  href={`https://wa.me/${CS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Halo."
                )}`}>Hubungi CS</a>
            </button>
          </div>
        </div>

        {/* Right Column: Custom Clean SVG Illustration */}
        <div className="flex justify-center md:col-span-5">
          <Image
            src="/images/RightColumn.svg"
            alt="Tentang Pencairan Dana"
            width={240}
            height={180}
            className="w-full max-w-50 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
