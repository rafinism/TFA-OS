import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Building2, CalendarDays, Coins, FileText, Users } from "lucide-react";
import AppShell from "../../components/layout/AppShell";

const areas = [
  { title: "Club", description: "Your approved club identity and status.", href: "/manager/club", icon: Building2 },
  { title: "Squad", description: "Current player rights, squad and contract state.", href: "/manager/squad", icon: Users },
  { title: "Contracts", description: "Manage active contracts and renewals.", href: "/manager/contracts", icon: FileText },
  { title: "Transfers", description: "Execute and review permitted player-right transactions.", href: "/manager/transfers", icon: ArrowLeftRight },
  { title: "Matches", description: "Review fixtures and submit official results.", href: "/manager/matches", icon: CalendarDays },
  { title: "TCP", description: "Review your club's authoritative financial ledger.", href: "/manager/finance", icon: Coins },
];

export default function ManagerPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">Manager workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Club operations</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">Manager pages are operational surfaces over official database records. Nothing on this screen assumes a club, squad, balance or fixture exists before the API confirms it.</p>
        </header>

        <section className="grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-tfa-border hover:bg-tfa-surface-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background text-tfa-text-secondary"><Icon size={18} /></div>
              <h2 className="mt-5 text-sm font-semibold">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-tfa-text-muted">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tfa-text-muted group-hover:text-tfa-info">Open <ArrowRight size={12} /></span>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-10 text-center">
          <h2 className="text-lg font-semibold">Awaiting authenticated club data</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">Once the test Manager account is authenticated and the club APIs are connected, this workspace will populate from PostgreSQL.</p>
        </section>
      </div>
    </AppShell>
  );
}
