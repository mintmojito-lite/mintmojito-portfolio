"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("button, a, .cursor-pointer"));
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Lavender Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[998] hidden md:block mix-blend-multiply"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-purple-400/60 blur-xl"
          animate={{
            height: isHovering ? 120 : 60,
            width: isHovering ? 120 : 60,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* Small Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className={`rounded-full bg-black transition-all duration-300 ${isHovering ? "h-3 w-3" : "h-2 w-2"
          }`} />
      </motion.div>
    </>
  );
}