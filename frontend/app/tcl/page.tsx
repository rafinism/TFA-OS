import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, ListOrdered, Users } from "lucide-react";
import PublicHeader from "../../components/public/PublicHeader";

const sections = [
  { title: "Standings", description: "Official table for the active TCL competition.", href: "/tcl/standings", icon: ListOrdered },
  { title: "Fixtures", description: "Published schedules and upcoming matches.", href: "/tcl/fixtures", icon: CalendarDays },
  { title: "Results", description: "Verified match records published by TFA.", href: "/tcl/results", icon: BarChart3 },
  { title: "Clubs", description: "Participating clubs and their historical records.", href: "/tcl/clubs", icon: Users },
];

export default function TCLPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">Competition</p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">TCL</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">The TESL Champions League. Registered users may participate; official competition records are public.</p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-tfa-border-subtle bg-tfa-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tfa-text-muted">No active season published</span>
          </div>
        </header>

        <section className="grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-tfa-border hover:bg-tfa-surface-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background text-tfa-text-secondary"><Icon size={18} /></div>
              <h2 className="mt-5 text-sm font-semibold">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-tfa-text-muted">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tfa-text-muted group-hover:text-tfa-info">Open <ArrowRight size={12} /></span>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-10 text-center">
          <h2 className="text-lg font-semibold">TCL data will appear here when published</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">The interface does not invent seasons, clubs, points, fixtures or results. Once the competition APIs are connected to PostgreSQL, this page will render the official records automatically.</p>
        </section>
      </div>
    </main>
  );
}
