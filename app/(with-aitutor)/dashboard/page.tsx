import React from "react";
import Link from "next/link";
// components
import AIPredictedScore from "@/components/dashboard/main/AIPredictedScore/AIPredictedScore";

function DashboardPage() {
  // redux

  return (
    <div className="flex size-full min-w-[660px] flex-col gap-10 overflow-y-auto bg-white p-8 pb-1 transition-all @container/dashboard dark:dark:bg-wisdome-dark-bg">
      <AIPredictedScore />
    </div>
  );
}

export default DashboardPage;
