"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, LoaderCircle, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { register } from "../../lib/auth";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, displayName);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create the account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-5 py-12">
        <section className="w-full rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-7 shadow-sm sm:p-9">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-tfa-text-muted hover:text-tfa-text">
            <ArrowLeft size={14} /> Back to TFA
          </Link>

          <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background">
            {success ? <CheckCircle2 size={18} /> : <UserPlus size={18} />}
          </div>

          {success ? (
            <>
              <h1 className="mt-6 text-2xl font-semibold tracking-tight">Account created</h1>
              <p className="mt-2 text-sm leading-6 text-tfa-text-secondary">
                Your TFA account has been created successfully. You can now sign in with the email and password you registered.
              </p>
              <Link
                href="/login"
                className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--tfa-accent)] px-4 text-sm font-semibold text-[var(--tfa-accent-foreground)] transition-opacity hover:opacity-85"
              >
                Continue to sign in
              </Link>
            </>
          ) : (
            <>
              <h1 className="mt-6 text-2xl font-semibold tracking-tight">Create a TFA account</h1>
              <p className="mt-2 text-sm leading-6 text-tfa-text-secondary">
                Create a standard TFA account. Manager and administrator privileges are assigned separately by the association.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="text-xs font-semibold text-tfa-text-secondary">Display name</span>
                  <input
                    required
                    minLength={2}
                    type="text"
                    autoComplete="name"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    className="mt-2 block w-full rounded-xl border border-tfa-border bg-tfa-background px-3.5 py-3 text-sm outline-none transition focus:border-tfa-info"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-tfa-text-secondary">Email address</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 block w-full rounded-xl border border-tfa-border bg-tfa-background px-3.5 py-3 text-sm outline-none transition focus:border-tfa-info"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-tfa-text-secondary">Password</span>
                  <input
                    required
                    minLength={8}
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-2 block w-full rounded-xl border border-tfa-border bg-tfa-background px-3.5 py-3 text-sm outline-none transition focus:border-tfa-info"
                  />
                  <span className="mt-2 block text-[11px] text-tfa-text-muted">At least 8 characters.</span>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-tfa-text-secondary">Confirm password</span>
                  <input
                    required
                    minLength={8}
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="mt-2 block w-full rounded-xl border border-tfa-border bg-tfa-background px-3.5 py-3 text-sm outline-none transition focus:border-tfa-info"
                  />
                </label>

                {error && (
                  <div role="alert" className="rounded-xl border border-tfa-danger/30 bg-tfa-danger/10 px-4 py-3 text-xs leading-5 text-tfa-danger">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--tfa-accent)] px-4 text-sm font-semibold text-[var(--tfa-accent-foreground)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && <LoaderCircle size={16} className="animate-spin" />}
                  {loading ? "Creating account…" : "Create account"}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-tfa-text-muted">
                Already have an account? <Link href="/login" className="font-semibold text-tfa-info hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
