"use client";
import React, { useState, useEffect } from "react";
import { User, Briefcase, GraduationCap, Mail, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion

import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Playlist from "../components/Playlist";
import Contact from "../components/Contact";
import AIChatTerminal from "../components/AIChatTerminal";
import { GlassFilter, GlassDock, GlassItem } from "@/components/ui/glass-dock";

export default function Home() {
  const [isDockVisible, setIsDockVisible] = useState(true);

  // --- SCROLL DETECTION LOGIC ---
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      setIsDockVisible(false); // Hide immediately on scroll
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsDockVisible(true), 300); // Show 300ms after stop
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-foreground">

      {/* 1. Global Filter */}
      <GlassFilter />

      {/* 2. AUTO-HIDING LEFT DOCK */}
      <AnimatePresence>
        {isDockVisible && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-[100]"
          >
            <GlassDock>
              <div className="flex flex-col items-center gap-2 py-2">
                <GlassItem icon={<User size={20} />} label="About" href="#about" />
                <GlassItem icon={<Briefcase size={20} />} label="Projects" href="#projects" />
                <GlassItem icon={<GraduationCap size={20} />} label="Learning" href="#learning" />
                <GlassItem icon={<Music size={20} />} label="Playlist" href="#playlist" />
                <GlassItem icon={<Mail size={20} />} label="Contact" href="#contact" />
              </div>
            </GlassDock>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col items-center">

        <div className="w-full">
          <Hero />
        </div>

        <div className="w-full max-w-full pb-16">
          <div>
            <About />
          </div>
          <Projects />
          <Certifications />
          <Playlist />
          <Contact />
        </div>
      </div>

      {/* 5. AI Chat Trigger (Auto-hides internally) */}
      <AIChatTerminal />

    </div>
  );
}