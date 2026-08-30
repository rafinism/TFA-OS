import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import PublicHeader from "../../components/public/PublicHeader";

export const metadata = {
  title: "Terms and Conditions · TFA-OS",
  description: "Terms and Conditions governing use of the TFA-OS platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-tfa-background text-tfa-text">
      <PublicHeader />
      <div className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
        <Link href="/register" className="inline-flex items-center gap-2 text-xs font-medium text-tfa-text-muted hover:text-tfa-text">
          <ArrowLeft size={14} /> Back to registration
        </Link>

        <header className="mt-8 border-b border-tfa-border-subtle pb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-tfa-border-subtle bg-tfa-surface">
            <FileText size={18} />
          </div>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-tfa-text-muted">TFA-OS · Version 1.0</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Terms and Conditions</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-tfa-text-secondary">These terms govern use of TFA-OS, the digital platform of the TESL Football Association. They supplement the TFA Constitution and do not replace or override it.</p>
        </header>

        <article className="prose prose-sm mt-10 max-w-none text-tfa-text-secondary">
          <section>
            <h2 className="text-lg font-semibold text-tfa-text">1. Acceptance</h2>
            <p>By creating or using a TFA-OS account, you confirm that the information you provide is accurate to the best of your knowledge and that you agree to these Terms and Conditions.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">2. Constitution and TFA authority</h2>
            <p>The TFA Constitution is the supreme governing document of the Association. These Terms describe use of the software platform only. Where a platform rule conflicts with the Constitution, the Constitution prevails.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">3. Account security</h2>
            <p>You are responsible for keeping your password confidential and for using your own account. You must not knowingly share credentials, impersonate another person, or attempt to obtain unauthorised access to another account or protected system.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">4. Appropriate use</h2>
            <p>You must use TFA-OS in good faith and in accordance with the Constitution, applicable TFA decisions, and these Terms. Attempts to manipulate official records, bypass access controls, interfere with system operation, or misuse another participant’s information are prohibited.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">5. Official records</h2>
            <p>TFA-OS is intended to preserve official and historical records. Users must not treat unofficial screenshots, copied data, or client-side displays as authority where an official record exists in the system.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">6. Suspension and access</h2>
            <p>Account access may be restricted or suspended where authorised by the TFA Constitution, applicable TFA decisions, or necessary platform security controls. Manager or administrative privileges are separate from ordinary registration.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">7. Changes</h2>
            <p>These Terms may be updated between releases or as platform requirements change. Where an update requires renewed acceptance, TFA-OS may require users to accept the current version before continuing to use protected features.</p>
          </section>
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-tfa-text">8. Questions and interpretation</h2>
            <p>These Terms are supplementary platform terms. They must be interpreted consistently with the TFA Constitution and other lawful TFA governance instruments.</p>
          </section>
        </article>
      </div>
    </main>
  );
}
