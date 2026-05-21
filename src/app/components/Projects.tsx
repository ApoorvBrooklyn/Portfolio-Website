"use client";
import React, { useState, FC } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Multihead-Attention Mechanism",
    description:
      "Custom attention mechanism for multi-topic queries. Routes sub-queries to specialized SLMs based on topic detection.",
    link: "https://github.com/ApoorvBrooklyn/MultiHead-Attention-Mechanism",
    tags: ["PyTorch", "Attention", "NLP"],
  },
  {
    id: 2,
    name: "Credit Risk Modelling",
    description:
      "Financial analytics platform with real-time portfolio tracking, technical analysis, fraud detection, and risk management.",
    link: "https://github.com/ApoorvBrooklyn/Credit_Risk_Modelling",
    tags: ["Streamlit", "Finance", "ML"],
  },
  {
    id: 3,
    name: "Transformer — from scratch",
    description:
      "Full transformer architecture implemented in PyTorch without using high-level abstractions. Encoder, decoder, multi-head attention, positional encoding.",
    link: "https://github.com/ApoorvBrooklyn/Transformer-Model",
    tags: ["PyTorch", "Transformers", "NLP"],
  },
  {
    id: 4,
    name: "Neural Network — from scratch",
    description:
      "Complete neural network implementation using only NumPy. No PyTorch or any ML framework.",
    link: "https://github.com/ApoorvBrooklyn/Neural_Network_with_Layers/tree/main",
    tags: ["NumPy", "Deep Learning"],
  },
  {
    id: 5,
    name: "Nano-GPT",
    description:
      "Implementation of Andrej Karpathy's nanoGPT. Character-level language model with self-attention.",
    link: "https://github.com/ApoorvBrooklyn/Nano-GPT",
    tags: ["PyTorch", "LLM", "GPT"],
  },
  {
    id: 6,
    name: "Chapter — IGI Global Publication",
    description:
      "Co-authored a book chapter on Advanced Applications of Generative AI and NLP Models, published by IGI Global.",
    link: "https://www.igi-global.com/chapter/advanced-applications-of-generative-ai-and-natural-language-processing-models/335833",
    tags: ["Research", "Publication"],
  },
];

const allTags = ["All", "PyTorch", "Finance", "Research"];

const Projects: FC = () => {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? projects
    : projects.filter((p) => p.tags.some((t) => t === activeTag));

  return (
    <section id="projects" className="py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-10">
          Projects
        </h2>

        {/* Filter */}
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

        {/* Project list */}
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
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {project.description}
                </p>
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
      </div>
    </section>
  );
};

export default Projects;
