"use client";

import { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ─── SEO (move to a separate layout/metadata file if needed) ──────────────────
// export const metadata: Metadata = {
//   title: "Craft | Tafadzwa Chiripanyanga",
//   description:
//     "Behind the build — photos, workspaces, events, and moments from the journey of Tafadzwa Chiripanyanga, fullstack developer based in South Africa.",
//   openGraph: {
//     title: "Craft | Tafadzwa Chiripanyanga",
//     description:
//       "Behind the build — photos, workspaces, events, and moments from the journey of Tafadzwa Chiripanyanga.",
//     url: "https://tafadzwa.site/Craft",
//     siteName: "Tafadzwa Chiripanyanga",
//     type: "website",
//   },
//   alternates: { canonical: "https://tafadzwa.site/Craft" },
// };
// Note: Because this is a "use client" page, export metadata from a parent
// layout.tsx or create a separate generateMetadata() in a server wrapper.

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Workspace" | "Events" | "Travel" | "Behind the Build";

type Shot = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: Category;
  /** Controls masonry visual weight: "tall" spans 2 rows, "wide" spans 2 cols */
  size?: "tall" | "wide" | "normal";
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
// Replace src values with your actual images. Uses Unsplash for placeholders.

const shots: Shot[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    alt: "Laptop with code on screen at a clean desk",
    caption: "Where the magic happens",
    category: "Workspace",
    size: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    alt: "Dual monitor setup glowing in a dark room",
    caption: "Late-night debugging session",
    category: "Workspace",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    alt: "People networking at a tech event",
    caption: "DevConf Joburg 2024",
    category: "Events",
    size: "wide",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Close-up of code on a monitor",
    caption: "Shipping the BrightFix booking flow",
    category: "Behind the Build",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Aerial view of a mountain landscape",
    caption: "Drakensberg weekend reset",
    category: "Travel",
    size: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Notebook and coffee on a wooden desk",
    caption: "Planning the Sah Veh brand direction",
    category: "Behind the Build",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Conference stage with large screen",
    caption: "Attending a local startup pitch night",
    category: "Events",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    alt: "Person typing on a MacBook in a café",
    caption: "Remote work from Rosebank",
    category: "Workspace",
    size: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    alt: "Road stretching into the horizon at sunset",
    caption: "Road trip to Durban for TtFRECH handover",
    category: "Travel",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    alt: "Code editor open with multiple files",
    caption: "Deep in the Tawedzerwa build",
    category: "Behind the Build",
    size: "tall",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    alt: "City skyline of Johannesburg at night",
    caption: "Home base — Johannesburg",
    category: "Travel",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    alt: "Group of developers collaborating around a table",
    caption: "Hackathon collab, Sandton",
    category: "Events",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Workspace",
  "Behind the Build",
  "Events",
  "Travel",
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  shots,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  shots: Shot[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const shot = shots[index];
  if (!shot) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${shot.alt}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <FiX className="text-lg" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-4 sm:left-8 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <FiChevronLeft className="text-lg" />
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-3xl max-h-[80vh] aspect-[4/3] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
        {/* Caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
          <p className="text-white font-semibold text-sm sm:text-base">
            {shot.caption}
          </p>
          <span className="text-cyan-400 text-xs font-medium mt-1 block">
            {shot.category}
          </span>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-4 sm:right-8 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <FiChevronRight className="text-lg" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-400 text-xs">
        {index + 1} / {shots.length}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CraftPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? shots
      : shots.filter((s) => s.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const goNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-24 pb-14 text-center">
          <span className="text-cyan-400 text-xs uppercase tracking-[4px] font-medium">
            Behind the build
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight tracking-tight">
            Craft
          </h1>

          <p className="text-gray-400 mt-5 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            The spaces, moments, and experiences that shape the work —
            workspaces, events, travel, and life between the commits.
          </p>

          {/* Count pill */}
          <div className="inline-flex items-center gap-2 mt-6 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-300 text-sm font-medium">
              {shots.length} moments captured
            </span>
          </div>
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── FILTER TABS ──────────────────────────────────────────────────── */}
        <section
          className="py-8 flex items-center justify-center"
          aria-label="Filter by category"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`text-xs sm:text-sm font-medium rounded-full px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-cyan-500 border-cyan-500 text-black"
                    : "bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── MASONRY GRID ─────────────────────────────────────────────────── */}
        <section
          className="pb-16"
          aria-label={`${activeCategory} photos`}
        >
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-gray-500 text-sm">
              No photos in this category yet.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((shot, i) => (
                <button
                  key={shot.id}
                  onClick={() => openLightbox(i)}
                  aria-label={`Open photo: ${shot.alt}`}
                  className={`group relative w-full overflow-hidden rounded-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    shot.size === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < 6 ? "eager" : "lazy"}
                  />

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 text-[11px] font-medium bg-black/60 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full px-2.5 py-1">
                    {shot.category}
                  </span>

                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold leading-snug text-left">
                      {shot.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-16 text-center">
          <p className="text-gray-500 text-sm">
            More moments added regularly.{" "}
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              Get in touch
            </a>{" "}
            if you&apos;d like to work together.
          </p>
        </section>
      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          shots={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </main>
  );
}
