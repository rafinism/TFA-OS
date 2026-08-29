import PublicHeader from "../../../components/public/PublicHeader";

const fixtures = [
  ["Matchweek 04", "Club A", "Club B"],
  ["Matchweek 04", "Club C", "Club D"],
  ["Matchweek 05", "Club B", "Club C"],
  ["Matchweek 05", "Club D", "Club A"],
];

export default function FixturesPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            TCL · Season 01
          </div>
          <h1 className="mt-3 text-3xl font-semibold">Fixtures</h1>
          <p className="mt-3 text-sm text-white/35">
            Upcoming TCL matches. Match dates are intentionally not displayed.
          </p>
        </div>

        <div className="space-y-3">
          {fixtures.map(([week, home, away]) => (
            <div
              key={`${week}-${home}-${away}`}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-5 py-5"
            >
              <div className="w-28 text-[9px] uppercase tracking-[0.12em] text-white/25">
                {week}
              </div>

              <div className="flex flex-1 items-center justify-center gap-6 text-sm">
                <span>{home}</span>
                <span className="text-xs text-white/20">VS</span>
                <span>{away}</span>
              </div>

              <div className="w-28 text-right text-[9px] uppercase tracking-[0.12em] text-white/25">
                Upcoming
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}