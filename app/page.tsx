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
import DancingCat from "../components/DancingCat";
import AIChatTerminal from "../components/AIChatTerminal";
import { GlassFilter } from "@/components/ui/glass-dock";
import { StaggeredMenu } from "@/components/StaggeredMenu";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // No Scroll logic needed for Menu as it is fixed overlay
  // removed dock visibility logic

  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-foreground">

      {/* 1. Global Filter */}
      <GlassFilter />

      {/* 2. STAGGERED SIDEBAR MENU */}
      <StaggeredMenu
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

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

      {/* 5. AI Chat Trigger (Auto-hides internally) - Hides when Menu Open */}
      {!isMenuOpen && <AIChatTerminal />}

    </div>
  );
}