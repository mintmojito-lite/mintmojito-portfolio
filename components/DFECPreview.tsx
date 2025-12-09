"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, GitBranch, Zap, Layers, FastForward, Activity } from 'lucide-react';

// Design Constants
const GLASS_PANEL = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl";
const GLOW_EMERALD = "drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]";
const GLOW_BLUE = "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]";

const scenarios = [
    {
        id: 'wall',
        title: 'THE MEMORY WALL',
        caption: '70% of execution time is wasted waiting for data. CPUs stall at the wall.',
        icon: Layers,
        color: 'text-red-400',
        content: (
            <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
                {/* The Wall */}
                <div className="absolute right-1/4 h-32 w-2 bg-red-500/20 border-l border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]" />

                {/* Stalled Particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 60, opacity: 1, backgroundColor: ["#60a5fa", "#ef4444"] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute w-3 h-3 rounded-full bg-blue-400 left-1/4"
                    />
                ))}

                <div className="absolute right-[28%] text-[10px] font-mono text-red-400 rotate-90 origin-bottom">
                    DRAM LATENCY
                </div>
            </div>
        )
    },
    {
        id: 'graph',
        title: 'DATA-FLOW GRAPH',
        caption: 'Code is analyzed into a dependency graph. Future access patterns are mapped.',
        icon: GitBranch,
        color: 'text-blue-400',
        content: (
            <div className="relative flex items-center justify-center h-full w-full">
                {/* Graph Nodes */}
                <svg width="200" height="100" viewBox="0 0 200 100" className="absolute opacity-50">
                    <path d="M 20 50 L 60 20 L 100 50 L 140 20 L 180 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <path d="M 60 20 L 100 50 L 140 80 L 180 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <path d="M 20 50 L 60 80 L 100 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
                </svg>

                {[
                    { x: 20, y: 50 }, { x: 60, y: 20 }, { x: 60, y: 80 },
                    { x: 100, y: 50 }, { x: 140, y: 20 }, { x: 140, y: 80 }, { x: 180, y: 50 }
                ].map((pos, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`absolute w-4 h-4 rounded-full bg-blue-500 border border-blue-300 ${GLOW_BLUE}`}
                        style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                    />
                ))}
            </div>
        )
    },
    {
        id: 'prediction',
        title: 'GNN PREDICTION',
        caption: 'Graph Neural Networks predict "Entanglement Scores" for likely memory reuse.',
        icon: Activity,
        color: 'text-purple-400',
        content: (
            <div className="relative flex items-center justify-center h-full w-full">
                {/* Active Path Lighting Up */}
                <motion.div
                    className="absolute w-4 h-4 bg-purple-500 rounded-full blur-md"
                    animate={{
                        x: [-60, 0, 60],
                        y: [40, -40, 40],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Connecting Lines */}
                <svg width="200" height="100" viewBox="0 0 200 100" className="absolute">
                    <motion.path
                        d="M 40 90 Q 100 10 160 90"
                        stroke="#a855f7"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </svg>

                <div className="absolute top-10 right-10 flex flex-col items-end">
                    <span className="text-[10px] text-purple-300 font-mono">SCORES</span>
                    <span className="text-xs text-white font-bold">0.98</span>
                    <span className="text-xs text-gray-400 font-bold">0.12</span>
                </div>
            </div>
        )
    },
    {
        id: 'prefetch',
        title: 'AHEAD-OF-TIME PREFETCH',
        caption: 'Data is loaded into cache microseconds BEFORE the CPU requests it.',
        icon: FastForward,
        color: 'text-emerald-400',
        content: (
            <div className="relative h-full w-full flex items-center justify-center">
                {/* CPU Head */}
                <motion.div
                    className="absolute left-1/4 w-8 h-8 rounded bg-gray-700 border border-gray-500 z-20 flex items-center justify-center"
                >
                    <Cpu size={16} className="text-white" />
                </motion.div>

                {/* Prefetch Drones */}
                <motion.div
                    animate={{ x: [0, 100], opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute left-1/4 w-2 h-2 rounded-full bg-emerald-500 z-10"
                />
                <motion.div
                    animate={{ x: [0, 100], opacity: [1, 0] }}
                    transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
                    className="absolute left-1/4 w-2 h-2 rounded-full bg-emerald-500 z-10"
                />

                {/* Cache Targets */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`absolute w-6 h-6 border border-emerald-500/30 rounded bg-emerald-900/10 right-[${10 + i * 15}%]`} style={{ right: `${20 + i * 20}%` }}>
                        <motion.div
                            animate={{ scale: [0, 1], opacity: [0, 1] }}
                            transition={{ duration: 0.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                            className={`w-full h-full bg-emerald-500/50 ${GLOW_EMERALD}`}
                        />
                    </div>
                ))}
            </div>
        )
    },
    {
        id: 'result',
        title: 'ZERO STALLS',
        caption: 'Execution flows without interruption. Throughput is maximized.',
        icon: Zap,
        color: 'text-amber-400',
        content: (
            <div className="relative h-full w-full flex items-center justify-center gap-1">
                {/* The Stream */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -150 }}
                        animate={{ x: 150 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "linear"
                        }}
                        className="w-12 h-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 shadow-[0_0_10px_#f59e0b]"
                    />
                ))}
                <div className="absolute text-4xl font-black text-white/10 italic tracking-tighter">
                    FAST
                </div>
            </div>
        )
    }
];

export default function DFECPreview({ isActive = false }: { isActive?: boolean }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }

        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % scenarios.length);
        }, 3200);

        return () => clearInterval(timer);
    }, [isActive]);

    const CurrentScenario = scenarios[step];

    return (
        <div className="w-full h-full bg-[#080a0c] relative overflow-hidden flex flex-col font-sans">

            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-blue-900/10" />

            {/* Technical Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Main Visual Area */}
            <div className="flex-1 relative flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {CurrentScenario.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Info Panel */}
            <div className="z-20 bg-black/60 backdrop-blur-md border-t border-white/10 p-5">
                {/* Progress Indicators */}
                <div className="flex gap-1 mb-3">
                    {scenarios.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: i === step ? 1 : 0.2,
                                backgroundColor: i === step ? "#34d399" : "#6b7280",
                            }}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-1"
                    >
                        <div className="flex items-center gap-2">
                            <CurrentScenario.icon size={14} className={CurrentScenario.color} />
                            <h3 className={`text-xs font-bold tracking-widest uppercase ${CurrentScenario.color}`}>
                                {CurrentScenario.title}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-300 font-light leading-relaxed">
                            {CurrentScenario.caption}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
