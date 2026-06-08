"use client";
import React, { useState, FC } from "react";
import emailjs from "@emailjs/browser";

const Contact: FC = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await emailjs.sendForm(
        "service_ucgutfg",
        "template_esbcm5o",
        e.currentTarget,
        { publicKey: "r5Ku7DzQjzCGO0CEk" }
      );
      setSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (typeof err === "object" && err !== null && "text" in err ? String((err as { text: string }).text) : "Failed to send message. Please try again.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-10">
          Contact
        </h2>

        <div className="grid sm:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-5">
            <div>
              <p className="text-neutral-700 leading-relaxed">
                Open to research collaborations, internships, and interesting AI/ML projects.
                If you have something worth discussing, I&apos;d like to hear it.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:apoorvssadhale@gmail.com"
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 transition-colors group"
              >
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                apoorvssadhale@gmail.com
              </a>
              <a
                href="https://github.com/ApoorvBrooklyn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 transition-colors group"
              >
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                github.com/ApoorvBrooklyn
              </a>
              <a
                href="https://www.linkedin.com/in/apoorv-sadhale-4406061a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 transition-colors group"
              >
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <p className="text-xs text-neutral-400">
              I usually respond within 24 hours.
            </p>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <p className="text-sm font-medium text-neutral-950 mb-1">Message sent.</p>
                <p className="text-sm text-neutral-500">I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs text-neutral-400 hover:text-neutral-700 underline underline-offset-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What's on your mind?"
                    className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2 bg-white text-neutral-950 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-sm font-medium bg-neutral-950 text-white rounded-md px-4 py-2.5 hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
