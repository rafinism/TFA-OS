import Link from "next/link";

const actions = [
  {
    label: "My Club",
    description: "Available to Managers with an active club.",
    href: "/manager/club",
  },
  {
    label: "Fixtures",
    description: "View official fixtures from the competition records.",
    href: "/tcl/fixtures",
  },
  {
    label: "Contracts",
    description: "Review contracts when your account has club access.",
    href: "/manager/contracts",
  },
  {
    label: "Finances",
    description: "View the authoritative TCP ledger when available.",
    href: "/manager/finance",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
      <div className="border-b border-tfa-border-subtle px-5 py-4">
        <div className="text-sm font-semibold text-tfa-text">Quick Actions</div>
        <div className="mt-0.5 text-xs text-tfa-text-muted">
          Destinations are connected to application routes; permissions are
          enforced by the application.
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="border-b border-tfa-border-subtle px-5 py-5 transition hover:bg-white/[0.025] sm:border-r xl:border-b-0 last:border-r-0"
          >
            <div className="text-sm font-medium text-tfa-text">{action.label}</div>
            <div className="mt-1 text-xs text-tfa-text-secondary">{action.description}</div>
            <div className="mt-4 text-[9px] font-medium uppercase tracking-[0.14em] text-tfa-text-muted">
              Open →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
