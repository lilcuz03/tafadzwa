"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

type Project = {
  name: string;
  category: string;
  url: string;
  display: string;
  desc: string;
  points: string[];
  tags: string[];
  status: { label: string; live: boolean };
  variant: "shop" | "clinic";
  image?: string; // optional real screenshot in /public, e.g. "/projects/offline-house.png"
};

const PROJECTS: Project[] = [
  {
    name: "Offline House",
    category: "E-commerce",
    url: "https://www.offlinehouse.co.za/",
    display: "offlinehouse.co.za",
    desc: "An online store for top-selling tech, home and everyday essentials, with a mega menu, instant search, wishlist, bag and order tracking, all priced in rand.",
    points: [
      "Full storefront with collections, filters and best-seller sorting",
      "Search with a keyboard shortcut, wishlist and shopping bag",
      "Delivery, returns and order-tracking pages built in",
    ],
    tags: ["Next.js", "E-commerce", "SEO", "Responsive"],
    status: { label: "Opening soon", live: false },
    variant: "shop",
  },
  {
    name: "Devine Medical Group",
    category: "Healthcare website",
    url: "https://www.devinemedicalgroup.co.zw/",
    display: "devinemedicalgroup.co.zw",
    desc: "A website for a hospital, nursing home and rehabilitation centre in Mt Darwin, Zimbabwe, built to be found locally and to let patients reach the team in one tap.",
    points: [
      "Clear pages for the hospital, nursing home and rehabilitation centre",
      "Contact form that sends by email or straight to WhatsApp",
      "Emergency details, FAQ and Google Maps directions",
    ],
    tags: ["Next.js", "Local SEO", "WhatsApp", "Responsive"],
    status: { label: "Live", live: true },
    variant: "clinic",
  },
];

const fs = (n: number): React.CSSProperties => ({ fontSize: `${n}cqw` });

function ShopMock() {
  return (
    <div
      className="flex h-full flex-col text-[#1c1c1a]"
      style={{ background: "#f8f7f2" }}
    >
      <div
        className="py-[1.2cqw] text-center tracking-wide text-[#f8f7f2]"
        style={{ ...fs(2.4), background: "#1c1c1a" }}
      >
        Free delivery on orders over R600
      </div>
      <div
        className="flex items-center justify-between px-[4cqw] py-[2.4cqw]"
        style={fs(2.8)}
      >
        <b style={fs(3.6)}>Offline House</b>
        <span className="flex gap-[3cqw] opacity-60">
          <span>Tech</span>
          <span>Home</span>
          <span>Living</span>
          <span>Beauty</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-[2cqw] px-[4cqw] text-center">
        <span
          className="uppercase tracking-[.2em] opacity-60"
          style={fs(2.2)}
        >
          Disconnect to reconnect.
        </span>
        <span
          className="font-semibold leading-none tracking-tight"
          style={fs(11)}
        >
          Opening soon.
        </span>
        <span
          className="mt-[1cqw] flex w-[70%] items-center justify-between rounded-full border border-[#1c1c1a]/20 bg-white py-[1cqw] pl-[3cqw] pr-[1cqw]"
          style={fs(2.4)}
        >
          <span className="opacity-50">Email address</span>
          <span
            className="rounded-full px-[3cqw] py-[1.2cqw] text-[#f8f7f2]"
            style={{ background: "#1c1c1a" }}
          >
            Notify me
          </span>
        </span>
      </div>
    </div>
  );
}

