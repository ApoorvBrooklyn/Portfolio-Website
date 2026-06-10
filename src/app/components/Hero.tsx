import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";

interface HeroData {
  label: string;
  name: string;
  headline: string;
  subline: string;
  githubUrl: string;
  resumeUrl: string;
}

function getHeroData(): HeroData {
  const filePath = path.join(process.cwd(), "content/hero.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export default function Hero() {
  const h = getHeroData();

  return (
    <section className="min-h-[60vh] flex items-center py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-neutral-500 font-mono tracking-wide uppercase">
              {h.label}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
              {h.name}
            </h1>
          </div>

          <div className="space-y-4 max-w-xl">
            <p className="text-lg text-neutral-600 leading-relaxed">{h.headline}</p>
            <p className="text-base text-neutral-500 leading-relaxed">{h.subline}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={h.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-950 border border-neutral-200 rounded-md px-3 py-1.5 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a
              href={h.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-950 border border-neutral-200 rounded-md px-3 py-1.5 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 text-sm text-white bg-neutral-950 rounded-md px-3 py-1.5 hover:bg-neutral-800 transition-colors"
            >
              Get in touch
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
