import type { Metadata } from "next";
import Link from "next/link";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Websites, web apps and AI automation systems built by taachii for businesses in South Africa and beyond, from construction and healthcare to e-commerce and lead generation.",
  alternates: { canonical: "/Projects" },
  openGraph: {
    type: "website",
    url: "/Projects",
    siteName: "taachii",
    locale: "en_ZA",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE_URL}/Projects`,
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/Projects#page`,
      name: "Projects",
      url: `${SITE_URL}/Projects`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.name,
            description: p.summary,
            ...(p.url ? { url: p.url } : {}),
            creator: { "@id": `${SITE_URL}/#business` },
          },
        })),
      },
    },
  ],
};

// Numbers come from the data, so they can never drift out of date
const STATS = [
  { value: PROJECTS.length, label: "Projects" },
  {
    value: PROJECTS.filter((p) => p.status === "live").length,
    label: "Live websites",
  },
  {
    value: PROJECTS.filter((p) => p.status === "running").length,
    label: "Automations running daily",
  },
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

export default function ProjectsPage() {
  return (
    <main className="relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page hero */}
      <section className="gutter relative pb-[clamp(2rem,5vw,4rem)] pt-[clamp(2.5rem,6vw,5rem)]">
        <nav
          aria-label="Breadcrumb"
          className="fade-up mb-8 text-[.85rem] t-muted"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                className="foot-link"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              aria-current="page"
              style={{ color: "var(--fg)" }}
            >
              Projects
            </li>
          </ol>
        </nav>

        <p
          className="fade-up mb-5 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted"
          style={{ "--d": ".1s" } as React.CSSProperties}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--orange)" }}
          />
          My work
        </p>

        <h1
          className="fade-up font-display max-w-[16ch] text-[clamp(2.7rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          style={{ "--d": ".2s" } as React.CSSProperties}
        >
          Selected work, <span className="grad-text">built to ship.</span>
        </h1>

        <p
          className="fade-up mt-7 max-w-xl text-[clamp(1rem,1.6vw,1.2rem)] t-muted"
          style={{ "--d": ".35s" } as React.CSSProperties}
        >
          Real projects for real businesses, from construction and healthcare to
          online stores and AI automation systems that run on their own.
        </p>

        <dl
          className="fade-up mt-10 flex flex-wrap gap-x-12 gap-y-6"
          style={{ "--d": ".5s" } as React.CSSProperties}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse"
            >
              <dt className="mt-1 text-[.85rem] t-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.04em] grad-text">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ProjectsExplorer />

      {/* Closing nudge */}
      <section className="gutter pb-[clamp(4rem,9vw,8rem)]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border b-line p-7 sm:flex-row sm:items-center md:p-10">
            <div>
              <p className="font-display max-w-[24ch] text-[clamp(1.4rem,2.8vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em]">
                Have a project in mind?
              </p>
              <p className="mt-2 max-w-[44ch] t-muted">
                Tell me what you need and the form opens WhatsApp with your
                details ready to send.
              </p>
            </div>
            <Link
              href="/#contact"
              className="cta cta-lg"
            >
              Start a project <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
