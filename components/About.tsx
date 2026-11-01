"use client";

import Image from "next/image";
import Reveal from "./Reveal";

// Add your photo to /public and set the path here, e.g. "/me.jpg". Leave undefined to show the monogram.
const PHOTO: string | undefined = undefined;

const PRINCIPLES = [
  {
    title: "End-to-end builder",
    desc: "Design, frontend, backend and deployment from one person, so nothing gets lost in a handover.",
  },
  {
    title: "Detail obsessed",
    desc: "Spacing, motion and edge cases get the same care as the headline features.",
  },
  {
    title: "Fast shipper",
    desc: "Short feedback loops and working builds early, instead of one big reveal months later.",
  },
  {
    title: "Remote-ready",
    desc: "Based in Durban and set up to work smoothly with clients anywhere in the world.",
  },
];

const STEPS = [
  {
    title: "Discover",
    desc: "We talk through your goals, audience and budget, then agree on scope and timeline.",
  },
  {
    title: "Design",
    desc: "A clean layout and visual direction, shared early so there are no surprises.",
  },
  {
    title: "Build",
    desc: "Fast, accessible, SEO-ready code with regular progress updates along the way.",
  },
  {
    title: "Launch & support",
    desc: "Deployment, testing on real devices and ongoing support after go-live.",
  },
];

const WhatsApp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.3-1.4A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 12.04 3.8zM8.6 7.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.6-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.8-.4-1.6-.9-2.3-1.6-.5-.6-1-1.3-1.2-1.7-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
  </svg>
);

// Cursor glow inside a card (sets CSS variables directly, no state)
const onMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

export default function About() {
  return (
    <section
      id="about"
      className="gutter relative py-[clamp(4rem,10vw,9rem)]"
    >
      {/* Heading */}
      <Reveal>
        <p className="mb-5 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--orange)" }}
          />
          About
        </p>
        <h2 className="font-display max-w-[18ch] text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em]">
          The person behind <span className="grad-text">taachii.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        {/* Profile card */}
        <Reveal>
          <aside className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--hh)+2rem)]">
            <div className="avatar">
              {PHOTO ? (
                <Image
                  src={PHOTO}
                  alt="Tafadzwa Chiripanyanga"
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover"
                  priority={false}
                />
              ) : (
                <span
                  className="avatar-mono grad-text"
                  aria-hidden="true"
                >
                  TC
                </span>
              )}
            </div>

            <div>
              <p className="font-display text-2xl font-semibold tracking-[-0.03em]">
                Tafadzwa Chiripanyanga
              </p>
              <p className="t-muted">Founder &amp; fullstack developer</p>
            </div>

            <p className="inline-flex w-fit items-center gap-2.5 rounded-full border b-line px-3.5 py-1.5 text-[.8rem] font-medium t-muted">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ background: "var(--cyan)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--cyan)" }}
                />
              </span>
              Durban, South Africa · Remote
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/27813532248"
                target="_blank"
                rel="noopener noreferrer"
                className="cta"
              >
                <WhatsApp /> Message on WhatsApp
              </a>
              <a
                href="mailto:tafadzwachiri03@outlook.com"
                className="btn-ghost"
              >
                Email me
              </a>
            </div>
          </aside>
        </Reveal>

        {/* Story */}
        <div className="flex flex-col gap-12 md:gap-16">
          <Reveal delay={0.08}>
            <blockquote className="font-display text-[clamp(1.6rem,3.6vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              <span className="grad-text">
                “Think three moves ahead, play the long game, and never stop
                improving.”
              </span>
            </blockquote>

            <div className="mt-8 grid max-w-[62ch] gap-5 text-[clamp(1rem,1.4vw,1.1rem)] t-muted">
              <p>
                taachii is the studio of Tafadzwa Chiripanyanga, a Zimbabwean
                fullstack developer based in Durban, South Africa. I build
                mobile apps, web platforms and the backend that powers them, end
                to end, with clean code, sharp design and software that actually
                works.
              </p>
              <p>
                Away from the keyboard you will find me at the chess board or on
                the football pitch. Both taught me the same thing: preparation
                and patience win.
              </p>
            </div>
          </Reveal>

          {/* Principles */}
          <div>
            <Reveal>
              <h3 className="font-display mb-6 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em]">
                How I work
              </h3>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={(i % 2) * 0.1}
                >
                  <article
                    className="svc flex h-full flex-col gap-3 p-6"
                    onMouseMove={onMove}
                  >
                    <span
                      className="font-display text-sm font-medium"
                      style={{ color: "var(--cyan)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-display relative text-xl font-semibold tracking-[-0.025em]">
                      {p.title}
                    </h4>
                    <p className="relative text-[.95rem] t-muted">{p.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h3 className="font-display mb-8 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em]">
            How a project runs
          </h3>
        </Reveal>
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.1}>
                <div className="step pt-5">
                  <span
                    className="font-display text-sm font-medium"
                    style={{ color: "var(--cyan)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display mt-2 text-xl font-semibold tracking-[-0.025em]">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-[.95rem] t-muted">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
