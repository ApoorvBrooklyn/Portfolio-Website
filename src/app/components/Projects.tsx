"use client";
import React, { useState, useRef, FC } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/legacy/image";

interface ProjectData {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
  tag: string[];
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    name: "Credit Risk Modelling",
    description:
      "A comprehensive financial analytics platform built with Streamlit that combines real-time portfolio tracking, technical analysis, fraud detection, and risk management capabilities.",
    image: "/proj/Credit-Risk Modelling.png",
    link: "https://github.com/ApoorvBrooklyn/Credit_Risk_Modelling",
    tag: ["All", "Finance"],
  },
  {
    id: 2,
    name: "Transformer - Implementation",
    description:
      "Implementation of entire Transformer Architecture from scratch in Pytorch",
    image: "/proj/Transformer.png",
    link: "https://github.com/ApoorvBrooklyn/Transformer-Model",
    tag: ["All", "Core- AI and ML"],
  },
  {
    id: 3,
    name: "Neural Net Implementation",
    description:
      "Complete Implementation of Neural Network from Scratch without use of Pytorch. Only used Numpy",
    image: "/proj/NeuralNetwork.png",
    link: "https://github.com/ApoorvBrooklyn/Neural_Network_with_Layers/tree/main",
    tag: ["All", "Core- AI and ML"],
  },
  {
    id: 4,
    name: "Nano - gpt",
    description:
      " Implementation of Nano-GPT from Andrej Karapathy ",
    image: "/proj/GPT.png",
    link: "https://github.com/ApoorvBrooklyn/Nano-GPT",
    tag: ["All", "Core- AI and ML"],
  },
  {
    id: 5,
    name: "Chapter Publication - IGI Global",
    description:
      "Wrote a chapter for IGI global publication",
    image: "/publication/IGI.png",
    link: "https://www.igi-global.com/chapter/advanced-applications-of-generative-ai-and-natural-language-processing-models/335833",
    tag: ["All", "General"],
  },
  // Add projects as reuired
];

const Projects: FC = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  
  return (
    <section id="projects" className="py-16 px-4 bg-black text-gray-200 relative overflow-hidden">
      {/* Cyberpunk background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(to_bottom,rgba(60,8,120,0.3)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-pink-600 opacity-60"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl mb-8 text-center font-mono">
          <span className="text-cyan-400">[</span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">PROJECTS</span>
          <span className="text-pink-600">:</span>
          <span className="bg-gradient-to-r from-pink-500 to-yellow-400 text-transparent bg-clip-text">PUBLICATIONS</span>
          <span className="text-cyan-400">]</span>
        </h2>
        
        <div className="flex flex-row justify-center items-center gap-2 py-6 relative">
          {/* Decorative circuit line behind filter buttons */}
          <div className="absolute h-px w-full max-w-lg bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500"></div>
          
          <button
            onClick={() => handleTagChange("All")}
            className={`relative px-4 py-2 font-mono border transition-all duration-300 ${
              tag === "All"
                ? "text-black bg-gradient-to-r from-cyan-400 to-purple-500 border-transparent shadow-lg shadow-purple-500/30"
                : "text-cyan-400 bg-black border-cyan-700 hover:border-cyan-400"
            }`}
          >
            <span className="relative z-10">ALL_PROJ</span>
            {tag === "All" && (
              <div className="absolute inset-0 bg-black opacity-10 animate-pulse"></div>
            )}
          </button>
          
          <button
            onClick={() => handleTagChange("General")}
            className={`relative px-4 py-2 font-mono border transition-all duration-300 ${
              tag === "General"
                ? "text-black bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg shadow-pink-500/30"
                : "text-purple-400 bg-black border-purple-700 hover:border-purple-400"
            }`}
          >
            <span className="relative z-10">General</span>
            {tag === "General" && (
              <div className="absolute inset-0 bg-black opacity-10 animate-pulse"></div>
            )}
          </button>
          
          <button
            onClick={() => handleTagChange("Finance")}
            className={`relative px-4 py-2 font-mono border transition-all duration-300 ${
              tag === "Finance"
                ? "text-black bg-gradient-to-r from-pink-500 to-red-500 border-transparent shadow-lg shadow-red-500/30"
                : "text-pink-400 bg-black border-pink-700 hover:border-pink-400"
            }`}
          >
            <span className="relative z-10">Finance</span>
            {tag === "Finance" && (
              <div className="absolute inset-0 bg-black opacity-10 animate-pulse"></div>
            )}
          </button>
          
          <button
            onClick={() => handleTagChange("Core- AI and ML")}
            className={`relative px-4 py-2 font-mono border transition-all duration-300 ${
              tag === "Core- AI and ML"
                ? "text-black bg-gradient-to-r from-red-500 to-yellow-400 border-transparent shadow-lg shadow-yellow-500/30"
                : "text-yellow-400 bg-black border-yellow-700 hover:border-yellow-400"
            }`}
          >
            <span className="relative z-10">Core- AI and ML</span>
            {tag === "Core- AI and ML" && (
              <div className="absolute inset-0 bg-black opacity-10 animate-pulse"></div>
            )}
          </button>
        </div>
        
        <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.4 }}
              className="group"
            >
              <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900 shadow-lg shadow-purple-900/20 relative">
                {/* Glitch effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 mix-blend-overlay animate-pulse"></div>
                </div>
                
                {/* Project ID marker */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 px-2 py-1 text-xs font-mono text-cyan-400 border border-cyan-800 z-10">
                  ID:{project.id}
                </div>
                
                <div className="relative h-56 overflow-hidden">
                  <Image
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75 group-hover:contrast-125"
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={300}
                  />
                  {/* Scanline effect overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none"></div>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-gray-900 to-black relative">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-700"></div>
                  
                  <h2 className="text-xl font-bold mb-2 font-mono tracking-wide">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                      {project.name}
                    </span>
                  </h2>
                  
                  <p className="text-gray-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 group-hover:text-pink-400 transition-colors duration-300 font-mono text-sm"
                    >
                      <span>[ACCESS_DATA]</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;