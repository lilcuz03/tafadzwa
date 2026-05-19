import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo2.png";
import SkillCard from "@/components/skillsCard";
import { Metadata } from "next";

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

const stats = [
  { num: "1+", label: "Years Experience" },
  { num: "6+", label: "Tech Stacks" },
  { num: "2+", label: "Languages" },
  { num: "∞", label: "Ideas to Build" },
];

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-linear-to-b from-black via-black to-cyan-950 text-white px-4 sm:px-6 lg:px-10 pt-20 flex flex-col items-center">
      {/* HERO */}
      <section className="w-full max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-20">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 bg-black border border-cyan-500/20 rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />

              <span className="text-cyan-400 text-sm font-medium">
                Open for Work
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-6 leading-tight">
              Fullstack <span className="text-cyan-400">Developer.</span>
            </h1>

            <p className="text-gray-400 mt-6 text-base sm:text-lg leading-8 max-w-xl">
              I&apos;m Tafadzwa Chiripanyanga — I build mobile apps, modern
              websites, and digital experiences using React Native, Next.js,
              Flutter, and modern tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <Link
                href="/Projects"
                className="bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full text-center w-full sm:w-auto hover:bg-cyan-400 transition-all"
              >
                View Projects →
              </Link>

              <a
                href="/cv.pdf"
                download="Tafadzwa_Chiripanyanga_CV.pdf"
                className="border border-white/10 text-gray-200 px-8 py-4 rounded-full text-center w-full sm:w-auto hover:border-cyan-500 hover:text-cyan-400 transition-all"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72 lg:w-105 lg:h-105">
              <div
                className="absolute w-full h-full rounded-full border border-dotted border-cyan-500 animate-spin"
                style={{ animationDuration: "60s" }}
              />

              <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-85 lg:h-85 rounded-full border border-white/20 overflow-hidden bg-black">
                <Image
                  src={logo}
                  alt="Tafadzwa"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-3 right-0 sm:right-2 bg-black border border-white/10 rounded-full px-3 py-2">
                <span className="text-[10px] sm:text-xs text-white">
                  React Native • Flutter
                </span>
              </div>

              <div className="absolute bottom-3 left-0 sm:left-2 bg-black border border-white/10 rounded-full px-3 py-2">
                <span className="text-[10px] sm:text-xs text-white">
                  NQF Level 5 Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl h-px bg-white/10" />

      {/* STATS */}

      <section className="w-full max-w-5xl py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center border border-white/10 rounded-2xl p-5 bg-white/2"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                {stat.num}
              </h2>

              <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full max-w-7xl h-px bg-white/10" />

      {/* SKILLS */}

      <section className="w-full max-w-7xl py-20">
        <p className="text-cyan-400 text-sm uppercase tracking-[4px] text-center">
          What I work with
        </p>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mt-4">
          Skills & Technologies
        </h2>

        <div className="mt-12">
          <SkillCard />
        </div>
      </section>

      <div className="w-full max-w-7xl h-px bg-white/10" />

      {/* CERTIFICATION */}

      <section className="w-full py-20 max-w-5xl">
        <p className="text-cyan-400 text-center uppercase text-sm tracking-[4px]">
          Qualifications
        </p>

        <h2 className="text-3xl sm:text-5xl font-bold text-center mt-4 mb-12">
          Certified & Qualified
        </h2>

        <div className="p-6 rounded-3xl border border-white/10 flex flex-col lg:flex-row gap-6 items-center bg-white/2">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-cyan-500/10 border border-white/10 text-4xl">
            🏆
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-bold text-xl sm:text-2xl">
              National Certificate: Information Technology — Systems Development
            </h3>

            <p className="text-gray-400 text-sm sm:text-base mt-3">
              MICT SETA · Academic Institute of Excellence · NQF Level 5 · NLRD
              No. 48872 · Issued April 2025
            </p>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2">
            <p className="text-cyan-400 text-sm">Verified ✓</p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl h-px bg-white/10" />

      {/* CTA */}

      <section className="w-full py-20 flex flex-col items-center text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Let&apos;s build something{" "}
          <span className="text-cyan-400">great</span>
        </h2>

        <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-xl">
          Open to freelance projects, internships, and full-time opportunities.
        </p>

        <a
          href="mailto:tafadzwachiri03@outlook.com"
          className="bg-cyan-500 text-black px-8 py-4 rounded-full font-semibold mt-10 w-full sm:w-auto hover:bg-cyan-400 transition-all"
        >
          Get in Touch
        </a>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="mailto:tafadzwachiri03@outlook.com"
            className="text-gray-400 hover:text-cyan-400"
          >
            tafadzwachiri03@outlook.com
          </a>

          <a
            href="tel:+27813532248"
            className="text-gray-400 hover:text-cyan-400"
          >
            +27 81 353 2248
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
