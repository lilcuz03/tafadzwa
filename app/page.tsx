// import Image from "next/image";
// import Link from "next/link";
// import logo from "../public/logo2.png";
// import SkillCard from "@/components/skillsCard";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Tafadzwa Chiripanyanga | Fullstack Developer",
//   description:
//     "Fullstack developer building mobile apps and modern websites with React Native, Next.js, Flutter, and more. Open for freelance and full-time opportunities.",

//   openGraph: {
//     title: "Tafadzwa Chiripanyanga | Fullstack Developer",
//     description:
//       "Fullstack developer building mobile apps and modern websites with React Native, Next.js, Flutter, and more.",
//     type: "website",
//     images: [
//       {
//         url: "/images/hero.png",
//         width: 1200,
//         height: 630,
//         alt: "Fullstack developer",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Tafadzwa Chiripanyanga | Fullstack Developer",
//     description:
//       "Mobile apps and modern websites with React Native, Next.js, Flutter, and more.",
//   },
// };

// const stats = [
//   { num: "1+", label: "Years Experience" },
//   { num: "6+", label: "Tech Stacks" },
//   { num: "2+", label: "Languages" },
//   { num: "∞", label: "Ideas to Build" },
// ];

// const Home = () => {
//   return (
//     <div className="min-h-screen w-full overflow-hidden bg-linear-360 from-black via-black to-cyan-900 text-white px-4 sm:px-6 lg:px-12 pt-20 flex flex-col items-center">
//       {/* HERO */}
//       <section className="w-full max-w-7xl">
//         <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-14 lg:gap-20 mb-20">
//           {/* LEFT */}
//           <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
//             <div className="flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-full px-4 py-2">
//               <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
//               <span className="text-cyan-400 text-sm font-medium">
//                 Open for Work
//               </span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-6 leading-tight">
//               Fullstack <span className="text-cyan-400">Developer.</span>
//             </h1>

//             <p className="text-gray-400 mt-6 text-base sm:text-lg leading-8 max-w-xl">
//               I&apos;m Tafadzwa Chiripanyanga — I build mobile apps, modern
//               websites, and digital experiences using React Native, Next.js,
//               Flutter, and modern tools.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
//               <Link
//                 href="/Projects"
//                 className="bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full text-center w-full sm:w-auto hover:bg-cyan-400 transition-all hover:scale-105"
//               >
//                 View Projects →
//               </Link>

//               <a
//                 href="/cv.pdf"
//                 download="Tafadzwa_Chiripanyanga_CV.pdf"
//                 className="border border-white/10 text-gray-200 px-8 py-4 rounded-full text-center w-full sm:w-auto hover:border-cyan-500 hover:text-cyan-400 transition-all"
//               >
//                 Download CV
//               </a>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="w-full lg:w-1/2 flex justify-center">
//             <div className="relative flex items-center justify-center w-70 h-70 sm:w-90 sm:h-90 lg:w-125 lg:h-125">
//               <div
//                 className="absolute w-full h-full rounded-full border border-dotted border-cyan-500 animate-spin"
//                 style={{ animationDuration: "60s" }}
//               />

//               <div className="w-57.5 h-57.5 sm:w-75 sm:h-75 lg:w-100 lg:h-100 rounded-full border border-cyan-500/20 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
//                 <Image
//                   src={logo}
//                   alt="Tafadzwa"
//                   width={700}
//                   height={700}
//                   priority
//                   className="w-full h-full object-cover scale-105"
//                 />
//               </div>

//               <div className="absolute top-3 right-0 sm:right-2 bg-black border border-white/10 rounded-full px-3 py-2">
//                 <span className="text-[10px] sm:text-xs text-white">
//                   React Native • Flutter
//                 </span>
//               </div>

//               <div className="absolute bottom-3 left-0 sm:left-2 bg-black border border-white/10 rounded-full px-3 py-2">
//                 <span className="text-[10px] sm:text-xs text-white">
//                   NQF Level 5 Certified
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="w-full max-w-7xl h-px bg-white/10" />

