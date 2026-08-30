"use client";

import Link from "next/link";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

const links = [
  { label: "TCL", href: "/tcl" },
  { label: "TFC", href: "/tfc" },
  { label: "Player Pool", href: "/tcl/players" },
  { label: "Announcements", href: "/announcements" },
  { label: "Constitution", href: "/constitution" },
];

export default function PublicHeader() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const cycleTheme = () => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");

  return (
    <header className="sticky top-0 z-40 border-b border-tfa-border-subtle bg-tfa-background/90 text-tfa-text backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="TFA home">
          <img src={resolvedTheme === "dark" ? "/tfa-logo-white.png" : "/tfa-logo-black.png"} alt="TESL Football Association" className="h-10 w-10 object-contain" />
          <div className="hidden leading-none sm:block">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em]">TESL</div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-tfa-text-muted">Football Association</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-xs font-medium text-tfa-text-secondary transition-colors hover:bg-tfa-surface-hover hover:text-tfa-text">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={cycleTheme} aria-label={`Theme: ${theme}`} title={`Theme: ${theme}`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-tfa-border-subtle bg-tfa-surface text-tfa-text transition-colors hover:bg-tfa-surface-hover">
            {theme === "system" ? <Laptop size={16} /> : resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link href="/login" style={{ backgroundColor: "var(--tfa-surface)", color: "var(--tfa-text)" }} className="inline-flex items-center justify-center rounded-lg border border-tfa-border px-4 py-2.5 text-xs font-semibold transition-colors hover:bg-tfa-surface-hover">Sign in</Link>
          <Link href="/register" style={{ backgroundColor: "var(--tfa-accent)", color: "var(--tfa-accent-foreground)" }} className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-xs font-semibold transition-opacity hover:opacity-85">Sign up</Link>
        </div>
      </div>
    </header>
  );
}
