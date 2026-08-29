const cards = [
  ["12", "Active Clubs"],
  ["12", "Active Managers"],
  ["500", "Players in Pool"],
  ["01", "Current Season"],
  ["0", "Pending Transfers"],
  ["0", "Pending Actions"],
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {/* Page Header */}
      <div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
          TFA Control Panel
        </div>

        <h1 className="mt-2 text-2xl font-semibold text-white">
          Administration Dashboard
        </h1>

        <p className="mt-2 text-sm text-white/35">
          Central management area for the TESL Football Association.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([value, label]) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="text-2xl font-semibold text-white">
              {value}
            </div>

            <div className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/30">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Administrative Status */}
      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <div className="text-sm font-semibold text-white">
          Administrative Status
        </div>

        <p className="mt-2 text-xs leading-5 text-white/35">
          The TFA control panel is ready for club, player, competition,
          finance, communication and season management.
        </p>
      </div>
    </div>
  );
}