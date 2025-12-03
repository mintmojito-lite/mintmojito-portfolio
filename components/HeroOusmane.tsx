"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroOusmane() {
  const navLinks = [
    { name: "PROJECTS", href: "#projects" },
    { name: "SKILLS", href: "#learning" },
    { name: "ABOUT", href: "#about" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#e5e5e5]">
      
      {/* 1. TOP NAVIGATION (Like the reference) */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-6 z-50 mix-blend-difference">
        <span className="text-xs font-bold tracking-widest uppercase text-white/60">
          PORTFOLIO 2025
        </span>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="text-xs font-bold tracking-widest uppercase hover:text-cyan-400 transition-colors"
            >
              [{link.name}]
            </a>
          ))}
        </div>
        <span className="text-xs font-bold tracking-widest uppercase text-white/60">
          BBK // ENG
        </span>
      </nav>

      {/* 2. CENTER IMAGE (The "Star") */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }} // Kept dark for stealth vibe
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] grayscale contrast-125"
        >
            {/* Using your existing profile pic, styled to look cinematic */}
            <Image 
              src="/bbk.png" 
              alt="Bala Bhaskar" 
              fill
              className="object-cover object-top drop-shadow-2xl"
              priority
            />
            {/* Gradient fade at bottom to blend with page */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* 3. MASSIVE TYPOGRAPHY (The "Brand") */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mix-blend-overlay">
        
        {/* LINE 1 */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[15vw] leading-[0.85] font-black uppercase tracking-tighter text-white"
          >
            BORN
          </motion.h1>
        </div>

        {/* LINE 2 */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[15vw] leading-[0.85] font-black uppercase tracking-tighter text-white"
          >
            TO
          </motion.h1>
        </div>

        {/* LINE 3 (Highlighted) */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-[15vw] leading-[0.85] font-black uppercase tracking-tighter text-cyan-500 opacity-90"
          >
            BUILD
          </motion.h1>
        </div>

      </div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest uppercase text-white/40">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>

    </section>
  );
}
