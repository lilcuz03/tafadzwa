import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo2.png";
import SkillCard from "@/components/skillsCard";
import { Metadata } from "next";
import { FaReact, FaMobileAlt, FaGlobe, FaServer } from "react-icons/fa";
import { SiFlutter, SiNextdotjs } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "Tafadzwa Chiripanyanga | Fullstack Developer",
  description:
    "Fullstack developer building mobile apps and modern websites with React Native, Next.js, Flutter, and more. Open for freelance and full-time opportunities.",
  openGraph: {
    title: "Tafadzwa Chiripanyanga | Fullstack Developer",
    description:
      "Fullstack developer building mobile apps and modern websites with React Native, Next.js, Flutter, and more.",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Fullstack developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tafadzwa Chiripanyanga | Fullstack Developer",
    description:
      "Mobile apps and modern websites with React Native, Next.js, Flutter, and more.",
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { num: "1+", label: "Years Experience" },
  { num: "6+", label: "Tech Stacks" },
  { num: "10+", label: "Projects Built" },
  { num: "∞", label: "Ideas to Build" },
];

const services = [
  {
    icon: FaMobileAlt,
    title: "Mobile Development",
    description:
      "Cross-platform apps built with React Native and Flutter that feel native on both iOS and Android.",
  },
  {
    icon: FaGlobe,
    title: "Web Development",
    description:
      "Modern, performant websites and web apps using Next.js, React, and Tailwind CSS.",
  },
  {
    icon: FaServer,
    title: "Backend & APIs",
    description:
      "RESTful APIs, database design, and server-side logic that power your applications.",
  },
  {
    icon: FaReact,
    title: "UI / UX Engineering",
    description:
      "Pixel-perfect interfaces with smooth animations that turn designs into real, working products.",
  },
];

const techBadges = [
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: FaReact, label: "React Native" },
  { icon: SiFlutter, label: "Flutter" },
];

// ─── Divider ─────────────────────────────────────────────────────────────────

const Divider = () => <div className="w-full max-w-7xl h-px bg-white/10" />;

// ─── Page ────────────────────────────────────────────────────────────────────

