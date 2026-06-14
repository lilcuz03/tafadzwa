"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Globe,
  Database,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import SkillCard from "@/components/skillsCard";
import me from "../public/me.jpeg";

// ─── Data ──────────────────────────────────────────────────────────────────────

const stack = [
  "Next.js",
  "React Native",
  "Flutter",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
  "MongoDB",
  "Node.js",
];

const services = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform apps with React Native and Flutter. Native feel, one codebase, shipped to iOS and Android.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Fast, SEO-ready websites and web apps with Next.js and Tailwind. Built to perform and convert.",
    tags: ["Next.js", "React", "Tailwind", "TypeScript"],
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description:
      "Supabase, MongoDB, and Node.js — clean data architecture and APIs your product can grow on.",
    tags: ["Supabase", "MongoDB", "Node.js", "REST"],
  },
  {
    icon: Sparkles,
    title: "UI / UX Engineering",
    description:
      "Interfaces that feel precise. Pixel-perfect, accessible, and fast — design that earns trust instantly.",
    tags: ["Figma", "Design Systems", "Animations"],
  },
];

const stats = [
  { num: 10, suffix: "+", label: "Projects shipped" },
  { num: 4, suffix: "+", label: "Happy clients" },
  { num: 2, suffix: "", label: "Countries served" },
  { num: 100, suffix: "%", label: "Commitment" },
];

const aboutTags = [
  "End-to-end builder",
  "Detail obsessed",
  "Fast shipper",
  "Ambitious",
  "Remote-ready",
];

// ─── Scroll reveal hook ────────────────────────────────────────────────────────

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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}

// Reveal wrapper
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

