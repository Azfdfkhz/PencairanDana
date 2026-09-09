"use client";

import React, { useState, useRef } from "react";

export default function VerifWhatsapp({ isOpen, onClose, onSuccess }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  if (!isOpen) return null;

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    setError(false); // reset error on type

    const newOtp = [...otp];
    // allow only one character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // move to next input if current is filled
    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // move to previous input on backspace if current is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs[index - 1].current
    ) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      setError(false);
      setOtp(["", "", "", "", "", ""]);
      if (onSuccess) {
        onSuccess();
      } else if (onClose) {
        onClose();
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className="flex min-h-full items-center justify-center text-center">
        <div className="w-full max-w-[400px] rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl">
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
          +62 812 •••• ••89
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
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`h-11 w-9 rounded-xl border text-center text-lg font-semibold text-[#1e293b] focus:outline-none focus:ring-1 sm:h-12 sm:w-10 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0052cc] focus:ring-[#0052cc]"
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        <div className="mb-2 h-4">
          {error && (
            <p className="text-[11px] font-medium text-red-500">
              Kode OTP salah. Silakan coba lagi.
            </p>
          )}
        </div>

        {/* Expiry Timer */}
        <p className="mb-4 text-xs text-[#64748b]">
          Kode akan kadaluarsa dalam{" "}
          <span className="font-semibold text-[#0052cc]">10:00</span>
        </p>

        {/* Divider */}
        <hr className="mb-4 border-gray-200" />

        {/* Resend Code */}
        <div className="mb-5">
          <p className="mb-1 text-xs text-[#64748b]">Belum menerima kode?</p>
          <button className="text-xs font-semibold text-[#0052cc] hover:underline">
            Kirim ulang (00:45)
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleVerify}
            className="w-full rounded-xl bg-[#0047cc] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003bb3] active:scale-[0.98]"
          >
            Verifikasi
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-[#0052cc] py-2.5 text-sm font-semibold text-[#0052cc] transition-colors hover:bg-gray-50 active:scale-[0.98]"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
