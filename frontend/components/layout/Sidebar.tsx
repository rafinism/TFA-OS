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
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { section: "Overview", items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }] },
  { section: "Competitions", items: [{ label: "TCL", icon: Trophy, href: "/tcl" }, { label: "TFC", icon: Shield, href: "/tfc" }] },
  { section: "Club Management", items: [{ label: "Club", icon: Building2, href: "/manager/club" }, { label: "Players", icon: Users, href: "/tcl/players" }, { label: "Contracts", icon: FileText, href: "/manager/contracts" }, { label: "Transfers", icon: ArrowLeftRight, href: "/manager/transfers" }] },
  { section: "Matches", items: [{ label: "Fixtures", icon: CalendarDays, href: "/tcl/fixtures" }, { label: "Results", icon: BarChart3, href: "/tcl/results" }] },
  { section: "Finance", items: [{ label: "TCP", icon: Coins, href: "/manager/finance" }, { label: "Statistics", icon: BarChart3, href: "/tcl/statistics" }] },
];

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-tfa-border-subtle bg-tfa-surface shadow-xl shadow-black/5 transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex min-h-16 items-center justify-between border-b border-tfa-border-subtle px-5">
        <Link href="/" onClick={onClose} className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tfa-accent text-tfa-accent-foreground shadow-sm transition-transform group-hover:scale-105">
            <span className="text-[10px] font-black tracking-[0.16em]">TFA</span>
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-tfa-text">TFA</div>
            <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-tfa-text-muted">Football Association</div>
          </div>
        </Link>
        <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-lg p-2 text-tfa-text-muted hover:bg-tfa-surface-hover hover:text-tfa-text lg:hidden">
          <X size={18} />
        </button>
      </div>

      <nav aria-label="Application navigation" className="flex-1 overflow-y-auto px-3 py-5">
        {navigation.map((group) => (
          <section key={group.section} className="mb-6">
            <h2 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-tfa-text-muted">{group.section}</h2>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${active ? "bg-tfa-surface-hover font-semibold text-tfa-text shadow-sm" : "text-tfa-text-secondary hover:bg-tfa-surface-hover/70 hover:text-tfa-text"}`}
                  >
                    <Icon size={17} strokeWidth={active ? 2 : 1.8} className={active ? "text-tfa-text" : "text-tfa-text-muted group-hover:text-tfa-text-secondary"} />
                    <span>{item.label}</span>
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-tfa-text" aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className="border-t border-tfa-border-subtle p-4">
        <div className="rounded-xl border border-tfa-border-subtle bg-tfa-background p-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-tfa-text-muted">TFA Platform</div>
          <div className="mt-1 text-xs text-tfa-text-secondary">Official competition and records platform</div>
        </div>
      </div>
    </aside>
  );
}
