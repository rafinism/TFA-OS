"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ConstitutionDocument = {
  id: string;
  title: string;
  paragraphs: readonly string[];
};

export default function ConstitutionDocumentReader({
  document,
}: {
  document: ConstitutionDocument;
}) {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-10">
          <Link
            href="/constitution"
            className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-white/80"
          >
            <ArrowLeft size={14} />
            Constitution
          </Link>
        </div>

        <article>
          <header className="border-b border-white/10 pb-8">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/60">
              TESL FOOTBALL ASSOCIATION
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              CONSTITUTION
            </h1>

            <h2 className="mt-8 text-xl font-semibold text-white/85">
              {document.title}
            </h2>
          </header>

          <div className="mt-8 max-w-3xl space-y-5 text-[14px] leading-7 text-white/65">
            {document.paragraphs.map((paragraph, index) => (
              <p
                key={`${document.id}-${index}`}
                className="whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}