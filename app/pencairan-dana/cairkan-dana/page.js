"use client";

import React from "react";
import Sidebar from "@/app/components/Sidebar";
import OverviewHeader from "@/app/components/OverviewHeader";
import CampaignHeaderCard from "@/app/components/CampaignHeaderCard";
import FormPengajuanPencairan from "./components/FormPengajuanPencairan";

export default function CairkanDanaPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <main className="min-h-screen p-4 pt-20 md:ml-[172px] md:p-8 md:pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Header Overview Section */}
          <OverviewHeader />

          {/* Campaign Info Card (reused from previous component) */}
          <CampaignHeaderCard />

          {/* Form Pengajuan Pencairan Dana */}
          <FormPengajuanPencairan />
        </div>
      </main>
    </div>
  );
}