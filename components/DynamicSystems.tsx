"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemText {
    text: string;
    language: string;
}

const systemTexts: SystemText[] = [
    { text: "Systems Deployed", language: "English" },
    { text: "システムが展開されました", language: "Japanese" },
    { text: "Systèmes déployés", language: "French" },
    { text: "Sistemas implementados", language: "Spanish" },
    { text: "시스템 배치됨", language: "Korean" },
    { text: "Sistemi distribuiti", language: "Italian" },
    { text: "Systeme bereitgestellt", language: "German" },
    { text: "系统已部署", language: "Chinese" },
    { text: "Системы развернуты", language: "Russian" },
    { text: "تم نشر الأنظمة", language: "Arabic" },
    { text: "Sistemas implantados", language: "Portuguese" },
    { text: "Systemen geïmplementeerd", language: "Dutch" },
    { text: "Sistemler Dağıtıldı", language: "Turkish" },
    { text: "System distribuerade", language: "Swedish" },
    { text: "அமைப்புகள் பயன்படுத்தப்பட்டன", language: "Tamil" },
    { text: "സംവിധാനങ്ങൾ വിന്യസിച്ചു", language: "Malayalam" },
    { text: "ವ್ಯವಸ್ಥೆಗಳನ್ನು ನಿಯೋಜಿಸಲಾಗಿದೆ", language: "Kannada" },
    { text: "వ్యవస్థలు మోహరించబడ్డాయి", language: "Telugu" },
    { text: "प्रणाली तैनात", language: "Marathi" },
    { text: "সিস্টেম স্থাপন করা হয়েছে", language: "Bengali" },
    { text: "સિસ્ટમ્સ તૈનાત", language: "Gujarati" },
    { text: "ਸਿਸਟਮ ਤੈਨਾਤ", language: "Punjabi" },
    { text: "सिस्टम तैनात", language: "Hindi" },
];

const DynamicSystems = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!isHovering) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % systemTexts.length);
        }, 100);

        return () => clearInterval(interval);
    }, [isHovering]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        setIsAnimating(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setIsAnimating(false);
        setCurrentIndex(0);
    };

    const textVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -10, opacity: 0 },
    };

    return (
        <span
            className="inline-flex items-center justify-center min-w-[200px] text-center cursor-pointer"
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
                        transition={{ duration: 0.00020, ease: "easeOut" }}
                    >
                        {systemTexts[currentIndex].text}
                    </motion.span>
                ) : (
                    <span className="inline-block whitespace-nowrap">
                        {systemTexts[0].text}
                    </span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default DynamicSystems;