const Home = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-black text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">
                Open for Work
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-6 leading-[1.1] tracking-tight">
              Fullstack <span className="text-cyan-400">Developer.</span>
            </h1>

            <p className="text-gray-400 mt-5 text-base sm:text-lg leading-7 max-w-lg">
              I&apos;m{" "}
              <span className="text-white font-medium">
                Tafadzwa Chiripanyanga
              </span>{" "}
              — I build mobile apps, modern websites, and digital experiences
              using React Native, Next.js, Flutter, and modern tools. Based in
              South Africa.
            </p>

            {/* Tech pill badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5">
              {techBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300"
                >
                  <Icon className="text-cyan-400" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
              <Link
                href="/Projects"
                className="bg-cyan-500 text-black font-semibold px-8 py-3.5 rounded-full text-center hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100"
              >
                View Projects →
              </Link>
              <a
                href="/cv.pdf"
                download="Tafadzwa_Chiripanyanga_CV.pdf"
                className="border border-white/15 text-gray-300 px-8 py-3.5 rounded-full text-center hover:border-cyan-500/60 hover:text-cyan-400 transition-all duration-200"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative flex items-center justify-center w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px]">
              {/* Spinning ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-spin"
                style={{ animationDuration: "50s" }}
              />

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/5" />

              {/* Photo */}
              <div className="w-[210px] h-[210px] sm:w-[280px] sm:h-[280px] lg:w-[385px] lg:h-[385px] rounded-full border border-cyan-500/20 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.12)]">
                <Image
                  src={logo}
                  alt="Tafadzwa Chiripanyanga"
                  width={700}
                  height={700}
                  priority
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              {/* Floating chip — top right */}
              <div className="absolute top-5 right-0 lg:-right-2 bg-black border border-white/10 rounded-full px-3 py-1.5 shadow-lg">
                <span className="text-[10px] sm:text-xs text-white whitespace-nowrap">
                  React Native • Flutter
                </span>
              </div>

              {/* Floating chip — bottom left */}
              <div className="absolute bottom-5 left-0 lg:-left-2 bg-black border border-white/10 rounded-full px-3 py-1.5 shadow-lg">
                <span className="text-[10px] sm:text-xs text-white whitespace-nowrap">
                  NQF Level 5 Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-5 sm:px-8 lg:px-10">
        <Divider />
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center border border-white/10 rounded-2xl p-6 bg-white/[0.03] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400">
                {stat.num}
              </p>
              <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center px-5 sm:px-8 lg:px-10">
        <Divider />
      </div>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-cyan-400 text-xs uppercase tracking-[4px] text-center">
          What I do
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-3">
          Services
        </h2>
        <p className="text-gray-400 text-center mt-4 max-w-xl mx-auto text-sm sm:text-base leading-7">
          End-to-end development across mobile and web — from concept to
          deployment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group flex flex-col gap-4 border border-white/10 rounded-2xl p-6 bg-white/[0.03] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Icon className="text-cyan-400 text-lg" />
                </div>
                <h3 className="text-white font-semibold text-base">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-6">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex justify-center px-5 sm:px-8 lg:px-10">
        <Divider />
      </div>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-cyan-400 text-xs uppercase tracking-[4px] text-center">
          What I work with
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-3">
          Skills & Technologies
        </h2>
        <p className="text-gray-400 text-center mt-4 max-w-xl mx-auto text-sm sm:text-base leading-7">
          A growing toolkit across mobile, web, backend, and design.
        </p>
        <div className="mt-12">
          <SkillCard />
        </div>
      </section>

      <div className="flex justify-center px-5 sm:px-8 lg:px-10">
        <Divider />
      </div>

      {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Left label */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <p className="text-cyan-400 text-xs uppercase tracking-[4px]">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              A little more <br />
              <span className="text-cyan-400">about me</span>
            </h2>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-5 text-gray-400 text-sm sm:text-base leading-7">
            <p>
              I&apos;m a South African fullstack developer with an NQF Level 5
              certification, passionate about building software that solves real
              problems. My work spans mobile apps, responsive websites, and the
              backend logic that connects them.
            </p>
            <p>
              I care deeply about clean code, good design, and user experience —
              not just making things work, but making them feel right. Whether
              it&apos;s a startup MVP or a polished consumer app, I bring the
              same level of attention to every project.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "Problem Solver",
                "Clean Code Advocate",
                "Fast Learner",
                "Team Player",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-white/10 rounded-full px-3 py-1 text-gray-300 bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-5 sm:px-8 lg:px-10">
        <Divider />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-24 flex flex-col items-center text-center">
        <p className="text-cyan-400 text-xs uppercase tracking-[4px]">
          Let&apos;s work together
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight max-w-2xl">
          Let&apos;s build something{" "}
          <span className="text-cyan-400">great</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mt-5 max-w-lg leading-7">
          Open to freelance projects, internships, and full-time opportunities.
          If you have an idea, I&apos;d love to hear it.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <a
            href="mailto:tafadzwachiri03@outlook.com"
            className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-black font-bold px-10 py-4 rounded-full w-full sm:w-auto hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100"
          >
            <MdEmail className="text-lg" />
            Hire Me
          </a>
          <Link
            href="/Projects"
            className="inline-flex items-center justify-center border border-white/15 text-gray-300 px-10 py-4 rounded-full w-full sm:w-auto hover:border-cyan-500/60 hover:text-cyan-400 transition-all duration-200"
          >
            See My Work →
          </Link>
        </div>

        {/* Contact nudge */}
        <p className="text-gray-600 text-sm mt-8">
          or reach out directly at{" "}
          <a
            href="mailto:tafadzwachiri03@outlook.com"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 underline underline-offset-4"
          >
            tafadzwachiri03@outlook.com
          </a>
        </p>
      </section>
    </main>
  );
};

export default Home;
