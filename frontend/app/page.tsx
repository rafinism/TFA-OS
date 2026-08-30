import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Trophy, Users } from "lucide-react";
import PublicHeader from "../components/public/PublicHeader";

const destinations = [
  { title: "TCL", description: "Follow the current league, standings, fixtures, results and competition history.", href: "/tcl", icon: Trophy },
  { title: "TFC", description: "Explore the official cup, its participation records and published results.", href: "/tfc", icon: CalendarDays },
  { title: "Player Pool", description: "Browse the authoritative player pool and published player information.", href: "/tcl/players", icon: Users },
  { title: "Constitution", description: "Read the governing Constitution and its published editions.", href: "/constitution", icon: BookOpen },
];

function EmptyFeed({ title, description, href, action }: { title: string; description: string; href: string; action: string }) {
  return (
    <section className="rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div><h2 className="text-base font-semibold tracking-tight">{title}</h2><p className="mt-1 text-xs text-tfa-text-muted">Official database feed</p></div>
        <span className="rounded-full border border-tfa-border-subtle bg-tfa-background px-2.5 py-1 text-[10px] font-medium text-tfa-text-muted">No published data</span>
      </div>
      <div className="mt-10 rounded-xl border border-dashed border-tfa-border bg-tfa-background/60 px-6 py-12 text-center">
        <p className="text-sm font-medium text-tfa-text-secondary">Nothing has been published yet.</p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-tfa-text-muted">{description}</p>
        <Link href={href} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-tfa-text transition-colors hover:text-tfa-info">{action}<ArrowRight size={14} /></Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-7xl px-5 pb-12 lg:px-8">
        <section className="relative overflow-hidden border-b border-tfa-border-subtle py-16 sm:py-24">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-tfa-surface-elevated opacity-70 blur-3xl" />
          <div className="relative max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-tfa-text-muted">TESL Football Association</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Official football records, competitions and administration.</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-tfa-text-secondary sm:text-base">TFA-OS is the official digital platform for TFA competitions, clubs, players, match records, announcements and governance. Public information appears only after it exists in the official system.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tcl" style={{ backgroundColor: "var(--tfa-accent)", color: "var(--tfa-accent-foreground)" }} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold shadow-sm transition-opacity hover:opacity-85">Explore TCL <ArrowRight size={15} /></Link>
              <Link href="/constitution" style={{ backgroundColor: "var(--tfa-surface)", color: "var(--tfa-text)" }} className="inline-flex items-center gap-2 rounded-xl border border-tfa-border px-5 py-3 text-xs font-semibold transition-colors hover:bg-tfa-surface-hover">Read the Constitution</Link>
            </div>
          </div>
        </section>
        <section className="py-10" aria-labelledby="explore-heading">
          <div className="mb-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">Explore TFA</p><h2 id="explore-heading" className="mt-1 text-xl font-semibold tracking-tight">Everything has a place.</h2></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{destinations.map(({ title, description, href, icon: Icon }) => <Link key={href} href={href} className="group rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-tfa-border hover:bg-tfa-surface-elevated"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background text-tfa-text-secondary"><Icon size={18} strokeWidth={1.8} /></div><h3 className="mt-5 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-tfa-text-muted">{description}</p><div className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tfa-text-muted transition-colors group-hover:text-tfa-info">Open <ArrowRight size={12} /></div></Link>)}</div>
        </section>
        <section className="grid gap-4 lg:grid-cols-2"><EmptyFeed title="Latest results" description="Verified match results will be published here after the official result verification process is complete." href="/tcl/results" action="View results" /><EmptyFeed title="Upcoming fixtures" description="Scheduled fixtures will appear here when an official competition has published matches." href="/tcl/fixtures" action="View fixtures" /></section>
        <section className="mt-4 rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-6 sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-2xl"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">Transparency by design</p><h2 className="mt-2 text-xl font-semibold tracking-tight">Official records, not invented numbers.</h2><p className="mt-2 text-xs leading-6 text-tfa-text-secondary">Financial records, transfers, club history, competition statistics and audit information will be rendered from the official database as each system becomes available.</p></div><Link href="/announcements" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-tfa-border bg-tfa-background px-4 py-2.5 text-xs font-semibold text-tfa-text transition-colors hover:bg-tfa-surface-hover">Official announcements <ArrowRight size={14} /></Link></div></section>
        <footer className="mt-8 border-t border-tfa-border-subtle pt-6 text-[10px] uppercase tracking-[0.15em] text-tfa-text-disabled">TFA-OS · TESL Football Association</footer>
      </div>
    </main>
  );
}
