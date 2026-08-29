import Link from "next/link";
import PublicHeader from "../../../components/public/PublicHeader";

const clubs = [
  {
    name: "Club A",
    manager: "Manager A",
    status: "Active",
  },
  {
    name: "Club B",
    manager: "Manager B",
    status: "Active",
  },
  {
    name: "Club C",
    manager: "Manager C",
    status: "Active",
  },
  {
    name: "Club D",
    manager: "Manager D",
    status: "Active",
  },
];

export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            TCL
          </div>

          <h1 className="mt-3 text-3xl font-semibold">
            Clubs
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            View the clubs currently participating in the TESL Champions
            League and their registered managers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clubs.map((club) => (
            <Link
              key={club.name}
              href="#"
              className="group rounded-lg border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg font-semibold text-white/30">
                  {club.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {club.name}
                  </div>

                  <div className="mt-1 text-xs text-white/35">
                    {club.manager}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                  Manager
                </span>

                <span className="text-[10px] text-white/45">
                  {club.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}