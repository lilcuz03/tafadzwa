"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  Globe,
  Hammer,
  Wrench,
  Building2,
  ShoppingBag,
  Car,
  Sparkles,
  Mail,
  ArrowRight,
  Bot,
  PenLine,
} from "lucide-react";

// ─── Reveal ────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const projects = [
  {
    num: "01",
    status: "Live",
    type: "Construction & Renovations",
    name: "TtFRECH",
    description:
      "A premium online presence for a construction company — full services breakdown, client testimonials, blog, FAQ section, and a Resend-powered contact form. Built with a luxury navy and gold aesthetic.",
    features: [
      "6 service pages with detail tabs",
      "Resend contact form integration",
      "Client reviews & testimonials",
      "Blog with category filtering",
      "FAQ with animated accordion",
      "Fully responsive & SEO ready",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://www.ttfrech.co.za/",
    icon: Building2,
    badge: null,
  },
  {
    num: "02",
    status: "Live",
    type: "Home Appliance Repair Service",
    name: "BrightFix",
    description:
      "A professional site that converts visitors into repair bookings. Features a service catalogue, multi-step booking form, customer reviews, and a blog — all optimised for local SEO.",
    features: [
      "Online repair booking form",
      "Full services catalogue",
      "Customer reviews section",
      "Blog & content pages",
      "WhatsApp & call CTAs",
      "Local SEO optimised",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://brightfix-alpha.vercel.app/",
    icon: Wrench,
    badge: null,
  },
  {
    num: "03",
    status: "Live",
    type: "Construction & Renovations",
    name: "Tawedzerwa Construction",
    description:
      "A strong online presence showcasing a wide range of building services across 12 trade categories — with testimonials, a project gallery, service areas, and WhatsApp-integrated lead capture.",
    features: [
      "12 service categories",
      "WhatsApp & contact form lead capture",
      "Project gallery with category labels",
      "Client testimonials section",
      "Service areas coverage map",
      "Fully responsive & SEO optimised",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://tawedzerwa.vercel.app/",
    icon: Hammer,
    badge: null,
  },
  {
    num: "04",
    status: "Live",
    type: "Holistic Wellness E-Commerce",
    name: "Sah Veh",
    description:
      "A premium-feeling online store for a natural wellness brand. Products are purchased via WhatsApp for a personal touch. Includes a blog covering supplement science and wellness topics.",
    features: [
      "Product catalogue with detail pages",
      "WhatsApp-integrated ordering",
      "Wellness blog with articles",
      "Hero image carousel",
      "Mobile-first responsive design",
      "Brand-matched visual design",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://sa-vah.vercel.app/",
    icon: ShoppingBag,
    badge: null,
  },

  {
    num: "05",
    status: "Live",
    type: "AI Automation System",
    name: "AI Lead Generation Engine",
    description:
      "A fully automated lead generation system that runs daily across 27 cities in Africa, the UK, Europe, and North America. It discovers businesses with no website or poor digital presence, generates AI-written cold outreach pitches, and logs structured leads to a Google Sheet — entirely hands-free.",
    features: [
      "Searches 27 cities across 4 continents daily",
      "Filters businesses with no website or low rating",
      "AI-generated cold outreach pitch per lead",
      "Auto-logs to Google Sheets with full contact data",
      "Runs on a schedule — no manual input needed",
      "Deployed 24/7 on Railway.app",
    ],
    stack: [
      "n8n",
      "Google Places API",
      "Groq AI",
      "Google Sheets API",
      "Railway",
    ],
    url: "#",
    icon: Bot,
    PenLine,
    badge: "Automation",
  },
  {
    num: "06",
    status: "In Development",
    type: "AI SaaS Tool",
    name: "BlogForge",
    description:
      "An AI-powered blog generation tool built for agencies and freelancers. Takes a business name, topic, audience, and style preferences — and produces a fully formatted, SEO-optimised blog post in seconds. Built as an internal productivity tool to deliver content services faster and at scale.",
    features: [
      "AI blog generation in under 10 seconds",
      "5 tone options and 5 format styles",
      "SEO keyword integration",
      "Word count control from 300–2,000 words",
      "Copy and download output instantly",
      "South African and international English support",
    ],
    stack: ["Next.js", "TypeScript", "Groq AI", "Tailwind CSS"],
    url: "#",
    icon: PenLine,
    badge: "Product",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#060a0a] text-[#f0fdfa] antialiased overflow-hidden">
      {/* Aurora bg */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-cyan-400/[0.06] blur-[100px] animate-[drift1_18s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] -left-40 w-[400px] h-[400px] rounded-full bg-emerald-400/[0.05] blur-[100px] animate-[drift2_22s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <section className="pt-[clamp(6rem,10vw,8rem)] pb-[clamp(2rem,4vw,3rem)]">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back home
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-4">
              <div>
                <p className="text-[10.5px] font-semibold text-cyan-400/80 uppercase tracking-[0.12em] mb-3">
                  My Work
                </p>
                <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.06]">
                  Projects
                </h1>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-full px-3.5 py-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[12px] text-slate-400 font-medium">
                  {projects.length} projects shipped
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-slate-400 max-w-[520px] leading-[1.75] font-light">
              A selection of real-world projects I&apos;ve designed and built —
              from local business websites to AI-powered tools and automation
              systems.
            </p>
          </Reveal>
        </section>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* ── Projects list ────────────────────────────────────────────── */}
        <section className="py-[clamp(3rem,6vw,5rem)]">
          <div className="flex flex-col gap-6">
            {projects.map((project, i) => {
              const Icon = project.icon;
              const isAutomation =
                project.badge === "Automation" || project.badge === "Product";
              return (
                <Reveal
                  key={project.name}
                  delay={i * 0.06}
                >
                  <div
                    className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                      isAutomation
                        ? "border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.04] to-emerald-400/[0.03] hover:border-cyan-400/40"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-cyan-400/25"
                    }`}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-cyan-400/[0.06] blur-[60px]" />
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-emerald-400/[0.04] blur-[60px]" />
                    </div>

                    {/* Automation top accent bar */}
                    {isAutomation && (
                      <div className="h-px bg-gradient-to-r from-cyan-400/60 via-emerald-400/60 to-transparent" />
                    )}

                    <div className="relative p-6 sm:p-8">
                      {/* Top row: number + status + type + badge */}
                      <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <span className="text-[11px] font-mono text-slate-600">
                          {project.num}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ${project.status === "In Development" ? "bg-amber-400/10 border border-amber-400/20" : "bg-emerald-400/10 border border-emerald-400/20"}`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${project.status === "In Development" ? "bg-amber-400" : "bg-emerald-400"}`}
                          />
                          <span
                            className={`text-[10.5px] font-medium ${project.status === "In Development" ? "text-amber-300" : "text-emerald-300"}`}
                          >
                            {project.status}
                          </span>
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {project.type}
                        </span>
                        {isAutomation && (
                          <span className="inline-flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-0.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[10.5px] text-cyan-300 font-medium">
                              Running daily
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Title row */}
                      <div className="flex items-start justify-between gap-6 mb-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center border group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-300 ${
                              isAutomation
                                ? "bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border-cyan-400/30"
                                : "bg-gradient-to-br from-cyan-400/15 to-emerald-400/15 border-cyan-400/20"
                            }`}
                          >
                            <Icon
                              className="w-5 h-5 text-cyan-300"
                              strokeWidth={1.8}
                            />
                          </div>
                          <h2 className="text-[clamp(1.3rem,3vw,1.8rem)] font-bold tracking-[-0.03em] text-[#f0fdfa]">
                            {project.name}
                          </h2>
                        </div>
                        {project.url !== "#" && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] transition-all duration-200"
                            aria-label={`Visit ${project.name}`}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[13.5px] text-slate-400 leading-[1.75] font-light max-w-[600px] mb-6">
                        {project.description}
                      </p>

                      {/* Features grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                        {project.features.map((feat) => (
                          <div
                            key={feat}
                            className="flex items-start gap-2 py-1"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 flex-shrink-0" />
                            <span className="text-[12.5px] text-slate-400 font-light leading-relaxed">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom row: stack + CTA */}
                      <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-white/[0.04]">
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((s) => (
                            <span
                              key={s}
                              className={`text-[11px] rounded-md px-2.5 py-1 font-medium border ${
                                isAutomation
                                  ? "text-cyan-400/70 bg-cyan-400/[0.06] border-cyan-400/15"
                                  : "text-slate-500 bg-white/[0.03] border-white/[0.06]"
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        {project.url !== "#" && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12.5px] text-cyan-300 font-medium hover:text-cyan-200 transition-colors group/link"
                          >
                            View live
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── More coming ──────────────────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-col items-center text-center py-10 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 border border-white/[0.08] flex items-center justify-center mb-5">
              <Sparkles
                className="w-5 h-5 text-cyan-300"
                strokeWidth={1.8}
              />
            </div>
            <h3 className="text-[18px] font-semibold tracking-tight mb-2">
              More on the way
            </h3>
            <p className="text-[13.5px] text-slate-500 max-w-[360px] font-light leading-relaxed">
              Several mobile, web, and automation projects are currently in
              progress. Check back soon — or reach out if you&apos;d like to
              commission something.
            </p>
          </div>
        </Reveal>

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <Reveal>
          <div className="border-t border-white/[0.06] py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[clamp(1rem,2.5vw,1.2rem)] font-semibold tracking-tight">
                Like what you see?{" "}
                <span className="gradient-text">Let&apos;s work together.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:tafadzwachiri03@outlook.com"
                className="btn-glow group inline-flex items-center gap-2 text-[#060a0a] text-[12.5px] font-bold px-5 py-2.5 rounded-xl tracking-tight"
              >
                <Mail className="w-3.5 h-3.5" />
                Start a project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-slate-300 text-[12.5px] font-medium px-5 py-2.5 rounded-xl hover:bg-white/[0.08] transition-all tracking-tight"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back home
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Styles ────────────────────────────────────────────────────── */}
      <style
        jsx
        global
      >{`
        .gradient-text {
          background: linear-gradient(
            110deg,
            #22d3ee 0%,
            #2dd4bf 40%,
            #4ade80 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 6s linear infinite;
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .btn-glow {
          background: linear-gradient(110deg, #22d3ee, #4ade80);
          background-size: 200% auto;
          transition:
            background-position 0.5s,
            box-shadow 0.3s,
            transform 0.2s;
        }
        .btn-glow:hover {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(45, 212, 191, 0.35);
          transform: translateY(-2px);
        }

        @keyframes drift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(60px, 40px) scale(1.15);
          }
        }
        @keyframes drift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, 60px) scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-text {
            animation: none !important;
          }
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
