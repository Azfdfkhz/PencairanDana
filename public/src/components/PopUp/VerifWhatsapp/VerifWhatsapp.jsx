"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { requestOtp, verifyOtp, resendOtp } from "@/api/withdrawalApi";

const OTP_LENGTH = 6;

export default function VerifWhatsapp({ isOpen, onClose, onSuccess, submitting = false }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState(null);
  const [maskedPhone, setMaskedPhone] = useState("");
  const [expirySeconds, setExpirySeconds] = useState(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const [inputRefs] = useState(() =>
    Array.from({ length: OTP_LENGTH }, () => React.createRef())
  );

  // Minta OTP begitu modal dibuka
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function loadOtp() {
      setOtp(Array(OTP_LENGTH).fill(""));
      setError(null);
      setRequesting(true);
      try {
        const res = await requestOtp();
        if (cancelled) return;
        setMaskedPhone(res.maskedPhone);
        setExpirySeconds(res.expiresInSeconds);
        setCooldownSeconds(res.resendCooldownSeconds);
      } catch (err) {
        if (!cancelled) setError(err.message || "Gagal mengirim kode OTP.");
      } finally {
        if (!cancelled) setRequesting(false);
      }
    }

    loadOtp();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // Countdown expiry
  useEffect(() => {
    if (expirySeconds === null || expirySeconds <= 0) return;
    const timer = setInterval(() => {
      setExpirySeconds((s) => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [expirySeconds]);

  // Countdown resend cooldown
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  if (!isOpen) return null;

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (value && !/^\d$/.test(value)) return;

    setError(null);

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    setVerifying(true);
    setError(null);
    try {
      await verifyOtp(enteredOtp);
      setOtp(Array(OTP_LENGTH).fill(""));
      if (onSuccess) await onSuccess();
      else if (onClose) onClose();
    } catch (err) {
      setError(err.message || "Kode OTP salah. Silakan coba lagi.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldownSeconds > 0 || resending) return;
    setResending(true);
    setError(null);
    try {
      const res = await resendOtp();
      setMaskedPhone(res.maskedPhone);
      setExpirySeconds(res.expiresInSeconds);
      setCooldownSeconds(res.resendCooldownSeconds);
      setOtp(Array(OTP_LENGTH).fill(""));
    } catch (err) {
      setError(err.message || "Gagal mengirim ulang kode OTP.");
    } finally {
      setResending(false);
    }
  };

  const isBusy = verifying || submitting;
  const otpComplete = otp.every((d) => d !== "");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className="flex min-h-full items-center justify-center text-center">
        <div className="w-full max-w-100 rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center">
          <svg
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0052cc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#0052cc]"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white p-0.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#0052cc"
              stroke="#0052cc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="mb-1 text-xl font-extrabold text-[#000000]">
          Verifikasi WhatsApp
        </h2>
        <p className="mb-0.5 text-xs text-[#64748b]">
          Kami telah mengirimkan kode OTP ke nomor berikut
        </p>
        <p className="mb-4 text-xs font-bold text-[#0052cc]">
          {requesting ? "Mengirim kode..." : maskedPhone || "-"}
        </p>

        {/* OTP Input Boxes */}
        <div className="mb-1 flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={requesting || isBusy}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`h-11 w-9 rounded-xl border text-center text-lg font-semibold text-[#1e293b] focus:outline-none focus:ring-1 disabled:opacity-50 sm:h-12 sm:w-10 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0052cc] focus:ring-[#0052cc]"
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        <div className="mb-2 min-h-4">
          {error && (
            <p className="text-[11px] font-medium text-red-500">{error}</p>
          )}
        </div>

        {/* Expiry Timer */}
        <p className="mb-4 text-xs text-[#64748b]">
          Kode akan kadaluarsa dalam{" "}
          <span className="font-semibold text-[#0052cc]">
            {formatCountdown(expirySeconds)}
          </span>
        </p>

        {/* Divider */}
        <hr className="mb-4 border-gray-200" />

        {/* Resend Code */}
        <div className="mb-5">
          <p className="mb-1 text-xs text-[#64748b]">Belum menerima kode?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldownSeconds > 0 || resending}
            className="text-xs font-semibold text-[#0052cc] hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
          >
            {resending
              ? "Mengirim ulang..."
              : cooldownSeconds > 0
              ? `Kirim ulang (${formatCountdown(cooldownSeconds)})`
              : "Kirim ulang"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleVerify}
            disabled={!otpComplete || isBusy || requesting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0047cc] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003bb3] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isBusy && <Loader2 size={16} className="animate-spin" />}
            <span>{submitting ? "Mengirim pengajuan..." : "Verifikasi"}</span>
          </button>
          <button
            onClick={onClose}
            disabled={isBusy}
            className="w-full rounded-xl border border-[#0052cc] py-2.5 text-sm font-semibold text-[#0052cc] transition-colors hover:bg-gray-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

function formatCountdown(totalSeconds) {
  if (totalSeconds === null || totalSeconds === undefined) return "--:--";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
