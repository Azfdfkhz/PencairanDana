"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WhatsAppVerification from "@/components/pop-up/whatsapp-verification/whatsapp-verification";
import ThankYouModal from "@/components/pop-up/thanks/thank-you";
import TermsAndConditions from "@/components/pop-up/terms-and-conditions/terms-and-conditions";
import {
  AlertCircle,
  Wallet,
  MapPin,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Landmark,
  User,
  Phone,
  ArrowLeft,
  Send,
  ShieldCheck,
} from "lucide-react";

import { getWithdrawalAccount, getRecipientContact, submitWithdrawalRequest } from "@/api/withdrawal-api";
import useAsyncData from "@/hooks/use-async-data";
import LoadingState from "@/components/states/loading-state";
import ErrorState from "@/components/states/error-state";

export default function ApplicationConfirmation({ onBack, formData }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isVerifOpen, setIsVerifOpen] = useState(false);
  const [isThanksOpen, setIsThanksOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const {
    data: account,
    status: accountStatus,
    error: accountError,
    reload: reloadAccount,
  } = useAsyncData(getWithdrawalAccount, { isEmpty: (d) => !d });

  const {
    data: contact,
    status: contactStatus,
    error: contactError,
    reload: reloadContact,
  } = useAsyncData(getRecipientContact, { isEmpty: (d) => !d });

  const displayData = {
    nominal: formData?.nominal,
    location: formData?.location || formData?.lokasi,
    date: formData?.date || formData?.tanggal,
    recipientCount: formData?.recipientCount || formData?.jumlahPenerima,
    description: formData?.description || formData?.deskripsi,
  };

  const handleOtpSuccess = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const raw = formData?.raw || {};
      const result = await submitWithdrawalRequest({
        nominal: displayData.nominal,
        distributionDate: raw.distributionDate || raw.tanggalPenyaluran,
        recipientCount: displayData.recipientCount,
        distributionLocation: raw.distributionLocation || raw.lokasiPenyaluran,
        distributionDescription: raw.distributionDescription || raw.deskripsiPenyaluran,
      });
      setSubmissionResult(result);
      setIsVerifOpen(false);
      setIsThanksOpen(true);
    } catch (err) {
      setSubmitError(err.message || "Gagal mengirim pengajuan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const isLoadingContext = accountStatus === "loading" || contactStatus === "loading";
  const hasContextError =
    accountStatus === "error" ||
    accountStatus === "empty" ||
    contactStatus === "error" ||
    contactStatus === "empty";

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-8">
      {/* Header Pengajuan Pencairan Dana */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black md:text-2xl">
          Pengajuan Pencairan Dana
        </h2>
        <p className="mt-1 text-xs text-[#64748b] md:text-sm">
          Lengkapi informasi berikut untuk mengajukan pencairan dana campaign
          Anda
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="mb-8 flex justify-center w-full">
        <div className="flex items-start justify-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md">
          {/* Step 1: Informasi Pencairan */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052cc] text-sm font-bold text-white shadow-xs">
              1
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-bold text-[#0052cc] text-center leading-tight">
              Informasi Pencairan
            </span>
          </div>

          {/* Stepper Connecting Line */}
          <div className="mt-4 flex-1 h-0.5 bg-[#0052cc]" />

          {/* Step 2: Konfirmasi Pengajuan (Active) */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052cc] text-sm font-bold text-white shadow-xs">
              2
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#0052cc] text-center leading-tight">
              Konfirmasi Pengajuan
            </span>
          </div>
        </div>
      </div>

      {/* Konfirmasi Pengajuan Section */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-black md:text-lg">
          Konfirmasi Pengajuan
        </h3>
        <p className="mt-1 text-xs text-[#64748b] md:text-sm">
          Pastikan kembali seluruh informasi pencairan sebelum diajukan.
        </p>
      </div>

      {/* Hal yang Perlu Diperhatikan */}
      <div className="mb-6 rounded-xl bg-[#FDF1CF] p-4 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0 text-[#A46435]" />
          <h4 className="text-sm font-semibold text-[#A46435]">
            Hal yang Perlu Diperhatikan
          </h4>
        </div>
        <ul className="space-y-1.5 pl-6 text-[11px] text-[#5E5E68] md:text-xs italic">
          <li className="list-disc">
            Nominal pencairan telah sesuai dengan Rencana Anggaran Biaya (RAB).
          </li>
          <li className="list-disc">
            Rekening tujuan pencairan sudah benar dan masih aktif.
          </li>
          <li className="list-disc">
            Nomor WhatsApp yang terdaftar masih aktif untuk menerima kode
            verifikasi (OTP).
          </li>
          <li className="list-disc">
            Apabila rekening berubah, silahkan hubungi Customer Service sebelum
            mengajukan pencairan.
          </li>
          <li className="list-disc">
            Pengajuan yang telah dikirim tidak dapat diubah selama proses
            verifikasi.
          </li>
        </ul>
      </div>

      {/* Informasi Pencairan */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
          <h4 className="text-sm font-bold text-[#0052cc]">
            Informasi Pencairan
          </h4>
          <CheckCircle size={22} className="text-[#00b96b]" />
        </div>

        {/* Content */}
        <div className="space-y-4 bg-white p-5 md:p-6">
          <ConfirmRow icon={Wallet} label="Nominal Pencairan" value={displayData.nominal} isBold />
          <ConfirmRow icon={MapPin} label="Lokasi Penyaluran" value={displayData.location} />
          <ConfirmRow icon={Calendar} label="Rencana Tanggal Penyaluran" value={displayData.date} />
          <ConfirmRow icon={Users} label="Jumlah Penerima Manfaat" value={displayData.recipientCount} />
          <ConfirmRow icon={FileText} label="Deskripsi Rencana Penyaluran" value={displayData.description} />
        </div>
      </div>

      {/* Rekening Pencairan */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
          <h4 className="text-sm font-semibold text-[#0052cc]">
            Rekening Pencairan 
          </h4>
          <CheckCircle size={22} className="text-[#00b96b]" />
        </div>

        {/* Content */}
        <div className="relative overflow-hidden bg-white p-5 md:p-6">
          {accountStatus === "loading" && <LoadingState variant="bank" />}
          {accountStatus !== "loading" && (accountStatus === "error" || accountStatus === "empty") && (
            <ErrorState message={accountError || "Rekening belum tersedia."} onRetry={reloadAccount} compact />
          )}
          {accountStatus === "success" && account && (
            <>
              {/* Decorative Shield Background */}
              <div className="pointer-events-none absolute right-7 bottom-7 opacity-[0.07]">
                <ShieldCheck size={100} className="text-[#0052cc]" />
              </div>

              <div className="rounded-xl bg-gradient-to-r from-[#f0f6fe] to-[#e8f0fe] p-4 md:p-5">
                <div className="flex items-center gap-4">
                  {/* Bank Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-sm">
                    <Landmark size={24} />
                  </div>

                  {/* Bank Info */}
                  <div>
                    {account.verified && (
                      <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00b96b]" />
                        <span className="text-[10px] font-semibold text-[#059669]">
                          Terverifikasi
                        </span>
                      </div>
                    )}
                    <p className="text-sm font-bold text-[#1e293b] md:text-base">
                      {account.bankName}
                    </p>
                    <p className="text-sm font-semibold tracking-wider text-[#334155] md:text-base">
                      {account.accountNumber}
                    </p>
                    <p className="text-xs text-[#64748b]">{account.accountHolderName}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Informasi Kontak */}
      <div className="mb-6 overflow-hidden rounded-xl border border-[#d0e2ff]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d0e2ff] bg-[#f0f6fe] px-5 py-3">
          <h4 className="text-sm font-bold text-[#0052cc]">
            Informasi Kontak
          </h4>
          <CheckCircle size={22} className="text-[#00b96b]" />
        </div>

        {/* Content */}
        <div className="space-y-4 bg-white p-5 md:p-6">
          {contactStatus === "loading" && <LoadingState variant="contact" />}
          {(contactStatus === "error" || contactStatus === "empty") && (
            <ErrorState message={contactError || "Kontak belum tersedia."} onRetry={reloadContact} compact />
          )}
          {contactStatus === "success" && contact && (
            <>
              {/* Nama */}
              <div className="flex items-center gap-3">
                <User size={16} className="shrink-0 text-[#64748b]" />
                <div className="flex flex-1 items-center justify-between gap-2">
                  <span className="text-xs text-[#64748b] md:text-sm">Nama</span>
                  <span className="text-xs font-bold text-[#1e293b] md:text-sm">
                    : {contact.contactName}
                  </span>
                </div>
              </div>

              {/* No Whatsapp Terdaftar */}
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-[#64748b]" />
                <div className="flex flex-1 items-center justify-between gap-2">
                  <span className="text-xs text-[#64748b] md:text-sm">
                    No Whatsapp Terdaftar
                  </span>
                  <span className="text-xs font-bold text-[#1e293b] md:text-sm">
                    : {contact.whatsappNumber}
                  </span>
                </div>
              </div>

              {/* Info Note */}
              <p className="text-[10px] italic text-[#f59e0b] md:text-[11px]">
                * Nomor WhatsApp aktif sudah berubah? silakan perbarui data melalui{" "}
                <Link
                  href="#"
                  className="font-semibold text-[#0052cc] underline hover:text-[#0047b3]"
                >
                  Profil Akun
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Checkbox Syarat & Ketentuan */}
      <div className="mb-2 flex items-start gap-3">
        <input
          type="checkbox"
          id="syarat-ketentuan"
          checked={agreed}
          disabled={!hasReadTerms}
          onChange={(e) => setAgreed(e.target.checked)}
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#0052cc] ${
            hasReadTerms ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
        />
        <label
          htmlFor="syarat-ketentuan"
          className={`text-xs md:text-sm ${
            hasReadTerms ? "cursor-pointer text-[#475569]" : "text-[#94a3b8]"
          }`}
        >
          Saya telah membaca dan menyetujui{" "}
          <button
            type="button"
            onClick={() => setIsTermsOpen(true)}
            className="font-semibold text-[#0052cc] underline hover:text-[#0047b3] cursor-pointer"
          >
            Syarat & Ketentuan Pencairan Dana
          </button>
          .
        </label>
      </div>
      {!hasReadTerms && (
        <p className="mb-2 text-[11px] text-[#f59e0b] md:text-xs">
          * Silakan buka dan baca Syarat & Ketentuan terlebih dahulu untuk mengaktifkan centang persetujuan.
        </p>
      )}

      {submitError && (
        <p className="mb-2 text-xs font-medium text-rose-500">{submitError}</p>
      )}

      {/* Action Footer Buttons */}
      <div className="mt-8 flex items-center justify-between">
        {/* Button Back / Kembali */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border-2 border-[#0052cc] bg-white px-6 py-3 text-xs font-bold text-[#0052cc] transition-all hover:bg-[#f0f6fe] active:scale-[0.98] cursor-pointer md:text-sm"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </button>

        {/* Button Ajukan Pencairan */}
        <button
          type="button"
          disabled={!agreed || hasContextError}
          onClick={() => agreed && setIsVerifOpen(true)}
          className={`flex items-center gap-2 rounded-xl px-8 py-3.5 text-xs font-bold text-white shadow-xs transition-all active:scale-[0.98] md:text-sm ${
            agreed && !hasContextError
              ? "bg-[#0052cc] hover:bg-[#0047b3] cursor-pointer"
              : "bg-[#94a3b8] cursor-not-allowed"
          }`}
        >
          <span>Ajukan Pencairan</span>
          <Send size={18} />
        </button>
      </div>

      {/* PopUp Syarat & Ketentuan */}
      <TermsAndConditions
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAgree={() => {
          setHasReadTerms(true);
          setIsTermsOpen(false);
        }}
      />

      {/* PopUp Verifikasi WhatsApp */}
      <WhatsAppVerification
        isOpen={isVerifOpen}
        onClose={() => setIsVerifOpen(false)}
        onSuccess={handleOtpSuccess}
        submitting={submitting}
      />

      {/* PopUp Terima Kasih */}
      <ThankYouModal
        isOpen={isThanksOpen}
        data={submissionResult}
        onClose={() => {
          setIsThanksOpen(false);
          router.push("/withdrawal");
        }}
      />
    </div>
  );
}

function ConfirmRow({ icon: Icon, label, value, isBold = false }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#0052cc]">
        <Icon size={18} />
      </div>
      <div className="flex flex-1 flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
        <span className="w-full sm:w-56 md:w-64 shrink-0 text-xs font-semibold text-[#334155] md:text-sm">
          {label}
        </span>
        <div className="flex flex-1 items-start gap-2">
          <span className="hidden sm:inline text-xs font-semibold text-[#334155] md:text-sm">
            :
          </span>
          <span
            className={`flex-1 text-xs leading-relaxed md:text-sm text-left ${
              isBold ? "font-extrabold text-[#1e293b]" : "font-semibold text-[#1e293b]"
            }`}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}