"use client";

import React from "react";
import { Suspense } from "react";
import Sidebar from "@/app/components/Sidebar";
import OverviewHeader from "@/app/components/OverviewHeader";
import CampaignHeaderCard from "@/app/components/CampaignHeaderCard";
import DetailPengajuanPencairan from "./components/DetailPengajuanPencairan";

function DetailContent() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      <Sidebar />

      <main className="min-h-screen p-4 pt-20 md:ml-43 md:p-8 md:pt-6">
        <div className="mx-auto max-w-7xl">
          <OverviewHeader />
          <CampaignHeaderCard />
          <DetailPengajuanPencairan />
        </div>
      </main>
    </div>
  );
}

export default function DetailDanaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-gray-500">Memuat detail pencairan...</p>
        </div>
      }
    >
      <DetailContent />
    </Suspense>
  );
}
