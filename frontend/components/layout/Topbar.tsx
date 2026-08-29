"use client";

import { Bell, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-tfa-border-subtle bg-tfa-surface px-5 lg:px-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-tfa-text-muted">
          TFA Football Association
        </div>
        <div className="mt-1 text-sm font-medium text-tfa-text">Account Area</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-tfa-border-subtle text-tfa-text-muted transition hover:bg-tfa-surface-hover hover:text-tfa-text"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={16} strokeWidth={1.8} />
        </button>

        <Link
          href="/login"
          className="flex items-center gap-2 rounded-md border border-tfa-border-subtle px-3 py-1.5 text-xs text-tfa-text-secondary transition hover:bg-tfa-surface-hover hover:text-tfa-text"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-tfa-surface-elevated text-[10px] font-bold text-tfa-text">
            A
          </span>
          <span className="hidden sm:block">Account</span>
          <ChevronDown size={14} strokeWidth={1.8} className="text-tfa-text-disabled" />
        </Link>
      </div>
    </header>
  );
}
