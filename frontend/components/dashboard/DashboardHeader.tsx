import { ShieldCheck } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-tfa-border-subtle bg-tfa-surface-elevated">
            <span className="text-lg font-bold text-tfa-text">TFA</span>
          </div>

          <div>
            <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-tfa-text-muted">
              TFA Account Dashboard
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-tfa-text">
              Welcome
            </h1>

            <div className="mt-1 flex items-center gap-2 text-xs text-tfa-text-muted">
              <span>Your account information will appear here.</span>
              <span className="text-tfa-text-disabled">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={12} strokeWidth={1.8} />
                Live account data
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-tfa-border-subtle px-4 py-3">
          <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-tfa-text-muted">
            Current competition
          </div>
          <div className="mt-1 text-sm font-medium text-tfa-text">—</div>
          <div className="mt-0.5 text-[10px] text-tfa-text-muted">
            No live competition data connected yet
          </div>
        </div>
      </div>
    </div>
  );
}
