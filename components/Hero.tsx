"use client";

import { useRef } from "react";

const WORDS = ["Websites", "and", "apps", "built", "to", "stand", "out."];
const GRADIENT_FROM = 5; // "stand out." gets the cyan to orange gradient

const CHIPS = ["End-to-end builds", "Web + mobile", "Remote-ready"];
const STACK = [
  "Next.js",
  "React Native",
  "Flutter",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
  "MongoDB",
  "Node.js",
];

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[calc(100svh-var(--hh))] flex-col justify-between overflow-hidden"
    >
      {/* Backgrounds */}
      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="hero-spot pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-center px-[var(--pad)] py-14 md:py-20">
        <p
          className="fade-up mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--line)] px-3.5 py-1.5 text-[.8rem] font-medium text-[var(--muted)] backdrop-blur"
          style={{ "--d": ".25s" } as React.CSSProperties}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cyan)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)]" />
          </span>
          Open to new projects
        </p>

        <h1 className="font-display max-w-[16ch] text-[clamp(2.7rem,9.5vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          {WORDS.map((w, i) => (
            <span key={w}>
              <span className="word">
                <span
                  className={i >= GRADIENT_FROM ? "grad-text" : ""}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {w}
                </span>
              </span>{" "}
            </span>
          ))}
        </h1>

        <p
          className="fade-up mt-7 max-w-xl text-[clamp(1rem,1.6vw,1.2rem)] text-[var(--muted)]"
          style={{ "--d": "1.1s" } as React.CSSProperties}
        >
          taachii designs and develops fast, SEO-ready websites and
          cross-platform mobile apps with Next.js, React Native and Flutter,
          from first idea to launch.
        </p>

        <div
          className="fade-up mt-9 flex flex-wrap items-center gap-3"
          style={{ "--d": "1.3s" } as React.CSSProperties}
        >
          <a
            href="#contact"
            className="cta cta-lg"
          >
            Start a project <Arrow />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-7 py-3.5 text-[1rem] font-medium transition hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
          >
            View projects
          </a>
        </div>

        <ul
          className="fade-up mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[.85rem] text-[var(--muted)]"
          style={{ "--d": "1.5s" } as React.CSSProperties}
        >
          {CHIPS.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--orange)]" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech marquee */}
      <div
        className="fade-up relative border-t border-[var(--line)] py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
        style={{ "--d": "1.7s" } as React.CSSProperties}
        aria-label="Technologies we use"
      >
        <div className="marquee">
          {[...STACK, ...STACK].map((t, i) => (
            <span
              key={i}
              className="font-display flex items-center gap-10 pr-10 text-lg font-medium tracking-tight text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              aria-hidden={i >= STACK.length}
            >
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
