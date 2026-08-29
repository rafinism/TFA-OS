"use client";

import { Bell, ShieldCheck } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0b0b0b] px-6 text-white">
      <div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
          Administration
        </div>

        <div className="mt-1 text-sm font-medium">
          TFA Control Panel
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/40 hover:bg-white/[0.05] hover:text-white"
        >
          <Bell size={15} />
        </button>

        <div className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
          <ShieldCheck size={15} className="text-white/50" />

          <div>
            <div className="text-[10px] font-medium">
              President
            </div>

            <div className="text-[8px] text-white/30">
              Sole Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}