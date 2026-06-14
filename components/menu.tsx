"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
  { label: "Blog", href: "/blog" },
  { label: "Craft", href: "/Craft" },
];

// ─── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // useEffect(() => {
  //   setOpen(false);
  // }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060a0a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 opacity-70 blur-[3px] group-hover:opacity-100 transition-opacity" />
              <span className="relative rounded-full h-2.5 w-2.5 bg-gradient-to-tr from-cyan-400 to-emerald-400" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-[#f0fdfa] group-hover:text-white transition-colors">
              Taffy
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 ${
                    active
                      ? "text-cyan-300"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="group inline-flex items-center gap-1.5 text-[12.5px] font-bold px-4 py-2 rounded-lg text-[#060a0a] transition-all duration-300"
              style={{
                background: "linear-gradient(110deg, #22d3ee, #4ade80)",
                backgroundSize: "200% auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundPosition = "right center";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(45,212,191,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundPosition = "left center";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Hire me
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute transition-all duration-300 ${open ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
            >
              <X className="w-4 h-4" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${open ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            >
              <Menu className="w-4 h-4" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#060a0a]/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-16 right-0 z-50 w-[280px] max-h-[calc(100dvh-4rem)] bg-[#0a0f0f]/95 backdrop-blur-2xl border-l border-b border-white/[0.06] rounded-bl-2xl overflow-y-auto transition-all duration-400 sm:hidden ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-400/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-emerald-400/[0.06] blur-3xl pointer-events-none" />

        <div className="relative flex flex-col p-6 gap-2">
          {navLinks.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  active
                    ? "text-cyan-300 bg-cyan-400/[0.08] border border-cyan-400/[0.15]"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
                style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              >
                {link.label}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                )}
              </Link>
            );
          })}

          <div className="h-px bg-white/[0.06] my-3" />

          <a
            href="mailto:tafadzwachiri03@outlook.com"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 text-[13px] font-bold px-5 py-3 rounded-xl text-[#060a0a]"
            style={{ background: "linear-gradient(110deg, #22d3ee, #4ade80)" }}
          >
            Hire me <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/[0.06]">
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="text-[12px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              tafadzwachiri03@outlook.com
            </a>
            <a
              href="https://wa.me/27813532248"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-slate-500 hover:text-slate-300 transition-colors"
            >
              +27 81 353 2248
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
