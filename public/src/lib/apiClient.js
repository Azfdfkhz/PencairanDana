// app/lib/apiClient.js
//
// Fetch wrapper terpusat untuk seluruh aplikasi.
// - USE_MOCK hanya aktif saat development dan NEXT_PUBLIC_API_URL belum diisi.
//   Production selalu fail-closed dan tidak pernah memakai data demo.
// - Semua error dilempar sebagai ApiError (instance Error) agar konsisten
//   ditangani oleh useAsyncData/komponen (message, status, cause).

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

// Mock hanya untuk development lokal. Deployment production tanpa API URL
// akan menampilkan error state, bukan data demo atau menerima submit palsu.
export const USE_MOCK = process.env.NODE_ENV !== "production" && !API_URL;

const DEFAULT_TIMEOUT_MS = 15000;

export class ApiError extends Error {
  constructor(message, { status = null, cause = null, code = "API_ERROR" } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    if (cause) this.cause = cause;
  }
}

/**
 * Simulasi latency network untuk mode mock, supaya loading/skeleton state
 * pada komponen bisa terlihat & teruji secara realistis.
 */
export function mockDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * apiFetch - wrapper di atas fetch() dengan:
 * - Timeout otomatis (AbortController)
 * - Header default (Content-Type: application/json)
 * - Parsing JSON otomatis + pelemparan ApiError yang konsisten
 *
 * @param {string} path - path relatif (akan digabung dengan API_URL), atau URL penuh
 * @param {RequestInit & { timeoutMs?: number }} options
 */
export async function apiFetch(path, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;

  if (USE_MOCK) {
    throw new ApiError(
      "apiFetch dipanggil saat USE_MOCK aktif. Set NEXT_PUBLIC_API_URL untuk memakai backend asli.",
      { code: "MOCK_MODE_ACTIVE" }
    );
  }

  const url = /^https?:\/\//i.test(path) ? path : `${API_URL}${path}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new ApiError("Permintaan melebihi batas waktu. Silakan coba lagi.", {
        code: "TIMEOUT",
        cause: err,
      });
    }
    throw new ApiError("Tidak dapat terhubung ke server. Periksa koneksi Anda.", {
      code: "NETWORK_ERROR",
      cause: err,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  let body = null;
  const contentType = response.headers.get("content-type") || "";
  try {
    body = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch (err) {
    // Response tanpa body / gagal parse; abaikan dan lanjutkan pengecekan status.
  }

  if (!response.ok) {
    const message =
      (body && typeof body === "object" && (body.message || body.error)) ||
      `Permintaan gagal (status ${response.status})`;
    throw new ApiError(message, { status: response.status, code: "HTTP_ERROR" });
  }

  return body;
}

export default apiFetch;
