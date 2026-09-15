"use client";

import React, { useState } from "react";
import FundSummary from "./components/fund-summary";
import FundDetails from "./components/fund-details";
import WithdrawalHistory from "./components/withdrawal-history";
import WithdrawalBankAccount from "./components/withdrawal-bank-account";
import AboutWithdrawal from "./components/about-withdrawal";
import WithdrawalBanner from "./components/withdrawal-banner";
import ChangeBankAccountModal from "@/components/pop-up/change-bank-account/change-bank-account";

export default function PencairanDanaPage() {
  const [showChangeBankAccount, setShowChangeBankAccount] = useState(false);

  return (
    <>
      {/* Ringkasan Dana */}
      <FundSummary />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <FundDetails />
          <WithdrawalHistory />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <WithdrawalBankAccount
            onSubmit={() => setShowChangeBankAccount(true)}
          />

          <AboutWithdrawal />
        </div>
      </div>

      {/* Banner Salurkan Kebaikan */}
      <WithdrawalBanner />

      {/* Modal Ubah Rekening */}
      <ChangeBankAccountModal
        open={showChangeBankAccount}
        onClose={() => setShowChangeBankAccount(false)}
      />
    </>
  );
}
