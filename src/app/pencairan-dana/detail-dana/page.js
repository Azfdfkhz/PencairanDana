"use client";

import React, { Suspense } from "react";
import LoadingState from "@/components/states/LoadingState";
import WithdrawalApplicationDetail from "./components/WithdrawalApplicationDetail";

export default function DetailDanaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <LoadingState label="Memuat detail pencairan..." />
        </div>
      }
    >
      <WithdrawalApplicationDetail />
    </Suspense>
  );
}
