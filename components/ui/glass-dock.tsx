"use client";
import React from "react";
import { motion } from "framer-motion";

// --- SVG FILTER (The Distortion Engine) ---
export const GlassFilter = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.012"
          numOctaves="2"
          seed="92"
          result="noise"
        />
        <feGaussianBlur
          in="noise"
          stdDeviation="2"
          result="blurred"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="85"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

// --- GLASS WRAPPER ---
export const GlassEffect = ({
  children,
  className = "",
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) => {
  const Content = (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-500 ${className}`}
      style={{
        boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 1. Blur & Distort Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: "blur(12px)",
          filter: "url(#glass-distortion)", // Using the ID from GlassFilter
          zIndex: -1,
        }}
      />

      {/* 2. White Tint Layer */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(255, 255, 255, 0.05)" }}
      />

      {/* 3. Inner Gloss/Shadow */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          boxShadow:
            "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      />

      {/* 4. Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {Content}
      </a>
    );
  }

  return Content;
};

// --- THE DOCK CONTAINER ---
export const GlassDock = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlassEffect className="rounded-2xl p-2 gap-4 bg-black/5 border border-black/10">
      {children}
    </GlassEffect>
  );
};

// --- INDIVIDUAL DOCK ITEM ---
export const GlassItem = ({
  icon,
  label,
  onClick,
  href
}: {
  icon: React.ReactNode,
  label?: string,
  onClick?: () => void,
  href?: string
}) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center p-3 rounded-xl transition-colors hover:bg-black/10 min-w-[60px]"
    >
      <div className="text-gray-800 mb-1">{icon}</div>
      {label && <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">{label}</span>}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <div onClick={onClick}>{content}</div>;
};