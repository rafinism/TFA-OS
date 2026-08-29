"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import PublicHeader from "../../components/public/PublicHeader";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-5 py-12">
        <section className="w-full rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-7 shadow-sm sm:p-9">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-tfa-text-muted hover:text-tfa-text"><ArrowLeft size={14} /> Back to TFA</Link>
          <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-background"><LockKeyhole size={18} /></div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Sign in to TFA</h1>
          <p className="mt-2 text-sm leading-6 text-tfa-text-secondary">Use your registered TFA account. Authentication will be connected to the backend account service.</p>
          <div className="mt-8 rounded-xl border border-dashed border-tfa-border bg-tfa-background px-5 py-6 text-center">
            <p className="text-sm font-medium">Authentication UI ready</p>
            <p className="mt-2 text-xs leading-5 text-tfa-text-muted">The form will be wired to the real authentication API once the local PostgreSQL environment is ready.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
