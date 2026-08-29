"use client";

import Link from "next/link";
import { Bell, ChevronRight, Megaphone } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  category: "TFA" | "TCL" | "TFC" | "GENERAL";
  date: string;
  excerpt: string;
  featured?: boolean;
};

const announcements: Announcement[] = [
  {
    id: "season-1-launch",
    title: "TFA Season 1 officially begins",
    category: "TFA",
    date: "12 August 2026",
    excerpt:
      "The inaugural TFA season is now underway. Managers should review the current competition schedule, squad requirements, contracts and applicable competition regulations.",
    featured: true,
  },
  {
    id: "tcl-registration",
    title: "TCL competition information",
    category: "TCL",
    date: "12 August 2026",
    excerpt:
      "The TESL Champions League competition structure, fixtures and participating clubs will be published through the official TFA platform.",
  },
  {
    id: "tfc-information",
    title: "TFC competition information",
    category: "TFC",
    date: "12 August 2026",
    excerpt:
      "Official TESL eFootball Cup information, participants and results will be maintained through the TFA platform.",
  },
];

const categoryStyles: Record<Announcement["category"], string> = {
  TFA: "border-white/15 bg-white/[0.06] text-white/70",
  TCL: "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300/80",
  TFC: "border-amber-400/20 bg-amber-400/[0.06] text-amber-300/80",
  GENERAL: "border-blue-400/20 bg-blue-400/[0.06] text-blue-300/80",
};

export default function AnnouncementsPage() {
  const featured =
    announcements.find((announcement) => announcement.featured) ??
    announcements[0];

  const remaining = announcements.filter(
    (announcement) => announcement.id !== featured.id,
  );

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex items-center gap-3 text-white/35">
            <Bell size={15} />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
              TFA Communications
            </span>
          </div>

          <div className="mt-5 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Announcements
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45">
              Official notices, competition updates and important information
              published by the TESL Football Association.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-7 transition hover:border-white/20 sm:p-9">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/[0.025] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] ${categoryStyles[featured.category]}`}
                >
                  {featured.category}
                </span>

                <span className="text-[10px] text-white/30">
                  {featured.date}
                </span>
              </div>

              <div className="mt-12">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Megaphone size={18} className="text-white/60" />
                </div>

                <h2 className="mt-6 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                  {featured.title}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                Official TFA notice
                <ChevronRight size={13} />
              </div>
            </div>
          </article>

          <div className="space-y-4">
            {remaining.map((announcement) => (
              <article
                key={announcement.id}
                className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 transition hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] ${categoryStyles[announcement.category]}`}
                  >
                    {announcement.category}
                  </span>

                  <span className="text-[10px] text-white/25">
                    {announcement.date}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-semibold tracking-tight">
                  {announcement.title}
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/40">
                  {announcement.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
            Public information
          </p>

          <Link
            href="/constitution"
            className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 transition hover:text-white"
          >
            Read Constitution
            <ChevronRight size={13} />
          </Link>
        </div>
      </section>
    </main>
  );
}