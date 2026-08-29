import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function AdminSectionPage({ title, description, eyebrow = "Administration", nextHref }: { title: string; description: string; eyebrow?: string; nextHref?: string }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
      <header className="border-b border-tfa-border-subtle pb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">{description}</p>
      </header>
      <section className="mt-8 rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-10 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background text-tfa-text-muted"><ArrowLeft size={17} /></div>
        <h2 className="mt-5 text-lg font-semibold">Waiting for official data</h2>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">This section will become database-driven when its backend module is connected. No fabricated records are shown while the database is empty.</p>
        {nextHref && <Link href={nextHref} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-tfa-text hover:text-tfa-info">Open related section <ArrowRight size={14} /></Link>}
      </section>
    </div>
  );
}