function ClinicMock() {
  const stats = [
    ["2010", "Since"],
    ["23", "Hospital beds"],
    ["40", "Nursing beds"],
    ["24/7", "Emergency"],
  ];
  return (
    <div className="flex h-full flex-col bg-white text-[#10302c]">
      <div
        className="flex items-center justify-between px-[4cqw] py-[2.2cqw]"
        style={fs(2.6)}
      >
        <b style={fs(3.2)}>Devine Medical Group</b>
        <span className="flex items-center gap-[3cqw] opacity-70">
          <span>About</span>
          <span>Facilities</span>
          <span>Contact</span>
        </span>
      </div>
      <div
        className="flex flex-1 flex-col justify-center gap-[2cqw] px-[4cqw] text-white"
        style={{ background: "linear-gradient(135deg,#0f766e,#134e4a)" }}
      >
        <span
          className="uppercase tracking-[.2em] opacity-70"
          style={fs(2.2)}
        >
          Mt Darwin, Zimbabwe
        </span>
        <span
          className="max-w-[80%] font-semibold leading-[1.05] tracking-tight"
          style={fs(6.6)}
        >
          Delivering compassionate &amp; excellent healthcare
        </span>
        <div className="mt-[1.5cqw] grid grid-cols-4 gap-[2cqw]">
          {stats.map(([v, l]) => (
            <span
              key={l}
              className="flex flex-col rounded-[1.2cqw] bg-white/10 px-[2cqw] py-[1.4cqw]"
              style={fs(2.1)}
            >
              <b style={fs(4)}>{v}</b>
              <span className="opacity-70">{l}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const Check = () => (
  <svg
    className="mt-[.28rem] shrink-0"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--cyan)" }}
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

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

// Cursor glow inside a card (sets CSS variables directly, no state)
const onMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

// Gentle 3D tilt on the browser mockup
const tilt = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ry", `${x * 8}deg`);
  el.style.setProperty("--rx", `${-y * 8}deg`);
};
const untilt = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--ry", "0deg");
  e.currentTarget.style.setProperty("--rx", "0deg");
};

export default function Projects() {
  return (
    <section
      id="projects"
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
            Projects
          </p>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em]">
            Recent work, <span className="grad-text">built to ship.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-md text-[clamp(1rem,1.5vw,1.15rem)] t-muted">
            From an online store to a healthcare website. Each one is fast,
            responsive and ready to be found.
          </p>
        </Reveal>
      </div>

      {/* Project cards */}
      <div className="mt-12 flex flex-col gap-5 md:mt-16 md:gap-6">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name}>
            <article
              className="svc grid gap-8 p-5 md:grid-cols-2 md:items-center md:gap-14 md:p-10 lg:p-12"
              onMouseMove={onMove}
            >
              {/* Text */}
              <div className="relative flex flex-col items-start gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="font-display text-sm font-medium"
                    style={{ color: "var(--cyan)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[.78rem] font-medium uppercase tracking-[.16em] t-muted">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border b-line px-3 py-1 text-[.75rem] font-medium t-muted">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: p.status.live ? "#22c55e" : "var(--orange)",
                      }}
                    />
                    {p.status.label}
                  </span>
                </div>

                <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                  {p.name}
                </h3>
                <p className="max-w-[48ch] t-muted">{p.desc}</p>

                <ul className="grid gap-2.5 text-[.95rem]">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3"
                    >
                      <Check />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border b-line px-3 py-1 text-[.78rem] font-medium t-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${p.name} (opens in a new tab)`}
                  className="svc-link inline-flex w-fit items-center gap-2 pt-1 text-[.95rem] font-semibold"
                >
                  Visit {p.display} <ArrowUpRight />
                </a>
              </div>

              {/* Browser mockup */}
              <div
                className={`relative ${i % 2 ? "md:order-first" : ""}`}
                onMouseMove={tilt}
                onMouseLeave={untilt}
              >
                <div className="proj-mock">
                  <div className="frame">
                    <div
                      className="frame-bar"
                      aria-hidden="true"
                    >
                      <i />
                      <i />
                      <i />
                      <span>{p.display}</span>
                    </div>
                    <div className="frame-body">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={`${p.name} website screenshot`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top"
                        />
                      ) : p.variant === "shop" ? (
                        <ShopMock />
                      ) : (
                        <ClinicMock />
                      )}
                    </div>
                  </div>
                  <span
                    className="float-chip"
                    aria-hidden="true"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: p.status.live ? "#22c55e" : "var(--orange)",
                      }}
                    />
                    {p.status.live ? "Live site" : "Launching soon"}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Closing nudge */}
      <Reveal className="mt-10 md:mt-14">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border b-line p-7 sm:flex-row sm:items-center md:p-9">
          <p className="font-display max-w-[28ch] text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
            Your project could be next.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/Projects"
              className="btn-ghost"
            >
              See all projects
            </Link>
            <a
              href="#contact"
              className="cta cta-lg"
            >
              Start a project <Arrow />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
