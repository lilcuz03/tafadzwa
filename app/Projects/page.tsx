import { Metadata } from "next";
import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiReact,
  SiFlutter,
} from "react-icons/si";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "Projects | Tafadzwa Chiripanyanga",
  description:
    "A selection of web and mobile projects built by Tafadzwa Chiripanyanga — fullstack developer based in South Africa.",
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
  longDescription: string;
  tags: Tag[];
  category: "Web" | "Mobile" | "Fullstack";
  liveUrl?: string;
  githubUrl?: string;
  accent: string;
  highlights: string[];
  status: "Live" | "In Progress" | "Completed";
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: "BrightFix",
    subtitle: "Home Appliance Repair Service",
    description:
      "A full business website for a home appliance repair company serving Pietermaritzburg and surrounding KwaZulu-Natal areas.",
    longDescription:
      "BrightFix needed a professional online presence to convert visitors into repair bookings. The site includes a service catalogue, a multi-step booking form, a customer review section, and a blog — all optimised for local SEO.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://brightfix-alpha.vercel.app/",
    accent: "cyan",
    highlights: [
      "Online repair booking form",
      "Full services catalogue",
      "Customer reviews section",
      "Blog / content pages",
      "WhatsApp & call CTAs",
      "Local SEO optimised",
    ],
    status: "Live",
  },
  {
    title: "TtFRECH",
    subtitle: "Construction & Renovations Business Site",
    description:
      "A full marketing website for TtFRECH Renovators & Investments — a registered construction company serving Durban and KwaZulu-Natal.",
    longDescription:
      "TtFRECH needed a premium online presence to showcase their construction services and convert visitors into leads. The site features a full services breakdown, client testimonials, an FAQ section, a blog, and a contact form with Resend-powered email delivery — all built with a luxury navy and gold aesthetic.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://www.ttfrech.co.za/",
    accent: "violet",
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
    title: "Tawedzerwa Construction",
    subtitle: "Construction & Renovations Business Site",
    description:
      "A full marketing website for Tawedzerwa Construction — a premium building and renovations company serving Pietermaritzburg, Durban, and greater KwaZulu-Natal.",
    longDescription:
      "Tawedzerwa Construction needed a strong online presence to showcase their wide range of building services and convert visitors into leads. The site features a full services breakdown across 12 trade categories, client testimonials, a project gallery, a service areas section, and a WhatsApp-integrated contact form — all built with a clean, premium aesthetic targeting homeowners and businesses across KZN.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://www.tawedzerwaconstruction.co.za/",
    accent: "amber",
    highlights: [
      "12 service categories with clean descriptions",
      "WhatsApp & contact form lead capture",
      "Project gallery with category labels",
      "Client testimonials section",
      "Service areas coverage map section",
      "Fully responsive & SEO optimised",
    ],
    status: "Live",
  },
  {
    title: "Sah Veh",
    subtitle: "Holistic Wellness E-Commerce",
    description:
      "An e-commerce storefront for a South African wellness brand selling plant-based supplements, with WhatsApp-based ordering and a wellness blog.",
    longDescription:
      "Sah Veh required a premium-feeling online store that matched their natural, holistic brand identity. Products are purchased directly via WhatsApp for a personal touch. The site also features a blog covering supplement science and wellness topics.",
    tags: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "TypeScript", icon: SiTypescript },
    ],
    category: "Web",
    liveUrl: "https://sa-vah.vercel.app/",
    accent: "emerald",
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
  // ── Add more projects below ───────────────────────────────────────────────
  // {
  //   title: "Your Next Project",
  //   subtitle: "...",
  //   description: "...",
  //   longDescription: "...",
  //   tags: [{ label: "React Native", icon: SiReact }, { label: "Flutter", icon: SiFlutter }],
  //   category: "Mobile",
  //   liveUrl: "",
  //   accent: "violet",
  //   highlights: [],
  //   status: "In Progress",
  // },
];

// ─── Accent map ───────────────────────────────────────────────────────────────

const accentMap: Record<
  string,
  {
    border: string;
    bg: string;
    text: string;
    badge: string;
    glow: string;
    dot: string;
  }
> = {
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500/60",
    bg: "hover:bg-cyan-500/5",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
    glow: "shadow-[0_0_40px_rgba(6,182,212,0.08)]",
    dot: "bg-cyan-400",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    bg: "hover:bg-emerald-500/5",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.08)]",
    dot: "bg-emerald-400",
  },
  violet: {
    border: "border-violet-500/30 hover:border-violet-500/60",
    bg: "hover:bg-violet-500/5",
    text: "text-violet-400",
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.08)]",
    dot: "bg-violet-400",
  },
};

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyles: Record<Project["status"], string> = {
  Live: "bg-green-500/10 border-green-500/20 text-green-400",
  "In Progress": "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  Completed: "bg-white/5 border-white/10 text-gray-400",
};

