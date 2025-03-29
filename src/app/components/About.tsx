import React, { useState, ReactElement } from "react";
import Image from "next/legacy/image";

interface TabData {
  title: string;
  id: string;
  content: ReactElement;
}

const TAB_DATA: TabData[] = [
  {
    title: "SKILLS",
    id: "skills",
    content: (
      <ul className="space-y-2 text-cyan-300 text-lg lg:text-xl font-mono">
        {[
          "Python - Pytorch",
          "C++",
          "Langchain",
          "SQL"
        ].map((skill, index) => (
          <li key={index} className="flex items-center">
            <span className="text-pink-500 mr-2">&gt;</span>
            {skill}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "EDUCATION",
    id: "education",
    content: (
      <ul className="space-y-2 text-cyan-300 text-lg lg:text-xl font-mono">
        {[
          "Undergraduate in Electronics and Communincation",
          "GPA 8.31",
          "ML Development",
          "Generative AI",
          "Core LLM Architecutre"
        ].map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="text-pink-500 mr-2">&gt;</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "CERTIFICATIONS",
    id: "certifications",
    content: (
      <ul className="space-y-2 text-cyan-300 text-lg lg:text-xl font-mono">
        {[
          "Datascience for Engineers, NPTEL",
          "Foundations of Machine Learning, Coursera",
          "Infosys Springboard"
        ].map((cert, index) => (
          <li key={index} className="flex items-center">
            <span className="text-pink-500 mr-2">&gt;</span>
            {cert}
          </li>
        ))}
      </ul>
    ),
  },
];

export default function About() {
  const [tab, setTab] = useState("skills");
  
  const handleTabChange = (id) => {
    setTab(id);
  };
  
  return (
    <section className="bg-black text-white relative" id="about">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="grid-background w-full h-full"></div>
      </div>
      
      <div className="relative z-10 md:grid md:grid-cols-2 gap-8 items-center py-16 px-4 xl:gap-16 xl:px-16">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative">
            <Image
              src="/Images/Image.jpg"
              alt="Your Name"
              width={500}
              height={500}
              className="rounded-3xl border border-cyan-800"
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-800 animate-pulse">SYS.32//CORE</div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 text-left flex flex-col h-full relative">
          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-cyan-500"></div>
          
          <h2 className="text-4xl font-bold mb-6 font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-heading">&lt;ABOUT_ME&gt;</h2>
          
          <p className="text-lg text-cyan-100 font-light leading-relaxed border-l border-cyan-800 pl-4">
            Dedicated Electronics and Communication Engineering student with a strong foundation in 
            <span className="text-pink-500 font-bold"> Artificial Intelligence</span> and
            <span className="text-cyan-400 font-bold"> Machine Learning</span> at core. Deep Interest in Finance. 
            Working on Various projects such as 
            <span className="text-pink-500 font-bold"> Option Pricing Model</span> for the
            Financial Markets. Have worked with foundational models and writing Architectures from Scratch.
          </p>
          
          <div className="flex flex-row justify-start mt-8 border-b border-cyan-900 pb-2">
            {TAB_DATA.map((data) => (
              <button
                key={data.id}
                onClick={() => handleTabChange(data.id)}
                className={`mr-6 font-mono text-lg relative ${
                  tab === data.id 
                    ? "text-cyan-400 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:bg-pink-500" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {data.title}
                {tab === data.id && (
                  <span className="absolute -left-4 text-pink-500">&gt;</span>
                )}
              </button>
            ))}
          </div>
          
          <div className="mt-8 border border-cyan-900 bg-black/50 backdrop-blur-sm rounded-md p-4 relative">
            <div className="absolute top-0 right-0 bg-cyan-900/70 text-cyan-400 text-xs px-2 py-0.5 font-mono rounded-bl">{tab}.exe</div>
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .grid-background {
          background-image: linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          perspective: 500px;
          transform: rotateX(45deg);
          transform-origin: top;
        }
        
        .glitch-heading {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255,0,128,0.75), -0.05em -0.025em 0 rgba(0,255,255,0.75);
          animation: glitch 2s infinite;
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
    </section>
  );
}