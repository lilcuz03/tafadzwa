"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Tag,
  Search,
  Mail,
  ArrowRight,
} from "lucide-react";
import { posts, categories } from "@/lib/blog-data";

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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <main className="relative min-h-screen bg-[#060a0a] text-[#f0fdfa] antialiased overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-400/[0.06] blur-[100px] animate-[drift1_18s_ease-in-out_infinite]" />
        <div className="absolute top-[50%] -right-32 w-[400px] h-[400px] rounded-full bg-emerald-400/[0.05] blur-[100px] animate-[drift2_22s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <section className="pt-[clamp(6rem,10vw,8rem)] pb-[clamp(1.5rem,3vw,2.5rem)]">
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
            <p className="text-[10.5px] font-semibold text-cyan-400/80 uppercase tracking-[0.12em] mb-3">
              Blog
            </p>
            <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.06] mb-4">
              Thoughts & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-slate-400 max-w-[500px] leading-[1.75] font-light">
              Writing about development, mobile apps, freelancing in South
              Africa, and the tech that powers modern products.
            </p>
          </Reveal>
        </section>

        {/* ── Filters + Search ─────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-y border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
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

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[220px] bg-white/[0.02] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-[13px] text-slate-300 placeholder:text-slate-600 outline-none focus:border-cyan-400/30 focus:bg-white/[0.04] transition-all"
              />
            </div>
          </div>
        </Reveal>

        {/* ── Featured posts ──────────────────────────────────────────── */}
        {featured.length > 0 && (
          <section className="py-[clamp(2rem,4vw,3rem)]">
            <Reveal>
              <p className="text-[10.5px] font-semibold text-slate-600 uppercase tracking-[0.12em] mb-5">
                Featured
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featured.map((post, i) => (
                <Reveal
                  key={post.slug}
                  delay={i * 0.08}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full overflow-hidden hover:border-cyan-400/25 transition-all duration-400"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none">
                      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-400/[0.07] blur-[50px]" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-0.5">
                          <Tag className="w-2.5 h-2.5 text-cyan-400" />
                          <span className="text-[10.5px] text-cyan-300 font-medium">
                            {post.category}
                          </span>
                        </span>
                        <span className="text-[11px] text-slate-600">
                          Featured
                        </span>
                      </div>
                      <h2 className="text-[17px] font-semibold tracking-[-0.02em] leading-[1.35] mb-3 text-slate-100 group-hover:text-white transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[13px] text-slate-500 leading-[1.7] font-light mb-5">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[11.5px] text-slate-600">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="text-[12px] text-cyan-400/70 font-medium inline-flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                          Read{" "}
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── All posts ───────────────────────────────────────────────── */}
        <section className="pb-[clamp(2rem,4vw,3rem)]">
          {featured.length > 0 && rest.length > 0 && (
            <Reveal>
              <p className="text-[10.5px] font-semibold text-slate-600 uppercase tracking-[0.12em] mb-5 pt-2 border-t border-white/[0.06]">
                All Posts
              </p>
            </Reveal>
          )}

          {filtered.length === 0 && (
            <Reveal>
              <div className="flex flex-col items-center text-center py-16">
                <Search className="w-8 h-8 text-slate-700 mb-4" />
                <p className="text-[15px] font-medium text-slate-400 mb-1">
                  No posts found
                </p>
                <p className="text-[13px] text-slate-600 font-light">
                  Try a different category or search term.
                </p>
              </div>
            </Reveal>
          )}

          <div className="flex flex-col gap-2">
            {(featured.length > 0 ? rest : filtered).map((post, i) => (
              <Reveal
                key={post.slug}
                delay={i * 0.05}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start sm:items-center justify-between gap-4 py-5 px-1 border-b border-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] text-cyan-400/60 font-medium bg-cyan-400/[0.06] rounded px-2 py-0.5">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-slate-600 inline-flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-slate-200 group-hover:text-white transition-colors leading-snug mb-1">
                      {post.title}
                    </h3>
                    <p className="text-[12.5px] text-slate-500 font-light leading-relaxed line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden sm:inline text-[11px] text-slate-600 whitespace-nowrap">
                      {post.readTime}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-600 group-hover:text-cyan-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/[0.06] transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <Reveal>
          <div className="border-t border-white/[0.06] py-12 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[clamp(1rem,2.5vw,1.2rem)] font-semibold tracking-tight">
                Want to work together?{" "}
                <span className="gradient-text">Let&apos;s talk.</span>
              </p>
              <p className="text-[13px] text-slate-500 mt-1 font-light">
                Always open to interesting projects and conversations.
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
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
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