// ─── Divider ─────────────────────────────────────────────────────────────────

const Divider = () => <div className="w-full h-px bg-white/10" />;

// ─── Page ─────────────────────────────────────────────────────────────────────

const ProjectsPage = () => {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-16 text-center">
          <p className="text-cyan-400 text-xs uppercase tracking-[4px]">
            My Work
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight">
            Projects
          </h1>
          <p className="text-gray-400 mt-5 text-base sm:text-lg max-w-xl mx-auto leading-7">
            A selection of real-world projects I&apos;ve designed and built —
            from local business websites to e-commerce storefronts.
          </p>

          {/* Count pill */}
          <div className="inline-flex items-center gap-2 mt-6 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-300 text-sm">
              {projects.length} projects shipped
            </span>
          </div>
        </section>

        <Divider />

        {/* ── PROJECT CARDS ──────────────────────────────────────────────── */}
        <section className="py-16 flex flex-col gap-8">
          {projects.map((project, i) => {
            const a = accentMap[project.accent] ?? accentMap.cyan;
            return (
              <article
                key={project.title}
                className={`group relative flex flex-col lg:flex-row gap-0 border ${a.border} ${a.glow} ${a.bg} rounded-3xl overflow-hidden transition-all duration-300 bg-white/[0.02]`}
              >
                {/* ── Preview panel ──────────────────────────────────────── */}
                <div className="w-full lg:w-[42%] shrink-0 relative min-h-[220px] sm:min-h-[280px] lg:min-h-0 bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                  {/* Abstract grid pattern background */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Glow orb */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-40 sm:h-40 rounded-full blur-2xl sm:blur-3xl opacity-10 sm:opacity-15 ${
                      project.accent === "emerald"
                        ? "bg-emerald-400"
                        : project.accent === "violet"
                          ? "bg-violet-400"
                          : "bg-cyan-400"
                    }`}
                  />

                  {/* Project number */}
                  <span className="absolute top-5 left-5 text-[80px] font-black leading-none text-white/5 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Status + category */}
                  <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                    <span
                      className={`text-[11px] font-medium border rounded-full px-3 py-1 ${statusStyles[project.status]}`}
                    >
                      ● {project.status}
                    </span>
                    <span className="text-[11px] text-gray-500 border border-white/10 rounded-full px-3 py-1 bg-black/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className={`text-xs font-medium uppercase tracking-widest ${a.text} mb-1`}
                    >
                      {project.subtitle}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* ── Content panel ──────────────────────────────────────── */}
                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 w-full">
                  {/* Description */}
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-7">
                      {project.longDescription}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                      {project.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-2"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`}
                          />
                          <span className="text-gray-400 text-xs sm:text-sm leading-5">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom row: tags + links */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(({ label, icon: Icon }) => (
                        <span
                          key={label}
                          className={`inline-flex items-center gap-1.5 text-xs border rounded-full px-3 py-1 ${a.badge}`}
                        >
                          {Icon && <Icon className="text-[10px]" />}
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-3 shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-gray-400 text-sm border border-white/10 rounded-full px-4 py-2 hover:border-white/30 hover:text-white transition-all duration-200"
                        >
                          <FiGithub className="text-base" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 hover:scale-105 active:scale-100 ${
                            project.accent === "emerald"
                              ? "bg-emerald-500 text-black hover:bg-emerald-400"
                              : "bg-cyan-500 text-black hover:bg-cyan-400"
                          }`}
                        >
                          <FiExternalLink className="text-base" />
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

        <Divider />

        {/* ── MORE COMING ────────────────────────────────────────────────── */}
        <section className="py-16 flex flex-col items-center text-center">
          <div className="border border-white/10 rounded-3xl p-10 sm:p-14 bg-white/[0.02] w-full max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-5">
              <span className="text-cyan-400 text-2xl font-bold">+</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">More on the way</h2>
            <p className="text-gray-400 mt-4 text-sm sm:text-base leading-7 max-w-sm mx-auto">
              Several mobile and web projects are currently in progress. Check
              back soon — or reach out if you&apos;d like to commission
              something.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <a
                href="mailto:tafadzwachiri03@outlook.com"
                className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-black font-bold px-8 py-3.5 rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100 text-sm"
              >
                <MdEmail className="text-base" />
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
};

export default ProjectsPage;
