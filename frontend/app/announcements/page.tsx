import PublicHeader from "../../components/public/PublicHeader";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
        <header className="border-b border-tfa-border-subtle pb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">TFA communications</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Announcements</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">Official notices, competition updates and public information published by TFA.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-dashed border-tfa-border bg-tfa-surface p-12 text-center">
          <h2 className="text-lg font-semibold">No announcements published</h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-tfa-text-muted">Published announcements will be loaded from the official database. The frontend contains no fabricated notices or dates.</p>
        </section>
      </div>
    </main>
  );
}
