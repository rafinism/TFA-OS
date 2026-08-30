"use client";

import { Bell, Laptop, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "../auth/AuthProvider";

export default function Topbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const cycleTheme = () => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  const initial = user?.displayName?.trim().charAt(0).toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-tfa-border-subtle bg-tfa-surface/90 px-4 backdrop-blur-xl sm:px-5 lg:px-8">
      <div className="min-w-0">
        <div className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-tfa-text-muted">TFA Football Association</div>
        <div className="mt-0.5 truncate text-sm font-semibold tracking-tight text-tfa-text">Account Area</div>
      </div>
      <div className="flex items-center gap-1.5">
        <button type="button" onClick={cycleTheme} className="flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text" aria-label={`Theme: ${theme}`} title={`Theme: ${theme}`}>
          {theme === "system" ? <Laptop size={18} /> : resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text" aria-label="Notifications" title="Notifications"><Bell size={18} /></button>
        <div className="hidden items-center gap-2 rounded-lg border border-tfa-border-subtle bg-tfa-background px-2.5 py-1.5 sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-tfa-accent text-[10px] font-bold text-tfa-accent-foreground">{initial}</span>
          <div className="max-w-32">
            <div className="truncate text-xs font-semibold">{user?.displayName}</div>
            <div className="text-[9px] uppercase tracking-[0.12em] text-tfa-text-muted">{user?.role}</div>
          </div>
        </div>
        <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted hover:bg-tfa-surface-hover hover:text-tfa-text" aria-label="Public TFA site" title="Public TFA site">←</Link>
        <button type="button" onClick={logout} className="flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted hover:bg-tfa-surface-hover hover:text-tfa-danger" aria-label="Sign out" title="Sign out"><LogOut size={17} /></button>
      </div>
    </header>
  );
}
