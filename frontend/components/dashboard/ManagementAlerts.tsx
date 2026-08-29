const alerts = [
  {
    title: "Squad requirement",
    description:
      "Your club must maintain the required squad size and matchday availability.",
    status: "Compliant",
  },
  {
    title: "Contract actions",
    description:
      "No contract action currently requires your attention.",
    status: "No action",
  },
  {
    title: "Pending approvals",
    description:
      "No submitted requests are currently awaiting President review.",
    status: "Clear",
  },
];

export default function ManagementAlerts() {
  return (
    <section className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
      <div className="border-b border-tfa-border-subtle px-5 py-4">
        <div className="text-sm font-semibold text-tfa-text">
          Club Status
        </div>

        <div className="mt-0.5 text-xs text-tfa-text-muted">
          Actions and conditions that may require your attention
        </div>
      </div>

      <div className="divide-y divide-tfa-border-subtle">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className="flex items-center justify-between gap-6 px-5 py-4"
          >
            <div>
              <div className="text-sm font-medium text-tfa-text">
                {alert.title}
              </div>

              <div className="mt-1 max-w-2xl text-xs leading-5 text-tfa-text-secondary">
                {alert.description}
              </div>
            </div>

            <div className="shrink-0 rounded-md border border-tfa-border-subtle px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-tfa-text-muted">
              {alert.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}