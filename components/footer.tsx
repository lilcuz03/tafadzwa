"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import {
  MessageCircle,
  Mail,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
  { label: "Gallery", href: "/Gallery" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/tafadzwa", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/tafadzwa",
    icon: FaLinkedin,
  },
  { label: "WhatsApp", href: "https://wa.me/27813532248", icon: MessageCircle },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_tafadzwa_03",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tafadzwa.chiripanyanga.87727",
    icon: FaFacebook,
  },
];

const techStack = [
  "Next.js",
  "React Native",
  "Flutter",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
];

// ─── Reveal hook ───────────────────────────────────────────────────────────────

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
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative bg-[#060a0a] border-t border-white/[0.06] overflow-hidden">
      {/* ── Aurora glows ──────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/[0.04] blur-[100px]" />
        <div className="absolute -bottom-32 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-400/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Top CTA strip ───────────────────────────────────────────── */}
        <Reveal>
          <div className="py-10 border-b border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[clamp(1.1rem,2.5vw,1.35rem)] font-semibold text-[#f0fdfa] tracking-tight leading-snug">
                Let&apos;s build something{" "}
                <span className="gradient-text">great together.</span>
              </p>
              <p className="text-[13px] text-slate-500 mt-1.5 font-light">
                Open to freelance, remote work, and new ideas.
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

        {/* ── Main grid ───────────────────────────────────────────────── */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-[1.2fr_0.8fr_1fr] gap-10 sm:gap-8">
          {/* Col 1: Brand + socials */}
          <Reveal>
            <div className="flex flex-col gap-5">
              {/* Logo */}
              <Link
                href="/"
                className="group inline-flex items-center gap-2 w-fit"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 opacity-70 blur-[3px] group-hover:opacity-100 transition-opacity" />
                  <span className="relative rounded-full h-2.5 w-2.5 bg-gradient-to-tr from-cyan-400 to-emerald-400" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-[#f0fdfa] group-hover:text-white transition-colors">
                  Taffy
                </span>
              </Link>

              <p className="text-[13px] text-slate-500 leading-[1.7] font-light max-w-[260px]">
                Zimbabwean fullstack developer based in Durban, South Africa.
                Building mobile apps and web platforms that ship.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2 mt-1">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] transition-all duration-200"
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        strokeWidth={1.8}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Col 2: Navigation */}
          <Reveal delay={0.08}>
            <div>
              <p className="text-[10.5px] font-semibold text-cyan-400/70 uppercase tracking-[0.12em] mb-4">
                Navigation
              </p>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-[#f0fdfa] transition-colors py-1.5 font-light w-fit"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-cyan-400" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Col 3: Contact + stack */}
          <Reveal delay={0.16}>
            <div>
              <p className="text-[10.5px] font-semibold text-cyan-400/70 uppercase tracking-[0.12em] mb-4">
                Contact
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                <a
                  href="mailto:tafadzwachiri03@outlook.com"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-[#f0fdfa] transition-colors font-light"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  tafadzwachiri03@outlook.com
                </a>
                <a
                  href="https://wa.me/27813532248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-[#f0fdfa] transition-colors font-light"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  +27 81 353 2248
                </a>
                <span className="inline-flex items-center gap-2 text-[13px] text-slate-500 font-light">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  Durban · Remote
                </span>
              </div>

              {/* Tech pills */}
              <p className="text-[10.5px] font-semibold text-cyan-400/70 uppercase tracking-[0.12em] mb-3">
                Built with
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] text-slate-500 bg-white/[0.03] border border-white/[0.06] rounded-md px-2 py-0.5 font-medium hover:border-cyan-400/20 hover:text-cyan-300/80 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11.5px] text-slate-600 font-light text-center sm:text-left">
              © {new Date().getFullYear()} Tafadzwa Chiripanyanga. All rights
              reserved.
            </p>
            {/* <p className="text-[11.5px] text-slate-600 font-light inline-flex items-center gap-1.5">
              Built with
              <span className="gradient-text font-medium">Next.js</span>&
              <span className="gradient-text font-medium">Tailwind CSS</span>
            </p> */}
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
          box-shadow: 0 0 0 rgba(45, 212, 191, 0);
        }
        .btn-glow:hover {
          background-position: right center;
          box-shadow: 0 6px 25px rgba(45, 212, 191, 0.3);
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .gradient-text {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
