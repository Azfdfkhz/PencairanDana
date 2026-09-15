"use client";

import React, { Suspense } from "react";
import LoadingState from "@/components/states/loading-state";
import WithdrawalApplicationDetail from "./components/withdrawal-application-detail";

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
