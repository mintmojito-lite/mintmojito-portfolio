"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SystemNotice() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed top-4 z-[100] w-full text-center pointer-events-none"
      >
        <div className="pointer-events-auto inline-block bg-white/60 backdrop-blur-md px-4 py-2 rounded text-sm text-gray-600">
          <span>
            This page is interactive. Click everything for a better experience. Best viewed on Desktop.
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-[#555] hover:text-black font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}