import OverviewHeader from "@/components/overview-header";
import CampaignHeaderCard from "@/components/campaign-header-card";

export default function PencairanDanaLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      <main className="min-h-screen p-4 pt-6 md:p-8 md:pt-6">
        <div className="mx-auto max-w-7xl">
          <OverviewHeader />
          <CampaignHeaderCard />
          {children}
        </div>
      </main>
    </div>
  );
}
