"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { AuthGuard, AuthProvider } from "../auth/AuthProvider";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-tfa-background text-tfa-text">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          {sidebarOpen && (
            <button type="button" aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <div className="min-h-screen lg:pl-64">
            <Topbar />
            <div className="border-b border-tfa-border-subtle bg-tfa-background px-4 py-2 lg:hidden">
              <button type="button" onClick={() => setSidebarOpen(true)} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-tfa-text-secondary hover:bg-tfa-surface-hover hover:text-tfa-text">
                <Menu size={18} /> Navigation
              </button>
            </div>
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
