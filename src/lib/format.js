// src/lib/format.js
// Centralized format utilities (rupiah nominal, numbers, etc.)
// to avoid duplication across components.

/**
 * Convert a number/numeric string to "Rp 1.234.567" format.
 * @param {number|string} value
 */
export function formatRupiah(value) {
  const number =
    typeof value === "string" ? Number(value.replace(/\D/g, "")) : Number(value);

  if (!Number.isFinite(number)) return "Rp 0";

  return `Rp ${new Intl.NumberFormat("id-ID").format(number)}`;
}

/**
 * Format a raw numeric input string (from <input>) to "1.234.567"
 * (without "Rp" prefix), stripping non-digit characters.
 * @param {string} rawInput
 */
export function formatNumberInput(rawInput) {
  const digitsOnly = String(rawInput ?? "").replace(/\D/g, "");
  if (!digitsOnly) return "";
  return new Intl.NumberFormat("id-ID").format(Number(digitsOnly));
}

/**
 * Extract the pure numeric value from a formatted string "Rp 1.234.567" / "1.234.567".
 * @param {string|number} value
 * @returns {number}
 */
export function parseRupiah(value) {
  if (typeof value === "number") return value;
  const digitsOnly = String(value ?? "").replace(/\D/g, "");
  return digitsOnly ? Number(digitsOnly) : 0;
}

/**
 * Format a Date/ISO string to an Indonesian date label, e.g. "07 July 2026".
 * @param {string|Date} date
 */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format a count into a label like "150 Orang".
 * @param {number|string} count
 */
export function formatRecipientCount(count) {
  const number = Number(String(count).replace(/\D/g, ""));
  if (!Number.isFinite(number) || number <= 0) return "-";
  return `${new Intl.NumberFormat("id-ID").format(number)} Orang`;
}
