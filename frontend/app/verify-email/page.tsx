"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, LoaderCircle, MailWarning, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { verifyEmail } from "../../lib/auth";

export default function VerifyEmailPage() {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address…");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token") ?? "";
    if (!token) {
      setState("error");
      setMessage("This verification link is missing its token.");
      return;
    }

    verifyEmail(token)
      .then((result) => {
        setState("success");
        setMessage(result.message);
      })
      .catch((error) => {
        setState("error");
        setMessage(error instanceof Error ? error.message : "Unable to verify your email address.");
      });
  }, []);

  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-5 py-12">
        <section className="w-full rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-7 text-center shadow-sm sm:p-9">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-tfa-text-muted hover:text-tfa-text">
            <ArrowLeft size={14} /> Back to TFA
          </Link>
          <div className="mx-auto mt-10 flex h-12 w-12 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background">
            {state === "loading" && <LoaderCircle size={19} className="animate-spin" />}
            {state === "success" && <CheckCircle2 size={19} />}
            {state === "error" && <XCircle size={19} />}
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            {state === "loading" ? "Verify your email" : state === "success" ? "Email verified" : "Verification failed"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-tfa-text-secondary">{message}</p>
          {state === "success" && (
            <Link href="/login" className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-tfa-accent px-4 text-sm font-semibold text-tfa-accent-foreground transition-opacity hover:opacity-85">
              Continue to sign in
            </Link>
          )}
          {state === "error" && (
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/login" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-tfa-accent px-4 text-sm font-semibold text-tfa-accent-foreground transition-opacity hover:opacity-85">Go to sign in</Link>
              <Link href="/resend-verification" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-tfa-border bg-tfa-background px-4 text-sm font-semibold transition-colors hover:bg-tfa-surface-hover"><MailWarning size={16} /> Resend verification email</Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
