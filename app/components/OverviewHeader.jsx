"use client";

import MobileNavTabs from "@/app/components/MobileNav";

export default function OverviewHeader() {
  return (
    <header className="mb-5">
      <h1 className="text-2xl font-bold tracking-tight text-[#1e293b] md:text-3xl">
        Pencairan Dana
      </h1>

      <p className="mt-1 text-sm font-medium text-[#64748b]">
        Salurkan kebaikan secepat dan seamanah mungkin
      </p>

      {/* Mobile Navigation Tabs */}
      <MobileNavTabs />
    </header>
  );
}