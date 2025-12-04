"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Greeting {
    text: string;
    language: string;
}

const greetings: Greeting[] = [
    { text: "About Me", language: "English" },
    { text: "私について", language: "Japanese" }, // Watashi ni tsuite
    { text: "À propos de moi", language: "French" },
    { text: "Sobre mí", language: "Spanish" },
    { text: "저에 대하여", language: "Korean" }, // Jeo-e daehayeo
    { text: "Su di me", language: "Italian" },
    { text: "Über mich", language: "German" },
    { text: "关于我", language: "Chinese" }, // Guānyú wǒ
    { text: "Обо мне", language: "Russian" }, // Obo mne
    { text: "عني", language: "Arabic" }, // 'Anni
    { text: "Sobre mim", language: "Portuguese" },
    { text: "Over mij", language: "Dutch" },
    { text: "Hakkımda", language: "Turkish" },
    { text: "Om mig", language: "Swedish" },
    { text: "என்னைப் பற்றி", language: "Tamil" }, // Ennai patri
    { text: "എന്നെക്കുറിച്ച്", language: "Malayalam" }, // Ennekurichu
    { text: "ನನ್ನ ಬಗ್ಗೆ", language: "Kannada" }, // Nanna bagge
    { text: "నా గురించి", language: "Telugu" }, // Na gurinchi
    { text: "माझ्याबद्दल", language: "Marathi" }, // Majhyabaddal
    { text: "আমার সম্পর্কে", language: "Bengali" }, // Amar somporke
    { text: "મારા વિશે", language: "Gujarati" }, // Mara vishe
    { text: "ਮੇਰੇ ਬਾਰੇ", language: "Punjabi" }, // Mere baare
    { text: "मेरे बारे में", language: "Hindi" }, // Mere baare mein
];

const DynamicAbout = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (isHovering) {
                    return (prevIndex + 1) % greetings.length;
                }
                return prevIndex;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isAnimating, isHovering]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        setIsAnimating(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setIsAnimating(false);
        setCurrentIndex(0); // Reset to "About Me"
    };

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -10, opacity: 0 },
    };

    return (
        <span
            className="inline-flex items-center justify-end min-w-[120px] text-right cursor-pointer mr-2 text-black font-bold"
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
                        transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                        {greetings[currentIndex].text}
                    </motion.span>
                ) : (
                    <span className="inline-block whitespace-nowrap">
                        {greetings[0].text}
                    </span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default DynamicAbout;
