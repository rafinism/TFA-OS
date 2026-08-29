import AppShell from "../../components/layout/AppShell";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import OverviewCards from "../../components/dashboard/OverviewCards";
import MatchOverview from "../../components/dashboard/MatchOverview";
import ManagementAlerts from "../../components/dashboard/ManagementAlerts";
import QuickActions from "../../components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-7 lg:px-8">
          <DashboardHeader />

          <OverviewCards />

          <section className="mb-6">
            <MatchOverview />
          </section>

          <section className="mb-6">
            <ManagementAlerts />
          </section>

          <QuickActions />
        </div>
      </main>
    </AppShell>
  );
}