const actions = [
  {
    label: "My Club",
    description: "View your club and squad",
    href: "#",
  },
  {
    label: "Fixtures",
    description: "View upcoming matches",
    href: "#",
  },
  {
    label: "Contracts",
    description: "Review player contracts",
    href: "#",
  },
  {
    label: "Finances",
    description: "View TCP transactions",
    href: "#",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
      <div className="border-b border-tfa-border-subtle px-5 py-4">
        <div className="text-sm font-semibold text-tfa-text">
          Quick Actions
        </div>

        <div className="mt-0.5 text-xs text-tfa-text-muted">
          Common club-management destinations
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="border-b border-tfa-border-subtle px-5 py-5 transition hover:bg-white/[0.025] sm:border-r xl:border-b-0 last:border-r-0"
          >
            <div className="text-sm font-medium text-tfa-text">
              {action.label}
            </div>

            <div className="mt-1 text-xs text-tfa-text-secondary">
              {action.description}
            </div>

            <div className="mt-4 text-[9px] font-medium uppercase tracking-[0.14em] text-tfa-text-muted">
              Open →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}