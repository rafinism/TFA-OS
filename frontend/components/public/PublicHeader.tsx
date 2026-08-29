"use client";

import Link from "next/link";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const tclLinks = [
  { label: "Current Season", href: "/tcl" },
  { label: "Table", href: "/tcl/standings" },
  { label: "Fixtures", href: "/tcl/fixtures" },
  { label: "Results", href: "/tcl/results" },
  { label: "Teams", href: "/tcl/clubs" },
  { label: "Players", href: "/tcl/players" },
  { label: "Statistics", href: "/tcl/statistics" },
  { label: "Seasons", href: "/tcl/seasons" },
];

export default function PublicHeader() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("tfa-theme") !== "light";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function toggleTheme() {
    const nextDark = !dark;

    setDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tfa-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tfa-theme", "light");
    }
  }

  return (
    <header
      className={`border-b transition-colors ${
        dark
          ? "border-white/10 bg-[#0b0b0b] text-white"
          : "border-black/10 bg-white text-black"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src={dark ? "/tfa-logo-white.png" : "/tfa-logo-black.png"}
            alt="TESL Football Association"
            className="h-12 w-12 shrink-0 object-contain"
          />

          <div className="flex flex-col justify-center leading-none">
            <div
              className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                dark ? "text-white" : "text-black"
              }`}
            >
              TESL
            </div>

            <div
              className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                dark ? "text-white" : "text-black"
              }`}
            >
              FOOTBALL ASSOCIATION
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-xs transition ${
              dark
                ? "text-white/55 hover:bg-white/[0.05] hover:text-white"
                : "text-black/55 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            Home
          </Link>

          {/* TCL */}
          <div className="group relative">
            <button
              type="button"
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs transition ${
                dark
                  ? "text-white/55 hover:bg-white/[0.05] hover:text-white"
                  : "text-black/55 hover:bg-black/[0.05] hover:text-black"
              }`}
            >
              TCL
              <ChevronDown size={12} />
            </button>

            <div
              className={`invisible absolute left-0 top-full z-50 mt-1 w-44 rounded-md border p-1 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 ${
                dark
                  ? "border-white/10 bg-[#111111]"
                  : "border-black/10 bg-white"
              }`}
            >
              {tclLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded px-3 py-2 text-xs transition ${
                    dark
                      ? "text-white/55 hover:bg-white/[0.05] hover:text-white"
                      : "text-black/55 hover:bg-black/[0.05] hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/tfc"
            className={`rounded-md px-3 py-2 text-xs transition ${
              dark
                ? "text-white/55 hover:bg-white/[0.05] hover:text-white"
                : "text-black/55 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            TFC
          </Link>

          <Link
            href="/announcements"
            className={`rounded-md px-3 py-2 text-xs transition ${
              dark
                ? "text-white/55 hover:bg-white/[0.05] hover:text-white"
                : "text-black/55 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            Announcements
          </Link>

          <Link
            href="/constitution"
            className={`rounded-md px-3 py-2 text-xs transition ${
              dark
                ? "text-white/55 hover:bg-white/[0.05] hover:text-white"
                : "text-black/55 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            Constitution
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`flex h-9 w-9 items-center justify-center rounded-md border transition ${
              dark
                ? "border-white/10 text-white/45 hover:bg-white/[0.05] hover:text-white"
                : "border-black/10 text-black/45 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link
            href="/login"
            className={`rounded-md border px-4 py-2 text-xs font-medium transition ${
              dark
                ? "border-white/10 text-white/70 hover:bg-white/[0.05] hover:text-white"
                : "border-black/10 text-black/70 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}