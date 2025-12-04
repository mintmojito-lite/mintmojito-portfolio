"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Playlist() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set volume to 50% when video loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-center" id="playlist">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <h1 className="mb-6 text-2xl font-bold text-[#00145C] transition-colors duration-500 hover:text-[#70D7FF]">
          <span
            className="cursor-pointer"
            onMouseEnter={() => setShowVideo(true)}
            onMouseLeave={() => setShowVideo(false)}
          >
            Wanna listen
          </span>
          {" "}to my <span className="font-semibold text-cyan-900 transition-all duration-300 hover:text-[#863FF3] hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)] cursor-crosshair">Playlist??</span>
        </h1>

        {/* Video Popup - overlays on top of visualizer and button */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute left-1/2 -translate-x-1/2 top-20 z-50"
            >
              <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 scale-75">
                <video
                  ref={videoRef}
                  src="/playlist.mp4"
                  autoPlay
                  loop
                  playsInline
                  className="min-w-[400px] max-w-[600px] h-auto rounded-xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visualizer Animation */}
        <div className="flex justify-center gap-1 mb-8 h-12 items-end">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-cyan-900"
              animate={{ height: ["20%", "80%", "40%"] }}
              transition={{
                duration: 0.5 + Math.random(),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <a
          href="https://open.spotify.com/playlist/4xEfvljRrZv6312h6JSEPd?si=5bdabc67e20f4bc7"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-target inline-block rounded-full border border-cyan-900 px-8 py-3 text-sm font-medium text-[#00145C] transition-all hover:bg-[#863FF3] hover:border-[#863FF3] hover:text-white hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(134,63,243,0.8)]"
        >
          OPEN SPOTIFY
        </a>
      </motion.div>
    </section>
  );
}