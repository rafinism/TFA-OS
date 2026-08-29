"use client";

import {
  BarChart3,
  Building2,
  Coins,
  FileText,
  LayoutDashboard,
  Settings,
  Shield,
  Trophy,
  Users,
  ArrowLeftRight,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

const navigation = [
  {
    section: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
    ],
  },
  {
    section: "Competitions",
    items: [
      {
        label: "TCL",
        icon: Trophy,
        href: "#",
      },
      {
        label: "TFC",
        icon: Shield,
        href: "#",
      },
    ],
  },
  {
    section: "Club Management",
    items: [
      {
        label: "Clubs",
        icon: Building2,
        href: "#",
      },
      {
        label: "Players",
        icon: Users,
        href: "#",
      },
      {
        label: "Contracts",
        icon: FileText,
        href: "#",
      },
      {
        label: "Transfers",
        icon: ArrowLeftRight,
        href: "#",
      },
    ],
  },
  {
    section: "Matches",
    items: [
      {
        label: "Fixtures",
        icon: CalendarDays,
        href: "#",
      },
      {
        label: "Results",
        icon: ClipboardList,
        href: "#",
      },
    ],
  },
  {
    section: "Finance",
    items: [
      {
        label: "TCP",
        icon: Coins,
        href: "#",
      },
      {
        label: "Statistics",
        icon: BarChart3,
        href: "#",
      },
    ],
  },
];

const administration = [
  {
    label: "Season Management",
    icon: Settings,
    href: "#",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-tfa-border-subtle bg-tfa-surface">
      {/* Brand */}
      <div className="border-b border-tfa-border-subtle px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-tfa-border bg-tfa-surface-elevated">
            <span className="text-xs font-bold tracking-[0.15em] text-tfa-text">
              T
            </span>
          </div>

          <div>
            <div className="text-xs font-bold tracking-[0.2em] text-tfa-text">
              TFA
            </div>

            <div className="text-[9px] uppercase tracking-[0.14em] text-tfa-text-muted">
              Football Association
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {navigation.map((group) => (
          <div key={group.section} className="mb-7">
            <div className="mb-2 px-3 text-[9px] font-medium uppercase tracking-[0.2em] text-tfa-text-muted">
              {group.section}
            </div>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.label === "Dashboard";

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-tfa-surface-elevated font-medium text-tfa-text"
                        : "text-tfa-text-secondary hover:bg-tfa-surface-hover hover:text-tfa-text"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.8} />

                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {/* Administration */}
        <div>
          <div className="mb-2 px-3 text-[9px] font-medium uppercase tracking-[0.2em] text-tfa-text-muted">
            Administration
          </div>

          <div className="space-y-1">
            {administration.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-tfa-text-secondary transition hover:bg-tfa-surface-hover hover:text-tfa-text"
                >
                  <Icon size={16} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-tfa-border-subtle px-5 py-4">
        <div className="text-[9px] uppercase tracking-[0.15em] text-tfa-text-disabled">
          TFA Platform
        </div>

        <div className="mt-1 text-xs text-tfa-text-muted">
          Season 01 · Development
        </div>
      </div>
    </aside>
  );
}