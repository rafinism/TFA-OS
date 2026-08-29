"use client";

import Link from "next/link";
import {
  BarChart3,
  Building2,
  CalendarDays,
  ClipboardList,
  Coins,
  FileText,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

const sections = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "TFA Management",
    items: [
      { label: "Clubs", href: "/admin/clubs", icon: Building2 },
      { label: "Managers", href: "/admin/managers", icon: Users },
      { label: "Player Pool", href: "/admin/players", icon: Users },
    ],
  },
  {
    title: "Competitions",
    items: [
      { label: "TCL", href: "/admin/tcl", icon: Trophy },
      { label: "Fixtures & Results", href: "/admin/matches", icon: CalendarDays },
      { label: "Contracts", href: "/admin/contracts", icon: FileText },
      { label: "Transfers", href: "/admin/transfers", icon: ClipboardList },
      { label: "TFC", href: "/admin/tfc", icon: Trophy },
      { label: "TCP / Finance", href: "/admin/finance", icon: Coins },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Seasons", href: "/admin/seasons", icon: ScrollText },
      { label: "Audit Log", href: "/admin/audit", icon: Shield },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-tfa-border-subtle bg-tfa-surface lg:flex">
      <div className="border-b border-tfa-border-subtle px-5 py-5">
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-tfa-text-muted">TFA Administration</div>
        <div className="mt-1 text-sm font-semibold">TESL Football Association</div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Administration navigation">
        {sections.map((section) => (
          <div key={section.title} className="mb-7">
            <div className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">{section.title}</div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-tfa-text-secondary transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text">
                    <Icon size={15} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-tfa-border-subtle px-5 py-4">
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-tfa-text-muted">Administrator</div>
        <div className="mt-1 text-xs text-tfa-text-secondary">TFA President</div>
      </div>
    </aside>
  );
}
