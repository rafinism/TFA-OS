"use client";

import { Bell, ChevronDown } from "lucide-react";

const seasons = [
  { id: 1, label: "Season 01" },
  { id: 2, label: "Season 02" },
  { id: 3, label: "Season 03" },
  { id: 4, label: "Season 04" },
];

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0b0b] px-5 lg:px-8">
      {/* Left side */}
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
          TFA Football Simulator
        </div>

        <div className="mt-1 text-sm font-medium text-white">
          TCL Manager Area
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Season selector */}
        <div className="relative">
          <select
            defaultValue="1"
            className="h-9 appearance-none rounded-md border border-white/10 bg-transparent px-3 pr-8 text-xs font-medium text-white outline-none transition hover:bg-white/[0.05] focus:border-white/20"
            aria-label="Select season"
          >
            {seasons.map((season) => (
              <option
                key={season.id}
                value={season.id}
                className="bg-[#111111] text-white"
              >
                {season.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            strokeWidth={1.8}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/40 transition hover:bg-white/[0.05] hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={16} strokeWidth={1.8} />
        </button>

        {/* Manager */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-md border border-white/10 px-3 py-1.5 transition hover:bg-white/[0.05]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
            M
          </div>

          <div className="hidden text-left sm:block">
            <div className="text-xs font-medium text-white">
              Manager
            </div>

            <div className="text-[9px] text-white/35">
              Club Manager
            </div>
          </div>

          <ChevronDown
            size={14}
            strokeWidth={1.8}
            className="text-white/30"
          />
        </button>
      </div>
    </header>
  );
}