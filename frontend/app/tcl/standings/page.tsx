import PublicHeader from "../../../components/public/PublicHeader";

export default function StandingsPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">TCL</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Standings</h1>
          <p className="mt-3 text-sm text-tfa-text-secondary">Official competition table, calculated from verified results.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-12 text-center">
          <h2 className="text-lg font-semibold">No standings available</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">A standings table will be calculated from official competition data once a TCL season and verified results exist.</p>
        </section>
      </div>
    </main>
  );
}
