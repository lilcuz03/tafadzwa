"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import Reveal from "@/components/Reveal";
import { posts, categories } from "@/lib/blog-data";

// Cursor glow inside a card (same behaviour as the Projects cards)
const onMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const list = featured.length > 0 ? rest : filtered;

  return (
    <main
      id="top"
      className="gutter relative pb-[clamp(4rem,10vw,9rem)] pt-[clamp(8rem,14vw,11rem)]"
    >
      {/* Heading */}
      <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr] md:gap-12">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--orange)" }}
            />
            Blog
          </p>
          <h1 className="font-display text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em]">
            Thoughts &amp; <span className="grad-text">insights.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-md text-[clamp(1rem,1.5vw,1.15rem)] t-muted">
            Writing about development, mobile apps, freelancing in South Africa,
            and the tech that powers modern products.
          </p>
        </Reveal>
      </div>

      {/* Filters + search */}
      <Reveal
        delay={0.1}
        className="mt-12 md:mt-16"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter posts by category"
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-[.85rem] font-medium transition-colors ${
                    active ? "" : "b-line t-muted"
                  }`}
                  style={
                    active
                      ? { borderColor: "var(--cyan)", color: "var(--cyan)" }
                      : undefined
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <label className="relative block w-full sm:w-64">
            <span className="sr-only">Search posts</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="b-line w-full rounded-full border bg-transparent py-2.5 pl-11 pr-4 text-[.9rem] outline-none transition-colors placeholder:opacity-50 focus:border-[var(--cyan)]"
            />
          </label>
        </div>
      </Reveal>

      {/* Featured */}
      {featured.length > 0 && (
        <section
          className="mt-10 md:mt-12"
          aria-label="Featured posts"
        >
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {featured.map((post, i) => (
              <Reveal
                key={post.slug}
                delay={i * 0.08}
                className="h-full"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  onMouseMove={onMove}
                  className="svc group flex h-full flex-col items-start gap-5 p-6 md:p-9"
                >
                  <div className="relative flex flex-wrap items-center gap-3">
                    <span
                      className="font-display text-sm font-medium"
                      style={{ color: "var(--cyan)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[.78rem] font-medium uppercase tracking-[.16em] t-muted">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border b-line px-3 py-1 text-[.75rem] font-medium t-muted">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--orange)" }}
                      />
                      Featured
                    </span>
                  </div>

                  <h2 className="relative font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
                    {post.title}
                  </h2>
                  <p className="relative max-w-[48ch] t-muted">
                    {post.excerpt}
                  </p>

                  <div className="relative mt-auto flex w-full items-center justify-between gap-4 pt-2">
                    <span className="text-[.85rem] t-muted">
                      {post.date} · {post.readTime}
                    </span>
                    <span
                      className="svc-link inline-flex items-center gap-2 text-[.95rem] font-semibold"
                      aria-hidden="true"
                    >
                      Read{" "}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* All posts */}
      <section
        className="mt-12 md:mt-16"
        aria-label={featured.length > 0 ? "All posts" : "Posts"}
      >
        {featured.length > 0 && list.length > 0 && (
          <Reveal>
            <p className="mb-2 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--orange)" }}
              />
              All posts
            </p>
          </Reveal>
        )}

        <p
          className="sr-only"
          role="status"
          aria-live="polite"
        >
          {filtered.length} {filtered.length === 1 ? "post" : "posts"} found
        </p>

        {filtered.length === 0 && (
          <Reveal>
            <div className="flex flex-col items-center py-16 text-center">
              <Search
                className="mb-4 h-8 w-8 opacity-40"
                aria-hidden="true"
              />
              <p className="font-display text-lg font-semibold">
                No posts found
              </p>
              <p className="mt-1 text-[.95rem] t-muted">
                Try a different category or search term.
              </p>
            </div>
          </Reveal>
        )}

        <div className="flex flex-col">
          {list.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={Math.min(i, 6) * 0.05}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group b-line flex items-start justify-between gap-5 border-b py-6 sm:items-center md:py-7"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-[.78rem] font-medium uppercase tracking-[.16em] t-muted">
                    <span style={{ color: "var(--cyan)" }}>
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-display text-[clamp(1.15rem,2vw,1.5rem)] font-semibold leading-snug tracking-[-0.03em]">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 max-w-[62ch] text-[.95rem] t-muted sm:line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden whitespace-nowrap text-[.85rem] t-muted sm:inline">
                    {post.readTime}
                  </span>
                  <span
                    className="b-line flex h-10 w-10 items-center justify-center rounded-full border transition-colors group-hover:border-[var(--cyan)] group-hover:text-[var(--cyan)]"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing nudge (matches the Projects section) */}
      <Reveal className="mt-10 md:mt-14">
        <div className="b-line flex flex-col items-start justify-between gap-5 rounded-3xl border p-7 sm:flex-row sm:items-center md:p-9">
          <div>
            <p className="font-display max-w-[28ch] text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
              Want to work together?
            </p>
            <p className="mt-1 t-muted">
              Always open to interesting projects and conversations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="btn-ghost"
            >
              See projects
            </Link>
            <Link
              href="/#contact"
              className="cta cta-lg"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
