import Link from "next/link";
import PublicHeader from "../components/public/PublicHeader";

const publicSections = [
  ["TCL", "/tcl", "Competition overview, standings, fixtures, results and statistics."],
  ["TFC", "/tfc", "The TESL eFootball Cup and its official competition records."],
  ["Player Pool", "/tcl/players", "The authoritative player pool and player information."],
  ["Constitution", "/constitution", "Read the TFA Constitution and its published editions."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <section className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent px-7 py-20 sm:px-12">
          <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-white/[0.03]" />
          <div className="relative max-w-3xl">
            <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
              TESL Football Association
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              The official home of TFA.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Follow official competitions, clubs, players, fixtures, results,
              transfers, announcements and permanent TFA records. Live figures
              are shown only when they exist in the official database.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tcl" className="rounded-md bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-white/85">
                Explore TCL
              </Link>
              <Link href="/constitution" className="rounded-md border border-white/10 px-5 py-2.5 text-xs font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white">
                Read Constitution
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-8 sm:grid-cols-3">
          {[
            ["Public access", "Open", "TFA information and official records are publicly readable."],
            ["TCL participation", "Users", "Every registered user can participate in TCL."],
            ["TFC participation", "Managers", "TFC participation is available to Managers."],
          ].map(([label, value, description]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">{label}</div>
              <div className="mt-2 text-lg font-semibold">{value}</div>
              <div className="mt-1 text-xs leading-5 text-white/35">{description}</div>
            </div>
          ))}
        </section>

        <section className="py-2">
          <div className="mb-4">
            <div className="text-lg font-semibold">TFA information</div>
            <div className="mt-1 text-xs text-white/30">Explore the platform without relying on fabricated competition data.</div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {publicSections.map(([label, href, description]) => (
              <Link key={label} href={href} className="bg-[#0b0b0b] p-5 transition hover:bg-white/[0.04]">
                <div className="text-sm font-medium">{label}</div>
                <div className="mt-2 text-xs leading-5 text-white/35">{description}</div>
                <div className="mt-5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">Explore →</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="text-sm font-semibold">Latest Results</div>
              <div className="mt-1 text-[10px] text-white/30">Official verified match records</div>
            </div>
            <div className="px-5 py-10 text-center">
              <div className="text-sm text-white/55">No published results</div>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/30">
                Results will appear here automatically after the official result
                verification process publishes them.
              </p>
              <Link href="/tcl/results" className="mt-5 inline-block text-[10px] text-white/45 hover:text-white">View results →</Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="text-sm font-semibold">Upcoming Fixtures</div>
              <div className="mt-1 text-[10px] text-white/30">Official scheduled matches</div>
            </div>
            <div className="px-5 py-10 text-center">
              <div className="text-sm text-white/55">No published fixtures</div>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/30">
                Fixtures will appear here when an active competition has official
                scheduled matches.
              </p>
              <Link href="/tcl/fixtures" className="mt-5 inline-block text-[10px] text-white/45 hover:text-white">View fixtures →</Link>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">Official records</div>
              <h2 className="mt-2 text-xl font-semibold">Announcements and TFA history</h2>
              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/40">
                Public users can read official announcements, transfers, match
                records, competition history and constitutional documents.
              </p>
            </div>
            <Link href="/announcements" className="shrink-0 rounded-md border border-white/10 px-5 py-2.5 text-xs font-medium text-white/60 hover:bg-white/[0.05] hover:text-white">
              View announcements
            </Link>
          </div>
        </section>

        <footer className="border-t border-white/10 py-6 text-[10px] uppercase tracking-[0.15em] text-white/25">
          TFA Football Simulator · TESL Football Association
        </footer>
      </div>
    </main>
  );
}
