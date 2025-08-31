"use client";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Information
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:apoorvssadhale@gmail.com"
                className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                apoorvssadhale@gmail.com
              </a>
              
              <a
                href="tel:+918010895912"
                className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 8010895912
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <div className="space-y-3">
              <a href="#about" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                About
              </a>
              <a href="#projects" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Projects
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Contact
              </a>
              <a 
                href="https://github.com/ApoorvBrooklyn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              About
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI Engineer specializing in neural networks and machine learning. 
              Passionate about building innovative solutions that bridge the gap 
              between artificial intelligence and real-world applications.
            </p>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Apoorv Sadhale. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;