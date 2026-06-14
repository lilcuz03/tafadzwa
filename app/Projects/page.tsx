import { Metadata } from "next";
import Link from "next/link";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiReact,
  SiFlutter,
} from "react-icons/si";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Projects | Tafadzwa Chiripanyanga",
  description:
    "A selection of real-world web and mobile projects built by Tafadzwa Chiripanyanga — fullstack developer based in South Africa. Specialising in Next.js, React Native, Flutter, and Tailwind CSS.",
  keywords: [
    "Tafadzwa Chiripanyanga",
    "fullstack developer South Africa",
    "Next.js projects",
    "React Native developer",
    "Flutter developer",
    "web developer portfolio",
  ],
  openGraph: {
    title: "Projects | Tafadzwa Chiripanyanga",
    description:
      "Real-world web and mobile projects built by Tafadzwa Chiripanyanga — fullstack developer based in South Africa.",
    url: "https://tafadzwa.site/Projects",
    siteName: "Tafadzwa Chiripanyanga",
    images: [
      {
        url: "https://tafadzwa.site/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Tafadzwa Chiripanyanga — Fullstack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Tafadzwa Chiripanyanga",
    description:
      "Real-world web and mobile projects built by Tafadzwa Chiripanyanga — fullstack developer based in South Africa.",
    images: ["https://tafadzwa.site/images/hero.png"],
  },
  alternates: {
    canonical: "https://tafadzwa.site/Projects",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Tag = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: Tag[];
  category: "Web" | "Mobile" | "Fullstack";
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  status: "Live" | "In Progress" | "Completed";
  accentColor: "cyan" | "emerald" | "violet" | "orange";
};

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: "TtFRECH",
    subtitle: "Construction & Renovations",
    description:
      "A premium marketing website for TtFRECH Renovators & Investments — a registered construction company serving Durban and KwaZulu-Natal. Built with a luxury navy and gold aesthetic, the site features a full services breakdown, client testimonials, an FAQ section, a blog, and a contact form with email delivery via Resend.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://www.ttfrech.co.za/",
    accentColor: "violet",
    highlights: [
      "6 service pages with detail tabs",
      "Resend contact form integration",
      "Client reviews & testimonials",
      "Blog with category filtering",
      "FAQ with animated accordion",
      "Fully responsive & SEO ready",
    ],
    status: "Live",
  },
  {
    title: "BrightFix",
    subtitle: "Home Appliance Repair Service",
    description:
      "A professional business website for a home appliance repair company serving Pietermaritzburg and surrounding KwaZulu-Natal areas. The site includes a service catalogue, a multi-step booking form, a customer review section, and a blog — all optimised for local SEO.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://brightfix-alpha.vercel.app/",
    accentColor: "cyan",
    highlights: [
      "Online repair booking form",
      "Full services catalogue",
      "Customer reviews section",
      "Blog & content pages",
      "WhatsApp & call CTAs",
      "Local SEO optimised",
    ],
    status: "Live",
  },
  {
    title: "Tawedzerwa Construction",
    subtitle: "Construction & Renovations",
    description:
      "A full marketing website for Tawedzerwa Construction — a premium building and renovations company serving Pietermaritzburg, Durban, and greater KwaZulu-Natal. Features 12 trade service categories, client testimonials, a project gallery, and a WhatsApp-integrated contact form.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://tawedzerwa.vercel.app/",
    accentColor: "orange",
    highlights: [
      "12 service categories",
      "WhatsApp & contact form lead capture",
      "Project gallery with category labels",
      "Client testimonials section",
      "Service areas coverage section",
      "Fully responsive & SEO optimised",
    ],
    status: "Live",
  },
  {
    title: "Sah Veh",
    subtitle: "Holistic Wellness E-Commerce",
    description:
      "An e-commerce storefront for a South African wellness brand selling plant-based supplements, with WhatsApp-based ordering and a wellness blog. Designed to match the brand's natural, holistic identity with an earthy premium aesthetic.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://sa-vah.vercel.app/",
    accentColor: "emerald",
    highlights: [
      "Product catalogue with detail pages",
      "WhatsApp-integrated ordering",
      "Wellness blog with articles",
      "Hero image carousel",
      "Mobile-first responsive design",
      "Brand-matched visual design",
    ],
    status: "Live",
  },
];

// ─── Accent Tokens ────────────────────────────────────────────────────────────

