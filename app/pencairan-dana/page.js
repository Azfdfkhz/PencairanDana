"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import OverviewHeader from "@/app/components/OverviewHeader";
import CampaignHeaderCard from "@/app/components/CampaignHeaderCard";
import RingkasanDana from "./components/RingkasanDana";
import RincianDana from "./components/RincianDana";
import RiwayatPencairan from "./components/RiwayatPencairan";
import RekeningPencairanDana from "./components/RekeningPencairanDana";
import TentangPencairanDana from "./components/TentangPencairanDana";
import BannerPencairan from "./components/BannerPencairan";
import UbahRekeningModal from "@/app/components/PopUp/UbahRekening/UbahRekeningModal"
export default function PencairanDanaPage() {
  const [showUbahRekening, setShowUbahRekening] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <main className="min-h-screen p-4 pt-20 md:ml-[172px] md:p-8 md:pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Header Overview Section */}
          <OverviewHeader />

          {/* Campaign Info Card */}
          <CampaignHeaderCard />

          {/* Component: Ringkasan Dana */}
          <RingkasanDana />

          {/* Main Grid Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <RincianDana />
              <RiwayatPencairan />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <RekeningPencairanDana
                onSubmit={() => setShowUbahRekening(true)}
              />
              <TentangPencairanDana />
            </div>
          </div>

          {/* Component: Banner Salurkan Kebaikan */}
          <BannerPencairan />
        </div>
      </main>

      {/* Modal Perubahan Rekening Pencairan */}
      <UbahRekeningModal
        open={showUbahRekening}
        onClose={() => setShowUbahRekening(false)}
      />
    </div>
  );
}