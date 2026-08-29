"use client";

import {
  ArrowLeftRight,
  BarChart3,
  Building2,
  CalendarDays,
  Coins,
  FileText,
  LayoutDashboard,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

const navigation = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    section: "Competitions",
    items: [
      { label: "TCL", icon: Trophy, href: "/tcl" },
      { label: "TFC", icon: Shield, href: "/tfc" },
    ],
  },
  {
    section: "Club Management",
    items: [
      { label: "Club", icon: Building2, href: "/manager/club" },
      { label: "Players", icon: Users, href: "/tcl/players" },
      { label: "Contracts", icon: FileText, href: "/manager/contracts" },
      { label: "Transfers", icon: ArrowLeftRight, href: "/manager/transfers" },
    ],
  },
  {
    section: "Matches",
    items: [
      { label: "Fixtures", icon: CalendarDays, href: "/tcl/fixtures" },
      { label: "Results", icon: BarChart3, href: "/tcl/results" },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "TCP", icon: Coins, href: "/manager/finance" },
      { label: "Statistics", icon: BarChart3, href: "/tcl/statistics" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-tfa-border-subtle bg-tfa-surface">
      <div className="border-b border-tfa-border-subtle px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-tfa-border bg-tfa-surface-elevated">
            <span className="text-xs font-bold tracking-[0.15em] text-tfa-text">TFA</span>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-tfa-text">TFA</div>
            <div className="text-[9px] uppercase tracking-[0.14em] text-tfa-text-muted">
              Football Association
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {navigation.map((group) => (
          <div key={group.section} className="mb-7">
            <div className="mb-2 px-3 text-[9px] font-medium uppercase tracking-[0.2em] text-tfa-text-muted">
              {group.section}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-tfa-text-secondary transition hover:bg-tfa-surface-hover hover:text-tfa-text"
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-tfa-border-subtle px-5 py-4">
        <div className="text-[9px] uppercase tracking-[0.15em] text-tfa-text-disabled">TFA Platform</div>
        <div className="mt-1 text-xs text-tfa-text-muted">Live data platform</div>
      </div>
    </aside>
  );
}
