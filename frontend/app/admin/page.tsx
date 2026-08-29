import Link from "next/link";
import { ArrowRight, Building2, Coins, FileClock, Flag, ShieldCheck, Users } from "lucide-react";
import AdminShell from "../../components/admin/layout/AdminShell";

const areas = [
  { title: "Managers", description: "Review applications, appointments and manager history.", href: "/admin/managers", icon: Users },
  { title: "Clubs", description: "Manage club status, identity and historical records.", href: "/admin/clubs", icon: Building2 },
  { title: "Matches", description: "Resolve submitted results and official corrections.", href: "/admin/matches", icon: Flag },
  { title: "Finance", description: "Review the authoritative TCP ledger and overrides.", href: "/admin/finance", icon: Coins },
  { title: "Audit", description: "Inspect administrative actions and public overrides.", href: "/admin/audit", icon: FileClock },
  { title: "Settings", description: "Configure system-level administration controls.", href: "/admin/settings", icon: ShieldCheck },
];

export default function AdminPage() {
  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">President console</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">TFA administration</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">Administrative information is loaded from the official database. The console does not display invented counts, balances, managers or competition records.</p>
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
          <h2 className="text-lg font-semibold">No live administrative metrics loaded</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">After PostgreSQL and the domain APIs are connected, this console will become the authoritative operational view for the President.</p>
        </section>
      </div>
    </AdminShell>
  );
}
