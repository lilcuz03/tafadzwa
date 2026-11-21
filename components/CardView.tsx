"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  UserPlus,
} from "lucide-react";
import { CARD, CARD_URL } from "@/lib/card-data";

// Brand icons are inline SVG (lucide has dropped brand logos)
function BrandIcon({ id }: { id: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {id === "instagram" && (
        <>
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
            cx="17.5"
            cy="6.5"
            r=".6"
            fill="currentColor"
          />
        </>
      )}
      {id === "github" && (
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      )}
      {id === "facebook" && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      )}
      {id === "whatsapp" && (
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      )}
    </svg>
  );
}

const stagger = (i: number): React.CSSProperties =>
  ({ "--i": i }) as React.CSSProperties;

const motionOk = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CardView() {
  const [copied, setCopied] = useState(false);

  // Cursor glow + gentle 3D tilt (mouse only, off for reduced motion)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - r.left}px`);
    el.style.setProperty("--cy", `${e.clientY - r.top}px`);
    if (motionOk()) {
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${x * 7}deg`);
      el.style.setProperty("--rx", `${-y * 7}deg`);
    }
  };
  const onLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${CARD.name} | ${CARD.brand}`,
          text: "My digital business card",
          url: CARD_URL,
        });
        return;
      }
      await navigator.clipboard.writeText(CARD_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet */
    }
  };

  const waHref = `https://wa.me/${CARD.phone.replace("+", "")}?text=${encodeURIComponent(CARD.whatsappText)}`;

  return (
    <main className="dc-stage">
      <div
        className="dc-blob dc-blob--a"
        aria-hidden="true"
      />
      <div
        className="dc-blob dc-blob--b"
        aria-hidden="true"
      />
      <div
        className="dc-grid"
        aria-hidden="true"
      />

      <section
        aria-label="Digital business card"
        className="dc-card"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <button
          type="button"
          onClick={share}
          className="dc-share"
          aria-label="Share this card"
        >
          <Share2
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>
        <span
          className="sr-only"
          role="status"
          aria-live="polite"
        >
          {copied ? "Link copied" : ""}
        </span>

        {/* Identity */}
        <header
          className="dc-in text-center"
          style={stagger(0)}
        >
          <div className="dc-avatar">
            <span className="dc-avatar-inner font-display">
              {CARD.initials}
            </span>
            <span
              className="dc-status"
              aria-hidden="true"
            />
          </div>

          <p className="grad-text font-display mt-5 text-xl font-semibold tracking-[-0.03em]">
            {CARD.brand}.
          </p>
          <h1 className="font-display mt-1 text-[clamp(1.6rem,6vw,2rem)] font-semibold leading-tight tracking-[-0.04em]">
            {CARD.name}
          </h1>
          <p className="t-muted mt-1">{CARD.role}</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="dc-chip t-muted">
              <MapPin
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              {CARD.locationShort}
            </span>
            <span className="dc-chip t-muted">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#22c55e" }}
              />
              Open to new projects
            </span>
          </div>
        </header>

        {/* Save contact */}
        <div
          className="dc-in mt-7"
          style={stagger(1)}
        >
          <a
            href="/card/contact.vcf"
            download
            className="cta cta-lg dc-wide dc-shine"
          >
            <UserPlus
              className="h-[1.1rem] w-[1.1rem]"
              aria-hidden="true"
            />
            Save my contact
          </a>
          <p className="t-muted mt-2 text-center text-[.8rem]">
            Add me to your phone in one tap
          </p>
        </div>

        {/* Quick actions */}
        <div
          className="dc-in mt-6 grid grid-cols-3 gap-3"
          style={stagger(2)}
        >
          <a
            href={`tel:${CARD.phone}`}
            className="dc-tile"
            aria-label={`Call ${CARD.phoneDisplay}`}
          >
            <span className="dc-ic">
              <Phone
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
            Call
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="dc-tile"
            aria-label="Message on WhatsApp (opens in a new tab)"
          >
            <span className="dc-ic">
              <BrandIcon id="whatsapp" />
            </span>
            WhatsApp
          </a>
          <a
            href={`mailto:${CARD.email}`}
            className="dc-tile"
            aria-label={`Email ${CARD.email}`}
          >
            <span className="dc-ic">
              <Mail
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
            Email
          </a>
        </div>

        {/* Socials */}
        <ul className="mt-6 grid gap-3">
          {CARD.socials.map((s, i) => (
            <li
              key={s.id}
              className="dc-in"
              style={stagger(3 + i)}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dc-row"
                aria-label={`${s.label}, ${s.handle} (opens in a new tab)`}
              >
                <span className="dc-ic">
                  <BrandIcon id={s.id} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[.95rem] font-semibold leading-tight">
                    {s.label}
                  </span>
                  <span className="t-muted block truncate text-[.82rem]">
                    {s.handle}
                  </span>
                </span>
                <ArrowUpRight
                  className="dc-arrow h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Website */}
        <div
          className="dc-in mt-6"
          style={stagger(3 + CARD.socials.length)}
        >
          <a
            href={CARD.site}
            className="btn-ghost dc-wide"
          >
            <Globe
              className="h-[1.1rem] w-[1.1rem]"
              aria-hidden="true"
            />
            View my website
            <ArrowUpRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
          <p className="t-muted mt-2 text-center text-[.8rem]">
            {CARD.siteDisplay}
          </p>
        </div>

        <p
          className="t-muted dc-in mt-6 text-center text-[.75rem]"
          style={stagger(4 + CARD.socials.length)}
        >
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          {CARD.brand}
        </p>
      </section>
    </main>
  );
}
