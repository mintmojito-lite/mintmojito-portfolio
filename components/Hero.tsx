import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import CanvasCursor from "./ui/canvas-cursor";
import DynamicGreeting from "./DynamicGreeting";
import { useState } from "react";
import ConfettiCannon from "./ConfettiCannon";
import GradientText from "./GradientText";


export default function Hero() {
  return (
    <section id="hero-cursor-area" className="relative flex w-full min-h-screen flex-col justify-center items-center overflow-hidden px-6 text-center bg-transparent pb-12">
      {/* The Canvas Cursor - Keeping it, FluidGlass is background */}
      <div className="absolute inset-0 z-[1]">
        <CanvasCursor />
      </div>



      {/* Confetti Cannon Overlay */}
      <ConfettiCannon />

      {/* Content (Top Layer) */}
      <div className="relative z-20 max-w-5xl pointer-events-none">
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground transition-colors duration-500 hover:text-gray-600 pointer-events-auto">
          <DynamicGreeting /> I'm{" "}
          <NamePopover />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 font-mono transition-colors duration-500 hover:text-gray-800 pointer-events-auto"
        >
          "I believe making a systems is better than flexing the sugarcoated certificates."
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-[#222]"
      >

      </motion.div>
    </section>
  );
}

function NamePopover() {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <div
      className="relative inline-block pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      <GradientText
        colors={["#9333ea", "#c084fc", "#9333ea", "#c084fc", "#9333ea"]}
        animationSpeed={6}
        showBorder={false}
        className="text-3xl sm:text-4xl md:text-5xl"
      >
        Bala Bhaskar
      </GradientText>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ rotateX, rotateY }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 text-gray-800 text-xl rounded-2xl shadow-2xl whitespace-nowrap z-50 flex items-center gap-2 font-[family-name:var(--font-dancing)]"
          >
            <span>you can call me bala</span>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white/30 drop-shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
