"use client";

import Image from "next/image";
import {
  Calendar,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
} from "lucide-react";
import { csContact } from "@/data/mockDb";

const CS_WHATSAPP_NUMBER = csContact.whatsappNumber;

export default function AboutWithdrawal() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-6">
      <h2 className="mb-5 text-base font-semibold text-black">
        Tentang Pencairan Dana
      </h2>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        <div className="order-1 flex justify-center md:order-2 md:col-span-5">
          <Image
            src="/images/RightColumn.svg"
            alt="Tentang Pencairan Dana"
            width={240}
            height={180}
            className="h-auto w-full max-w-50 object-contain"
          />
        </div>

        <div className="order-2 space-y-4 md:order-1 md:col-span-7">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] text-[#0052cc]">
              <Calendar size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-xs font-bold text-black">
                Proses Cepat
              </h3>

              <p className="mt-0.5 text-[11px] leading-relaxed text-[#565656]">
                Pencairan dana diproses maks. 7 hari kerja setelah
                pengajuan
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] text-[#0052cc]">
              <ShieldCheck size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-xs font-bold text-black">
                Aman & Terpercaya
              </h3>

              <p className="mt-0.5 text-[11px] leading-relaxed text-[#565656]">
                Dana anda dijamin aman dan hanya dicairkan ke rekening
                terverifikasi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] text-[#0052cc]">
              <HelpCircle size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-xs font-bold text-black">
                Butuh Bantuan?
              </h3>

              <p className="mt-0.5 text-[11px] leading-relaxed text-[#565656]">
                Jika ada kendala, silahkan hubungi customer service
                kami
              </p>
            </div>
          </div>

            {/* hubungi cs */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${CS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Halo."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d2e4ff] bg-[#f0f6fe] py-2 text-xs font-bold text-[#0052cc] transition-colors hover:bg-[#e2eeff] active:scale-[0.99]"
            >
              <PhoneCall size={14} />
              Hubungi CS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
