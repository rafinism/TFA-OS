"use client";

import { Bell, ChevronDown, Laptop, LogIn, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Topbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-tfa-border-subtle bg-tfa-surface/90 px-4 backdrop-blur-xl sm:px-5 lg:px-8">
      <div className="min-w-0">
        <div className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-tfa-text-muted">TFA Football Association</div>
        <div className="mt-0.5 truncate text-sm font-semibold tracking-tight text-tfa-text">Account Area</div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={cycleTheme}
          className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text"
          aria-label={`Theme: ${theme}. Activate to switch theme.`}
          title={`Theme: ${theme}`}
        >
          {theme === "system" ? <Laptop size={18} /> : resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-tfa-text-muted transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <Link
          href="/login"
          className="ml-1 flex min-h-10 items-center gap-2 rounded-lg border border-tfa-border-subtle bg-tfa-background px-2.5 text-sm font-medium text-tfa-text-secondary transition-colors hover:border-tfa-border hover:bg-tfa-surface-hover hover:text-tfa-text"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-tfa-accent text-[10px] font-bold text-tfa-accent-foreground">A</span>
          <span className="hidden sm:block">Account</span>
          <ChevronDown size={14} className="hidden text-tfa-text-muted sm:block" />
        </Link>

        <Link href="/login" className="ml-1 hidden min-h-10 items-center gap-2 rounded-lg bg-tfa-accent px-3 text-xs font-semibold text-tfa-accent-foreground transition-opacity hover:opacity-85 md:flex">
          <LogIn size={15} />
          Sign in
        </Link>
      </div>
    </header>
  );
}
