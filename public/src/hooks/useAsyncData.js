"use client";

import { useCallback, useEffect, useEffectEvent, useState } from "react";

/**
 * useAsyncData - hook generik untuk state loading/error/empty/success
 * yang konsisten di semua komponen yang mengambil data dari app/API.
 *
 *   const { data, status, error, reload } = useAsyncData(
 *     () => getRiwayatPencairan(),
 *     { deps: [], isEmpty: (d) => !d || d.length === 0 }
 *   );
 *
 * status: "loading" | "error" | "empty" | "success"
 *
 * @param {() => Promise<any>} fetcher
 * @param {{
 *   deps?: any[],
 *   enabled?: boolean,
 *   isEmpty?: (data: any) => boolean,
 * }} options
 */
export function useAsyncData(fetcher, options = {}) {
  const { deps = [], enabled = true, isEmpty } = options;

  const [data, setData] = useState(null);
  const [status, setStatus] = useState(enabled ? "loading" : "empty");
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);
  const fetcherEvent = useEffectEvent(fetcher);
  const isEmptyEvent = useEffectEvent(isEmpty);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function run() {
      setStatus("loading");
      setError(null);
      try {
        const result = await fetcherEvent();
        if (cancelled) return;

        setData(result);

        const empty = isEmptyEvent ? isEmptyEvent(result) : isDefaultEmpty(result);
        setStatus(empty ? "empty" : "success");
      } catch (err) {
        if (cancelled) return;
        setError(err?.message || "Terjadi kesalahan. Silakan coba lagi.");
        setStatus("error");
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  // deps sengaja dinamis karena hook mendukung dependency caller-specific.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reloadToken, ...deps]);

  const reload = useCallback(() => setReloadToken((t) => t + 1), []);

  return {
    data,
    status: enabled ? status : "empty",
    error,
    reload,
    isLoading: status === "loading",
    isError: status === "error",
    isEmpty: status === "empty",
    isSuccess: status === "success",
  };
}

function isDefaultEmpty(result) {
  if (result === null || result === undefined) return true;
  if (Array.isArray(result)) return result.length === 0;
  return false;
}

export default useAsyncData;
