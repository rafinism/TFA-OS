"use client";

import Link from "next/link";
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { forgotPassword } from "../../lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await forgotPassword(email);
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process the request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-5 py-12">
        <section className="w-full rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-7 shadow-sm sm:p-9">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs font-medium text-tfa-text-muted hover:text-tfa-text">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
          <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background">
            <Mail size={18} />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-sm leading-6 text-tfa-text-secondary">
            Enter your account email and we’ll send a password reset link if an active account exists.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

            {message && <div role="status" className="rounded-xl border border-tfa-success/30 bg-tfa-success/10 px-4 py-3 text-xs leading-5 text-tfa-success">{message}</div>}
            {error && <div role="alert" className="rounded-xl border border-tfa-danger/30 bg-tfa-danger/10 px-4 py-3 text-xs leading-5 text-tfa-danger">{error}</div>}

            <button type="submit" disabled={loading} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-tfa-accent px-4 text-sm font-semibold text-tfa-accent-foreground transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60">
              {loading && <LoaderCircle size={16} className="animate-spin" />}
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