//       {/* STATS */}
//       <section className="w-full max-w-5xl py-14">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
//           {stats.map((stat) => (
//             <div
//               key={stat.label}
//               className="text-center border border-white/10 rounded-2xl p-5 bg-white/3"
//             >
//               <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
//                 {stat.num}
//               </h2>

//               <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="w-full max-w-7xl h-px bg-white/10" />

//       {/* SKILLS */}
//       <section className="w-full max-w-7xl py-20">
//         <p className="text-cyan-400 text-sm uppercase tracking-[4px] text-center">
//           What I work with
//         </p>

//         <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mt-4">
//           Skills & Technologies
//         </h2>

//         <div className="mt-12">
//           <SkillCard />
//         </div>
//       </section>

//       <div className="w-full max-w-7xl h-px bg-white/10" />

//       {/* CTA */}
//       <section className="w-full py-20 flex flex-col items-center text-center">
//         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
//           Let&apos;s build something{" "}
//           <span className="text-cyan-400">great</span>
//         </h2>

//         <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-xl">
//           Open to freelance projects, internships, and full-time opportunities.
//         </p>

//         <a
//           href="mailto:tafadzwachiri03@outlook.com"
//           className="group relative overflow-hidden bg-cyan-500 text-black px-10 py-4 rounded-full font-bold mt-10 w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)]"
//         >
//           <span className="relative z-10">Hire Me →</span>

//           <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full duration-700" />
//         </a>
//       </section>
//     </div>
//   );
// };

// export default Home;

// import Image from "next/image";
// import Link from "next/link";
// import logo from "../public/logo2.png";
// import SkillCard from "@/components/skillsCard";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Tafadzwa Chiripanyanga | Fullstack Developer",
//   description:
//     "Fullstack developer building mobile apps and modern websites with React Native, Next.js, Flutter and more.",
// };

// const stats = [
//   { num: "1+", label: "Years Experience" },
//   { num: "6+", label: "Tech Stacks" },
//   { num: "2+", label: "Languages" },
//   { num: "∞", label: "Ideas to Build" },
// ];

// const Home = () => {
//   return (
//     <main className="min-h-screen overflow-hidden bg-linear-360 from-black via-black to-cyan-900 text-white">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
//         {/* HERO */}
//         <section className="min-h-[85vh] flex items-center py-16">
//           <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
//             {/* LEFT */}
//             <div className="w-full lg:w-1/2 text-center lg:text-left">
//               <div className="inline-flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-full px-4 py-2">
//                 <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

//                 <span className="text-sm text-cyan-400">Open for Work</span>
//               </div>

//               <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
//                 Fullstack <span className="text-cyan-400">Developer.</span>
//               </h1>

//               <p className="text-gray-400 mt-6 text-base sm:text-lg leading-8 max-w-xl mx-auto lg:mx-0">
//                 I&apos;m Tafadzwa Chiripanyanga — building mobile apps, modern
//                 websites, and digital experiences using React Native, Next.js,
//                 Flutter and modern tools.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
//                 <Link
//                   href="/Projects"
//                   className="bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full hover:bg-cyan-400 transition hover:scale-105"
//                 >
//                   View Projects →
//                 </Link>

//                 <a
//                   href="/cv.pdf"
//                   download
//                   className="border border-white/10 px-8 py-4 rounded-full text-gray-200 hover:border-cyan-500 hover:text-cyan-400 transition"
//                 >
//                   Download CV
//                 </a>
//               </div>
//             </div>

//             {/* RIGHT */}

//             <div className="w-full lg:w-1/2 flex justify-center">
//               <div className="relative w-70 h-70 sm:w-90 sm:h-90 lg:w-125 lg:h-125 flex items-center justify-center">
//                 <div
//                   className="absolute inset-0 rounded-full border border-dotted border-cyan-500 animate-spin"
//                   style={{
//                     animationDuration: "60s",
//                   }}
//                 />

//                 <div className="overflow-hidden rounded-full border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.2)] w-57.5 h-57.5 sm:w-75 sm:h-75 lg:w-100 lg:h-100">
//                   <Image
//                     src={logo}
//                     alt="Tafadzwa"
//                     priority
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="absolute top-6 right-0 bg-black border border-white/10 rounded-full px-3 py-2">
//                   <span className="text-xs">React Native • Flutter</span>
//                 </div>

