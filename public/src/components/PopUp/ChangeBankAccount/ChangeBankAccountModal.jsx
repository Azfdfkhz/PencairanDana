"use client";

import { useEffect } from "react";
import {
  X,
  FileText,
  Download,
  FolderCheck,
  CheckCircle2,
  MessageCircle,
  Info,
} from "lucide-react";

import Image from "next/image";
import { csContact, ubahRekeningAssets } from "@/data/mockDb";

const dokumenList = ubahRekeningAssets.dokumenList;
const CS_WHATSAPP_NUMBER = csContact.whatsappNumber;
const FORM_URL = ubahRekeningAssets.formUrl;

export default function ChangeBankAccountModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-5 top-5 text-gray-400 transition-colors hover:text-gray-600"
        >
          <X size={22} />
        </button>

        {/* Header Illustration */}
        <div className="mb-5 flex justify-center">
          <div className="relative flex h-45 w-45 items-center justify-center">
          <Image
            src="/images/PencairanDana.svg"
            alt="Bantu Pengungsi Rohingya"
            fill
          />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold text-[#1e293b] md:text-xl">
            Perubahan Rekening Pencairan
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#64748b] md:text-sm">
            Untuk melakukan perubahan rekening pencairan, silahkan ikuti
            langkah berikut agar perubahan rekening dapat di verifikasi oleh
            tim Sharing Happiness
          </p>
        </div>

        {/* Steps Container */}
        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
          <div className="flex gap-4 p-5">
            <Images src="/images/P1.svg" />

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <FileText size={18} className="text-[#0052cc]" />
                <h3 className="text-sm font-bold text-[#1e293b]">
                  Download Formulir
                </h3>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-[#64748b]">
                Download formulir perubahan rekening, lalu isi sesuai data
                yang diminta.
              </p>

              <a
                href={FORM_URL}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-[#0052cc] px-3.5 py-2 text-xs font-bold text-[#0052cc] transition-colors hover:bg-[#f0f6fe]"
              >
                <Download size={15} />
                <span>Form Perubahan Rekening.docx</span>
              </a>
            </div>
          </div>

          {/* Step 2: Lampirkan Dokumen */}
          <div className="flex gap-4 p-5">
            <Images src="/images/P2.svg" />

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <FolderCheck size={18} className="text-[#0052cc]" />
                <h3 className="text-sm font-bold text-[#1e293b]">
                  Lampirkan Dokumen
                </h3>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-[#64748b]">
                Lampirkan Dokumen berikut ke dalam file{" "}
                <span className="font-semibold text-[#1e293b]">
                  Form Perubahan Rekening.
                </span>
              </p>

              <div className="space-y-1.5 rounded-lg border border-amber-200 bg-amber-50 p-3">
                {dokumenList.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <span className="text-xs font-medium text-[#334155]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-5">
            <Images src="/images/P3.svg" />

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <MessageCircle size={18} className="text-[#0052cc]" />
                <h3 className="text-sm font-bold text-[#1e293b]">
                  Kirim ke <span className="italic">Customer Service</span>
                </h3>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-[#64748b]">
                Kirimkan seluruh dokumen melalui Whatsapp ke nomor{" "}
                <span className="italic">Customer Service</span> kami.
              </p>

              <a
                href={`https://wa.me/${CS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Halo, saya ingin mengajukan perubahan rekening pencairan dana."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#1fbf5c]"
              >
                <MessageCircle size={16} className="fill-white text-[#25D366]" />
                <span>
                  Hubungi <span className="italic">Customer Service</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-[#f0f6fe] p-3">
          <Info size={16} className="mt-0.5 shrink-0 text-[#0052cc]" />
          <p className="text-[11px] leading-relaxed text-[#0052cc]">
            Verifikasi perubahan rekening biasanya selesai dalam{" "}
            <span className="font-bold">maksimal 2 hari kerja</span> setelah
            dokumen lengkap diterima.
          </p>
        </div>
      </div>
    </div>
  );
}

function Images ({ src }) {
  return (
    <div className="relative h-25 w-25 shrink-0">
      <Image
        src={src}
        alt=""
        fill
        className="object-contain"
      />
    </div>
  );
}
