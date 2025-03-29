"use client";
import Link from "next/link";
import React, { useState, FC } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

interface NAVLINK {
  title: string;
  path: string;
}

const navLinks: NAVLINK[] = [
  {
    title: "HOME",
    path: "#",
  },
  {
    title: "ABOUT",
    path: "#about",
  },
  {
    title: "PROJECTS",
    path: "#projects",
  },
  {
    title: "CONTACT",
    path: "#contact",
  },
  {
    title: "LINKTREE",
    path: "", // Linktree is yet to be added 
  },
];

const Navbar: FC = () => {
  const [navbarOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 bg-black shadow-lg border-b-2 border-cyan-500">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl font-bold relative"
        >
          <span className="text-cyan-400 font-mono tracking-wider glitch-text">APOORV</span>
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500"></span>
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-pink-500 hover:border hover:border-cyan-400 focus:outline-none"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-pink-500 hover:border hover:border-cyan-400 focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="text-cyan-400 font-mono hover:text-pink-500 px-3 py-2 block relative overflow-hidden group transition duration-300"
                >
                  <span className="relative z-10">{link.title}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen && (
        <div className="block md:hidden border-t border-cyan-800 bg-black/90 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="text-cyan-400 font-mono block px-3 py-2 hover:text-pink-500 hover:bg-black/50 rounded text-base"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255,0,128,0.75), -0.05em -0.025em 0 rgba(0,255,255,0.75);
          animation: glitch 1s infinite;
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255,0,128,0.75), -0.05em -0.025em 0 rgba(0,255,255,0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,128,0.75), 0.025em 0.025em 0 rgba(0,255,255,0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,128,0.75), 0.025em 0.025em 0 rgba(0,255,255,0.75);
          }
          50% {
            text-shadow: 0.05em 0.05em 0 rgba(255,0,128,0.75), 0.05em 0 0 rgba(0,255,255,0.75);
          }
          99% {
            text-shadow: 0.05em 0.05em 0 rgba(255,0,128,0.75), 0.05em 0 0 rgba(0,255,255,0.75);
          }
          100% {
            text-shadow: -0.05em 0 0 rgba(255,0,128,0.75), -0.025em -0.025em 0 rgba(0,255,255,0.75);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;