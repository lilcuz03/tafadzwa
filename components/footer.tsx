import React from "react";
import { FaFacebookMessenger, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full  py-4 flex flex-col justify-center items-center bg-black">
      <div className="w-full animate-pulse border border-gray-400 h-0.5 "></div>
      <div className="w-full h-20 my-1 p-6 flex  gap-4 justify-center items-center ">
        <a href="https://wa.me/27813532248">
          <FaWhatsapp className="text-green-500 text-4xl animate-pulse" />
        </a>
        <a href="https://www.facebook.com/tafadzwa.chiripanyanga.87727/">
          <FaFacebookMessenger className="text-blue-500 text-4xl animate-pulse" />
        </a>

        <a
          href="https://www.instagram.com/_tafadzwa_03
"
        >
          <FaInstagram className="text-pink-500 text-4xl animate-pulse" />
        </a>
        <a
          href="https://www.tiktok.com/@_tafadzwa_03?is_from_webapp=1&sender_device=pc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-gray-500 text-4xl animate-pulse" />
        </a>
      </div>
      <div className="w-full px-25 justify-center items-center flex flex-col mb-3 ">
        <p>© {currentYear} Tafadzwa Chiripanyanga</p>
      </div>
    </footer>
  );
};

export default Footer;
