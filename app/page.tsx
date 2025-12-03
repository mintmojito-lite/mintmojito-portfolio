"use client";
import React, { useState, useEffect } from "react";
import { User, Briefcase, GraduationCap, Mail, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion

import HeroOusmane from "../components/HeroOusmane";
import About from "../components/About";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Playlist from "../components/Playlist";
import Contact from "../components/Contact";
import AIChatTerminal from "../components/AIChatTerminal";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlassFilter, GlassDock, GlassItem } from "@/components/ui/glass-dock"; 
import SystemNotice from "../components/SystemNotice";

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
    <div className="relative min-h-screen w-full bg-black font-sans text-[#333] overflow-x-hidden">
      
      {/* 1. Global Filter */}
      <GlassFilter />

      {/* 2. AUTO-HIDING TOP DOCK */}
      <AnimatePresence>
        {isDockVisible && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
          >
            <GlassDock>
              <div className="flex items-center gap-2 px-2">
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

      {/* 3. Background Layer */}
      <div className="fixed inset-0 z-0">
        <BackgroundPaths />
      </div>

      {/* 4. Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* System Notice at the very top */}
        <SystemNotice />

        <div className="w-full">
          <HeroOusmane />
        </div>
        
        <div className="w-full max-w-full pb-16">
          <div className="border-t border-[#111]">
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