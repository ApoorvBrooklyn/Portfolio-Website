import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-14">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