const accent = {
  cyan: {
    pill: "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300",
    dot: "bg-cyan-400",
    label: "text-cyan-400",
    btn: "bg-cyan-500 hover:bg-cyan-400 text-black",
    ring: "hover:border-cyan-500/50",
  },
  emerald: {
    pill: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300",
    dot: "bg-emerald-400",
    label: "text-emerald-400",
    btn: "bg-emerald-500 hover:bg-emerald-400 text-black",
    ring: "hover:border-emerald-500/50",
  },
  violet: {
    pill: "bg-violet-500/10 border border-violet-500/20 text-violet-300",
    dot: "bg-violet-400",
    label: "text-violet-400",
    btn: "bg-violet-500 hover:bg-violet-400 text-white",
    ring: "hover:border-violet-500/50",
  },
  orange: {
    pill: "bg-orange-500/10 border border-orange-500/20 text-orange-300",
    dot: "bg-orange-400",
    label: "text-orange-400",
    btn: "bg-orange-500 hover:bg-orange-400 text-black",
    ring: "hover:border-orange-500/50",
  },
};

const statusStyle: Record<Project["status"], string> = {
  Live: "bg-green-500/10 border border-green-500/20 text-green-400",
  "In Progress": "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400",
  Completed: "bg-white/5 border border-white/10 text-gray-400",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-24 pb-16 text-center">
          <span className="text-cyan-400 text-xs uppercase tracking-[4px] font-medium">
            My Work
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight tracking-tight">
            Projects
          </h1>

          <p className="text-gray-400 mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            A selection of real-world projects I&apos;ve designed and built —
            from local business websites to e-commerce storefronts.
          </p>

          {/* Shipped pill — matches homepage stat chips */}
          <div className="inline-flex items-center gap-2 mt-6 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">
              {projects.length} projects shipped
            </span>
          </div>
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── PROJECT LIST ─────────────────────────────────────────────────── */}
        <section
          className="py-16 flex flex-col gap-6"
          aria-label="Projects"
        >
          {projects.map((project, i) => {
            const a = accent[project.accentColor];
            return (
              <article
                key={project.title}
                className={`group relative flex flex-col lg:flex-row border border-white/10 ${a.ring} rounded-2xl overflow-hidden transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]`}
              >
                {/* ── Left panel ─────────────────────────────────────────── */}
                <div className="relative w-full lg:w-[38%] shrink-0 min-h-[200px] sm:min-h-[240px] lg:min-h-0 bg-black/50 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden flex items-end">
                  {/* Subtle grid */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                    aria-hidden="true"
                  />

                  {/* Glow orb */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 rounded-full blur-3xl opacity-10 ${a.dot}`}
                    aria-hidden="true"
                  />

                  {/* Large index number */}
                  <span
                    className="absolute top-4 left-5 text-[72px] font-black leading-none text-white/[0.04] select-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Status + category badges */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <span
                      className={`text-[11px] font-medium rounded-full px-3 py-1 ${statusStyle[project.status]}`}
                    >
                      ● {project.status}
                    </span>
                    <span className="text-[11px] text-gray-500 border border-white/10 rounded-full px-3 py-1 bg-black/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Title block */}
                  <div className="relative z-10 p-6">
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest mb-1 ${a.label}`}
                    >
                      {project.subtitle}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* ── Right panel ────────────────────────────────────────── */}
                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 w-full">
                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5"
                      >
                        <span
                          className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`}
                        />
                        <span className="text-gray-400 text-xs sm:text-sm leading-5">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(({ label, icon: Icon }) => (
                        <span
                          key={label}
                          className={`inline-flex items-center gap-1.5 text-xs rounded-full px-3 py-1 font-medium ${a.pill}`}
                        >
                          {Icon && (
                            <Icon
                              className="text-[11px]"
                              aria-hidden="true"
                            />
                          )}
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                          className="inline-flex items-center gap-1.5 text-gray-400 text-sm border border-white/10 rounded-full px-4 py-2 hover:border-white/30 hover:text-white transition-all duration-200"
                        >
                          <FiGithub
                            className="text-base"
                            aria-hidden="true"
                          />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} live site`}
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 hover:scale-105 active:scale-100 ${a.btn}`}
                        >
                          <FiExternalLink
                            className="text-base"
                            aria-hidden="true"
                          />
                          <span>View Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── MORE COMING / CTA ────────────────────────────────────────────── */}
        <section
          className="py-16 flex flex-col items-center text-center"
          aria-label="Get in touch"
        >
          <div className="border border-white/10 rounded-2xl p-10 sm:p-14 bg-white/[0.02] w-full max-w-xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-5">
              <FiArrowUpRight
                className="text-cyan-400 text-xl"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              More on the way
            </h2>

            <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Several mobile and web projects are currently in progress. Check
              back soon — or reach out if you&apos;d like to commission
              something.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <a
                href="mailto:tafadzwachiri03@outlook.com"
                className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-black font-bold px-8 py-3.5 rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100 text-sm"
              >
                <MdEmail
                  className="text-base"
                  aria-hidden="true"
                />
                Start a project
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white/15 text-gray-300 px-8 py-3.5 rounded-full hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200 text-sm"
              >
                ← Back home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
