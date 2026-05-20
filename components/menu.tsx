// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import logo from "../public/logo2.png";
// import { RiMenu3Line } from "react-icons/ri";
// const Navbar = () => {
//   const pathname = usePathname();

//   const navItems = [
//     {
//       label: "Home",
//       href: "/",
//     },
//     {
//       label: "Projects",
//       href: "/Projects",
//     },
//     {
//       label: "Gallery",
//       href: "/Gallery",
//     },

//     // {
//     //   label: "About",
//     //   href: "/About",
//     // },
//   ];
//   return (
//     <header className="bg-linear-90 from-black to-cyan-700  w-full h-11 flex  justify-center items-center z-50 sticky top-0">
//       <nav
//         aria-label="main navbar"
//         className="container mx-3 w-full flex justify-between items-center align-middle"
//       >
//         <div className="flex w-full justify-center items-center  gap-10 ">
//           <div className=" flex justify-start items-center h-full  w-full">
//             <Link
//               href="/"
//               className="flex justify-center items-center gap-2"
//             >
//               <Image
//                 src={logo}
//                 alt="logo"
//                 width={50}
//                 height={50}
//               />
//               {/* <span className="text-white">Tafadzwa</span> */}
//             </Link>
//           </div>

//           <div className=" flex  w-full lg:flex md:flex  items-center    gap-4  ">
//             {navItems.map((item, index) => (
//               <Link
//                 href={item.href}
//                 key={index}
//                 className={`${pathname === item.href ? "text-cyan-500" : "text-white"} mx-4 hover:text-cyan-500 transition-colors duration-300 hidden lg:flex md:flex`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <div className="flex w-full h-full  justify-end">
//               <RiMenu3Line className="w-8 h-8 lg:hidden md:hidden  " />
//             </div>
//           </div>
//           <div className="col-4 flex justify-end items-center h-full  w-full">
//             <Link
//               href="mailto:tafadzwachiri03@outlook.com"
//               className="flex justify-center items-center gap-2"
//             >
//               <div className="px-3 py-1 border border-cyan-500 rounded-md hover:bg-cyan-500 transition-colors duration-300">
//                 <span className="text-white">Hire Me</span>
//               </div>
//               {/* <span className="text-white">Tafadzwa</span> */}
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../public/logo2.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/Projects",
    },
    {
      label: "Gallery",
      href: "/Gallery",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-linear-90 from-black to-cyan-700 backdrop-blur-md">
      <nav
        aria-label="main navbar"
        className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src={logo}
            alt="logo"
            width={45}
            height={45}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                transition-all duration-300
                hover:text-cyan-400
                ${pathname === item.href ? "text-cyan-400" : "text-white"}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Hire me desktop */}
          <Link
            href="mailto:tafadzwachiri03@outlook.com"
            className="hidden md:flex"
          >
            <button className="px-4 py-2 border border-cyan-500 rounded-md text-white hover:bg-cyan-500 transition-all duration-300">
              Hire Me
            </button>
          </Link>

          {/* Mobile button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
          >
            {menuOpen ? (
              <RiCloseLine className="w-7 h-7" />
            ) : (
              <RiMenu3Line className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 py-4" : "max-h-0"
        }`}
      >
        <div className="px-5 flex flex-col gap-5 bg-black/90">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`${
                pathname === item.href ? "text-cyan-400" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="mailto:tafadzwachiri03@outlook.com"
            onClick={() => setMenuOpen(false)}
          >
            <button className="w-full py-2 border border-cyan-500 rounded-md text-white hover:bg-cyan-500 transition">
              Hire Me
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
