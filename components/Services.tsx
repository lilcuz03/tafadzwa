"use client";

import Reveal from "./Reveal";

const icon = (children: React.ReactNode) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const SERVICES = [
  {
    title: "Mobile apps",
    desc: "Cross-platform iOS and Android apps with React Native and Flutter. One codebase, a native feel, and ready for both app stores.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    icon: icon(
      <>
        <rect
          x="7"
          y="2"
          width="10"
          height="20"
          rx="2.5"
        />
        <path d="M11 18h2" />
      </>,
    ),
  },
  {
    title: "Websites & web apps",
    desc: "Fast, SEO-ready websites and platforms built with Next.js and Tailwind. Made to be found on Google and to turn visitors into clients.",
    tags: ["Next.js", "React", "Tailwind", "SEO"],
    icon: icon(
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </>,
    ),
  },
  {
    title: "Backend & APIs",
    desc: "Clean data architecture and secure APIs on Supabase, MongoDB and Node.js, built so your product can grow without a rewrite.",
    tags: ["Supabase", "MongoDB", "Node.js", "REST"],
    icon: icon(
      <>
        <ellipse
          cx="12"
          cy="5"
          rx="8"
          ry="3"
        />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>,
    ),
  },
  {
    title: "UI / UX engineering",
    desc: "Interfaces that feel precise. Pixel-perfect, accessible and fast, with motion that adds polish without slowing anything down.",
    tags: ["Figma", "Design systems", "Animation"],
    icon: icon(
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
        />
        <path d="M3 9h18M9 21V9" />
      </>,
    ),
  },
];

const Arrow = () => (
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
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Moves the glow inside a card to follow the cursor (sets CSS variables directly, no state)
const onMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

export default function Services() {
  return (
    <section
      id="services"
      className="gutter relative py-[clamp(4rem,10vw,9rem)]"
    >
      {/* Heading */}
      <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr] md:gap-12">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--orange)" }}
            />
            Services
          </p>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em]">
            Everything you need to go from{" "}
            <span className="grad-text">idea to launch.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-md text-[clamp(1rem,1.5vw,1.15rem)] t-muted">
            Web, mobile and the backend that powers them, handled end to end by
            one partner so nothing gets lost between teams.
          </p>
        </Reveal>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.title}
            delay={(i % 2) * 0.1}
          >
            <article
              className="svc flex h-full flex-col gap-6 p-7 md:p-9"
              onMouseMove={onMove}
            >
              <div className="flex items-start justify-between">
                <span className="svc-icon">{s.icon}</span>
                <span
                  className="font-display text-sm font-medium tracking-wide"
                  style={{ color: "var(--cyan)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative">
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[46ch] t-muted">{s.desc}</p>
              </div>

              <ul className="relative flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border b-line px-3 py-1 text-[.78rem] font-medium t-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="svc-link relative mt-auto inline-flex w-fit items-center gap-2 pt-2 text-[.92rem] font-semibold"
              >
                Discuss this service <Arrow />
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Closing nudge */}
      <Reveal className="mt-10 md:mt-14">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border b-line p-7 sm:flex-row sm:items-center md:p-9">
          <p className="font-display max-w-[28ch] text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
            Not sure what you need? Tell me about your idea.
          </p>
          <a
            href="#contact"
            className="cta cta-lg"
          >
            Start a project <Arrow />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
