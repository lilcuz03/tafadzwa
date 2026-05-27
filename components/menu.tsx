"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import logo from "../public/logo2.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
  { label: "Gallery", href: "/Gallery" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle background shift on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-black border-b border-white/5"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between"
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group"
          aria-label="Go to homepage"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors duration-300">
            <Image
              src={logo}
              alt="Tafadzwa logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="hidden sm:block text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 tracking-wide">
            Tafadzwa
          </span>
        </Link>

        {/* ── Desktop nav links ─────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Right section ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Hire Me — desktop */}
          <a
            href="mailto:tafadzwachiri03@outlook.com"
            className="hidden md:inline-flex items-center gap-2 bg-cyan-500 text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100"
          >
            <MdEmail className="text-base" />
            Hire Me
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <RiCloseLine className="w-5 h-5" />
            ) : (
              <RiMenu3Line className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 border-t border-white/10 px-5 sm:px-8 py-5 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <a
            href="mailto:tafadzwachiri03@outlook.com"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 bg-cyan-500 text-black text-sm font-bold px-5 py-3 rounded-full hover:bg-cyan-400 transition-all duration-200"
          >
            <MdEmail className="text-base" />
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
