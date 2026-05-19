import Image from "next/image";
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
        url: "images/hero.png",
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
const About = () => {
  return (
    <div className="bg-black min-h-screen pt-20 flex flex-col bg-linear-360 from-black to-cyan-900 justify-center  items-center-safe px-6">
      <div className="flex mb-10 lg:flex-row md:flex-row flex-col w-full  gap-4 gap-y-5 ">
        <div className=" flex flex-col  min-h-24 w-full lg:w-1/2 md:w-1/2">
          <div className="flex flex-row lg:flex-row md:flex-row  gap-2   justify-between rounded-full items-center bg-black  lg:min-w-1/4 lg:max-w-50 md:w-50 w-50 p-3 lg:p-2">
            <div className="h-4 w-4 bg-cyan-600 animate-pulse rounded-full  "></div>
            <h3 className="line-clamp-1">Open for Work</h3>
          </div>
          <h1 className="lg:text-8xl  text-5xl font-bold mt-4">
            Fullstack <span className="text-cyan-500 ">Developer.</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            I&apos;m Tafadzwa Chiripanyanga — I build mobile apps, modern
            websites, and creative digital experiences using React Native,
            Next.js, Flutter, and more.
          </p>
          <div className="flex flex-row gap-4 mt-6">
            <a
              className="bg-cyan-500 text-black px-4 py-2 rounded-md  hover:bg-cyan-600 transition duration-300"
              href="/Projects"
            >
              View Projects
            </a>
            <button className="bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md  hover:bg-gray-500 hover:text-black transition duration-300">
              <a
                href="./cv.pdf"
                download={"./cv.pdf"}
              >
                Resume
              </a>
            </button>
          </div>
        </div>

        {/* second div  */}

        <div className="flex items-center p-6 justify-center w-full h-full lg:w-1/2 md:w-1/2">
          <div className=" relative items-center p3 justify-center flex items-cover w-120 h-120  ">
            <div
              className="lg:h-full lg:w-full md:w-100  md:h-100 w-110 h-110  border border-dotted animate-spin border-cyan-500 rounded-full  absolute"
              style={{ animationDuration: "60s" }}
            />
            <div className="lg:h-90 lg:w-90 md:w-80  md:h-80 w-100 h-100   border border-white  rounded-full flex flex-col mb-4    p-3">
              <div className="w-full flex  items-end justify-end absolute  ">
                <div className="flex flex-row lg:flex-row md:flex-row  gap-2  justify-between rounded-full items-center bg-black  lg:min-w-1/4 lg:max-w-50 md:w-50 w-50 p-2 lg:p-2">
                  <div className="h-4 w-4 bg-cyan-600 animate-pulse rounded-full "></div>
                  <h3 className="line-clamp-1">React Native · Flutter</h3>
                </div>
              </div>

              <Image
                src={logo}
                alt="Logo"
                className="w-full h-auto object-cover rounded-lg "
              />

              <div className="w-full flex  items-center justify-start absolute bottom-0  ">
                <div className="flex flex-row lg:flex-row md:flex-row  gap-2  justify-between rounded-full items-center bg-black  lg:min-w-1/4 lg:max-w-50 md:w-50 w-50 p-2 lg:p-2">
                  <div className="h-4 w-4 bg-cyan-600 animate-pulse rounded-full "></div>
                  <h3 className="line-clamp-1">ONQF Level 5 Certified</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  h-px bg-white my-10"></div>
      <div className="flex flex-row w-full items-center justify-center py-3 gap-10">
        <div className="flex flex-col items-center justify-center ">
          <h2 className="text-4xl font-bold text-center text-cyan-500 ">1+</h2>
          <p className="text-gray-400 text-center text-lg">
            Years of Experience
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-4xl font-bold text-center text-cyan-500 ">6+</h2>
          <p className="text-gray-400 text-center text-lg">Tech Stacks</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-4xl font-bold text-center text-cyan-500 ">2+</h2>
          <p className="text-gray-400 text-center text-lg">Languages</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-4xl font-bold text-center text-cyan-500 "> ♾️</h2>
          <p className="text-gray-400 text-center text-lg">Ideads to build</p>
        </div>
      </div>

      <div className="w-full  p-6  my-10 justify-center items-center flex flex-col gap-4">
        <p className="text-cyan-500">What i work with</p>
        <h2 className="lg:text-8xl  text-5xl font-bold text-center text-white mt-3">
          Skills & Technologies
        </h2>
        <SkillCard />
      </div>
      <div className="w-full  flex flex-col justify-center items-center  my-10">
        <p className="text-cyan-500">Qualifications</p>
        <h2 className="lg:text-8xl  text-5xl font-bold text-center text-white mt-3">
          Certified & Qualified
        </h2>
        <div className="w-full  p-6 min-h-80 lg:w-3/4  md:w-3/4  ">
          <div className="w-full p-3  border border-white rounded-xl min-h-100  justify-center items-center flex flex-col gap-4 hover:border-black hover:shadow hover:shadow-cyan-500 duration-1000 transform hover:scale-95">
            <div className="w-full min-h-60 flex flex-col gap-4 p-4   rounded-xl lg:flex-row md:flex-wrap    justify-center items-center">
              <div className="lg:w-1/10 md:w-1/10 h-auto w-full   rounded-xlg flex items-center justify-center">
                <div className="flex justify-center items-center h-25  border border-gray-800 p-2 rounded-xl">
                  <h1 className="text-6xl">🏆</h1>
                </div>
              </div>
              <div className="lg:w-1/2-16  mx-3 h-auto w-full md-flex-wrap flex flex-col justify-center items-start gap-2 p-4">
                <h1 className="font-bold text-2xl lg:text-4xl md:text-4xl text-center w-full">
                  National Certificate: Information Technology — Systems
                  Development
                </h1>
                <p className="my-3 text-gray-200 text-center w-full">
                  MICT SETA · Academic Institute of Excellence · NQF Level 5 ·
                  NLRD No. 48872 Issued 30 April 2025
                </p>
              </div>
              <div className="lg:w-2/10 md:w-3/10 w-full p-3 justify-center items-center flex rounded-xl border border-white h-12">
                <p className="text-cyan-500">Verified ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  p-6   justify-center items-center flex flex-col ">
        <h1 className="lg:text-8xl  text-5xl text-cyan-500 font-bold w-full text-center ">
          Let&apos;s build something great
        </h1>
      </div>
      <p className="text-gray-200 text-2xl text-center w-full ">
        Open to freelance projects, internships, and full-time opportunities.
      </p>
      <a className=""></a>

      <p className="my-7">
        Or email me at{" "}
        <a
          href="mailto:tafadzwachiri03@outlook.com"
          className="cursor-pointer text-cyan-500 "
        >
          tafadzwachiri03@outlook.com
        </a>
        <a
          href="tel:+27813532248"
          className="ml-4 text-cyan-500 cursor-pointer animate-pulse duration-1000"
        >
          +27 81 353 2248
        </a>
      </p>
    </div>
  );
};

export default About;
