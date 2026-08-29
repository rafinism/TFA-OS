"use client";

import type { CSSProperties } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Player } from "@/lib/types/player";

type PlayerCardProps = {
  player: Player;
  onView: (player: Player) => void;
  onEdit: (player: Player) => void;
  onDelete: (playerId: string) => void;
  renderPlayerFlag?: (player: Player) => React.ReactNode;
  getStatusDot?: (status: Player["status"]) => string;
};

function getCropStyle(
  crop: Player["imageCrop"],
): CSSProperties {
  if (!crop) {
    return {
      inset: 0,
      width: "100%",
      height: "100%",
    };
  }

  const scaleX = 100 / crop.width;
  const scaleY = 100 / crop.height;

  return {
    width: `${scaleX * 100}%`,
    height: `${scaleY * 100}%`,
    left: `${-crop.x * scaleX}%`,
    top: `${-crop.y * scaleY}%`,
    maxWidth: "none",
  };
}

function defaultStatusDot(status: Player["status"]) {
  if (status === "active") return "bg-emerald-400";
  if (status === "free_agent") return "bg-amber-400";
  return "bg-red-400";
}

function getStatusLabel(status: Player["status"]) {
  if (status === "free_agent") return "Free Agent";
  if (status === "unavailable") return "Unavailable";
  return "Active";
}

export default function PlayerCard({
  player,
  onView,
  onEdit,
  onDelete,
  renderPlayerFlag,
  getStatusDot = defaultStatusDot,
}: PlayerCardProps) {
  const statusText =
    player.status === "active"
      ? (player.club ?? "Active")
      : getStatusLabel(player.status);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl">
      <button
        type="button"
        onClick={() => onView(player)}
        className="relative block aspect-[3/4] w-full overflow-hidden text-left"
      >
        {player.image ? (
          <img
            src={player.image}
            alt={player.name}
            className="absolute object-cover transition duration-500 group-hover:brightness-105"
            style={getCropStyle(player.imageCrop)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#151515]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <span className="text-2xl font-semibold text-white/20">
                {player.name.charAt(0)}
              </span>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_28%,rgba(0,0,0,0.32)_58%,rgba(0,0,0,0)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 truncate text-base font-semibold leading-tight text-white">
                {renderPlayerFlag?.(player)}
                <span className="truncate">{player.name}</span>
              </div>

              <div className="mt-2 grid grid-cols-6 gap-1">
                {player.positions.map((position) => (
                  <span
                    key={position}
                    className="flex h-5 min-w-0 w-full items-center justify-center overflow-hidden rounded-[4px] border border-white/15 bg-black/30 px-0.5 text-[8px] font-medium leading-none text-white/70 backdrop-blur-sm"
                  >
                    {position}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex min-w-0 items-center gap-2.5">
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${getStatusDot(
                    player.status,
                  )}`}
                />

                <span className="truncate text-sm font-semibold text-white/85">
                  {statusText}
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-sm font-semibold text-white">
                {player.signingValue !== null
                  ? `${player.signingValue} TCP`
                  : "—"}
              </div>
            </div>
          </div>
        </div>
      </button>

      <div className="absolute right-3 top-3 z-10 flex gap-1.5 opacity-0 transition group-hover:opacity-100">
        <button
          type="button"
          aria-label={`Edit ${player.name}`}
          onClick={() => onEdit(player)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-black/60 text-white/60 backdrop-blur-md hover:bg-black/80 hover:text-white"
        >
          <Pencil size={13} />
        </button>

        <button
          type="button"
          aria-label={`Delete ${player.name}`}
          onClick={() => onDelete(player.id)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-black/60 text-white/50 backdrop-blur-md hover:bg-black/80 hover:text-red-400"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}