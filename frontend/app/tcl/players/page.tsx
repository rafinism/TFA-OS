import Link from "next/link";
import PublicHeader from "../../../components/public/PublicHeader";

const players = [
  {
    name: "Lionel Messi",
    position: "AMF",
    rating: 99,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Cristiano Ronaldo",
    position: "CF",
    rating: 98,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Kylian Mbappé",
    position: "CF",
    rating: 98,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Erling Haaland",
    position: "CF",
    rating: 97,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Kevin De Bruyne",
    position: "AMF",
    rating: 96,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Virgil van Dijk",
    position: "CB",
    rating: 96,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Mohamed Salah",
    position: "RWF",
    rating: 96,
    tier: "Elite",
    status: "Available",
  },
  {
    name: "Thibaut Courtois",
    position: "GK",
    rating: 96,
    tier: "Elite",
    status: "Available",
  },
];

export default function PlayersPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
            TCL · Player Pool
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Official Player Pool
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            Browse the official TFA player pool available for TCL club
            management.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search players..."
            className="h-10 flex-1 rounded-md border border-white/10 bg-black/20 px-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-white/20"
          />

          <select className="h-10 rounded-md border border-white/10 bg-[#111] px-3 text-xs text-white/60 outline-none">
            <option>All Positions</option>
            <option>GK</option>
            <option>CB</option>
            <option>LB</option>
            <option>RB</option>
            <option>DMF</option>
            <option>CMF</option>
            <option>AMF</option>
            <option>LWF</option>
            <option>RWF</option>
            <option>CF</option>
          </select>

          <select className="h-10 rounded-md border border-white/10 bg-[#111] px-3 text-xs text-white/60 outline-none">
            <option>All Tiers</option>
            <option>Elite</option>
            <option>Tier 1</option>
            <option>Tier 2</option>
            <option>Tier 3</option>
          </select>
        </div>

        {/* Pool summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Total Players
            </div>

            <div className="mt-2 text-2xl font-semibold">500</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Available
            </div>

            <div className="mt-2 text-2xl font-semibold">500</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              Assigned
            </div>

            <div className="mt-2 text-2xl font-semibold">0</div>
          </div>
        </div>

        {/* Players */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {players.map((player) => (
            <Link
              key={player.name}
              href="#"
              className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Player image placeholder */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-b from-white/[0.06] to-black">
                <div className="text-4xl font-bold text-white/10">
                  {player.name.charAt(0)}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {player.name}
                    </div>

                    <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/30">
                      {player.position} · {player.tier}
                    </div>
                  </div>

                  <div className="text-lg font-semibold">
                    {player.rating}
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/30">
                    {player.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <div className="text-xs text-white/25">
            Showing 8 of 500 players
          </div>

          <div className="flex gap-2">
            <button
              disabled
              className="rounded-md border border-white/10 px-3 py-2 text-xs text-white/20"
            >
              Previous
            </button>

            <button className="rounded-md border border-white/10 px-3 py-2 text-xs text-white/50 hover:bg-white/[0.05] hover:text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}