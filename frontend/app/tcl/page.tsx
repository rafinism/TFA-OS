import Link from "next/link";
import PublicHeader from "../../components/public/PublicHeader";

const sections = [
  ["Table", "/tcl/standings"],
  ["Fixtures", "/tcl/fixtures"],
  ["Results", "/tcl/results"],
  ["Teams", "/tcl/clubs"],
  ["Player Pool", "/tcl/players"],
  ["Statistics", "/tcl/statistics"],
  ["Seasons", "/tcl/seasons"],
];

export default function TCLPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">TESL Champions League</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">TCL</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
            The TFA competition open to registered users. Current season details,
            clubs, fixtures, results and statistics are displayed from official records.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {sections.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Current Competition</h2>
            <p className="mt-1 text-xs text-white/30">Live competition information</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <div className="text-sm text-white/55">No active TCL season published</div>
            <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-white/30">
              Season, club, matchweek and standings data will appear here when
              an official TCL season exists in the database.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold">Standings</h2>
              <p className="mt-1 text-xs text-white/30">Official TCL table</p>
            </div>
            <Link href="/tcl/standings" className="text-[10px] text-white/35 hover:text-white">Full table →</Link>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <div className="text-sm text-white/55">No standings available</div>
            <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-white/30">
              The table is calculated from official match records and will not
              display placeholder clubs or points.
            </p>
          </div>
        </section>

        <section className="grid gap-4 py-8 md:grid-cols-2">
          <Link href="/tcl/clubs" className="rounded-lg border border-white/10 p-6 hover:bg-white/[0.03]">
            <div className="text-sm font-semibold">TCL Clubs</div>
            <p className="mt-2 text-xs leading-5 text-white/35">Explore official club records when available.</p>
          </Link>
          <Link href="/tcl/players" className="rounded-lg border border-white/10 p-6 hover:bg-white/[0.03]">
            <div className="text-sm font-semibold">Official Player Pool</div>
            <p className="mt-2 text-xs leading-5 text-white/35">Browse the existing official Player Pool system.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
