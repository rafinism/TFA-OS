export default function ManagementAlerts() {
  return (
    <section className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
      <div className="border-b border-tfa-border-subtle px-5 py-4">
        <div className="text-sm font-semibold text-tfa-text">Account & Club Status</div>
        <div className="mt-0.5 text-xs text-tfa-text-muted">
          Live conditions and actions requiring your attention
        </div>
      </div>

      <div className="px-5 py-10 text-center">
        <div className="text-sm font-medium text-tfa-text-secondary">
          No status items available
        </div>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-tfa-text-muted">
          Status alerts will be generated from real account, club, contract,
          competition, and approval records. Nothing is fabricated while the
          data layer is being connected.
        </p>
      </div>
    </section>
  );
}
