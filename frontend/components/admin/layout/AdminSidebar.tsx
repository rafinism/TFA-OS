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
  Megaphone,
  ScrollText,
  Settings,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

const sections = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "TFA Management",
    items: [
      {
        label: "Clubs",
        href: "/admin/clubs",
        icon: Building2,
      },
      {
        label: "Managers",
        href: "/admin/managers",
        icon: Users,
      },
      {
        label: "Player Pool",
        href: "/admin/players",
        icon: Users,
      },
    ],
  },
  {
    title: "TCL",
    items: [
      {
        label: "TCL Management",
        href: "/admin/tcl",
        icon: Trophy,
      },
      {
        label: "Fixtures & Results",
        href: "/admin/matches",
        icon: CalendarDays,
      },
      {
        label: "Contracts",
        href: "/admin/contracts",
        icon: FileText,
      },
      {
        label: "Transfers",
        href: "/admin/transfers",
        icon: ClipboardList,
      },
      {
        label: "TCP / Finance",
        href: "/admin/finance",
        icon: Coins,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        label: "Announcements",
        href: "/admin/announcements",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Seasons",
        href: "/admin/seasons",
        icon: ScrollText,
      },
      {
        label: "Audit Log",
        href: "/admin/audit",
        icon: Shield,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#090909] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">
          TFA Administration
        </div>

        <div className="mt-1 text-sm font-semibold">
          TESL Football Association
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {sections.map((section) => (
          <div key={section.title} className="mb-7">
            <div className="mb-2 px-3 text-[9px] uppercase tracking-[0.18em] text-white/25">
              {section.title}
            </div>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs text-white/45 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
          Administrator
        </div>

        <div className="mt-1 text-xs text-white/40">
          TFA President
        </div>
      </div>
    </aside>
  );
}