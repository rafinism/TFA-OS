import PublicHeader from "../../../components/public/PublicHeader";

const results = [
  ["Matchweek 01", "Club A", "3", "1", "Club C"],
  ["Matchweek 01", "Club B", "2", "2", "Club D"],
  ["Matchweek 02", "Club A", "1", "0", "Club D"],
  ["Matchweek 02", "Club B", "3", "2", "Club C"],
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            TCL · Season 01
          </div>
          <h1 className="mt-3 text-3xl font-semibold">Results</h1>
        </div>

        <div className="space-y-3">
          {results.map(([week, home, homeScore, awayScore, away]) => (
            <div
              key={`${week}-${home}-${away}`}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-5 py-5"
            >
              <div className="mb-4 text-[9px] uppercase tracking-[0.12em] text-white/25">
                {week}
              </div>

              <div className="flex items-center justify-center gap-5 text-sm">
                <span>{home}</span>

                <div className="rounded-md border border-white/10 px-4 py-2 font-semibold">
                  {homeScore} — {awayScore}
                </div>

                <span>{away}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}