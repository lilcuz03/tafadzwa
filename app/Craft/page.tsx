"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Mail,
  ArrowRight,
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
      { threshold: 0.08 },
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
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type Category = "All" | "Workspace" | "Events" | "Travel" | "Projects";

type Shot = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<Category, "All">;
  date: string;
  location?: string;
  description?: string;
  projectUrl?: string;
  size?: "tall" | "wide";
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const shots: Shot[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    alt: "Laptop with code on screen at a clean desk",
    caption: "Where the magic happens",
    category: "Workspace",
    date: "Jun 2026",
    location: "Durban",
    size: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    alt: "Dual monitor setup glowing in a dark room",
    caption: "Late-night debugging session",
    category: "Workspace",
    date: "May 2026",
    location: "Durban",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    alt: "People networking at a tech event",
    caption: "DevConf Joburg 2024",
    category: "Events",
    date: "Apr 2024",
    location: "Johannesburg",
    description:
      "Met some incredible developers and got to see the latest in SA tech. Great talks on mobile-first development.",
    size: "wide",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Close-up of code on a monitor",
    caption: "Shipping the BrightFix booking flow",
    category: "Projects",
    date: "Mar 2026",
    description:
      "Built a multi-step repair booking form with real-time validation, WhatsApp integration, and local SEO. Turned visitors into bookings.",
    projectUrl: "https://brightfix-alpha.vercel.app/",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Aerial view of a mountain landscape",
    caption: "Drakensberg weekend reset",
    category: "Travel",
    date: "Feb 2026",
    location: "Drakensberg, KZN",
    description:
      "Sometimes you need to step away from the screen. Best way to come back with fresh eyes.",
    size: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Notebook and coffee on a wooden desk",
    caption: "Planning the Sah Veh brand",
    category: "Projects",
    date: "Jan 2026",
    description:
      "Mapped out the entire product catalogue, blog content strategy, and WhatsApp ordering flow for a natural wellness e-commerce brand.",
    projectUrl: "https://sa-vah.vercel.app/",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Conference stage with large screen",
    caption: "Local startup pitch night",
    category: "Events",
    date: "Dec 2025",
    location: "Sandton",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    alt: "Person typing on a MacBook in a café",
    caption: "Remote work from a café",
    category: "Workspace",
    date: "Nov 2025",
    location: "Rosebank, JHB",
    size: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    alt: "Road stretching into the horizon at sunset",
    caption: "TtFRECH handover road trip",
    category: "Projects",
    date: "Oct 2025",
    location: "Durban",
    description:
      "Drove to deliver the final TtFRECH construction site — 6 service pages, Resend forms, testimonials, and full SEO. Client was stoked.",
    projectUrl: "https://www.ttfrech.co.za/",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    alt: "Code editor open with multiple files",
    caption: "Deep in the Tawedzerwa build",
    category: "Projects",
    date: "Sep 2025",
    description:
      "12 service categories, WhatsApp lead capture, project gallery, and service area maps. One of the biggest builds to date.",
    projectUrl: "https://tawedzerwa.vercel.app/",
    size: "tall",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    alt: "City skyline of Johannesburg at night",
    caption: "Home base — Johannesburg",
    category: "Travel",
    date: "Aug 2025",
    location: "Johannesburg",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    alt: "Group of developers collaborating around a table",
    caption: "Hackathon collab",
    category: "Events",
    date: "Jul 2025",
    location: "Sandton",
    description:
      "48-hour hackathon building a township delivery app prototype. Didn't win but learned a ton about rapid prototyping.",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Workspace",
  "Projects",
  "Events",
  "Travel",
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CraftPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? shots
      : shots.filter((s) => s.category === activeCategory);

  // Desktop: toggle inline expand. Mobile: open lightbox.
  const handleClick = (shot: Shot, index: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setLightboxIndex(index);
    } else {
      setExpandedId(expandedId === shot.id ? null : shot.id);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const goNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <main className="relative min-h-screen bg-[#060a0a] text-[#f0fdfa] antialiased overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 right-1/3 w-[450px] h-[450px] rounded-full bg-cyan-400/[0.06] blur-[100px] animate-[drift1_18s_ease-in-out_infinite]" />
        <div className="absolute top-[50%] -left-32 w-[400px] h-[400px] rounded-full bg-emerald-400/[0.05] blur-[100px] animate-[drift2_22s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <section className="pt-[clamp(6rem,10vw,8rem)] pb-6">
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
                  Behind the Build
                </p>
                <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.06]">
                  Craft
                </h1>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/8 rounded-full px-3.5 py-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[12px] text-slate-400 font-medium">
                  {shots.length} moments captured
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-slate-400 max-w-[520px] leading-[1.75] font-light">
              The spaces, moments, and builds that shape the work — workspaces,
              events, travel, and life between the commits.
            </p>
          </Reveal>
        </section>

        {/* ── Filters ─────────────────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <div className="py-6 border-y border-white/[0.06] flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null);
                }}
                className={`text-[12.5px] font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30"
                    : "text-slate-500 bg-white/[0.02] border border-white/[0.06] hover:text-slate-300 hover:border-white/[0.12]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Grid ────────────────────────────────────────────────────── */}
        <section className="py-[clamp(2rem,4vw,3rem)] pb-8">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-slate-600 text-sm">
              No photos in this category yet.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((shot, i) => {
                const isExpanded = expandedId === shot.id;
                return (
                  <Reveal
                    key={shot.id}
                    delay={Math.min(i * 0.04, 0.4)}
                  >
                    <div className="break-inside-avoid">
                      <button
                        onClick={() => handleClick(shot, i)}
                        className={`group relative w-full overflow-hidden rounded-2xl border transition-all duration-400 block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          isExpanded
                            ? "border-cyan-400/30 bg-cyan-400/[0.03]"
                            : "border-white/[0.06] hover:border-cyan-400/25"
                        } ${
                          shot.size === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                          loading={i < 6 ? "eager" : "lazy"}
                        />

                        {/* Category + date badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="text-[10.5px] font-medium bg-black/60 backdrop-blur-sm border border-white/10 text-slate-300 rounded-full px-2.5 py-1">
                            {shot.category}
                          </span>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <p className="text-white text-[14px] font-semibold leading-snug text-left mb-1.5">
                            {shot.caption}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5" />
                              {shot.date}
                            </span>
                            {shot.location && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5" />
                                {shot.location}
                              </span>
                            )}
                          </div>
                          {(shot.description || shot.projectUrl) && (
                            <span className="text-[10px] text-cyan-400/70 mt-2">
                              Click for details
                            </span>
                          )}
                        </div>
                      </button>

                      {/* ── Desktop expanded info panel ─────────────────── */}
                      <div
                        className={`hidden sm:block overflow-hidden transition-all duration-400 ease-out ${
                          isExpanded
                            ? "max-h-[300px] opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="text-[15px] font-semibold text-slate-100 tracking-tight">
                              {shot.caption}
                            </h3>
                            <button
                              onClick={() => setExpandedId(null)}
                              className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white transition-colors flex-shrink-0"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-[11.5px] text-slate-500 mb-3">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {shot.date}
                            </span>
                            {shot.location && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {shot.location}
                              </span>
                            )}
                            <span className="text-[10.5px] text-cyan-400/60 font-medium bg-cyan-400/[0.06] rounded px-2 py-0.5">
                              {shot.category}
                            </span>
                          </div>

                          {shot.description && (
                            <p className="text-[13px] text-slate-400 leading-[1.7] font-light mb-3">
                              {shot.description}
                            </p>
                          )}

                          {shot.projectUrl && (
                            <a
                              href={shot.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[12px] text-cyan-300 font-medium hover:text-cyan-200 transition-colors"
                            >
                              View project
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <Reveal>
          <div className="border-t border-white/[0.06] py-12 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[clamp(1rem,2.5vw,1.2rem)] font-semibold tracking-tight">
                Like what you see?{" "}
                <span className="gradient-text">Let&apos;s work together.</span>
              </p>
              <p className="text-[13px] text-slate-500 mt-1 font-light">
                More moments added regularly.
              </p>
            </div>
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="btn-glow group inline-flex items-center gap-2 text-[#060a0a] text-[12.5px] font-bold px-5 py-2.5 rounded-xl tracking-tight flex-shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in touch
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* ── MOBILE LIGHTBOX ─────────────────────────────────────────────── */}
      {lightboxIndex !== null &&
        (() => {
          const shot = filtered[lightboxIndex];
          if (!shot) return null;
          return (
            <div
              className="fixed inset-0 z-50 bg-[#060a0a]/95 backdrop-blur-xl flex flex-col sm:hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <span className="text-[12px] text-slate-500 font-medium">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image */}
              <div className="flex-1 relative">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />

                {/* Nav arrows */}
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Info panel */}
              <div className="px-5 py-5 border-t border-white/[0.06] bg-[#0a0f0f]">
                <h3 className="text-[15px] font-semibold text-slate-100 mb-2">
                  {shot.caption}
                </h3>
                <div className="flex items-center gap-3 text-[11.5px] text-slate-500 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {shot.date}
                  </span>
                  {shot.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shot.location}
                    </span>
                  )}
                  <span className="text-[10.5px] text-cyan-400/60 font-medium bg-cyan-400/[0.06] rounded px-2 py-0.5">
                    {shot.category}
                  </span>
                </div>
                {shot.description && (
                  <p className="text-[12.5px] text-slate-400 leading-[1.7] font-light mb-2">
                    {shot.description}
                  </p>
                )}
                {shot.projectUrl && (
                  <a
                    href={shot.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] text-cyan-300 font-medium"
                  >
                    View project <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })()}

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
        }
      `}</style>
    </main>
  );
}