// ─── Count-up number ───────────────────────────────────────────────────────────

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#060a0a] text-[#f0fdfa] antialiased overflow-hidden">
      {/* ── ANIMATED AURORA BACKGROUND ──────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        {/* subtle grid texture */}
        <div className="grid-overlay" />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="pt-[clamp(4rem,8vw,7rem)] pb-[clamp(3rem,6vw,5rem)]">
          <Reveal>
            <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11.5px] text-emerald-300 font-medium">
                  Open to new projects
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium">
                <MapPin className="w-3 h-3" />
                Durban, South Africa · Remote
              </span>
            </div>
          </Reveal>

          <div className="flex items-start justify-between gap-10">
            <div className="flex-1 min-w-0">
              <Reveal delay={0.05}>
                <h1 className="text-[clamp(2.2rem,6.5vw,4.2rem)] font-bold tracking-[-0.04em] leading-[1.06] mb-6">
                  Building products
                  <br />
                  that <span className="gradient-text">actually ship.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-[0.12em] mb-5">
                  Tafadzwa Chiripanyanga — Fullstack Developer
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-slate-400 max-w-[480px] leading-[1.75] mb-9 font-light">
                  I build mobile apps, web platforms, and the backend that
                  powers them. From a single landing page to a full product —
                  end-to-end, fast, and built to last.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/Projects"
                    className="btn-glow group inline-flex items-center gap-2 text-[#060a0a] text-[13px] font-bold px-5 py-3 rounded-xl tracking-tight"
                  >
                    View my work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="/cv.pdf"
                    download="Taffy_CV.pdf"
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-[13px] font-medium px-5 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all tracking-tight backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Profile */}
            <Reveal
              delay={0.2}
              className="hidden sm:block"
            >
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="profile-float relative">
                  {/* gradient ring */}
                  <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-cyan-400 to-emerald-400 opacity-60 blur-md" />

                  <Image
                    src={me}
                    alt="Tafadzwa Chiripanyanga"
                    width={120}
                    height={120}
                    className="relative rounded-full object-cover border-2 border-white/10"
                    priority
                  />
                </div>
                <span className="text-[10.5px] text-slate-600 font-medium">
                  Taffy
                </span>
              </div>
            </Reveal>
          </div>

          {/* Stack marquee */}
          <Reveal delay={0.3}>
            <div className="mt-12 pt-7 border-t border-white/6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10.5px] text-slate-600 font-semibold uppercase tracking-widest">
                  Tech Stack
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent" />
              </div>
              <div className="marquee-mask overflow-hidden">
                <div className="marquee-track flex gap-2.5">
                  {[...stack, ...stack].map((s, i) => (
                    <span
                      key={i}
                      className="whitespace-nowrap bg-white/3 border border-white/8 text-slate-400 text-[11.5px] font-medium px-3 py-1.5 rounded-lg hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────────── */}
        <section
          id="services"
          className="py-[clamp(3rem,6vw,5rem)] border-t border-white/6"
        >
          <Reveal>
            <p className="section-eyebrow">Services</p>
            <h2 className="section-title">What I build</h2>
            <p className="text-[14px] text-slate-500 leading-[1.7] font-light max-w-110 mb-10">
              From your first idea to a live product — I handle the full stack.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal
                  key={svc.title}
                  delay={i * 0.08}
                >
                  <div className="service-card group h-full rounded-2xl p-6">
                    <div className="icon-box mb-5">
                      <Icon
                        className="w-5 h-5"
                        strokeWidth={1.8}
                      />
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-100 tracking-tight mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-[1.7] mb-4 font-light">
                      {svc.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-slate-500 bg-white/3 border border-white/6 rounded-md px-2 py-0.5 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────────────────────── */}
        <section
          id="skills"
          className="py-[clamp(3rem,6vw,5rem)] border-t border-white/6"
        >
          <Reveal>
            <p className="section-eyebrow">My Stack</p>
            <h2 className="section-title mb-8">Technologies</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <SkillCard />
          </Reveal>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────── */}
        <section className="py-[clamp(3rem,6vw,5rem)] border-t border-white/6">
          <Reveal>
            <p className="section-eyebrow mb-6">By the numbers</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
              >
                <div className="stat-card rounded-2xl px-5 py-6 h-full">
                  <span className="block text-[2.2rem] font-bold tracking-[-0.04em] leading-none gradient-text">
                    <CountUp
                      target={s.num}
                      suffix={s.suffix}
                    />
                  </span>
                  <span className="block text-[12px] text-slate-500 font-medium mt-2">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────────────────── */}
        <section
          id="about"
          className="py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06]"
        >
          <Reveal>
            <p className="section-eyebrow mb-8">About</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start">
            <Reveal>
              <p className="text-[clamp(1.05rem,2.5vw,1.3rem)] font-light text-slate-200 leading-[1.6] tracking-[-0.01em] italic">
                &ldquo;Think three moves ahead, play the long game, and never
                stop improving.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p className="text-[13.5px] text-slate-400 leading-[1.85] mb-4 font-light">
                  I&apos;m a Zimbabwean developer based in Durban, South Africa.
                  I build end-to-end products — mobile apps, web platforms, and
                  everything in between. I care about the craft: clean code,
                  sharp design, and software that actually works.
                </p>
                <p className="text-[13.5px] text-slate-400 leading-[1.85] font-light">
                  When I&apos;m not shipping, I&apos;m on the chess board or the
                  football pitch. Both taught me the same thing — preparation
                  and patience win.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {aboutTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11.5px] text-slate-400 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-1 font-medium hover:border-emerald-400/30 hover:text-emerald-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-[clamp(3rem,6vw,5rem)] border-t border-white/[0.06] pb-24">
          <Reveal>
            <div className="cta-card relative rounded-3xl p-[clamp(2rem,5vw,4rem)] overflow-hidden">
              {/* glow inside */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <p className="text-[10.5px] font-semibold text-emerald-400/70 uppercase tracking-[0.12em] mb-5">
                  Let&apos;s work together
                </p>
                <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-4">
                  Got a project?{" "}
                  <span className="gradient-text">Let&apos;s build it.</span>
                </h2>
                <p className="text-[13.5px] text-slate-400 leading-[1.7] max-w-[400px] mb-7 font-light">
                  Open to freelance projects, startups, and remote work. If you
                  have an idea, I want to hear it.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:tafadzwachiri03@outlook.com"
                    className="btn-glow group inline-flex items-center gap-2 text-[#060a0a] text-[13px] font-bold px-5 py-3 rounded-xl tracking-tight"
                  >
                    <Mail className="w-4 h-4" />
                    Send an email
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="/Projects"
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-[13px] font-medium px-5 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all tracking-tight"
                  >
                    See my work
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      {/* ── STYLES ──────────────────────────────────────────────────────── */}
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

        /* Aurora blobs */
        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.5;
        }
        .aurora-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(34, 211, 238, 0.35),
            transparent 70%
          );
          top: -120px;
          left: -80px;
          animation: drift1 18s ease-in-out infinite;
        }
        .aurora-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(
            circle,
            rgba(74, 222, 128, 0.3),
            transparent 70%
          );
          top: 200px;
          right: -100px;
          animation: drift2 22s ease-in-out infinite;
        }
        .aurora-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(45, 212, 191, 0.25),
            transparent 70%
          );
          bottom: 100px;
          left: 30%;
          animation: drift3 26s ease-in-out infinite;
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
        @keyframes drift3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, -50px) scale(1.2);
          }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.015) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
          mask-image: radial-gradient(
            ellipse 80% 60% at 50% 0%,
            black 40%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 80% 60% at 50% 0%,
            black 40%,
            transparent 100%
          );
        }

        /* Glow button */
        .btn-glow {
          background: linear-gradient(110deg, #22d3ee, #4ade80);
          background-size: 200% auto;
          transition:
            background-position 0.5s,
            box-shadow 0.3s,
            transform 0.2s;
          box-shadow: 0 0 0 rgba(45, 212, 191, 0);
        }
        .btn-glow:hover {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(45, 212, 191, 0.35);
          transform: translateY(-2px);
        }

        /* Service cards */
        .service-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition:
            border-color 0.3s,
            background 0.3s,
            transform 0.3s;
        }
        .service-card:hover {
          border-color: rgba(45, 212, 191, 0.3);
          background: rgba(45, 212, 191, 0.03);
          transform: translateY(-4px);
        }
        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.15),
            rgba(74, 222, 128, 0.15)
          );
          border: 1px solid rgba(45, 212, 191, 0.2);
          color: #2dd4bf;
          transition: transform 0.3s;
        }
        .service-card:hover .icon-box {
          transform: scale(1.08) rotate(-3deg);
        }

        /* Stat cards */
        .stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition:
            border-color 0.3s,
            background 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(74, 222, 128, 0.25);
          background: rgba(74, 222, 128, 0.03);
        }

        /* CTA card */
        .cta-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Section labels */
        .section-eyebrow {
          font-size: 10.5px;
          font-weight: 600;
          color: #2dd4bf;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.1;
          color: #f0fdfa;
          margin-bottom: 0.65rem;
        }

        /* Marquee */
        .marquee-mask {
          mask-image: linear-gradient(
            90deg,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
        .marquee-track {
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }

        /* Profile float */
        .profile-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora,
          .marquee-track,
          .profile-float,
          .gradient-text {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
