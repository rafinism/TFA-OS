"use client";

import { ShieldCheck } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Club identity */}
        <div className="flex items-center gap-4">
          {/* Temporary club logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
            <span className="text-lg font-bold text-white">FC</span>
          </div>

          <div>
            <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
              TCL Manager Dashboard
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Club Name
            </h1>

            <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
              <span>Manager Name</span>

              <span className="text-white/20">•</span>

              <span className="flex items-center gap-1.5">
                <ShieldCheck size={12} strokeWidth={1.8} />
                Active Manager
              </span>
            </div>
          </div>
        </div>

        {/* Current competition */}
        <div className="rounded-md border border-white/10 px-4 py-3">
          <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
            Competition
          </div>

          <div className="mt-1 text-sm font-medium text-white">
            TESL Champions League
          </div>

          <div className="mt-0.5 text-[10px] text-white/35">
            Current Season
          </div>
        </div>
      </div>
    </div>
  );
}