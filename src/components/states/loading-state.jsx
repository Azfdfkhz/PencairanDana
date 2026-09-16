"use client";

/**
 * Komponen UI loading state skeleton reusable (tanpa teks & lingkaran buffering).
 * @param {{ variant?: "default" | "card" | "campaign" | "summary" | "bank" | "details" | "history" | "amount" | "contact" | "full", className?: string }} props
 */
export default function LoadingState({
  variant = "default",
  className = "",
}) {
  if (variant === "campaign") {
    return (
      <div className={`w-full animate-pulse flex items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-4 flex-1">
          <div className="h-14 w-24 shrink-0 rounded-md bg-slate-200 md:h-16 md:w-28" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 max-w-xs rounded bg-slate-200" />
            <div className="h-3 w-1/3 max-w-40 rounded bg-slate-100" />
          </div>
        </div>
        <div className="h-9 w-9 rounded-lg bg-slate-200 shrink-0" />
      </div>
    );
  }

  if (variant === "summary") {
    return (
      <div className={`w-full animate-pulse space-y-5 ${className}`}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-5 w-28 rounded bg-slate-200" />
              </div>
            </div>
          ))}
          <div className="flex justify-start lg:justify-end">
            <div className="h-11 w-full sm:w-36 rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "bank") {
    return (
      <div className={`w-full animate-pulse space-y-4 ${className}`}>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-[#f2f9f4] p-5">
          <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-24 rounded bg-slate-200" />
            <div className="h-6 w-48 rounded bg-slate-200" />
            <div className="h-3.5 w-32 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded-full bg-slate-200 mt-1" />
          </div>
        </div>
        <div className="h-10 w-full rounded-lg bg-slate-100" />
        <div className="h-11 w-full rounded-xl bg-slate-200" />
      </div>
    );
  }

  if (variant === "details") {
    return (
      <div className={`w-full animate-pulse space-y-5 ${className}`}>
        <div className="rounded-xl border border-slate-100 bg-[#fafafa] p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>
          <div className="my-2 space-y-3 rounded-lg border border-[#d2e4ff] bg-[#f2f7fe] p-4">
            <div className="flex justify-between"><div className="h-3.5 w-24 rounded bg-slate-200" /><div className="h-3.5 w-20 rounded bg-slate-200" /></div>
            <div className="flex justify-between"><div className="h-3.5 w-32 rounded bg-slate-200" /><div className="h-3.5 w-16 rounded bg-slate-200" /></div>
            <div className="flex justify-between"><div className="h-3.5 w-28 rounded bg-slate-200" /><div className="h-3.5 w-20 rounded bg-slate-200" /></div>
            <div className="flex justify-between"><div className="h-3.5 w-28 rounded bg-slate-200" /><div className="h-3.5 w-24 rounded bg-slate-200" /></div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="h-5 w-28 rounded bg-slate-200" />
            <div className="h-5 w-32 rounded bg-slate-200" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-slate-200" />
          <div className="h-3.5 w-64 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (variant === "history") {
    return (
      <div className={`w-full animate-pulse space-y-3 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 bg-[#fafafa] p-4">
            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded bg-slate-200" />
              <div className="h-3 w-16 rounded bg-slate-100" />
            </div>
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "amount") {
    return (
      <div className={`w-full animate-pulse space-y-3 ${className}`}>
        <div className="overflow-hidden rounded-xl border border-[#d0e2ff] bg-[#f0f6fe]">
          <div className="flex items-center gap-3 border-b border-[#d0e2ff] p-4">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-200" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-40 rounded bg-slate-200" />
              <div className="h-5 w-28 rounded bg-slate-200" />
            </div>
          </div>
          <div className="space-y-3 bg-white p-4">
            <div className="h-12 rounded-lg bg-slate-100" />
            <div className="h-12 rounded-lg bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className={`w-full animate-pulse space-y-3 py-1 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded bg-slate-200 shrink-0" />
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-4 w-36 rounded bg-slate-200 ml-auto" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded bg-slate-200 shrink-0" />
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-4 w-28 rounded bg-slate-200 ml-auto" />
        </div>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`w-full animate-pulse space-y-6 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-slate-200" />
          <div className="h-6 w-56 rounded bg-slate-200" />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-7 space-y-6">
          <div className="h-6 w-20 rounded-full bg-slate-200" />
          <div className="h-4 w-48 rounded bg-slate-200" />
          <div className="flex items-center justify-between px-4 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="h-44 rounded-xl border border-slate-100 bg-slate-50" />
          <div className="h-32 rounded-xl border border-slate-100 bg-slate-50" />
        </div>
      </div>
    );
  }

  // Default Skeleton fallback
  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full animate-pulse space-y-3 py-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded bg-slate-200" />
          <div className="h-3 w-1/2 rounded bg-slate-100" />
        </div>
      </div>
      <div className="h-3 w-full rounded bg-slate-100" />
      <div className="h-3 w-4/5 rounded bg-slate-100" />
    </div>
  );
}
