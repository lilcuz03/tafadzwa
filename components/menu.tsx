"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../public/logo2.png";
const Navbar = () => {
  const pathname = usePathname();

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

    // {
    //   label: "About",
    //   href: "/About",
    // },
  ];
  return (
    <header className="bg-linear-90 from-black to-cyan-700  w-full h-11 flex  justify-center items-center z-50 sticky top-0">
      <nav
        aria-label="main navbar"
        className="container mx-3 w-full flex justify-between items-center align-middle"
      >
        <div className="flex w-full justify-center items-center  gap-10 ">
          <div className="col-4 flex justify-start items-center h-full  w-full">
            <Link
              href="/"
              className="flex justify-center items-center gap-2"
            >
              <Image
                src={logo}
                alt="logo"
                width={50}
                height={50}
              />
              {/* <span className="text-white">Tafadzwa</span> */}
            </Link>
          </div>

          <div className="col-4 w-full flex justify-between items-center  gap-4">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`${pathname === item.href ? "text-cyan-500" : "text-white"} hover:text-cyan-500 transition-colors duration-300`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="col-4 flex justify-end items-center h-full  w-full">
            <Link
              href="mailto:tafadzwachiri03@outlook.com"
              className="flex justify-center items-center gap-2"
            >
              <div className="px-3 py-1 border border-cyan-500 rounded-md hover:bg-cyan-500 transition-colors duration-300">
                
                  <span className="text-white">Hire Me</span>
                
              </div>
              {/* <span className="text-white">Tafadzwa</span> */}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
