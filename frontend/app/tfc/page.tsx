import Link from "next/link";
import { ArrowRight, CalendarDays, ListChecks, Trophy } from "lucide-react";
import PublicHeader from "../../components/public/PublicHeader";

const sections = [
  { title: "Fixtures", description: "Published TFC schedules and official match dates.", href: "/tfc/fixtures", icon: CalendarDays },
  { title: "Results", description: "Verified cup results and permanent records.", href: "/tfc/results", icon: ListChecks },
  { title: "Participants", description: "Manager clubs participating in the official cup.", href: "/tfc/participants", icon: Trophy },
];

export default function TFCPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">Competition</p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">TFC</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">The TESL eFootball Cup. Participation is restricted to eligible Managers and their clubs.</p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-tfa-border-subtle bg-tfa-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tfa-text-muted">No active cup published</span>
          </div>
        </header>

        <section className="grid gap-3 py-8 sm:grid-cols-3">
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
          <h2 className="text-lg font-semibold">No TFC competition data published</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">The frontend will display the official cup only when a TFC season, participants or matches exist in the database. There are no fabricated clubs, dates or scores here.</p>
        </section>
      </div>
    </main>
  );
}
