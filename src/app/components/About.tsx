import React, { useState, ReactElement } from "react";
import Image from "next/legacy/image";

interface TabData {
  title: string;
  id: string;
  content: ReactElement;
}

const TAB_DATA: TabData[] = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="space-y-3">
        {[
          { skill: "Python & PyTorch", level: "Expert" },
          { skill: "Neural Architecture Design", level: "Advanced" },
          { skill: "LangChain & LLM Integration", level: "Advanced" },
          { skill: "C++ for High Performance ML", level: "Intermediate" },
          { skill: "TensorFlow & JAX", level: "Intermediate" },
          { skill: "MLOps & Model Deployment", level: "Advanced" }
        ].map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="text-gray-700">{item.skill}</span>
            <span className="text-primary-600 text-sm font-medium bg-primary-50 px-2 py-1 rounded">
              {item.level}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-4">
        {[
          { item: "Electronics & Communication Engineering", meta: "GPA: 8.31" },
          { item: "Deep Learning Specialization", meta: "Neural Networks" },
          { item: "Generative AI Architecture", meta: "Transformers & LLMs" },
          { item: "FinTech ML Applications", meta: "Option Pricing Models" },
          { item: "MLOps & Model Optimization", meta: "Production AI Systems" }
        ].map((item, index) => (
          <li key={index} className="border-l-2 border-primary-200 pl-4">
            <div className="font-medium text-gray-900">{item.item}</div>
            <div className="text-gray-600 text-sm">{item.meta}</div>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="space-y-4">
        {[
          { cert: "Data Science for Engineers", org: "NPTEL", focus: "Statistical ML" },
          { cert: "Machine Learning Foundations", org: "Coursera", focus: "Core Algorithms" },
          { cert: "AI Development Track", org: "Infosys Springboard", focus: "Enterprise AI" },
          { cert: "PyTorch Deep Learning", org: "Self-Study", focus: "Neural Networks" }
        ].map((item, index) => (
          <li key={index} className="border-l-2 border-success-200 pl-4">
            <div className="font-medium text-gray-900">{item.cert}</div>
            <div className="text-gray-600 text-sm">
              {item.org} • Focus: {item.focus}
            </div>
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
    <section className="bg-gray-50 py-16" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">About Me</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate AI Engineer with expertise in neural networks and machine learning
          </p>
        </div>
        
        <div className="md:grid md:grid-cols-2 gap-12 items-center">
          <div className="relative mb-8 md:mb-0">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/Images/Image.jpg"
                alt="Apoorv - AI/ML Engineer"
                width={400}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed">
                Dedicated Electronics and Communication Engineering student specializing in 
                <span className="font-semibold text-primary-600"> Artificial Intelligence</span> and
                <span className="font-semibold text-primary-600"> Machine Learning</span> architectures. 
              </p>
              <p className="text-gray-700 leading-relaxed">
                Deep expertise in FinTech applications, currently developing 
                <span className="font-semibold text-gray-900"> Option Pricing Models</span> using neural networks for
                financial markets. Experienced in building foundational models and implementing custom architectures from scratch.
              </p>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {TAB_DATA.map((data) => (
                  <button
                    key={data.id}
                    onClick={() => handleTabChange(data.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      tab === data.id 
                        ? "border-primary-500 text-primary-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {data.title}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="card p-6">
              {TAB_DATA.find((t) => t.id === tab).content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}