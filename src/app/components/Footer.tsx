"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer border-t border-t-purple-600 bg-black relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(to_bottom,rgba(60,8,120,0.3)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Neon top border */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 shadow-lg shadow-purple-500/50"></div>
      
      <div className="container mx-auto p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Contact section with cyberpunk styling */}
          <div className="glitch-container">
            <h3 className="text-cyan-400 font-mono text-lg mb-3 tracking-wider border-b border-cyan-600 pb-1 inline-block">
              [CONNECT_<span className="text-pink-500">MODULE</span>]
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <a
                href="mailto:apoorvssadhale@gmail.com"
                className="text-cyan-400 hover:text-black font-mono relative overflow-hidden group flex items-center gap-2"
              >
                <span className="bg-cyan-400 h-full w-0 absolute left-0 top-0 transition-all duration-300 group-hover:w-full -z-10"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                apoorvssadhale@gmail.com
              </a>
              
              <a
                href="tel:+918010895912"
                className="text-cyan-400 hover:text-black font-mono relative overflow-hidden group flex items-center gap-2"
              >
                <span className="bg-cyan-400 h-full w-0 absolute left-0 top-0 transition-all duration-300 group-hover:w-full -z-10"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 8010895912
              </a>
            </div>
          </div>
          
          {/* Catchphrase with cyberpunk styling */}
          <div className="text-right">
            <p className="text-gray-400 font-mono tracking-wide text-sm border-l-2 border-pink-600 pl-4">
              <span className="text-pink-500">SYS</span>:<span className="text-cyan-400">SHUTDOWN</span>
              <br />
              That&apos;s all folks!
              <span className="text-cyan-400 animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative circuit lines */}
      <div className="absolute bottom-0 left-0 h-16 w-16 border-l border-b border-cyan-600"></div>
      <div className="absolute bottom-0 right-0 h-16 w-16 border-r border-b border-pink-600"></div>
    </footer>
  );
};

export default Footer;