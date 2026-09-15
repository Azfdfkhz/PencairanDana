"use client";

import ApplicationConfirmation from "@/app/pencairan-dana/cairkan-dana/components/ApplicationConfirmation";
import React, { useState } from "react";
import Link from "next/link";
import WithdrawalAmount from "./WithdrawalAmount";
import {
  Users,
  MapPin,
  FileText,
  Info,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { formatRupiah, parseRupiah } from "@/lib/format";
import { validateSubmissionForm } from "@/lib/validation";

export default function WithdrawalApplicationForm() {
  const [step, setStep] = useState(1);
  const [amountOption, setAmountOption] = useState("semua");
  const [customAmount, setCustomAmount] = useState("");
  const [distributionDate, setDistributionDate] = useState("");
  const [recipientCount, setRecipientCount] = useState("");
  const [distributionLocation, setDistributionLocation] = useState("");
  const [distributionDescription, setDistributionDescription] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [errors, setErrors] = useState({});

  const nominalNumeric =
    amountOption === "semua" ? availableBalance : parseRupiah(customAmount);

  const formData = {
    nominal: formatRupiah(nominalNumeric),
    date: distributionDate,
    recipientCount: recipientCount ? `${recipientCount} Orang` : "",
    location: distributionLocation,
    description: distributionDescription,
  };

  const handleNext = () => {
    const validationErrors = validateSubmissionForm(
      { amountOption, customAmount, distributionDate, recipientCount, distributionLocation, distributionDescription },
      { availableBalance }
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setStep(2);
    }
  };

  if (step === 2) {
    return (
      <ApplicationConfirmation
        formData={{
          ...formData,
          raw: {
            amountOption,
            customAmount,
            nominalNumeric,
            distributionDate,
            recipientCount,
            distributionLocation,
            distributionDescription,
          },
        }}
        onBack={() => setStep(1)}
      />
    );
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-xs md:p-8">
      {/* Disbursement Request Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#1e293b] md:text-2xl">
          Pengajuan Pencairan Dana
        </h2>
        <p className="mt-1 text-xs text-[#64748b] md:text-sm">
          Lengkapi informasi berikut untuk mengajukan pencairan dana campaign Anda
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="mb-8 flex justify-center w-full">
        <div className="flex items-start justify-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md">
          {/* Step 1: Disbursement Info */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0052cc] text-sm font-bold text-white shadow-xs">
              1
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#0052cc] text-center leading-tight">
              Informasi Pencairan
            </span>
          </div>

          {/* Line */}
          <div className="mt-4 w-full h-0.5 bg-gray-200" />

          {/* Step 2: Submission Confirmation */}
          <div className="flex flex-col items-center text-center w-28 sm:w-36">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-400">
              2
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold text-[#94a3b8] text-center leading-tight">
              Konfirmasi Pengajuan
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="space-y-6 rounded-2xl border border-[#d0e2ff] bg-white p-5 md:p-7">
        {/* Withdrawal Amount Component */}
        <WithdrawalAmount
          amountOption={amountOption}
          setAmountOption={setAmountOption}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          error={errors.nominal}
          onBalanceLoaded={setAvailableBalance}
        />

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Field: Distribution Date */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:text-sm">
              Rencana Tanggal Penyaluran
            </label>
            <input
              type="date"
              value={distributionDate}
              onChange={(e) => setDistributionDate(e.target.value)}
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-xs text-black placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm cursor-pointer ${
                errors.distributionDate ? "border-rose-400" : "border-gray-300"
              }`}
            />
            {errors.distributionDate && (
              <p className="mt-1 text-[11px] font-medium text-rose-500">
                {errors.distributionDate}
              </p>
            )}
          </div>

          {/* Field: Recipient Count */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:text-sm">
              Jumlah Penerima Manfaat
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipientCount}
                onChange={(e) => setRecipientCount(e.target.value.replace(/\D/g, ""))}
                placeholder="Contoh: 150"
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-xs text-black placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm ${
                  errors.recipientCount ? "border-rose-400" : "border-gray-300"
                }`}
              />
              <Users
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
              />
            </div>
            {errors.recipientCount && (
              <p className="mt-1 text-[11px] font-medium text-rose-500">
                {errors.recipientCount}
              </p>
            )}
          </div>

          {/* Field: Distribution Location */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-black md:text-sm">
              Lokasi Penyaluran
            </label>
            <div className="relative">
              <input
                type="text"
                value={distributionLocation}
                onChange={(e) => setDistributionLocation(e.target.value)}
                placeholder="Contoh: Desa ABC, Kec. BED"
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-xs text-black placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm ${
                  errors.distributionLocation ? "border-rose-400" : "border-gray-300"
                }`}
              />
              <MapPin
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
              />
            </div>
            {errors.distributionLocation && (
              <p className="mt-1 text-[11px] font-medium text-rose-500">
                {errors.distributionLocation}
              </p>
            )}
          </div>

          {/* Field: Distribution Description */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-black md:text-sm">
              Deskripsi Penyaluran
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={distributionDescription}
                onChange={(e) => setDistributionDescription(e.target.value)}
                placeholder="Jelaskan tentang rencana penyaluran"
                className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-xs text-black placeholder-gray-400 outline-hidden transition-colors focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] md:text-sm ${
                  errors.distributionDescription ? "border-rose-400" : "border-gray-300"
                }`}
              />
              <FileText
                size={18}
                className="absolute right-3.5 bottom-3 pointer-events-none text-gray-600"
              />
            </div>
            {errors.distributionDescription && (
              <p className="mt-1 text-[11px] font-medium text-rose-500">
                {errors.distributionDescription}
              </p>
            )}
          </div>
        </div>

        {/* Info Callout Banner */}
        <div className="inline-flex items-center gap-2 rounded-lg bg-[#F0F8FE] px-3.5 py-2 text-xs font-medium text-[#2E68B2]/58">
          <Info size={16} className="shrink-0" />
          <span className="italic">Informasi ini akan digunakan sebagai dasar pencairan dana</span>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/pencairan-dana"
          className="flex items-center gap-2 rounded-xl border-2 border-[#0047CA] bg-white px-6 py-3 text-xs font-bold text-[#0047CA] transition-all hover:bg-[#f0f6fe] active:scale-[0.98] md:text-sm"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </Link>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 rounded-xl bg-[#0047CA] px-8 py-3.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#0047CA] active:scale-[0.98] cursor-pointer md:text-sm"
        >
          <span>Selanjutnya</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
