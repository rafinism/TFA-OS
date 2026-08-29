import PublicHeader from "../../../components/public/PublicHeader";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          TCL
        </div>

        <h1 className="mt-3 text-3xl font-semibold">
          TCL Statistics
        </h1>

        <p className="mt-3 text-sm text-white/40">
          This section will contain the complete public TCL information.
        </p>
      </div>
    </main>
  );
}
