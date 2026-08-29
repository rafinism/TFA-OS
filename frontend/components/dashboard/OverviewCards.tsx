"use client";

import {
  Coins,
  Users,
  Trophy,
  ShieldCheck,
} from "lucide-react";

const cards = [
  {
    label: "TCP Balance",
    value: "1,000",
    description: "Available club funds",
    icon: Coins,
  },
  {
    label: "Squad",
    value: "25 / 25",
    description: "Registered players",
    icon: Users,
  },
  {
    label: "TCL Matches",
    value: "0",
    description: "Matches completed",
    icon: Trophy,
  },
  {
    label: "League Position",
    value: "—",
    description: "Current TCL position",
    icon: ShieldCheck,
  },
];

export default function OverviewCards() {
  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-lg border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
                {card.label}
              </div>

              <Icon
                size={16}
                strokeWidth={1.7}
                className="text-white/30"
              />
            </div>

            <div className="text-2xl font-semibold tracking-tight text-white">
              {card.value}
            </div>

            <div className="mt-1 text-xs text-white/35">
              {card.description}
            </div>
          </div>
        );
      })}
    </section>
  );
}