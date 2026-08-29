const upcoming = [
  {
    competition: "TCL",
    stage: "League Stage",
    opponent: "TBD",
    status: "Scheduled",
  },
];

const recent = [
  {
    competition: "TCL",
    opponent: "—",
    score: "—",
    status: "Not played",
  },
];

export default function MatchOverview() {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      {/* Next Match */}
      <div className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
        <div className="border-b border-tfa-border-subtle px-5 py-4">
          <div className="text-sm font-semibold text-tfa-text">
            Next Match
          </div>

          <div className="mt-0.5 text-xs text-tfa-text-muted">
            Your next scheduled official fixture
          </div>
        </div>

        <div className="px-5 py-6">
          {upcoming.map((match) => (
            <div
              key={`${match.competition}-${match.stage}`}
              className="flex items-center justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-tfa-text">
                    {match.competition}
                  </span>

                  <span className="text-[10px] text-tfa-text-muted">
                    {match.stage}
                  </span>
                </div>

                <div className="mt-2 text-lg font-medium text-tfa-text">
                  vs {match.opponent}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] uppercase tracking-[0.14em] text-tfa-text-muted">
                  Status
                </div>

                <div className="mt-1 text-xs font-medium text-tfa-text-secondary">
                  {match.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Result */}
      <div className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
        <div className="border-b border-tfa-border-subtle px-5 py-4">
          <div className="text-sm font-semibold text-tfa-text">
            Recent Result
          </div>

          <div className="mt-0.5 text-xs text-tfa-text-muted">
            Latest completed official match
          </div>
        </div>

        <div className="px-5 py-6">
          {recent.map((match) => (
            <div
              key={match.competition}
              className="flex items-center justify-between gap-6"
            >
              <div>
                <div className="text-xs font-semibold text-tfa-text">
                  {match.competition}
                </div>

                <div className="mt-2 text-sm text-tfa-text-secondary">
                  vs {match.opponent}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-tfa-text">
                  {match.score}
                </div>

                <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-tfa-text-muted">
                  {match.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}