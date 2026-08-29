import PublicHeader from "../../../components/public/PublicHeader";

const teams = [
  ["Club A", 3, 3, 0, 0, 9, 8, 2, 6],
  ["Club B", 3, 2, 0, 1, 6, 6, 3, 3],
  ["Club C", 3, 1, 1, 1, 4, 5, 4, 1],
  ["Club D", 3, 1, 0, 2, 3, 4, 6, -2],
];

export default function StandingsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <PublicHeader />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            TCL · Season 01
          </div>
          <h1 className="mt-3 text-3xl font-semibold">Standings</h1>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-[9px] uppercase tracking-[0.12em] text-white/30">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Club</th>
                <th className="px-4 py-4">P</th>
                <th className="px-4 py-4">W</th>
                <th className="px-4 py-4">D</th>
                <th className="px-4 py-4">L</th>
                <th className="px-4 py-4">GF</th>
                <th className="px-4 py-4">GA</th>
                <th className="px-4 py-4">GD</th>
                <th className="px-5 py-4 text-right">Pts</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team, index) => (
                <tr
                  key={team[0]}
                  className="border-b border-white/10 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4 text-xs text-white/30">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">
                    {team[0]}
                  </td>
                  {team.slice(1).map((value, i) => (
                    <td key={i} className="px-4 py-4 text-xs text-white/50">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}