"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, FC } from "react";

interface NavLink {
  title: string;
  path: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { title: "About", path: "/#about" },
  { title: "Projects", path: "/#projects" },
  { title: "Writing", path: "/blog" },
  { title: "GitHub", path: "https://github.com/ApoorvBrooklyn", external: true },
];

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-950 hover:text-neutral-500 transition-colors"
          >
            Apoorv
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm transition-colors ${
                    pathname === link.path || (link.path === "/blog" && pathname.startsWith("/blog"))
                      ? "text-neutral-950 font-medium"
                      : "text-neutral-500 hover:text-neutral-950"
                  }`}
                >
                  {link.title}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden text-neutral-500 hover:text-neutral-950 transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-px bg-current transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-neutral-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-sm text-neutral-500"
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block py-2 text-sm text-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
