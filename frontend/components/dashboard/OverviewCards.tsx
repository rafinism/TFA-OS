import { BarChart3, Coins, Shield, Users } from "lucide-react";

const cards = [
  {
    label: "Club balance",
    description: "Available once your account is linked to a club.",
    icon: Coins,
  },
  {
    label: "Squad",
    description: "Your club squad will appear here for Managers.",
    icon: Users,
  },
  {
    label: "TCL record",
    description: "Competition statistics will appear here.",
    icon: BarChart3,
  },
  {
    label: "Standing",
    description: "Your current competition position will appear here.",
    icon: Shield,
  },
];

export default function OverviewCards() {
  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-lg border border-tfa-border-subtle bg-tfa-surface p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-tfa-text-muted">
                {card.label}
              </div>
              <Icon size={16} strokeWidth={1.7} className="text-tfa-text-disabled" />
            </div>

            <div className="text-2xl font-semibold tracking-tight text-tfa-text">—</div>
            <div className="mt-1 text-xs text-tfa-text-muted">{card.description}</div>
          </div>
        );
      })}
    </section>
  );
}
