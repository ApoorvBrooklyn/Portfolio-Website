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
    name: "Multihead-Attention Mechanism",
    description:
      "Custom Attention mechanism for the queries containing multiple topics. The mechanism understands the topics and breaks the query to specialized SLM",
    image: "/proj/Project.png",
    link: "https://github.com/ApoorvBrooklyn/MultiHead-Attention-Mechanism",
    tag: ["All", "General", "Core- AI and ML"],
  },
  {
    id: 2,
    name: "Credit Risk Modelling",
    description:
      "A comprehensive financial analytics platform built with Streamlit that combines real-time portfolio tracking, technical analysis, fraud detection, and risk management capabilities.",
    image: "/proj/Credit-Risk Modelling.png",
    link: "https://github.com/ApoorvBrooklyn/Credit_Risk_Modelling",
    tag: ["All", "Finance"],
  },
  {
    id: 3,
    name: "Transformer - Implementation",
    description:
      "Implementation of entire Transformer Architecture from scratch in Pytorch",
    image: "/proj/Transformer.png",
    link: "https://github.com/ApoorvBrooklyn/Transformer-Model",
    tag: ["All", "Core- AI and ML"],
  },
  {
    id: 4,
    name: "Neural Net Implementation",
    description:
      "Complete Implementation of Neural Network from Scratch without use of Pytorch. Only used Numpy",
    image: "/proj/NeuralNetwork.png",
    link: "https://github.com/ApoorvBrooklyn/Neural_Network_with_Layers/tree/main",
    tag: ["All", "Core- AI and ML"],
  },
  {
    id: 5,
    name: "Nano - gpt",
    description:
      " Implementation of Nano-GPT from Andrej Karapathy ",
    image: "/proj/GPT.png",
    link: "https://github.com/ApoorvBrooklyn/Nano-GPT",
    tag: ["All", "Core- AI and ML"],
  },
  {
    id: 6,
    name: "Chapter Publication - IGI Global",
    description:
      "Wrote a chapter for IGI global publication",
    image: "/publication/IGI.png",
    link: "https://www.igi-global.com/chapter/advanced-applications-of-generative-ai-and-natural-language-processing-models/335833",
    tag: ["All", "General"],
  },
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
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">My Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of AI/ML projects showcasing my expertise in neural networks, 
            machine learning, and software development
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => handleTagChange("All")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              tag === "All"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Projects
          </button>
          
          <button
            onClick={() => handleTagChange("General")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              tag === "General"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Research
          </button>
          
          <button
            onClick={() => handleTagChange("Finance")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              tag === "Finance"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            FinTech AI
          </button>
          
          <button
            onClick={() => handleTagChange("Core- AI and ML")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              tag === "Core- AI and ML"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Core ML
          </button>
        </div>
        
        <ul ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className="group"
            >
              <div className="card overflow-hidden h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={200}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-primary-600 rounded">
                    #{project.id.toString().padStart(2, '0')}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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