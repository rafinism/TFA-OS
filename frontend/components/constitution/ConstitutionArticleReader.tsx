"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import PublicHeader from "@/components/public/PublicHeader";
import {
  constitutionArticles,
  constitutionClosingRecords,
  constitutionMeta,
} from "@/lib/constitution";

function highlightText(text: string, query: string) {
  const search = query.trim();

  if (!search) {
    return text;
  }

  const lowerText = text.toLowerCase();
  const lowerSearch = search.toLowerCase();

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const matchIndex = lowerText.indexOf(
      lowerSearch,
      currentIndex,
    );

    if (matchIndex === -1) {
      parts.push(text.slice(currentIndex));
      break;
    }

    if (matchIndex > currentIndex) {
      parts.push(
        text.slice(currentIndex, matchIndex),
      );
    }

    parts.push(
      <mark
        key={`search-${matchIndex}-${search}`}
        className="rounded bg-amber-300/60 px-0.5 text-amber-100"
      >
        {text.slice(
          matchIndex,
          matchIndex + search.length,
        )}
      </mark>,
    );

    currentIndex = matchIndex + search.length;
  }

  return parts;
}

export default function ConstitutionArticleReader({
  article,
}: {
  article: (typeof constitutionArticles)[number];
}) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] =
    useState("");
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  /*
   * Read navigation state from the URL.
   *
   * Example:
   *
   * /constitution/IX?section=section-4&search=player
   */
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const sectionId = params.get("section");
    const searchTerm = params.get("search");

    if (searchTerm) {
      setQuery(searchTerm);
      setSearchOpen(true);
    } else {
      setQuery("");
    }

    if (sectionId) {
      setActiveSection(sectionId);
    } else {
      setActiveSection("");
    }

    /*
     * Give React time to render the article and
     * its <mark> elements before scrolling.
     */
    const timer = window.setTimeout(() => {
      if (!sectionId) {
        return;
      }

      const sectionElement =
        document.getElementById(sectionId);

      if (!sectionElement) {
        return;
      }

      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      /*
       * If this navigation came from a Constitution-wide
       * search result, find the first matching word in
       * the selected section and bring it into view.
       */
      if (searchTerm) {
        window.setTimeout(() => {
          const firstMatch =
            sectionElement.querySelector("mark");

          if (firstMatch) {
            firstMatch.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 450);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [article]);

  /*
   * Update the article search term while keeping
   * the current section.
   */
  function handleSearchChange(value: string) {
    setQuery(value);

    const params = new URLSearchParams(
      window.location.search,
    );

    const trimmed = value.trim();

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();

    window.history.replaceState(
      {},
      "",
      `/constitution/${article.number}${
        queryString ? `?${queryString}` : ""
      }`,
    );
  }

  /*
   * Navigate to a section from the sidebar.
   *
   * If a search is currently active, preserve it.
   */
  function goToSection(sectionId: string) {
    setActiveSection(sectionId);

    const params = new URLSearchParams();

    params.set("section", sectionId);

    if (query.trim()) {
      params.set("search", query.trim());
    }

    const queryString = params.toString();

    window.history.replaceState(
      {},
      "",
      `/constitution/${article.number}?${queryString}`,
    );

    window.setTimeout(() => {
      const sectionElement =
        document.getElementById(sectionId);

      if (!sectionElement) {
        return;
      }

      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      /*
       * If a search is active, move to the first
       * highlighted match in this section.
       */
      if (query.trim()) {
        window.setTimeout(() => {
          const firstMatch =
            sectionElement.querySelector("mark");

          if (firstMatch) {
            firstMatch.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 450);
      }
    }, 30);
  }

  /*
   * Close article search.
   */
  function closeSearch() {
    setSearchOpen(false);
    setQuery("");

    const params = new URLSearchParams(
      window.location.search,
    );

    params.delete("search");

    const queryString = params.toString();

    window.history.replaceState(
      {},
      "",
      `/constitution/${article.number}${
        queryString ? `?${queryString}` : ""
      }`,
    );
  }

  /*
   * Copy complete article.
   */
  async function copyArticle() {
    try {
      const text = [
        `Article ${article.number} — ${article.title}`,
        "",
        ...article.sections.flatMap((section) => [
          `Section ${section.number} — ${section.title}`,
          "",
          ...section.paragraphs,
          "",
        ]),
      ].join("\n");

      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* ============================================================
          SITE HEADER
      ============================================================ */}
      <div className="sticky top-0 z-[100]">
        <PublicHeader />
      </div>

      {/* ============================================================
          SIDEBAR
      ============================================================ */}
      <aside
        className={`fixed left-0 top-16 z-50 hidden h-[calc(100vh-4rem)] w-[280px] border-r border-white/10 bg-[#080808] transition-transform duration-200 lg:block ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div
          className="flex h-full flex-col overflow-y-auto overscroll-contain"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Sidebar header */}
          <div className="shrink-0 border-b border-white/10 px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/constitution"
                className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white"
              >
                <ArrowLeft size={14} />
                <span>Constitution</span>
              </Link>

              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(false)
                }
                aria-label="Close section navigation"
                title="Close section navigation"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/35 transition hover:bg-white/[0.05] hover:text-white/80"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Article {article.number}
            </div>

            <div className="mt-1 text-xs text-white/35">
              {article.title}
            </div>
          </div>

          {/* Section list */}
          <nav className="flex-1 px-3 py-3">
            <div className="space-y-1">
              {article.sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    goToSection(section.id)
                  }
                  className={`block w-full rounded-lg px-3 py-2.5 text-left transition ${
                    activeSection === section.id
                      ? "bg-amber-300/10 text-amber-200"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                  }`}
                >
                  <div className="text-xs font-medium">
                    Section {section.number}
                  </div>

                  <div
                    className={`mt-0.5 truncate text-[10px] ${
                      activeSection === section.id
                        ? "text-amber-200/50"
                        : "text-white/25"
                    }`}
                  >
                    {section.title}
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* ============================================================
          OPEN SIDEBAR BUTTON
      ============================================================ */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open section navigation"
          title="Open section navigation"
          className="fixed left-4 top-20 z-50 hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d0d] text-white/45 shadow-lg transition hover:bg-white/[0.05] hover:text-white lg:flex"
        >
          <Menu size={16} />
        </button>
      )}

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <main className="px-5 py-7 sm:px-6 lg:px-8 lg:py-10">
        <div
          className={`mx-auto transition-all duration-200 ${
            sidebarOpen
              ? "max-w-[1500px] lg:pl-[312px]"
              : "max-w-[1050px]"
          }`}
        >
          <article className="min-w-0">
            {/* ========================================================
                ARTICLE HEADER
            ======================================================== */}
            <header className="border-b border-white/10 pb-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                {constitutionMeta.edition}
              </div>

              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Article {article.number}
                  </h1>

                  <h2 className="mt-2 text-lg text-white/50">
                    {highlightText(
                      article.title,
                      query,
                    )}
                  </h2>
                </div>

                {/* Article actions */}
                <div className="flex shrink-0 items-center gap-2">
                  {/* Search */}
                  <div className="flex items-center">
                    {searchOpen && (
                      <input
                        autoFocus
                        type="search"
                        value={query}
                        onChange={(event) =>
                          handleSearchChange(
                            event.target.value,
                          )
                        }
                        placeholder="Search..."
                        className="mr-2 w-36 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white outline-none placeholder:text-white/25 focus:border-white/20"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (searchOpen) {
                          closeSearch();
                        } else {
                          setSearchOpen(true);
                        }
                      }}
                      aria-label="Search article"
                      title="Search article"
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] transition ${
                        searchOpen
                          ? "text-white/75"
                          : "text-white/40 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {searchOpen ? (
                        <X size={15} />
                      ) : (
                        <Search size={15} />
                      )}
                    </button>
                  </div>

                  {/* Copy */}
                  <button
                    type="button"
                    onClick={copyArticle}
                    aria-label="Copy entire article"
                    title="Copy entire article"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/40 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    {copied ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>
              </div>
            </header>

            {/* ========================================================
                ALL ARTICLE SECTIONS
                SEARCH NEVER HIDES SECTIONS.
            ======================================================== */}
            <div className="divide-y divide-white/[0.07]">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 py-9 first:pt-8"
                >
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Section {section.number}
                    </div>

                    <h3 className="mt-1 text-xl font-semibold text-white/90">
                      {highlightText(
                        section.title,
                        query,
                      )}
                    </h3>
                  </div>

                  <div className="mt-6 max-w-4xl space-y-4 text-[14px] leading-7 text-white/62 selection:bg-white/15 selection:text-white">
                    {section.paragraphs.map(
                      (paragraph, index) => (
                        <p
                          key={`${section.id}-${index}`}
                          className="whitespace-pre-wrap"
                        >
                          {highlightText(
                            paragraph,
                            query,
                          )}
                        </p>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* ========================================================
                DISCUSSION
            ======================================================== */}
            <section className="border-t border-white/10 py-10">
              <div className="rounded-xl border border-white/10 bg-white/[0.018] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                  Discussion
                </div>

                <p className="mt-2 text-xs text-white/25">
                  Sign in to comment on this article.
                </p>
              </div>
            </section>

            {/* ========================================================
                CONSTITUTIONAL RECORDS
            ======================================================== */}
            {article.number === "XIII" &&
              constitutionClosingRecords.length >
                0 && (
                <section className="border-t border-white/10 py-10">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Constitutional Records
                  </div>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-white/55">
                    {constitutionClosingRecords.map(
                      (record) => (
                        <div
                          key={record.title}
                          className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                        >
                          <div className="font-semibold text-white/75">
                            {highlightText(
                              record.title,
                              query,
                            )}
                          </div>

                          <div className="mt-3 space-y-3 whitespace-pre-wrap">
                            {record.paragraphs.map(
                              (paragraph, index) => (
                                <p
                                  key={`${record.title}-${index}`}
                                >
                                  {highlightText(
                                    paragraph,
                                    query,
                                  )}
                                </p>
                              ),
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </section>
              )}
          </article>
        </div>
      </main>
    </div>
  );
}