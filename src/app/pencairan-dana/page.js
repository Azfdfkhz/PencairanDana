"use client";

import React, { useState } from "react";
import FundSummary from "./components/FundSummary";
import FundDetails from "./components/FundDetails";
import WithdrawalHistory from "./components/WithdrawalHistory";
import WithdrawalBankAccount from "./components/WithdrawalBankAccount";
import AboutWithdrawal from "./components/AboutWithdrawal";
import WithdrawalBanner from "./components/WithdrawalBanner";
import ChangeBankAccountModal from "@/components/PopUp/ChangeBankAccount/ChangeBankAccountModal";

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
