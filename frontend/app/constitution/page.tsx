"use client";

import Link from "next/link";
import {
  BookOpen,
  Download,
  Grid2X2,
  List,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import PublicHeader from "@/components/public/PublicHeader";
import {
  constitutionArticles,
  constitutionClosingRecords,
  constitutionFrontMatter,
  constitutionMeta,
} from "@/lib/constitution";

type ViewMode = "grid" | "list";

type SearchResult = {
  id: string;
  href: string;
  category: string;
  title: string;
  context: string;
  type: "article" | "document";
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function createExcerpt(text: string, query: string) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return text.slice(0, 180);
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = cleanQuery.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return text.slice(0, 180);
  }

  const radius = 85;

  const start = Math.max(0, matchIndex - radius);
  const end = Math.min(
    text.length,
    matchIndex + cleanQuery.length + radius,
  );

  let excerpt = text.slice(start, end).trim();

  if (start > 0) {
    excerpt = `…${excerpt}`;
  }

  if (end < text.length) {
    excerpt = `${excerpt}…`;
  }

  return excerpt;
}

function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return <>{text}</>;
  }

  const escapedQuery = cleanQuery.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const parts = text.split(
    new RegExp(`(${escapedQuery})`, "gi"),
  );

  return (
    <>
      {parts.map((part, index) => {
        const isMatch =
          part.toLowerCase() === cleanQuery.toLowerCase();

        return isMatch ? (
          <mark
            key={index}
            className="rounded bg-white/[0.14] px-0.5 text-white"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </>
  );
}

/*
 * Large dimensional open-book icon.
 *
 * Minimal, colorless, no border around the icon,
 * but with layered covers/pages and subtle depth.
 */
function ConstitutionBookIcon() {
  return (
    <svg
      width="82"
      height="70"
      viewBox="0 0 82 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-white"
    >
      <defs>
        <linearGradient
          id="bookCoverLeft"
          x1="10"
          y1="15"
          x2="38"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.9" />
          <stop
            offset="0.55"
            stopColor="white"
            stopOpacity="0.55"
          />
          <stop
            offset="1"
            stopColor="white"
            stopOpacity="0.22"
          />
        </linearGradient>

        <linearGradient
          id="bookCoverRight"
          x1="72"
          y1="15"
          x2="44"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.9" />
          <stop
            offset="0.55"
            stopColor="white"
            stopOpacity="0.55"
          />
          <stop
            offset="1"
            stopColor="white"
            stopOpacity="0.22"
          />
        </linearGradient>

        <linearGradient
          id="pageLeft"
          x1="14"
          y1="17"
          x2="37"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.95" />
          <stop
            offset="1"
            stopColor="white"
            stopOpacity="0.48"
          />
        </linearGradient>

        <linearGradient
          id="pageRight"
          x1="68"
          y1="17"
          x2="45"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.95" />
          <stop
            offset="1"
            stopColor="white"
            stopOpacity="0.48"
          />
        </linearGradient>

        <filter
          id="bookShadow"
          x="0"
          y="0"
          width="82"
          height="70"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2.5"
            floodColor="#000000"
            floodOpacity="0.55"
          />
        </filter>
      </defs>

      <g filter="url(#bookShadow)">
        {/* Back covers */}
        <path
          d="M39.5 12.5C31 7.5 20.2 7.1 9.4 10.3C7.5 10.9 6.2 12.7 6.2 14.7V51.8C6.2 54.4 8.6 56.3 11.1 55.7C21.6 53.2 31.1 54.2 39.5 60"
          fill="url(#bookCoverLeft)"
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M42.5 12.5C51 7.5 61.8 7.1 72.6 10.3C74.5 10.9 75.8 12.7 75.8 14.7V51.8C75.8 54.4 73.4 56.3 70.9 55.7C60.4 53.2 50.9 54.2 42.5 60"
          fill="url(#bookCoverRight)"
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        {/* Page blocks */}
        <path
          d="M39.5 15C32.2 11.1 22.1 10.9 12.4 13.4C10.9 13.8 10 15.2 10 16.8V48.1C10 49.9 11.6 51.2 13.3 50.8C22.9 48.6 31.7 49.6 39.5 54.1"
          fill="url(#pageLeft)"
          stroke="white"
          strokeOpacity="0.48"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        <path
          d="M42.5 15C49.8 11.1 59.9 10.9 69.6 13.4C71.1 13.8 72 15.2 72 16.8V48.1C72 49.9 70.4 51.2 68.7 50.8C59.1 48.6 50.3 49.6 42.5 54.1"
          fill="url(#pageRight)"
          stroke="white"
          strokeOpacity="0.48"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Left page lines */}
        <path
          d="M10 20.5C19.5 18.2 30.2 18.6 39.5 23.2"
          stroke="white"
          strokeOpacity="0.34"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <path
          d="M10 25C19.5 22.7 30.2 23.1 39.5 27.7"
          stroke="white"
          strokeOpacity="0.27"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <path
          d="M10 29.5C19.5 27.2 30.2 27.6 39.5 32.2"
          stroke="white"
          strokeOpacity="0.21"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Right page lines */}
        <path
          d="M72 20.5C62.5 18.2 51.8 18.6 42.5 23.2"
          stroke="white"
          strokeOpacity="0.34"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <path
          d="M72 25C62.5 22.7 51.8 23.1 42.5 27.7"
          stroke="white"
          strokeOpacity="0.27"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <path
          d="M72 29.5C62.5 27.2 51.8 27.6 42.5 32.2"
          stroke="white"
          strokeOpacity="0.21"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Center binding */}
        <path
          d="M41 12.8V58.2"
          stroke="white"
          strokeOpacity="0.95"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M40 15C39.3 25 39.2 43 40 54"
          stroke="white"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <path
          d="M42 15C42.7 25 42.8 43 42 54"
          stroke="black"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function ConstitutionPage() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] =
    useState<ViewMode>("grid");
  const [searchOpen, setSearchOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] =
    useState(false);

  /*
   * These values are calculated from constitution.ts.
   * They are NOT hardcoded.
   */
  const articleCount = constitutionArticles.length;

  const sectionCount = constitutionArticles.reduce(
    (total, article) =>
      total + article.sections.length,
    0,
  );

  const wordCount = useMemo(() => {
    const frontMatterWords =
      constitutionFrontMatter.reduce(
        (total, item) =>
          total +
          countWords(
            `${item.title} ${item.paragraphs.join(" ")}`,
          ),
        0,
      );

    const articleWords =
      constitutionArticles.reduce(
        (total, article) =>
          total +
          countWords(
            `${article.title} ${article.sections
              .map(
                (section) =>
                  `${section.title} ${section.paragraphs.join(
                    " ",
                  )}`,
              )
              .join(" ")}`,
          ),
        0,
      );

    const closingWords =
      constitutionClosingRecords.reduce(
        (total, record) =>
          total +
          countWords(
            `${record.title} ${record.paragraphs.join(
              " ",
            )}`,
          ),
        0,
      );

    return (
      frontMatterWords +
      articleWords +
      closingWords
    );
  }, []);

  const documents = useMemo(() => {
    const frontMatter =
      constitutionFrontMatter.map((item) => ({
        id: item.id,
        title: item.title,
        href: `/constitution/document/${item.id}`,
        type: "document" as const,
      }));

    const articles = constitutionArticles.map(
      (article) => ({
        id: article.id,
        title: `ARTICLE ${article.number} · ${article.title}`,
        href: `/constitution/${article.number}`,
        type: "article" as const,
      }),
    );

    const closing =
      constitutionClosingRecords.map((record) => ({
        id: slugify(record.title),
        title: record.title,
        href: `/constitution/document/${slugify(
          record.title,
        )}`,
        type: "document" as const,
      }));

    return [
      ...frontMatter,
      ...articles,
      ...closing,
    ];
  }, []);

  /*
   * FULL CONSTITUTION SEARCH
   *
   * Section results carry both the section ID
   * and the original search query.
   *
   * This is what allows the article page to:
   * 1. jump to the correct section
   * 2. highlight the searched word
   */
  const searchResults = useMemo<SearchResult[]>(
    () => {
      const q = query.trim().toLowerCase();

      if (!q) {
        return [];
      }

      const results: SearchResult[] = [];

      /* Front matter */
      for (const item of constitutionFrontMatter) {
        const fullText = `${item.title} ${item.paragraphs.join(
          " ",
        )}`;

        if (
          !fullText
            .toLowerCase()
            .includes(q)
        ) {
          continue;
        }

        results.push({
          id: `front-${item.id}`,
          href: `/constitution/document/${item.id}`,
          category: "Constitutional Document",
          title: item.title,
          context: createExcerpt(
            fullText,
            query,
          ),
          type: "document",
        });
      }

      /* Articles + sections */
      for (const article of constitutionArticles) {
        /* Article title */
        if (
          article.title
            .toLowerCase()
            .includes(q)
        ) {
          results.push({
            id: `article-${article.id}`,
            href: `/constitution/${article.number}`,
            category: `Article ${article.number}`,
            title: article.title,
            context: createExcerpt(
              article.title,
              query,
            ),
            type: "article",
          });
        }

        /* Individual sections */
        for (const section of article.sections) {
          const fullText = [
            `Section ${section.number}`,
            section.title,
            ...section.paragraphs,
          ].join(" ");

          if (
            !fullText
              .toLowerCase()
              .includes(q)
          ) {
            continue;
          }

          /*
           * Keep this separate from results.push().
           * This prevents the TypeScript parser problem
           * we encountered previously.
           */
          const sectionHref =
            `/constitution/${article.number}?section=${encodeURIComponent(
              section.id,
            )}&search=${encodeURIComponent(
              query.trim(),
            )}`;

          results.push({
            id: `${article.id}-${section.id}`,
            href: sectionHref,
            category: `Article ${article.number} · Section ${section.number}`,
            title: section.title,
            context: createExcerpt(
              fullText,
              query,
            ),
            type: "article",
          });
        }
      }

      /* Closing constitutional records */
      for (const record of constitutionClosingRecords) {
        const fullText = `${record.title} ${record.paragraphs.join(
          " ",
        )}`;

        if (
          !fullText
            .toLowerCase()
            .includes(q)
        ) {
          continue;
        }

        const id = slugify(record.title);

        results.push({
          id: `closing-${id}`,
          href: `/constitution/document/${id}`,
          category: "Constitutional Record",
          title: record.title,
          context: createExcerpt(
            fullText,
            query,
          ),
          type: "document",
        });
      }

      return results;
    },
    [query],
  );

  const searching =
    query.trim().length > 0;

  function toggleSearch() {
    if (searchOpen) {
      setSearchOpen(false);
      setQuery("");
      return;
    }

    setSearchOpen(true);
    setDownloadOpen(false);
  }

  function toggleDownload() {
    setDownloadOpen(
      (current) => !current,
    );

    setSearchOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <PublicHeader />

      <main className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="text-center">
          <div className="flex justify-center">
            <ConstitutionBookIcon />
          </div>

          <div className="mt-1.5 text-[15px] font-medium uppercase tracking-[0.22em] text-white sm:text-[17px]">
            TESL FOOTBALL ASSOCIATION
          </div>

          <h1
            className="mt-2.5 text-[48px] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-[60px] lg:text-[70px]"
            style={{
              fontFamily:
                '"Times New Roman", Times, serif',
            }}
          >
            CONSTITUTION
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 text-[10px] font-medium uppercase tracking-[0.17em] text-white/45 sm:text-[11px]">
            <span>
              {articleCount} Articles
            </span>

            <span className="text-white/25">
              •
            </span>

            <span>
              {sectionCount} Sections
            </span>

            <span className="text-white/25">
              •
            </span>

            <span>
              {wordCount.toLocaleString()} Words
            </span>
          </div>
        </header>

        {/* ============================================================
            TOOLBAR
        ============================================================ */}

        <div className="mt-7 border-t border-white/[0.08] pt-4">
          <div className="flex items-center justify-end gap-2">
            {searchOpen && (
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value,
                    )
                  }
                  placeholder="Search constitution..."
                  className="w-56 rounded-lg border border-white/10 bg-white/[0.025] py-2.5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>
            )}

            {/* Search */}
            <button
              type="button"
              onClick={toggleSearch}
              aria-label="Search constitution"
              title="Search constitution"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition ${
                searchOpen
                  ? "text-white"
                  : "text-white/40 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {searchOpen ? (
                <X size={15} />
              ) : (
                <Search size={15} />
              )}
            </button>

            {/* Grid/List */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-1">
              <button
                type="button"
                aria-label="Grid view"
                title="Grid view"
                onClick={() =>
                  setViewMode("grid")
                }
                className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                  viewMode === "grid"
                    ? "bg-white/[0.07] text-white/80"
                    : "text-white/30 hover:bg-white/[0.04] hover:text-white/70"
                }`}
              >
                <Grid2X2 size={14} />
              </button>

              <button
                type="button"
                aria-label="List view"
                title="List view"
                onClick={() =>
                  setViewMode("list")
                }
                className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                  viewMode === "list"
                    ? "bg-white/[0.07] text-white/80"
                    : "text-white/30 hover:bg-white/[0.04] hover:text-white/70"
                }`}
              >
                <List size={15} />
              </button>
            </div>

            {/* Download */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleDownload}
                aria-label="Download Constitution"
                title="Download Constitution"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition ${
                  downloadOpen
                    ? "bg-white/[0.06] text-white"
                    : "text-white/40 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Download size={15} />
              </button>

              {downloadOpen && (
                <div className="absolute right-0 z-30 mt-2 w-32 overflow-hidden rounded-xl border border-white/10 bg-[#111111] p-1.5 shadow-2xl shadow-black/50">
                  <a
                    href="/documents/TFA-Constitution-First-Edition.pdf"
                    download="TFA-Constitution-First-Edition.pdf"
                    onClick={() =>
                      setDownloadOpen(
                        false,
                      )
                    }
                    className="block rounded-lg px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    PDF
                  </a>

                  <a
                    href="/documents/TFA-Constitution-First-Edition.epub"
                    download="TFA-Constitution-First-Edition.epub"
                    onClick={() =>
                      setDownloadOpen(
                        false,
                      )
                    }
                    className="block rounded-lg px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    EPUB
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            SEARCH RESULTS
        ============================================================ */}

        {searching ? (
          <section className="mt-8">
            <div className="mb-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                Search Results
              </div>

              <div className="mt-1 text-xs text-white/35">
                {searchResults.length}{" "}
                {searchResults.length ===
                1
                  ? "result"
                  : "results"}{" "}
                for{" "}
                <span className="text-white/60">
                  &ldquo;
                  {query.trim()}
                  &rdquo;
                </span>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                {searchResults.map(
                  (result, index) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      className={`group block px-5 py-5 transition hover:bg-white/[0.035] ${
                        index !==
                        searchResults.length -
                          1
                          ? "border-b border-white/[0.07]"
                          : ""
                      }`}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                        {result.category}
                      </div>

                      <h2 className="mt-2 text-sm font-semibold text-white/75 transition group-hover:text-white">
                        {result.title}
                      </h2>

                      <p className="mt-2 max-w-4xl text-xs leading-6 text-white/35">
                        <HighlightedText
                          text={
                            result.context
                          }
                          query={query}
                        />
                      </p>
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.018] py-16 text-center">
                <div className="text-sm text-white/35">
                  No matching constitutional
                  content.
                </div>

                <div className="mt-2 text-xs text-white/20">
                  Try another search term.
                </div>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* ========================================================
                DOCUMENT GRID
            ======================================================== */}

            {viewMode === "grid" ? (
              <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {documents.map(
                  (document) => (
                    <Link
                      key={document.id}
                      href={document.href}
                      className="group relative flex min-h-[130px] items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] px-6 py-7 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#111111]"
                    >
                      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/[0.018] blur-2xl transition group-hover:bg-white/[0.035]" />

                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025]">
                        <BookOpen
                          size={18}
                          strokeWidth={1.5}
                          className="text-white/40 transition group-hover:text-white/70"
                        />
                      </div>

                      <div className="relative min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                          {document.type ===
                          "article"
                            ? "Article"
                            : "Constitutional Record"}
                        </div>

                        <h2 className="mt-2 text-sm font-semibold leading-6 text-white/70 transition group-hover:text-white">
                          {document.title}
                        </h2>
                      </div>
                    </Link>
                  ),
                )}
              </section>
            ) : (
              /* ========================================================
                 DOCUMENT LIST
              ======================================================== */

              <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                {documents.map(
                  (document, index) => (
                    <Link
                      key={document.id}
                      href={document.href}
                      className={`group flex items-center gap-4 px-5 py-5 transition hover:bg-white/[0.035] ${
                        index !==
                        documents.length -
                          1
                          ? "border-b border-white/[0.07]"
                          : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
                        <BookOpen
                          size={17}
                          strokeWidth={1.5}
                          className="text-white/40 group-hover:text-white/70"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-semibold text-white/70 transition group-hover:text-white">
                          {document.title}
                        </h2>
                      </div>

                      <span className="text-lg text-white/15 transition group-hover:translate-x-0.5 group-hover:text-white/50">
                        →
                      </span>
                    </Link>
                  ),
                )}
              </section>
            )}
          </>
        )}

        {/* ============================================================
            FOOTER
        ============================================================ */}

        <footer className="mt-16 flex flex-col gap-6 border-t border-white/[0.07] pt-6 text-[10px] uppercase tracking-[0.16em] text-white/20 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div>
              {constitutionMeta.edition}
            </div>

            <div>
              Adopted{" "}
              {constitutionMeta.adoptionDate}
            </div>
          </div>

          <div>
            TESL Football Association
          </div>
        </footer>
      </main>
    </div>
  );
}