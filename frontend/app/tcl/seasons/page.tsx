import Link from "next/link";
import PublicHeader from "../../../components/public/PublicHeader";

const seasons = [
  {
    season: "Season 01",
    status: "Current",
    champion: "TBD",
    clubs: 12,
  },
];

export default function SeasonsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            TCL
          </div>

          <h1 className="mt-3 text-3xl font-semibold">
            Season History
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-white/35">
            Browse TCL seasons and historical competition information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seasons.map((season) => (
            <Link
              key={season.season}
              href="/tcl"
              className="rounded-lg border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04]"
            >
              <div className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                {season.status}
              </div>

              <div className="mt-2 text-xl font-semibold">
                {season.season}
              </div>

              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-white/40">
                <div className="flex justify-between">
                  <span>Clubs</span>
                  <span>{season.clubs}</span>
                </div>

                <div className="flex justify-between">
                  <span>Champion</span>
                  <span>{season.champion}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}