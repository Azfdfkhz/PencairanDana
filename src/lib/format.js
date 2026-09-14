// app/lib/format.js
// Util format terpusat (nominal rupiah, angka, dll) agar tidak lagi
// tersebar & duplikat di tiap komponen.

/**
 * Ubah angka/string angka menjadi format "Rp 1.234.567".
 * @param {number|string} value
 */
export function formatRupiah(value) {
  const number =
    typeof value === "string" ? Number(value.replace(/\D/g, "")) : Number(value);

  if (!Number.isFinite(number)) return "Rp 0";

  return `Rp ${new Intl.NumberFormat("id-ID").format(number)}`;
}

/**
 * Format input string angka mentah (dari <input>) menjadi "1.234.567"
 * (tanpa prefix "Rp"), sambil membuang karakter non-digit.
 * @param {string} rawInput
 */
export function formatNumberInput(rawInput) {
  const digitsOnly = String(rawInput ?? "").replace(/\D/g, "");
  if (!digitsOnly) return "";
  return new Intl.NumberFormat("id-ID").format(Number(digitsOnly));
}

/**
 * Ambil nilai numerik murni dari string ber-format "Rp 1.234.567" / "1.234.567".
 * @param {string|number} value
 * @returns {number}
 */
export function parseRupiah(value) {
  if (typeof value === "number") return value;
  const digitsOnly = String(value ?? "").replace(/\D/g, "");
  return digitsOnly ? Number(digitsOnly) : 0;
}

/**
 * Format Date/ISO string menjadi label tanggal Indonesia, mis. "07 July 2026".
 * @param {string|Date} date
 */
export function formatTanggal(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format jumlah menjadi label "150 Orang".
 * @param {number|string} count
 */
export function formatJumlahPenerima(count) {
  const number = Number(String(count).replace(/\D/g, ""));
  if (!Number.isFinite(number) || number <= 0) return "-";
  return `${new Intl.NumberFormat("id-ID").format(number)} Orang`;
}
