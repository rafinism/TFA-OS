"use client";

import { Bell, Laptop, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../auth/AuthProvider";

export default function AdminTopbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const cycleTheme = () => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  const initial = user?.displayName?.trim().charAt(0).toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-tfa-border-subtle bg-tfa-background/90 px-4 backdrop-blur-xl sm:px-6">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-tfa-text-muted">Administration</div>
        <div className="mt-1 text-sm font-semibold">TFA Control Panel</div>
      </div>
      <div className="flex items-center gap-1.5">
        <button type="button" onClick={cycleTheme} aria-label={`Theme: ${theme}`} title={`Theme: ${theme}`} className="flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text">
          {theme === "system" ? <Laptop size={17} /> : resolvedTheme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
        </button>
        <button type="button" aria-label="Notifications" className="flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text"><Bell size={17} /></button>
        <div className="hidden items-center gap-2 rounded-lg border border-tfa-border-subtle bg-tfa-surface px-3 py-2 sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-tfa-accent text-[10px] font-bold text-tfa-accent-foreground">{initial}</span>
          <div>
            <div className="text-[10px] font-semibold">{user?.displayName}</div>
            <div className="text-[8px] uppercase tracking-[0.12em] text-tfa-text-muted">{user?.role}</div>
          </div>
        </div>
        <Link href="/dashboard" className="hidden h-10 items-center rounded-lg px-3 text-xs font-medium text-tfa-text-muted hover:bg-tfa-surface-hover hover:text-tfa-text sm:flex">Account</Link>
        <button type="button" onClick={logout} className="flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted hover:bg-tfa-surface-hover hover:text-tfa-danger" aria-label="Sign out" title="Sign out"><LogOut size={17} /></button>
      </div>
    </header>
  );
}
