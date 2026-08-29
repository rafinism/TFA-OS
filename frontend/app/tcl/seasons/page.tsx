import PublicHeader from "../../../components/public/PublicHeader";

export default function SeasonsPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">TCL</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Season history</h1>
          <p className="mt-3 text-sm text-tfa-text-secondary">Published TCL seasons and permanent competition records.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-12 text-center">
          <h2 className="text-lg font-semibold">No seasons published</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">Historical seasons will appear here from the database once official season records exist.</p>
        </section>
      </div>
    </main>
  );
}
