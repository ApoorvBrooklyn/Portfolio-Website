"use client";
import React, { useState, FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import emailjs from "emailjs-com";

const Contact: FC = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_ucgutfg", "template_esbcm5o", e.target, "r5Ku7DzQjzCGO0CEk")
      .then((result) => {
        console.log("Email sent successfully!", result.status, result.text);
        setEmailSubmitted(true);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("An error occurred while sending the email:", error.text);
      });
  };
  
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-8 relative bg-black"
    >
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
        <div className="grid-background w-full h-full"></div>
      </div>
      
      {/* Neon glow effect */}
      <div className="hidden md:block bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="hidden md:block bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 to-transparent rounded-full h-64 w-64 z-0 blur-lg absolute top-1/4 right-0 transform translate-x-1/2 -translate-1/2"></div>
      
      <div className="z-10 relative px-4">
        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-pink-500"></div>
        <h5 className="text-3xl font-bold font-mono mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glitch-heading">&lt;CONNECT_WITH_ME/&gt;</h5>
        
        <div className="terminal-window mb-8 border border-cyan-800 bg-black/70 backdrop-blur-sm p-4 rounded">
          <div className="terminal-header flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
            <div className="text-xs text-cyan-400 font-mono">terminal@apoorv:~$</div>
          </div>
          <p className="text-cyan-300 font-mono text-sm md:text-base typed-text">
            <span className="text-pink-500">$ </span>
            Always Looking for new opportunities !!!! 
          </p>
        </div>
        
        <div className="socials flex flex-row gap-6 mt-8">
          <Link href="https://www.github.com/ApoorvBrooklyn/" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg opacity-75 group-hover:opacity-100 blur-sm transition duration-300"></div>
            <div className="relative bg-black p-3 rounded-lg">
              <FontAwesomeIcon
                icon={faGithub}
                className="h-8 w-8 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300"
              />
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/apoorv-sadhale-4406061a7/" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg opacity-75 group-hover:opacity-100 blur-sm transition duration-300"></div>
            <div className="relative bg-black p-3 rounded-lg">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="h-8 w-8 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300"
              />
            </div>
          </Link>
        </div>
      </div>
      
      <div className="z-10 px-4">
        {emailSubmitted ? (
          <div className="success-message border-2 border-cyan-500 bg-black/70 backdrop-blur-sm p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
            <div className="absolute top-0 right-0 px-2 py-1 bg-cyan-900/70 text-cyan-400 text-xs font-mono rounded-bl">status: 200_OK</div>
            <p className="text-cyan-400 text-xl mt-2 font-mono glitch-small">
              <span className="text-pink-500">&gt; </span>
              TRANSMISSION RECEIVED SUCCESSFULLY
            </p>
            <p className="text-gray-400 text-sm mt-2 font-mono">Message has been encrypted and sent to Apoorv's neural interface.</p>
          </div>
        ) : (
          <form className="flex flex-col cyber-form" onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <label
                htmlFor="email"
                className="text-cyan-400 block mb-2 text-lg font-mono"
              >
                <span className="text-pink-500">&gt; </span>EMAIL_ADDRESS
              </label>
              <div className="input-container relative">
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  className="bg-black/50 border border-cyan-800 focus:border-pink-500 placeholder-gray-600 text-cyan-100 text-lg rounded-none block w-full p-3 font-mono transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  placeholder="your@neuralink.net"
                />
                <div className="absolute top-0 right-0 px-2 py-1 bg-cyan-900/70 text-cyan-400 text-xs font-mono">required</div>
              </div>
            </div>
            
            <div className="mb-6 relative">
              <label
                htmlFor="name"
                className="text-cyan-400 block text-lg mb-2 font-mono"
              >
                <span className="text-pink-500">&gt; </span>USER_ID
              </label>
              <input
                name="name"
                type="text"
                id="name"
                required
                className="bg-black/50 border border-cyan-800 focus:border-pink-500 placeholder-gray-600 text-cyan-100 text-lg rounded-none block w-full p-3 font-mono transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter your identifier"
              />
            </div>
            
            <div className="mb-6 relative">
              <label
                htmlFor="subject"
                className="text-cyan-400 block text-lg mb-2 font-mono"
              >
                <span className="text-pink-500">&gt; </span>TRANSMISSION_SUBJECT
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-black/50 border border-cyan-800 focus:border-pink-500 placeholder-gray-600 text-cyan-100 text-lg rounded-none block w-full p-3 font-mono transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter transmission subject"
              />
            </div>
            
            <div className="mb-6 relative">
              <label
                htmlFor="message"
                className="text-cyan-400 block text-lg mb-2 font-mono"
              >
                <span className="text-pink-500">&gt; </span>MESSAGE_CONTENT
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={5}
                className="bg-black/50 border border-cyan-800 focus:border-pink-500 placeholder-gray-600 text-cyan-100 text-lg rounded-none block w-full p-3 font-mono transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter your transmission data here..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="relative group overflow-hidden bg-black border-2 border-cyan-500 text-cyan-400 font-mono py-3 px-6 uppercase tracking-wider"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                TRANSMIT_MESSAGE
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
          </form>
        )}
        
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm">
            <div className="modal-content bg-black border-2 border-cyan-500 p-6 rounded-none max-w-md w-full relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
              <div className="absolute top-0 right-0 px-2 py-1 bg-cyan-900/70 text-cyan-400 text-xs font-mono">system.notification</div>
              
              <p className="text-cyan-400 text-xl my-4 font-mono">
                <span className="text-pink-500">&gt; </span>
                Transmission complete. Data packet sent successfully.
              </p>
              
              <button
                className="relative group overflow-hidden bg-black border-2 border-pink-500 text-pink-400 font-mono py-2 px-4 uppercase tracking-wider mt-4 w-full"
                onClick={() => setIsModalVisible(false)}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  CLOSE_TERMINAL
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
        )}
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
        
        .glitch-small {
          position: relative;
          text-shadow: 0.03em 0 0 rgba(255,0,128,0.75), -0.03em -0.015em 0 rgba(0,255,255,0.75);
          animation: glitch 3s infinite;
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
        
        .typed-text {
          overflow: hidden;
          border-right: 0.15em solid #EC4899;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #EC4899 }
        }
      `}</style>
    </section>
  );
};

export default Contact;