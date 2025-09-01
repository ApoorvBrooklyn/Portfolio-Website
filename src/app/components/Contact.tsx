"use client";
import React, { useState, FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import emailjs from "emailjs-com";

const Contact: FC = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await emailjs.sendForm(
        "service_ucgutfg", 
        "template_esbcm5o", 
        e.target, 
        "r5Ku7DzQjzCGO0CEk"
      );
      console.log("Email sent successfully!", result.status, result.text);
      setEmailSubmitted(true);
    } catch (error) {
      console.error("An error occurred while sending the email:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, collaborations, 
            or interesting AI/ML projects. Let&apos;s connect!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whether you&apos;re looking for AI/ML expertise, have an exciting project proposal, 
                or just want to chat about neural networks and machine learning, I&apos;d love to hear from you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">Current Status:</span>
                  <span className="ml-2 text-primary-600">Upcoming Intern @ IIIT Hyderabad</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">Focus Areas:</span>
                  <span className="ml-2">AI, ML, FinTech, Neural Networks</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">Response Time:</span>
                  <span className="ml-2">Usually within 24 hours</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <Link 
                href="https://www.github.com/ApoorvBrooklyn/" 
                className="group inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-200"
                />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/apoorv-sadhale-4406061a7/" 
                className="group inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-200"
                />
              </Link>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            {emailSubmitted ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setEmailSubmitted(false)}
                  className="mt-4 btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="card p-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      id="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      placeholder="Tell me about your project or how we can collaborate..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;