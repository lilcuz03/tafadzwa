"use client";

import { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Globe,
  Code2,
  Triangle,
  Database,
  Leaf,
  Camera,
  Palette,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const skills = [
  {
    icon: Smartphone,
    name: "React Native",
    category: "Mobile Development",
  },
  {
    icon: Smartphone,
    name: "Flutter",
    category: "Mobile Development",
  },
  {
    icon: Code2,
    name: "React",
    category: "Frontend Development",
  },
  {
    icon: Triangle,
    name: "Next.js",
    category: "Frontend Development",
  },
  {
    icon: Database,
    name: "Supabase",
    category: "Backend Development",
  },
  {
    icon: Leaf,
    name: "MongoDB",
    category: "Backend Development",
  },
  {
    icon: Camera,
    name: "Photography",
    category: "Creative",
  },
  {
    icon: Palette,
    name: "Canva & Design",
    category: "Creative",
  },
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function SkillCard() {
  const { ref, shown } = useReveal();

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {skills.map((skill, i) => {
        const Icon = skill.icon;
        return (
          <div
            key={skill.name}
            className="group relative rounded-2xl p-5 flex flex-col items-center text-center gap-3 cursor-default overflow-hidden
              bg-white/[0.02] border border-white/[0.06]
              hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]
              transition-all duration-300"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s, border-color 0.3s, background 0.3s`,
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyan-400/10 blur-2xl" />
            </div>

            {/* Icon */}
            <div
              className="relative w-11 h-11 rounded-xl flex items-center justify-center
              bg-linear-to-br from-cyan-400/15 to-emerald-400/15
              border border-cyan-400/20
              group-hover:scale-110 group-hover:-rotate-3
              transition-transform duration-300"
            >
              <Icon
                className="w-5 h-5 text-cyan-300"
                strokeWidth={1.8}
              />
            </div>

            {/* Name */}
            <p className="text-[13.5px] font-semibold text-slate-200 tracking-tight relative">
              {skill.name}
            </p>

            {/* Category */}
            <p className="text-[11px] text-slate-500 font-medium -mt-1">
              {skill.category}
            </p>
          </div>
        );
      })}
    </div>
  );
}
