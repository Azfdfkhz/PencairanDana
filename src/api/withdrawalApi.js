// src/api/withdrawalApi.js
//
// API layer for the entire Fund Disbursement feature.
// While USE_MOCK is active (default, as long as NEXT_PUBLIC_API_URL is not set),
// every function reads/writes to data/mockDb.js with simulated
// network latency.
// Once NEXT_PUBLIC_API_URL is set, USE_MOCK automatically turns off and all
// functions below call the real backend via apiFetch — without any
// component needing to change.

import { apiFetch, ApiError, USE_MOCK, mockDelay } from "@/lib/apiClient";
import {
  campaignInfo,
  fundSummary,
  fundDetails,
  withdrawalAccount,
  recipientContact,
  withdrawalHistoryData,
  insertMockSubmission,
} from "@/data/mockDb";
import { formatRupiah } from "@/lib/format";
import { validateOtp } from "@/lib/validation";

/* ------------------------------------------------------------------ */
/*  Campaign & Summary                                                 */
/* ------------------------------------------------------------------ */

export async function getCampaignInfo() {
  if (USE_MOCK) {
    await mockDelay(300);
    return campaignInfo;
  }
  return apiFetch("/pencairan/campaign");
}

export async function getFundSummary() {
  if (USE_MOCK) {
    await mockDelay(400);
    return fundSummary;
  }
  return apiFetch("/pencairan/ringkasan");
}

export async function getFundDetails() {
  if (USE_MOCK) {
    await mockDelay(400);
    return fundDetails;
  }
  return apiFetch("/pencairan/rincian");
}

/* ------------------------------------------------------------------ */
/*  Account & Contact                                                  */
/* ------------------------------------------------------------------ */

export async function getWithdrawalAccount() {
  if (USE_MOCK) {
    await mockDelay(350);
    return withdrawalAccount;
  }
  return apiFetch("/pencairan/rekening");
}

export async function getRecipientContact() {
  if (USE_MOCK) {
    await mockDelay(300);
    return recipientContact;
  }
  return apiFetch("/pencairan/contact");
}

/* ------------------------------------------------------------------ */
/*  History & Detail                                                   */
/* ------------------------------------------------------------------ */

export async function getWithdrawalHistory() {
  if (USE_MOCK) {
    await mockDelay(500);
    return withdrawalHistoryData;
  }
  return apiFetch("/pencairan/riwayat");
}

export async function getWithdrawalDetail(id) {
  if (USE_MOCK) {
    await mockDelay(400);
    const item = withdrawalHistoryData.find((d) => d.id === Number(id));
    if (!item) {
      throw new ApiError("Disbursement data not found", {
        status: 404,
        code: "NOT_FOUND",
      });
    }
    return item;
  }
  return apiFetch(`/pencairan/riwayat/${id}`);
}

/* ------------------------------------------------------------------ */
/*  Disbursement Request                                               */
/* ------------------------------------------------------------------ */

/**
 * @param {{
 *   nominal: string,
 *   distributionDate: string,
 *   recipientCount: string,
 *   distributionLocation: string,
 *   distributionDescription: string,
 * }} payload
 */
export async function submitWithdrawalRequest(payload) {
  if (USE_MOCK) {
    await mockDelay(700);
    const created = insertMockSubmission(payload);
    return {
      id: created.id,
      submissionNumber: created.submissionNumber,
      submissionDate: created.date,
      submissionTime: created.time,
      verificationEstimate: "1–2 Hari Kerja",
      detailUrl: created.detailUrl,
    };
  }
  return apiFetch("/pencairan/pengajuan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ------------------------------------------------------------------ */
/*  WhatsApp OTP                                                       */
/* ------------------------------------------------------------------ */

// Mock OTP code considered valid while USE_MOCK is active.
const MOCK_VALID_OTP = "123456";
const OTP_RESEND_COOLDOWN_SECONDS = 45;
const OTP_EXPIRY_SECONDS = 600;

export async function requestOtp() {
  if (USE_MOCK) {
    await mockDelay(500);
    return {
      maskedPhone: recipientContact.whatsappNumberMasked,
      expiresInSeconds: OTP_EXPIRY_SECONDS,
      resendCooldownSeconds: OTP_RESEND_COOLDOWN_SECONDS,
    };
  }
  return apiFetch("/pencairan/otp/request", { method: "POST" });
}

export async function verifyOtp(otp) {
  const validationError = validateOtp(otp);
  if (validationError) {
    throw new ApiError(validationError, { code: "INVALID_OTP_FORMAT" });
  }

  if (USE_MOCK) {
    await mockDelay(600);
    if (otp !== MOCK_VALID_OTP) {
      throw new ApiError("Incorrect OTP code. Please try again.", {
        status: 400,
        code: "OTP_MISMATCH",
      });
    }
    return { verified: true };
  }

  return apiFetch("/pencairan/otp/verify", {
    method: "POST",
    body: JSON.stringify({ otp }),
  });
}

export async function resendOtp() {
  if (USE_MOCK) {
    await mockDelay(500);
    return {
      maskedPhone: recipientContact.whatsappNumberMasked,
      expiresInSeconds: OTP_EXPIRY_SECONDS,
      resendCooldownSeconds: OTP_RESEND_COOLDOWN_SECONDS,
    };
  }
  return apiFetch("/pencairan/otp/resend", { method: "POST" });
}

// Re-export utility that is often used alongside this layer.
export { formatRupiah };
