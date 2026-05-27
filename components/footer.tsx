import Link from "next/link";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socialLinks = [
  {
    icon: FaWhatsapp,
    href: "https://wa.me/27813532248",
    label: "WhatsApp",
    color: "hover:text-green-400",
  },
  {
    icon: FaFacebookMessenger,
    href: "https://www.facebook.com/tafadzwa.chiripanyanga.87727/",
    label: "Facebook",
    color: "hover:text-blue-400",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/_tafadzwa_03",
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@_tafadzwa_03",
    label: "TikTok",
    color: "hover:text-white",
  },
  {
    icon: FaGithub,
    href: "https://github.com/",
    label: "GitHub",
    color: "hover:text-cyan-400",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/",
    label: "LinkedIn",
    color: "hover:text-cyan-400",
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
  { label: "Gallery", href: "/Gallery" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t border-white/10">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-cyan-400 tracking-wide">
              Tafadzwa Chiripanyanga
            </h3>
            <p className="text-gray-400 text-sm leading-6 max-w-xs">
              Fullstack developer building mobile apps and modern websites with
              React Native, Next.js, Flutter, and more. Based in South Africa.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-xs font-medium">
                Open for Work
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-[3px]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-[3px]">
              Get In Touch
            </h3>
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="flex items-center gap-2 text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200"
            >
              <MdEmail className="text-lg shrink-0" />
              tafadzwachiri03@outlook.com
            </a>
            <a
              href="https://wa.me/27813532248"
              className="flex items-center gap-2 text-gray-400 text-sm hover:text-green-400 transition-colors duration-200"
            >
              <FaWhatsapp className="text-lg shrink-0" />
              +27 81 353 2248
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-gray-500 text-xl transition-colors duration-200 ${color}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} Tafadzwa Chiripanyanga. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
