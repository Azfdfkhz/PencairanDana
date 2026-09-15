// src/lib/apiClient.js
//
// Centralized fetch wrapper for the entire application.
// - USE_MOCK is only active during development when NEXT_PUBLIC_API_URL is not set.
//   Production always fails closed and never uses demo data.
// - All errors are thrown as ApiError (Error instance) for consistent
//   handling by useAsyncData/components (message, status, cause).

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

// Mock only for local development. Production deployment without API URL
// will show error state, not demo data or accept fake submissions.
export const USE_MOCK = process.env.NODE_ENV !== "production" && !API_URL;

const DEFAULT_TIMEOUT_MS = 15000;

// Optional bearer token, set once after login (e.g. from login page/handler:
// `setAuthToken(token)`), then automatically attached to every apiFetch
// as an Authorization header. Used when the backend uses a token scheme
// instead of cookie sessions.
let authToken = null;

export function setAuthToken(token) {
  authToken = token || null;
}

export function getAuthToken() {
  return authToken;
}

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
 * Simulate network latency for mock mode, so that loading/skeleton states
 * on components can be seen and tested realistically.
 */
export function mockDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * apiFetch - wrapper over fetch() with:
 * - Automatic timeout (AbortController)
 * - Default headers (Content-Type: application/json)
 * - Automatic JSON parsing + consistent ApiError throwing
 *
 * @param {string} path - relative path (joined with API_URL), or full URL
 * @param {RequestInit & { timeoutMs?: number }} options
 */
export async function apiFetch(path, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;

  if (USE_MOCK) {
    throw new ApiError(
      "apiFetch called while USE_MOCK is active. Set NEXT_PUBLIC_API_URL to use the real backend.",
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
      // Send cookies (e.g. login session) even if API_URL is a different origin.
      credentials: rest.credentials || "include",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new ApiError("Request timed out. Please try again.", {
        code: "TIMEOUT",
        cause: err,
      });
    }
    throw new ApiError("Unable to connect to the server. Check your connection.", {
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
    // Response without body / failed to parse; ignore and proceed with status check.
  }

  if (!response.ok) {
    const message =
      (body && typeof body === "object" && (body.message || body.error)) ||
      `Request failed (status ${response.status})`;
    throw new ApiError(message, {
      status: response.status,
      code: response.status === 401 ? "UNAUTHORIZED" : "HTTP_ERROR",
    });
  }

  return body;
}

export default apiFetch;
