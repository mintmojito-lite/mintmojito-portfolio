"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LinkPopoverProps {
    children: React.ReactNode;
    message: string;
    href: string;
}

export default function LinkPopover({ children, message, href }: LinkPopoverProps) {
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
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
        <span
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                x.set(0);
                y.set(0);
            }}
            onMouseMove={handleMouseMove}
            style={{ perspective: 1000 }}
        >
            <span className="font-semibold text-cyan-900 transition-all duration-300 hover:text-[#863FF3] hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)] cursor-crosshair">
                {children}
            </span>
            <AnimatePresence>
                {isHovered && (
                    <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{ rotateX, rotateY }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 text-gray-800 text-lg rounded-2xl shadow-2xl whitespace-nowrap z-50 flex items-center gap-3 font-[family-name:var(--font-dancing)] hover:bg-white/20 transition-colors"
                    >
                        <span>{message}</span>
                        <ArrowRight size={18} className="text-purple-600" />
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white/30 drop-shadow-sm" />
                    </motion.a>
                )}
            </AnimatePresence>
        </span>
    );
}
