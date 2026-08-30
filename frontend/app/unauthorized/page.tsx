import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-tfa-background px-5 text-tfa-text">
      <section className="w-full max-w-lg rounded-2xl border border-tfa-border-subtle bg-tfa-surface p-8 text-center shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">403 · Restricted area</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">You do not have access to this area.</h1>
        <p className="mt-3 text-sm leading-6 text-tfa-text-secondary">Your TFA account is authenticated, but its current role does not have permission to open this section.</p>
        <Link href="/dashboard" className="mt-7 inline-flex min-h-10 items-center rounded-xl bg-tfa-accent px-4 text-sm font-semibold text-tfa-accent-foreground transition-opacity hover:opacity-85">Return to dashboard</Link>
      </section>
    </main>
  );
}
