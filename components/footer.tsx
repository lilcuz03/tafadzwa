import Link from "next/link";
import Reveal from "./Reveal";

const EMAIL = "tafadzwachiri03@outlook.com";
const PHONE = "+27 81 353 2248";
const WHATSAPP = "https://wa.me/27813532248";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
  { label: "Blog", href: "/blog" },
  { label: "Craft", href: "/Craft" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

const svg = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Arrow = () => (
  <svg
    {...svg}
    width={16}
    height={16}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/lilcuz03",
    icon: (
      <svg {...svg}>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: WHATSAPP,
    icon: (
      <svg
        {...svg}
        fill="currentColor"
        stroke="none"
      >
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.3-1.4A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 12.04 3.8zM8.6 7.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.6-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.8-.4-1.6-.9-2.3-1.6-.5-.6-1-1.3-1.2-1.7-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_tafadzwa_03",
    icon: (
      <svg {...svg}>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
        />
        <circle
          cx="17.2"
          cy="6.8"
          r=".6"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tafadzwa.chiripanyanga.87727",
    icon: (
      <svg {...svg}>
        <path d="M14 8h2.5V4.5H14a4 4 0 0 0-4 4V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8A.8.8 0 0 1 14 8z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="foot gutter">
      {/* Ambient layers, same language as the hero */}
      <div
        className="hero-grid foot-grid"
        aria-hidden="true"
      />
      <span
        className="foot-orb a"
        aria-hidden="true"
      />
      <span
        className="foot-orb b"
        aria-hidden="true"
      />

      <div className="relative">
        {/* CTA band */}
        <Reveal>
          <div className="foot-cta">
            <div>
              <p className="mb-4 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
                <span className="foot-dot" />
                Open to new projects
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                Have an idea?{" "}
                <span className="grad-text">Let’s make it real.</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="cta cta-lg"
              >
                Start a project <Arrow />
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-ghost"
              >
                Email me
              </a>
            </div>
          </div>
        </Reveal>

        {/* Link columns */}
        <Reveal delay={0.1}>
          <div className="grid gap-12 border-t b-line py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">
            <div>
              <Link
                href="/"
                className="font-display text-[1.9rem] font-semibold tracking-[-0.05em]"
              >
                taachii<span style={{ color: "var(--orange)" }}>.</span>
              </Link>
              <p className="mt-4 max-w-[36ch] text-[.95rem] t-muted">
                A Durban studio building mobile apps, web platforms and content
                that ship fast and last.
              </p>
            </div>

            <nav aria-label="Footer">
              <h3 className="foot-h">Explore</h3>
              <ul className="grid gap-3">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <Link
                      href={n.href}
                      className="foot-link"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="foot-h">Contact</h3>
              <ul className="grid gap-3">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="foot-link break-all"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foot-link"
                  >
                    {PHONE}
                  </a>
                </li>
                <li className="text-[.95rem] t-muted">Durban · Remote</li>
              </ul>
            </div>

            <div>
              <h3 className="foot-h">Follow</h3>
              <ul className="flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="foot-social"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t b-line py-6 text-[.82rem] t-muted sm:flex-row sm:items-center">
          <a
            href="#top"
            className="foot-link inline-flex items-center gap-2"
          >
            Back to top
            <svg
              {...svg}
              width={14}
              height={14}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>

        {/* Giant wordmark */}
        <p
          className="foot-wordmark font-display"
          aria-hidden="true"
        >
          taachii
        </p>
      </div>
    </footer>
  );
}
