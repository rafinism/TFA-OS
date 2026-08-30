"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMe, logout as clearAuth, type AuthUser } from "../../lib/auth";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    setUser(await getMe());
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
    window.location.assign("/login");
  };

  const value = useMemo(() => ({ user, loading, refresh, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

function roleLevel(role?: string) {
  return role === "ADMIN" ? 3 : role === "MANAGER" ? 2 : role === "USER" ? 1 : 0;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    const requiredLevel = pathname.startsWith("/admin") ? 3 : pathname.startsWith("/manager") ? 2 : 1;
    if (roleLevel(user.role) < requiredLevel) router.replace("/unauthorized");
  }, [loading, user, pathname, router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-tfa-background text-sm text-tfa-text-muted">Checking your TFA session…</div>;
  }

  if (!user) return null;

  const requiredLevel = pathname.startsWith("/admin") ? 3 : pathname.startsWith("/manager") ? 2 : 1;
  if (roleLevel(user.role) < requiredLevel) return null;

  return <>{children}</>;
}
