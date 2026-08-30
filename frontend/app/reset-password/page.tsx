"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { resetPassword } from "../../lib/auth";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") ?? "");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("This password reset link is missing its token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(token, password);
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset the password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-5 py-12">
        <section className="w-full rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-7 shadow-sm sm:p-9">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs font-medium text-tfa-text-muted hover:text-tfa-text"><ArrowLeft size={14} /> Back to sign in</Link>
          <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background">{message ? <CheckCircle2 size={18} /> : <LockKeyhole size={18} />}</div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Choose a new password</h1>
          <p className="mt-2 text-sm leading-6 text-tfa-text-secondary">Create a new password for your TFA account. The reset link can only be used once.</p>

          {!message ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block"><span className="text-xs font-semibold text-tfa-text-secondary">New password</span><div className="relative mt-2"><input required minLength={8} type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="block w-full rounded-xl border border-tfa-border bg-tfa-background px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-tfa-info" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-tfa-text-muted hover:text-tfa-text">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
              <label className="block"><span className="text-xs font-semibold text-tfa-text-secondary">Confirm new password</span><div className="relative mt-2"><input required minLength={8} type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="block w-full rounded-xl border border-tfa-border bg-tfa-background px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-tfa-info" /><button type="button" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} onClick={() => setShowConfirmPassword((value) => !value)} className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-tfa-text-muted hover:text-tfa-text">{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>

              {error && <div role="alert" className="rounded-xl border border-tfa-danger/30 bg-tfa-danger/10 px-4 py-3 text-xs leading-5 text-tfa-danger">{error}</div>}

              <button type="submit" disabled={loading} style={{ backgroundColor: "var(--tfa-accent)", color: "var(--tfa-accent-foreground)" }} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60">{loading && <LoaderCircle size={16} className="animate-spin" />}{loading ? "Resetting…" : "Set new password"}</button>
            </form>
          ) : (
            <div className="mt-8 space-y-4"><div role="status" className="rounded-xl border border-tfa-success/30 bg-tfa-success/10 px-4 py-3 text-xs leading-5 text-tfa-success">{message}</div><Link href="/login" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-tfa-accent px-4 text-sm font-semibold text-tfa-accent-foreground">Continue to sign in</Link></div>
          )}
        </section>
      </div>
    </main>
  );
}
