"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Shuffle, Shield, Server, Box } from 'lucide-react';

// Design Constants
const GLASS_PANEL = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl";
const GLOW_CYAN = "drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]";
const GLOW_PURPLE = "drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]";

const scenarios = [
    {
        id: 'lock',
        title: 'STATIC TARGET',
        caption: 'Conventional servers are fixed points. Easy to scan and lock onto.',
        icon: Target,
        color: 'text-red-400',
        content: (
            <div className="relative flex items-center justify-center h-full w-full">
                {/* Central Node */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.5)] z-10"
                />

                {/* Scanning Rings */}
                <motion.div
                    animate={{ scale: [1.5, 1], opacity: [0, 1, 0], borderColor: ["#ef4444", "#ef4444"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute w-24 h-24 rounded-full border-2 border-red-500"
                />
                <motion.div
                    animate={{ scale: [2, 1], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "linear" }}
                    className="absolute w-32 h-32 rounded-full border border-dashed border-red-500/50"
                />

                {/* Locked Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 bg-red-500/20 border border-red-500/50 px-3 py-1 rounded text-[10px] text-red-400 font-mono tracking-widest"
                >
                    TARGET LOCKED
                </motion.div>
            </div>
        )
    },
    {
        id: 'superposition',
        title: 'SUPERPOSITION',
        caption: 'The target enters a quantum state, existing as a probability cloud.',
        icon: Box,
        color: 'text-purple-400',
        content: (
            <div className="relative flex items-center justify-center h-full w-full">
                {/* Core Fading Out */}
                <motion.div
                    animate={{ scale: [1, 0], opacity: [1, 0] }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-12 h-12 rounded-full bg-white/50 blur-sm"
                />

                {/* Quantum Cloud Expansion */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            scale: 1,
                            x: Math.cos(i * 60 * (Math.PI / 180)) * 60,
                            y: Math.sin(i * 60 * (Math.PI / 180)) * 60,
                            opacity: [0, 1, 0.5]
                        }}
                        transition={{ duration: 1, delay: 0.2, type: "spring" }}
                        className={`absolute w-6 h-6 rounded-full bg-purple-500 ${GLOW_PURPLE}`}
                    />
                ))}

                {/* Orbital Rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 1, rotate: 180 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-40 h-40 rounded-full border-2 border-purple-400/30 border-t-transparent"
                />
            </div>
        )
    },
    {
        id: 'entanglement',
        title: 'ENTANGLEMENT',
        caption: 'Router and Client sync perfectly across the probability field.',
        icon: Shuffle,
        color: 'text-cyan-400',
        content: (
            <div className="flex items-center justify-center gap-16 h-full w-full relative">

                {/* Entangled Pair */}
                {[0, 1].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.2, 1],
                            filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`relative w-10 h-10 rounded-full bg-cyan-400 ${GLOW_CYAN} z-10`}
                    >
                        <div className="absolute inset-0 bg-white/50 rounded-full blur-md animate-pulse" />
                    </motion.div>
                ))}

                {/* Connection Wave */}
                <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-16 flex items-center justify-center overflow-hidden opacity-50">
                    <motion.svg width="200" height="60" viewBox="0 0 200 60" className="w-full">
                        <motion.path
                            d="M 0 30 Q 50 10 100 30 T 200 30"
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="3"
                            animate={{
                                d: [
                                    "M 0 30 Q 50 10 100 30 T 200 30",
                                    "M 0 30 Q 50 50 100 30 T 200 30",
                                    "M 0 30 Q 50 10 100 30 T 200 30"
                                ]
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.svg>
                </div>
            </div>
        )
    },
    {
        id: 'evasion',
        title: 'ATTACK EVASION',
        caption: 'Attacks strike empty space as the target shifts state instantly.',
        icon: Shield,
        color: 'text-green-400',
        content: (
            <div className="relative h-full w-full flex items-center justify-center">
                {/* Target Hopping */}
                <motion.div
                    animate={{
                        x: [0, 80, -80, 0],
                        opacity: [1, 0, 1, 1], // Blink effect
                        scale: [1, 0.5, 1, 1]
                    }}
                    transition={{ duration: 2, times: [0, 0.2, 0.25, 1], repeat: Infinity, repeatDelay: 1 }}
                    className={`absolute w-12 h-12 rounded-full bg-green-500 shadow-[0_0_20px_#22c55e] z-20`}
                />

                {/* Incoming Attack Beam */}
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 200, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
                    className="absolute h-1 w-24 bg-red-500 shadow-[0_0_10px_#ef4444] z-10"
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full blur-sm" />
                </motion.div>
            </div>
        )
    },
    {
        id: 'chip',
        title: 'HARDWARE LOGIC',
        caption: 'Implemented on P4 ASIC silicon. Zero software overhead.',
        icon: Server,
        color: 'text-orange-400',
        content: (
            <div className="relative h-full w-full flex items-center justify-center">
                <div className={`w-32 h-32 rounded-xl border border-orange-500/30 bg-orange-900/10 flex items-center justify-center relative overflow-hidden`}>
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />

                    {/* Active Chips */}
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 bg-orange-500 rounded shadow-[0_0_20px_#f97316] z-10"
                    />

                    {/* Running Lines */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-orange-400 h-[1px] w-full"
                            style={{ top: `${20 + i * 20}%` }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                        />
                    ))}
                </div>
            </div>
        )
    }
];

export default function PQERPreview({ isActive = false }: { isActive?: boolean }) {
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
        <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col font-sans">

            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-cyan-900/20" />

            {/* Background Noise/Stars */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Main Visual Area */}
            <div className="flex-1 relative flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {CurrentScenario.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Modern Glass Info Panel */}
            <div className="z-20 bg-black/50 backdrop-blur-md border-t border-white/10 p-5">
                {/* Progress Line */}
                <div className="flex gap-1 mb-3">
                    {scenarios.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: i === step ? 1 : 0.3,
                                backgroundColor: i === step ? "#ffffff" : "#6b7280",
                                flex: i === step ? 2 : 1
                            }}
                            className="h-1 rounded-full transition-all duration-500"
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <CurrentScenario.icon size={16} className={CurrentScenario.color} />
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
