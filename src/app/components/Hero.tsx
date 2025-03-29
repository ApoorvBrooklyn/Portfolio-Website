"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/legacy/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateMovement = (axis, factor = 40) => {
    if (!isMounted) return 0;
    
    return axis === 'x' 
      ? (mousePosition.x / windowSize.width - 0.5) * factor 
      : (mousePosition.y / windowSize.height - 0.5) * factor;
  };

  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              background: `radial-gradient(circle, 
                rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, 0.8), 
                rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 255)}, 0.6))`,
              transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
              filter: `blur(${Math.random() * 50 + 20}px)`
            }}
          />
        ))}
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1 lg:col-span-7 space-y-6"
          >
            <div className="relative z-10">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  Welcome to My Website
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="my-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              >
                <span className="text-gray-300">I&apos;m </span>
                <TypeAnimation
                  sequence={[
                    "Apoorv",
                    1000,
                    "a Developer",
                    1000,
                    "a Problem Solver",
                    1000,
                    "Trying not to be Vibe-Coder",
                    750,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-gray-300 text-lg md:text-xl mb-4 max-w-2xl leading-relaxed">
                  Vice-President @ Coding Club RVCE, Junior @ Dept of ECE, RVCE.
                </p>
                <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl leading-relaxed">
                  As an Engineer I&apos;m passionate about latest technology in field of AI and ML.  
                  I have previously interned at <span className="text-cyan-400 font-semibold"> Samsung Research Institute, Qualitas Technologies and Spoda AI</span>. I have worked majorly in 
                  <span className="text-pink-400 font-semibold"> Python, C++ and JAVA</span> Vivid learner with great debugging skills. 
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <Link
                  href="/#contact"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  Contact Me
                </Link>
                <Link
                  href="https://drive.google.com/file/d/1L8i7NT_2jpDZ1m6Ns_bNxmDvgWvObenK/view?usp=sharing"
                  className="px-8 py-3 rounded-lg bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold transition-transform duration-300 hover:scale-105 hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Download CV
                </Link>
                <Link
                  href="https://x.com/ApoorvBrooklyn"
                  className="px-8 py-3 rounded-lg bg-transparent border-2 border-pink-500 text-pink-400 font-bold transition-transform duration-300 hover:scale-105 hover:bg-pink-900/30 hover:shadow-lg hover:shadow-pink-500/20"
                >
                  Visit my Twitter
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ 
              x: calculateMovement('x'),
              y: calculateMovement('y')
            }}
            className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Futuristic frame elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
                  <circle cx="200" cy="200" r="190" stroke="url(#paint0_linear)" strokeWidth="2" strokeDasharray="10 5" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#06B6D4" />
                      <stop offset="1" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 transform scale-110"></div>
              
              {/* Profile image container */}
              <motion.div 
                className="relative rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-2xl shadow-purple-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/heroImg.png"
                    alt="Apoorv's profile photo"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500 rounded-full opacity-70 blur-md"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-pink-500 rounded-full opacity-70 blur-md"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-purple-500 rounded-full opacity-70 blur-md"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add some floating elements for more visual interest */}
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-lg border border-cyan-500 opacity-20 animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-16 rounded-full border border-pink-500 opacity-20 animate-float-delayed"></div>
      <div className="absolute bottom-40 right-20 w-12 h-12 rounded-full border border-purple-500 opacity-20 animate-float-slow"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 2s;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default Hero;