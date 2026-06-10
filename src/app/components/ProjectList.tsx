"use client";
import React, { useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
              activeTag === tag
                ? "bg-neutral-950 text-white border-neutral-950"
                : "text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-neutral-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-0 divide-y divide-neutral-100">
        {filtered.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 py-5 hover:bg-neutral-50 -mx-4 px-4 rounded-md transition-colors"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-300">
                  {String(project.id).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-neutral-950 group-hover:underline underline-offset-2">
                  {project.name}
                </p>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-neutral-400 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <svg
              className="w-4 h-4 text-neutral-300 group-hover:text-neutral-600 flex-shrink-0 mt-0.5 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </>
  );
}
