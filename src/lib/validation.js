// Centralized validation rules for the fund disbursement submission form.
// Each validate* function returns an error message string
// or `null` if valid, for easy use in components:
//
//   const errors = validateSubmissionForm(formValues, { availableBalance });
//   if (Object.keys(errors).length > 0) { ...show errors... }

import { parseRupiah } from "./format";

export const MIN_NOMINAL_PENCAIRAN = 100000;

/**
 * @param {"semua"|"lain"} amountOption
 * @param {string} customAmount - formatted string "1.234.567" (without "Rp")
 * @param {number} availableBalance
 */
export function validateNominal(amountOption, customAmount, availableBalance) {
  if (amountOption === "semua") {
    if (!availableBalance || availableBalance < MIN_NOMINAL_PENCAIRAN) {
      return "Saldo tersedia tidak mencukupi minimal pencairan.";
    }
    return null;
  }

  const nominal = parseRupiah(customAmount);

  if (!nominal) {
    return "Nominal pencairan wajib diisi.";
  }
  if (nominal < MIN_NOMINAL_PENCAIRAN) {
    return `Nominal minimal pencairan adalah Rp ${MIN_NOMINAL_PENCAIRAN.toLocaleString(
      "id-ID"
    )}.`;
  }
  if (nominal > availableBalance) {
    return "Nominal melebihi saldo yang tersedia untuk dicairkan.";
  }
  return null;
}

/**
 * @param {string} date - date string (yyyy-mm-dd from <input type="date">)
 */
export function validateDistributionDate(date) {
  if (!date) return "Rencana tanggal penyaluran wajib diisi.";

  const selected = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(selected.getTime())) {
    return "Format tanggal tidak valid.";
  }
  if (selected < today) {
    return "Tanggal penyaluran tidak boleh di masa lalu.";
  }
  return null;
}

/**
 * @param {string|number} count
 */
export function validateRecipientCount(count) {
  const value = String(count ?? "").trim();
  if (!value) return "Jumlah penerima manfaat wajib diisi.";
  if (!/^\d+$/.test(value)) return "Jumlah penerima manfaat harus berupa angka.";
  if (Number(value) <= 0) return "Jumlah penerima manfaat harus lebih dari 0.";
  return null;
}

/**
 * @param {string} location
 */
export function validateDistributionLocation(location) {
  const value = String(location ?? "").trim();
  if (!value) return "Lokasi penyaluran wajib diisi.";
  if (value.length < 3) return "Lokasi penyaluran terlalu singkat.";
  return null;
}

/**
 * @param {string} description
 */
export function validateDistributionDescription(description) {
  const value = String(description ?? "").trim();
  if (!value) return "Deskripsi rencana penyaluran wajib diisi.";
  if (value.length < 20) {
    return "Deskripsi rencana penyaluran minimal 20 karakter.";
  }
  return null;
}

/**
 * @param {string} accountNumber
 */
export function validateAccountNumber(accountNumber) {
  const digitsOnly = String(accountNumber ?? "").replace(/\D/g, "");
  if (!digitsOnly) return "Nomor rekening wajib diisi.";
  if (digitsOnly.length < 6) return "Nomor rekening tidak valid.";
  return null;
}

/**
 * Validate the entire disbursement submission form at once.
 * @returns {Record<string, string>} map of field -> error message (only invalid fields)
 */
export function validateSubmissionForm(
  { amountOption, customAmount, distributionDate, recipientCount, distributionLocation, distributionDescription },
  { availableBalance }
) {
  const errors = {};

  const nominalError = validateNominal(amountOption, customAmount, availableBalance);
  if (nominalError) errors.nominal = nominalError;

  const dateError = validateDistributionDate(distributionDate);
  if (dateError) errors.distributionDate = dateError;

  const countError = validateRecipientCount(recipientCount);
  if (countError) errors.recipientCount = countError;

  const locationError = validateDistributionLocation(distributionLocation);
  if (locationError) errors.distributionLocation = locationError;

  const descriptionError = validateDistributionDescription(distributionDescription);
  if (descriptionError) errors.distributionDescription = descriptionError;

  return errors;
}

/**
 * @param {string} otp - 6 digit string
 */
export function validateOtp(otp) {
  if (!otp || otp.length < 6) return "Kode OTP harus 6 digit.";
  if (!/^\d{6}$/.test(otp)) return "Kode OTP hanya boleh berisi angka.";
  return null;
}
