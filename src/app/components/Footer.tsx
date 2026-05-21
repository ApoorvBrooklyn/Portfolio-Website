"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Apoorv Sadhale
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/ApoorvBrooklyn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/apoorv-sadhale-4406061a7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            LinkedIn
          </a>
          <Link
            href="/blog"
            className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            Writing
          </Link>
          <a
            href="mailto:apoorvssadhale@gmail.com"
            className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
