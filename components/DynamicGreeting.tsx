"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Greeting {
    text: string;
    language: string;
}

const greetings: Greeting[] = [
    { text: "Hello", language: "English" },
    { text: "こんにちは", language: "Japanese" },
    { text: "Bonjour", language: "French" },
    { text: "Hola", language: "Spanish" },
    { text: "안녕하세요", language: "Korean" },
    { text: "Ciao", language: "Italian" },
    { text: "Hallo", language: "German" },
    // Indian Languages
    { text: "வணக்கம்", language: "Tamil" },
    { text: "നമസ്കാരം", language: "Malayalam" },
    { text: "ನಮಸ್ಕಾರ", language: "Kannada" },
    { text: "నమస్కారం", language: "Telugu" },
    { text: "नमस्कार", language: "Marathi" },
    { text: "নমস্কার", language: "Bengali" },
    { text: "નમસ્તે", language: "Gujarati" },
    { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", language: "Punjabi" },

    // International Languages
    { text: "你好", language: "Chinese" },
    { text: "Привет", language: "Russian" },
    { text: "مرحبًا", language: "Arabic" },
    { text: "Olá", language: "Portuguese" },
    { text: "Hallo", language: "Dutch" },
    { text: "Merhaba", language: "Turkish" },
    { text: "Hej", language: "Swedish" },
    { text: "नमस्ते!", language: "Hindi" }, // End with Hi to match original design
];

const DynamicGreeting = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const hasPlayed = sessionStorage.getItem("greetingPlayed");

        if (hasPlayed) {
            setIsAnimating(false);
            setCurrentIndex(greetings.length - 1); // Show last greeting
        }
    }, []);

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                // If hovering, loop continuously
                if (isHovering) {
                    return (prevIndex + 1) % greetings.length;
                }

                // If not hovering (initial load), stop at the end
                const nextIndex = prevIndex + 1;
                if (nextIndex >= greetings.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    sessionStorage.setItem("greetingPlayed", "true");
                    return prevIndex;
                }

                return nextIndex;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [isAnimating, isHovering]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        setIsAnimating(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setIsAnimating(false);
        setCurrentIndex(greetings.length - 1); // Reset to Namaste
    };

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    };

    if (!isClient) return <span className="inline-block">Hi,</span>; // SSR fallback

    return (
        <span
            className="inline-flex items-center justify-end w-[140px] text-right cursor-pointer mr-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <AnimatePresence mode="popLayout">
                {isAnimating ? (
                    <motion.span
                        key={currentIndex}
                        className="inline-block whitespace-nowrap"
                        initial={textVariants.hidden}
                        animate={textVariants.visible}
                        exit={textVariants.exit}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        {greetings[currentIndex].text},
                    </motion.span>
                ) : (
                    <span className="inline-block whitespace-nowrap">
                        {greetings[currentIndex].text},
                    </span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default DynamicGreeting;
