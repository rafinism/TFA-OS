import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      {/* Left navigation */}
      <Sidebar />

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="min-w-0 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}