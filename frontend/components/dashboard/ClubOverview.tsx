const clubDetails = [
  {
    label: "Club",
    value: "Not assigned",
  },
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Squad",
    value: "25 players",
  },
  {
    label: "Club Status",
    value: "Active",
  },
  {
    label: "TCL",
    value: "Not confirmed",
  },
  {
    label: "TFC",
    value: "Not confirmed",
  },
];

export default function ClubOverview() {
  return (
    <section className="rounded-lg border border-tfa-border-subtle bg-tfa-surface">
      <div className="border-b border-tfa-border-subtle px-5 py-4">
        <div className="text-sm font-semibold text-tfa-text">
          Club Overview
        </div>

        <div className="mt-0.5 text-xs text-tfa-text-muted">
          Current club identity and competition status
        </div>
      </div>

      <div className="grid sm:grid-cols-2">
        {clubDetails.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-tfa-border-subtle px-5 py-4 sm:odd:border-r"
          >
            <span className="text-xs text-tfa-text-muted">
              {item.label}
            </span>

            <span className="text-sm font-medium text-tfa-text">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}