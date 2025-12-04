"use client";

import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Playlist from "../components/Playlist";
import Contact from "../components/Contact";
import SystemNotice from "../components/SystemNotice"; // Import the notice

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* The System Notice (Fixed at top) */}
      <SystemNotice />

      {/* Main Content Wrapper */}
      <div className="w-full flex flex-col items-center">

        {/* Full Screen Intro */}
        <div className="w-full">
          <Hero />
        </div>

        {/* Content Container */}
        <div className="w-full max-w-full">
          <About />
          <Projects />
          <Certifications />
          <Playlist />
          <Contact />
        </div>

      </div>
    </main>
  );
}