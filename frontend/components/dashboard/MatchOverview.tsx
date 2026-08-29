export default function MatchOverview() {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
        <div className="border-b border-tfa-border-subtle px-5 py-4">
          <div className="text-sm font-semibold text-tfa-text">Next Match</div>
          <div className="mt-0.5 text-xs text-tfa-text-muted">
            Your next scheduled official fixture
          </div>
        </div>
        <div className="px-5 py-10 text-center">
          <div className="text-sm font-medium text-tfa-text-secondary">
            No fixture available
          </div>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-tfa-text-muted">
            Official fixtures will appear here when a competition and your
            participation are present in the database.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
        <div className="border-b border-tfa-border-subtle px-5 py-4">
          <div className="text-sm font-semibold text-tfa-text">Recent Result</div>
          <div className="mt-0.5 text-xs text-tfa-text-muted">
            Latest completed official match
          </div>
        </div>
        <div className="px-5 py-10 text-center">
          <div className="text-sm font-medium text-tfa-text-secondary">
            No completed matches
          </div>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-tfa-text-muted">
            Verified results will appear here automatically from the official
            match records.
          </p>
        </div>
      </div>
    </section>
  );
}
