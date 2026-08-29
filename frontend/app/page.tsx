import PublicHeader from "../components/public/PublicHeader";
import Link from "next/link";

const results = [
  {
    home: "Club A",
    away: "Club B",
    score: "2 – 1",
  },
  {
    home: "Club C",
    away: "Club D",
    score: "1 – 1",
  },
  {
    home: "Club E",
    away: "Club F",
    score: "0 – 2",
  },
];

const fixtures = [
  {
    home: "Club A",
    away: "Club C",
  },
  {
    home: "Club B",
    away: "Club E",
  },
  {
    home: "Club D",
    away: "Club F",
  },
];

const announcements = [
  {
    title: "New signing announced",
    description:
      "A new player has officially joined one of the TCL clubs.",
    category: "Transfer",
  },
  {
    title: "TCL season currently running",
    description:
      "Follow the latest standings, fixtures and results from the current season.",
    category: "Competition",
  },
  {
    title: "TFA official announcement",
    description:
      "Important information from the TESL Football Association.",
    category: "TFA",
  },
];

const standings = [
  ["Club A", "3", "7"],
  ["Club B", "3", "6"],
  ["Club C", "3", "5"],
  ["Club D", "3", "4"],
  ["Club E", "3", "2"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        {/* Hero */}
        <section className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent px-7 py-20 sm:px-12">
          <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-white/[0.03]" />

          <div className="relative max-w-3xl">
            <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
              TESL Champions League · Season 01
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              The battle for the
              <br />
              TCL title is underway.
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Follow the latest TFA action, from match results and upcoming
              fixtures to new signings, standings and official announcements.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tcl"
                className="rounded-md bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-white/85"
              >
                Explore TCL
              </Link>

              <Link
                href="/tcl/standings"
                className="rounded-md border border-white/10 px-5 py-2.5 text-xs font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                View Table
              </Link>
            </div>
          </div>
        </section>

        {/* Current status */}
        <section className="grid gap-4 py-8 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Competition
            </div>
            <div className="mt-2 text-lg font-semibold">TCL</div>
            <div className="mt-1 text-xs text-white/35">
              Season 01 · Running
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Clubs
            </div>
            <div className="mt-2 text-lg font-semibold">12</div>
            <div className="mt-1 text-xs text-white/35">
              Active TCL clubs
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Matchweek
            </div>
            <div className="mt-2 text-lg font-semibold">03</div>
            <div className="mt-1 text-xs text-white/35">
              Current competition stage
            </div>
          </div>
        </section>

        {/* Results + Fixtures */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Results */}
          <div className="rounded-lg border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-sm font-semibold">Latest Results</div>
                <div className="mt-1 text-[10px] text-white/30">
                  TCL · Season 01
                </div>
              </div>

              <Link
                href="/tcl/results"
                className="text-[10px] text-white/35 hover:text-white"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-white/10">
              {results.map((match, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <span className="text-xs text-white/65">
                    {match.home}
                  </span>

                  <span className="rounded bg-white/[0.05] px-3 py-1 text-xs font-semibold">
                    {match.score}
                  </span>

                  <span className="text-right text-xs text-white/65">
                    {match.away}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fixtures */}
          <div className="rounded-lg border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-sm font-semibold">Upcoming Fixtures</div>
                <div className="mt-1 text-[10px] text-white/30">
                  TCL · Season 01
                </div>
              </div>

              <Link
                href="/tcl/fixtures"
                className="text-[10px] text-white/35 hover:text-white"
              >
                View all →
              </Link>
            </div>

            <div className="divide-y divide-white/10">
              {fixtures.map((match, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <span className="text-xs text-white/65">
                    {match.home}
                  </span>

                  <span className="text-[10px] uppercase tracking-wider text-white/25">
                    VS
                  </span>

                  <span className="text-right text-xs text-white/65">
                    {match.away}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Announcements */}
        <section className="py-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-lg font-semibold">
                Latest Announcements
              </div>

              <div className="mt-1 text-xs text-white/30">
                News and official information from TFA
              </div>
            </div>

            <Link
              href="/announcements"
              className="text-[10px] text-white/35 hover:text-white"
            >
              All announcements →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {announcements.map((announcement) => (
              <article
                key={announcement.title}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/30">
                  {announcement.category}
                </div>

                <h2 className="mt-3 text-sm font-semibold">
                  {announcement.title}
                </h2>

                <p className="mt-2 text-xs leading-5 text-white/40">
                  {announcement.description}
                </p>

                <div className="mt-5 text-[10px] text-white/25">
                  Read announcement →
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Standings + current season */}
        <section className="grid gap-6 pb-10 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="text-sm font-semibold">TCL Standings</div>
              <div className="mt-1 text-[10px] text-white/30">
                Season 01
              </div>
            </div>

            <div>
              {standings.map((team, index) => (
                <div
                  key={team[0]}
                  className="grid grid-cols-[40px_1fr_60px_60px] items-center border-b border-white/10 px-5 py-3 last:border-0"
                >
                  <span className="text-xs text-white/25">
                    {index + 1}
                  </span>

                  <span className="text-xs text-white/65">
                    {team[0]}
                  </span>

                  <span className="text-right text-xs text-white/35">
                    {team[1]} P
                  </span>

                  <span className="text-right text-xs font-medium text-white">
                    {team[2]} pts
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <Link
                href="/tcl/standings"
                className="text-[10px] text-white/35 hover:text-white"
              >
                Full standings →
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
            <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
              Current TCL Season
            </div>

            <h2 className="mt-3 text-2xl font-semibold">
              Season 01
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Explore the current TCL campaign, including clubs, squads,
              fixtures, results, standings, statistics and the competition
              history.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/tcl"
                className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                TCL Overview
              </Link>

              <Link
                href="/tcl/clubs"
                className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                Teams
              </Link>

              <Link
                href="/tcl/seasons"
                className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                Season History
              </Link>
            </div>
          </div>
        </section>

        {/* TFC */}
        <section className="mb-10 rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                Separate Competition
              </div>

              <h2 className="mt-2 text-xl font-semibold">
                TESL eFootball Cup
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-white/40">
                TFC is an irregular competition separate from the TCL.
                Registered users can participate when a TFC competition is
                announced.
              </p>
            </div>

            <Link
              href="/tfc"
              className="shrink-0 rounded-md border border-white/10 px-5 py-2.5 text-xs font-medium text-white/60 hover:bg-white/[0.05] hover:text-white"
            >
              Explore TFC
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