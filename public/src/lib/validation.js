// Aturan validasi terpusat untuk form pengajuan pencairan dana.
// Setiap fungsi validate* mengembalikan string pesan error 
// atau `null` jika valid, supaya mudah dipakai langsung di komponen:
//
//   const errors = validateFormPengajuan(formValues, { saldoTersedia });
//   if (Object.keys(errors).length > 0) { ...tampilkan errors... }

import { parseRupiah } from "./format";

export const MIN_NOMINAL_PENCAIRAN = 100000;

/**
 * @param {"semua"|"lain"} pilihanNominal
 * @param {string} nominalLain - string ber-format "1.234.567" (tanpa "Rp")
 * @param {number} saldoTersedia
 */
export function validateNominal(pilihanNominal, nominalLain, saldoTersedia) {
  if (pilihanNominal === "semua") {
    if (!saldoTersedia || saldoTersedia < MIN_NOMINAL_PENCAIRAN) {
      return "Saldo tersedia tidak mencukupi minimal pencairan.";
    }
    return null;
  }

  const nominal = parseRupiah(nominalLain);

  if (!nominal) {
    return "Nominal pencairan wajib diisi.";
  }
  if (nominal < MIN_NOMINAL_PENCAIRAN) {
    return `Nominal minimal pencairan adalah Rp ${MIN_NOMINAL_PENCAIRAN.toLocaleString(
      "id-ID"
    )}.`;
  }
  if (nominal > saldoTersedia) {
    return "Nominal melebihi saldo yang tersedia untuk dicairkan.";
  }
  return null;
}

/**
 * @param {string} tanggal - string date (yyyy-mm-dd dari <input type="date">)
 */
export function validateTanggalPenyaluran(tanggal) {
  if (!tanggal) return "Rencana tanggal penyaluran wajib diisi.";

  const selected = new Date(tanggal);
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
 * @param {string|number} jumlah
 */
export function validateJumlahPenerima(jumlah) {
  const value = String(jumlah ?? "").trim();
  if (!value) return "Jumlah penerima manfaat wajib diisi.";
  if (!/^\d+$/.test(value)) return "Jumlah penerima manfaat harus berupa angka.";
  if (Number(value) <= 0) return "Jumlah penerima manfaat harus lebih dari 0.";
  return null;
}

/**
 * @param {string} lokasi
 */
export function validateLokasiPenyaluran(lokasi) {
  const value = String(lokasi ?? "").trim();
  if (!value) return "Lokasi penyaluran wajib diisi.";
  if (value.length < 3) return "Lokasi penyaluran terlalu singkat.";
  return null;
}

/**
 * @param {string} deskripsi
 */
export function validateDeskripsiPenyaluran(deskripsi) {
  const value = String(deskripsi ?? "").trim();
  if (!value) return "Deskripsi rencana penyaluran wajib diisi.";
  if (value.length < 20) {
    return "Deskripsi rencana penyaluran minimal 20 karakter.";
  }
  return null;
}

/**
 * @param {string} nomorRekening
 */
export function validateNomorRekening(nomorRekening) {
  const digitsOnly = String(nomorRekening ?? "").replace(/\D/g, "");
  if (!digitsOnly) return "Nomor rekening wajib diisi.";
  if (digitsOnly.length < 6) return "Nomor rekening tidak valid.";
  return null;
}

/**
 * Validasi seluruh form pengajuan pencairan sekaligus.
 * @returns {Record<string, string>} map field -> pesan error (hanya field yang invalid)
 */
export function validateFormPengajuan(
  { pilihanNominal, nominalLain, tanggalPenyaluran, jumlahPenerima, lokasiPenyaluran, deskripsiPenyaluran },
  { saldoTersedia }
) {
  const errors = {};

  const nominalError = validateNominal(pilihanNominal, nominalLain, saldoTersedia);
  if (nominalError) errors.nominal = nominalError;

  const tanggalError = validateTanggalPenyaluran(tanggalPenyaluran);
  if (tanggalError) errors.tanggalPenyaluran = tanggalError;

  const jumlahError = validateJumlahPenerima(jumlahPenerima);
  if (jumlahError) errors.jumlahPenerima = jumlahError;

  const lokasiError = validateLokasiPenyaluran(lokasiPenyaluran);
  if (lokasiError) errors.lokasiPenyaluran = lokasiError;

  const deskripsiError = validateDeskripsiPenyaluran(deskripsiPenyaluran);
  if (deskripsiError) errors.deskripsiPenyaluran = deskripsiError;

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
