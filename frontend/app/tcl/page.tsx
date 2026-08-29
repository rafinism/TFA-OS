import Link from "next/link";
import PublicHeader from "../../components/public/PublicHeader";

const clubs = [
  { name: "Club A", manager: "Manager A", played: 3, points: 7 },
  { name: "Club B", manager: "Manager B", played: 3, points: 6 },
  { name: "Club C", manager: "Manager C", played: 3, points: 5 },
  { name: "Club D", manager: "Manager D", played: 3, points: 4 },
];

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
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            TESL Champions League
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Season 01
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
            The primary TCL competition for active TFA managers. Follow the
            current season, clubs, players, fixtures, results and statistics.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {sections.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <section className="py-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Current Competition</h2>
            <p className="mt-1 text-xs text-white/30">
              TCL Season 01 · Matchweek 03
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["12", "Clubs"],
              ["11", "Matches per club"],
              ["03", "Current matchweek"],
              ["01", "Current season"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="text-2xl font-semibold">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/30">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold">Standings</h2>
              <p className="mt-1 text-xs text-white/30">Current TCL table</p>
            </div>

            <Link
              href="/tcl/standings"
              className="text-[10px] text-white/35 hover:text-white"
            >
              Full table →
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-[45px_1fr_1fr_70px_70px] border-b border-white/10 bg-white/[0.03] px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/25">
              <span>#</span>
              <span>Club</span>
              <span>Manager</span>
              <span>Played</span>
              <span className="text-right">Points</span>
            </div>

            {clubs.map((club, index) => (
              <div
                key={club.name}
                className="grid grid-cols-[45px_1fr_1fr_70px_70px] items-center border-b border-white/10 px-5 py-4 last:border-0"
              >
                <span className="text-xs text-white/25">{index + 1}</span>
                <span className="text-xs font-medium">{club.name}</span>
                <span className="text-xs text-white/35">{club.manager}</span>
                <span className="text-xs text-white/35">{club.played}</span>
                <span className="text-right text-xs font-semibold">
                  {club.points}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 py-8 md:grid-cols-2">
          <Link
            href="/tcl/clubs"
            className="rounded-lg border border-white/10 p-6 hover:bg-white/[0.03]"
          >
            <div className="text-sm font-semibold">TCL Clubs</div>
            <p className="mt-2 text-xs leading-5 text-white/35">
              Explore every active club and its manager.
            </p>
          </Link>

          <Link
            href="/tcl/players"
            className="rounded-lg border border-white/10 p-6 hover:bg-white/[0.03]"
          >
            <div className="text-sm font-semibold">Official Player Pool</div>
            <p className="mt-2 text-xs leading-5 text-white/35">
              Browse the official player pool available to TCL clubs.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}