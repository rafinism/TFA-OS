import Link from "next/link";
import { ArrowRight, CalendarDays, Coins, ShieldCheck, Users } from "lucide-react";
import AppShell from "../../components/layout/AppShell";

const areas = [
  { title: "Club", description: "Your official club identity and current status.", href: "/manager/club", icon: ShieldCheck },
  { title: "Squad", description: "Players and contracts assigned to your club.", href: "/manager/squad", icon: Users },
  { title: "Matches", description: "Fixtures and result submissions requiring your attention.", href: "/manager/matches", icon: CalendarDays },
  { title: "TCP", description: "Your authoritative financial ledger and transaction history.", href: "/manager/finance", icon: Coins },
];

function LiveCard({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-tfa-text-muted">{label}</div>
      <div className="mt-4 text-sm font-semibold text-tfa-text-secondary">{title}</div>
      <p className="mt-2 text-xs leading-5 text-tfa-text-muted">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">Account dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Your TFA workspace</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">This dashboard is intentionally database-driven. Account, club, competition and financial information will appear here when authenticated API data is available.</p>
        </header>

        <section className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Account areas">
          {areas.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-tfa-border hover:bg-tfa-surface-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background text-tfa-text-secondary"><Icon size={18} /></div>
              <h2 className="mt-5 text-sm font-semibold">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-tfa-text-muted">{description}</p>
              <div className="mt-5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tfa-text-muted group-hover:text-tfa-info">Open <ArrowRight size={12} /></div>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <LiveCard label="Club status" title="Waiting for account data" description="Your manager status and club assignment will be loaded from the authenticated account." />
          <LiveCard label="Competition" title="Waiting for competition data" description="TCL and TFC participation information will be rendered from official competition records." />
          <LiveCard label="Activity" title="No activity loaded" description="Notifications, pending actions and recent events will appear here from the database." />
        </section>

        <section className="mt-4 rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-8 text-center">
          <h2 className="text-sm font-semibold">No live dashboard data yet</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-tfa-text-muted">Once PostgreSQL, authentication and the domain APIs are connected, this area will populate automatically. No competition statistics or balances are fabricated in the frontend.</p>
        </section>
      </div>
    </AppShell>
  );
}
