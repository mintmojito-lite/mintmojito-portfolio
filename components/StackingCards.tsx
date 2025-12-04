'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import LiquidButton from "./ui/liquid-button";

interface ProjectData {
    id: string;
    name: string;
    short: string;
    detail: string;
    stack: string[];
    docLink: string;
    color?: string;
}

interface CardProps {
    i: number;
    project: ProjectData;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    color: string;
    total: number;
}

export const Card = ({
    i,
    project,
    progress,
    range,
    targetScale,
    color,
    total,
}: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    // Calculate the "destroy" range - increased timing for better readability
    const step = 1 / total;
    const destroyStart = range[0] + step * 4; // Increased from 2 to 4 for more reading time
    const destroyEnd = range[0] + step * 5;   // Increased from 3 to 5

    const scale = useTransform(
        progress,
        [range[0], destroyStart, destroyEnd],
        [1, targetScale, targetScale * 0.5]
    );

    const opacity = useTransform(
        progress,
        [range[0], destroyStart, destroyEnd],
        [1, 1, 0]
    );

    return (
        <div
            ref={container}
            className='h-screen flex items-center justify-center sticky top-0'
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    opacity,
                    top: `calc(-5vh)`,
                }}
                className={`flex flex-col relative -top-[25%] h-[450px] w-[90%] md:w-[70%] rounded-2xl p-10 origin-top shadow-2xl border border-white/10`}
            >
                <h2 className='text-3xl text-center font-bold mb-6 text-gray-800'>{project.name}</h2>
                <div className={`flex flex-col md:flex-row h-full gap-10`}>
                    <div className={`w-full md:w-[40%] relative top-[5%]`}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{project.short}</h3>
                        <p className='text-base text-gray-600 leading-relaxed'>{project.detail}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.stack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-gray-600">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <span className='flex items-center gap-2 pt-6'>
                            <LiquidButton href={project.docLink} target="_blank" className="magnetic-target px-5 py-2 text-sm">
                                View Project
                                <svg
                                    width='18'
                                    height='10'
                                    viewBox='0 0 22 12'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                                        fill='currentColor'
                                    />
                                </svg>
                            </LiquidButton>
                        </span>
                    </div>

                    <div
                        className={`relative w-full md:w-[60%] h-full rounded-xl overflow-hidden bg-white/50 border border-white/20 cursor-pointer`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Video Preview */}
                        <video
                            src="/preview.mp4"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />

                        {/* Text overlay when video is playing */}
                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}>
                            <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg">
                                <p className="text-white font-mono text-sm">dw im working on visuals</p>
                            </div>
                        </div>

                        {/* Placeholder text - shows when not hovering */}
                        <div className={`absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-sm transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'
                            }`}>
                            Hover to preview
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

interface StackingCardsProps {
    projects: ProjectData[];
}

const StackingCards = ({ projects }: StackingCardsProps) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const [isFinished, setIsFinished] = useState(false);

    // Monitor scroll progress to latch the finished state
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.99 && !isFinished) {
            setIsFinished(true);
        }
    });

    // Removed fade out effect to keep all cards readable

    const resetAnimation = () => {
        setIsFinished(false);
        // Add a small delay to allow the DOM to expand before scrolling
        setTimeout(() => {
            if (container.current) {
                container.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 50);
    };

    const cardColors = [
        "#E2EEFE", "#FEE2E2", "#E2FEE2", "#FEF9E2",
        "#E2FEFA", "#F5E2FE", "#FFE2EC", "#E2E6FE",
    ];

    return (
        <ReactLenis root>
            <div ref={container} className={`relative w-full ${isFinished ? 'h-auto py-20' : ''}`}>
                {!isFinished ? (
                    <motion.div>
                        {projects.map((project, i) => {
                            const step = 1 / projects.length;
                            const start = i * step;
                            const end = 1;
                            const targetScale = 1;

                            return (
                                <Card
                                    key={project.id}
                                    i={i}
                                    project={project}
                                    color={cardColors[i % cardColors.length]}
                                    progress={scrollYProgress}
                                    range={[start, end]}
                                    targetScale={targetScale}
                                    total={projects.length}
                                />
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className="flex justify-center items-center w-full">
                        <LiquidButton onClick={resetAnimation} className="magnetic-target px-8 py-4 text-lg">
                            <span>View Projects Again?</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                        </LiquidButton>
                    </div>
                )}
            </div>
        </ReactLenis>
    );
};

export default StackingCards;
