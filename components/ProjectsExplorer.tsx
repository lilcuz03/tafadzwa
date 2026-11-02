"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import {
  CATEGORY_LABELS,
  PROJECTS,
  STATUS,
  type ProjectCategory,
} from "@/lib/projects";

type Filter = "all" | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((id) => ({
    id,
    label: CATEGORY_LABELS[id],
  })),
];

const ArrowUpRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

// Cursor glow inside a card (sets CSS variables directly, no state)
const onMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const countOf = (id: Filter) =>
    id === "all"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.category === id).length;

  return (
    <section
      aria-label="Project list"
      className="gutter relative pb-[clamp(3rem,8vw,7rem)]"
    >
      <div
        role="group"
        aria-label="Filter projects"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className="chip"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="ml-2 opacity-70">{countOf(f.id)}</span>
          </button>
        ))}
      </div>
      <p
        className="sr-only"
        aria-live="polite"
      >
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      <div
        key={filter}
        className="mt-8 grid gap-5 md:grid-cols-2"
      >
        {shown.map((p, i) => {
          const status = STATUS[p.status];
          return (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 0.08}
              className="h-full"
            >
              <article
                className="svc flex h-full flex-col"
                onMouseMove={onMove}
              >
                {/* Cover */}
                <div
                  className="cover"
                  style={{ "--accent": p.accent } as React.CSSProperties}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.name} website screenshot`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <>
                      <div
                        className="cover-bar"
                        aria-hidden="true"
                      >
                        <i />
                        <i />
                        <i />
                        <span>{p.display ?? "private system"}</span>
                      </div>
                      <div
                        className="cover-body"
                        aria-hidden="true"
                      >
                        <span className="cover-name">{p.name}</span>
                        <span className="cover-sector">{p.sector}</span>
                      </div>
                    </>
                  )}
                  <span className="status-chip">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: status.color }}
                    />
                    {status.label}
                  </span>
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col gap-4 p-6 md:p-7">
                  <p className="text-[.75rem] font-medium uppercase tracking-[.16em] t-muted">
                    <span style={{ color: "var(--cyan)" }}>
                      {String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}
                    </span>{" "}
                    · {CATEGORY_LABELS[p.category]} · {p.sector}
                  </p>
                  <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                    {p.name}
                  </h2>
                  <p className="t-muted">{p.summary}</p>

                  <details className="proj-details">
                    <summary>What’s included</summary>
                    <ul className="mt-3 grid gap-2 text-[.92rem]">
                      {p.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex gap-3"
                        >
                          <span
                            className="mt-[.55rem] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--cyan)" }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border b-line px-3 py-1 text-[.76rem] font-medium t-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${p.name} (opens in a new tab)`}
                      className="svc-link mt-auto inline-flex w-fit items-center gap-2 pt-1 text-[.95rem] font-semibold"
                    >
                      Visit {p.display} <ArrowUpRight />
                    </a>
                  ) : (
                    <span className="mt-auto pt-1 text-[.85rem] t-muted">
                      Private system. Walkthrough on request.
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