//                 <div className="absolute bottom-6 left-0 bg-black border border-white/10 rounded-full px-3 py-2">
//                   <span className="text-xs">NQF Level 5 Certified</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="h-px bg-white/10" />

//         {/* STATS */}

//         <section className="py-16">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
//             {stats.map((stat) => (
//               <div
//                 key={stat.label}
//                 className="rounded-2xl border border-white/10 p-6 text-center bg-white/3"
//               >
//                 <h2 className="text-cyan-400 text-3xl sm:text-4xl font-bold">
//                   {stat.num}
//                 </h2>

//                 <p className="mt-2 text-gray-400 text-sm">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <div className="h-px bg-white/10" />

//         {/* SKILLS */}

//         <section className="py-20">
//           <p className="text-cyan-400 uppercase tracking-[4px] text-center text-sm">
//             What I work with
//           </p>

//           <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center font-bold mt-4">
//             Skills & Technologies
//           </h2>

//           <div className="mt-12">
//             <SkillCard />
//           </div>
//         </section>

//         <div className="h-px bg-white/10" />

//         {/* CTA */}

//         <section className="py-24 text-center">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
//             Let’s build something <span className="text-cyan-400">great</span>
//           </h2>

//           <p className="text-gray-400 mt-6 max-w-xl mx-auto text-base sm:text-lg">
//             Open to freelance projects, internships and full-time opportunities.
//           </p>

//           <a
//             href="mailto:tafadzwachiri03@outlook.com"
//             className="inline-block mt-10 px-10 py-4 rounded-full bg-cyan-500 text-black font-bold hover:scale-105 transition"
//           >
//             Hire Me →
//           </a>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Home;

import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo2.png";
import SkillCard from "@/components/skillsCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tafadzwa Chiripanyanga | Fullstack Developer",
  description:
    "Fullstack developer building mobile apps and modern websites with React Native, Next.js, Flutter, and more.",
};

const stats = [
  { num: "1+", label: "Years Experience" },
  { num: "6+", label: "Tech Stacks" },
  { num: "2+", label: "Languages" },
  { num: "∞", label: "Ideas to Build" },
];

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-linear-360 from-black via-black to-cyan-900 text-white px-4 sm:px-6 lg:px-12 pt-24 flex flex-col items-center">
      {/* HERO */}
      <section className="w-full max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-20 mb-20">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-full px-4 py-2">
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
              Flutter and modern tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <Link
                href="/Projects"
                className="bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full text-center w-full sm:w-auto hover:bg-cyan-400 transition-all hover:scale-105"
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
            <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[500px] lg:h-[500px]">
              <div
                className="absolute w-full h-full rounded-full border border-dotted border-cyan-500 animate-spin"
                style={{ animationDuration: "60s" }}
              />

              <div className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-cyan-500/20 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <Image
                  src={logo}
                  alt="Tafadzwa"
                  width={700}
                  height={700}
                  priority
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              <div className="absolute top-4 right-0 sm:right-2 bg-black border border-white/10 rounded-full px-3 py-2">
                <span className="text-[10px] sm:text-xs text-white">
                  React Native • Flutter
                </span>
              </div>

              <div className="absolute bottom-4 left-0 sm:left-2 bg-black border border-white/10 rounded-full px-3 py-2">
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
      <section className="w-full max-w-7xl py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center border border-white/10 rounded-2xl p-5 bg-white/3"
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

      {/* CTA */}
      <section className="w-full py-20 flex flex-col items-center text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Let&apos;s build something{" "}
          <span className="text-cyan-400">great</span>
        </h2>

        <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-xl">
          Open to freelance projects, internships and full-time opportunities.
        </p>

        <a
          href="mailto:tafadzwachiri03@outlook.com"
          className="group relative overflow-hidden bg-cyan-500 text-black px-10 py-4 rounded-full font-bold mt-10 w-full sm:w-auto transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10">Hire Me →</span>
        </a>
      </section>
    </div>
  );
};

export default Home;
