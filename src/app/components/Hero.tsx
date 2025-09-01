"use client";
import React, { FC } from "react";
import Image from "next/legacy/image";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const Hero: FC = () => {
  return (
    <section className="min-h-screen flex items-center py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-6 fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hi, I&apos;m{" "}
                <span className="text-primary-600">Apoorv</span>
              </h1>
              
              <div className="text-2xl md:text-3xl font-medium text-gray-700">
                <TypeAnimation
                  sequence={[
                    "AI Engineer",
                    1000,
                    "ML Architect",
                    1000,
                    "Neural Network Developer",
                    1000,
                    "Deep Learning Researcher",
                    1000,
                    "Algorithm Optimizer",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-primary-600"
                />
              </div>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed max-w-xl">
                <p>
                  Passionate about cutting-edge{" "}
                  <span className="font-semibold text-gray-900">
                    Artificial Intelligence
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-gray-900">
                    Machine Learning
                  </span>{" "}
                  technologies.
                </p>
                
                <p>
                  Currently an upcoming intern at{" "}
                  <span className="font-semibold text-primary-600">
                    IIIT Hyderabad
                  </span>
                  , and VP at Coding Club RVCE. Previously optimized neural 
                  networks at Samsung Research Institute, Qualitas Technologies, 
                  and Spoda AI.
                </p>
                
                <div className="flex flex-wrap gap-2 text-sm font-medium">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    PyTorch
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    C++
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    Java
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <Link
                  href="/#contact"
                  className="btn-primary text-center"
                >
                  Get In Touch
                </Link>
                <Link
                  href="https://drive.google.com/file/d/1zg1UKUZurEGav0FIgJS_1ClfY1hlbioN/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Download Resume
                </Link>
                <Link 
                  href="https://github.com/ApoorvBrooklyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  View GitHub
                </Link>
              </div>
            </div>
          </div>
          
          {/* Image Column */}
          <div className="flex justify-center lg:justify-end fade-in">
            <div className="relative">
              {/* Profile image container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl">
                <Image
                  src="/heroImg.png"
                  alt="Apoorv's Profile"
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Subtle decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-100 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-200 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-primary-300 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;