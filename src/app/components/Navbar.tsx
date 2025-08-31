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
    title: "Home",
    path: "#",
  },
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
  {
    title: "GitHub",
    path: "https://github.com/ApoorvBrooklyn",
  },
];

const Navbar: FC = () => {
  const [navbarOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link
          href={"/"}
          className="text-xl md:text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors duration-200"
        >
          Apoorv
        </Link>
        
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 block font-medium transition-colors duration-200 relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {navbarOpen && (
        <div className="block md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;