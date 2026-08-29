import Link from "next/link";

const areas = [
  ["Clubs", "/admin/clubs", "Manager applications, club status and permanent records."],
  ["Managers", "/admin/managers", "Review and administer manager status and applications."],
  ["Players", "/admin/players", "Manage the authoritative player pool and player records."],
  ["Competitions", "/admin/seasons", "Configure seasons and competition records."],
  ["Matches", "/admin/matches", "Review submitted results and official match records."],
  ["Transfers", "/admin/transfers", "Review market activity and administrative actions."],
  ["Finance", "/admin/finance", "Review the authoritative TCP financial ledger."],
  ["Audit", "/admin/audit", "Inspect public and administrative action history."],
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">TFA Control Panel</div>
        <h1 className="mt-2 text-2xl font-semibold text-white">Administration</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
          Central administrative workspace. Live counts and operational records
          will come from the database; this page intentionally contains no
          fabricated development statistics.
        </p>
      </div>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <div className="text-sm font-semibold text-white">System data status</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          Database-backed administration is being connected.
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <div className="text-sm font-semibold text-white">Administrative areas</div>
          <div className="mt-1 text-xs text-white/30">Open a module to work with its authoritative records.</div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map(([label, href, description]) => (
            <Link
              key={label}
              href={href}
              className="bg-[#0b0b0b] p-5 transition hover:bg-white/[0.04]"
            >
              <div className="text-sm font-medium text-white">{label}</div>
              <div className="mt-2 text-xs leading-5 text-white/35">{description}</div>
              <div className="mt-5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">
                Open module →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
