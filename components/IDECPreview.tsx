"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, Server, Lock, FileKey, Network, Cloud, Scale, CheckCircle, FileVideo, Fingerprint, Key, Database, Play, Pause, RotateCcw, ArrowRight, Check } from 'lucide-react';

const GLASS_PANEL = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl";

const scenarios = [
    {
        id: 'intro',
        title: "EVIGUARD",
        caption: "Immutable Digital Evidence Chain-of-Custody System",
        duration: 3000,
        render: (ss: number) => (
            <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative mb-6"
                >
                    <Shield className="w-20 h-20 text-blue-500" />
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-bold text-white tracking-tight"
                >
                    EviGuard
                </motion.h1>
            </div>
        )
    },
    {
        id: 'capture',
        title: "SECURE INGESTION",
        caption: "Evidence is captured and immediately timestamped on upload.",
        duration: 4000,
        render: (ss: number) => (
            <div className="flex flex-col items-center justify-center h-full w-full gap-8">
                <div className="flex items-center gap-12">

                    {/* Device */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <Smartphone className="w-8 h-8 text-gray-300" />
                        </div>
                    </div>

                    {/* Transfer */}
                    <div className="relative w-32 h-16 flex items-center justify-center">
                        <div className="absolute w-full h-[1px] bg-white/20" />
                        <motion.div
                            initial={{ x: -60, opacity: 0 }}
                            animate={{ x: 60, opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute p-2 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6] z-10"
                        >
                            <FileVideo className="w-4 h-4 text-white" />
                        </motion.div>
                    </div>

                    {/* Server */}
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-colors duration-500 ${ss > 20 ? 'bg-green-500/20 border-green-500/50' : 'bg-white/10 border-white/20'}`}>
                            {ss > 20 ? <CheckCircle className="w-8 h-8 text-green-400" /> : <Server className="w-8 h-8 text-gray-300" />}
                        </div>
                    </div>

                </div>
                {ss > 20 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono text-green-400 bg-green-900/20 px-3 py-1 rounded border border-green-500/30"
                    >
                        TIMESTAMP ACQUIRED
                    </motion.div>
                )}
            </div>
        )
    },
    {
        id: 'encryption',
        title: "ENCRYPTION",
        caption: "AES-256 wraps the file. SHA-256 fingerprints it.",
        duration: 4000,
        render: (ss: number) => (
            <div className="flex items-center justify-center h-full gap-8">
                <FileVideo className="w-10 h-10 text-red-400" />

                <ArrowRight className="text-white/20" />

                <div className="relative w-32 h-32 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/50"
                    />
                    <Lock className="w-8 h-8 text-blue-400" />
                </div>

                <ArrowRight className="text-white/20" />

                <div className="flex flex-col gap-3">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 w-48"
                    >
                        <FileKey className="w-4 h-4 text-yellow-400" />
                        <div className="text-[10px] text-yellow-200">
                            <div>ENCRYPTED BLOB</div>
                            <div className="opacity-50">AES-256</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 w-48"
                    >
                        <Fingerprint className="w-4 h-4 text-purple-400" />
                        <div className="text-[10px] text-purple-200">
                            <div>HASH FINGERPRINT</div>
                            <div className="opacity-50">SHA-256</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'sss',
        title: "FRAGMENTATION",
        caption: "Shamir's Secret Sharing splits the master key into 5 parts.",
        duration: 4000,
        render: (ss: number) => (
            <div className="relative flex items-center justify-center h-full w-full">
                {/* Center Master Key */}
                <motion.div
                    animate={ss > 10 ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    className="absolute z-20 p-4 bg-yellow-400/20 rounded-full box-content"
                >
                    <Key className="w-8 h-8 text-yellow-400" />
                </motion.div>

                {/* Fragments */}
                {[...Array(5)].map((_, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    const radius = 100;
                    return (
                        <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={ss > 10 ? {
                                x: Math.cos(angle) * radius,
                                y: Math.sin(angle) * radius,
                                opacity: 1
                            } : {}}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="absolute w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
                        >
                            <Key className="w-4 h-4 text-yellow-500/70" />
                        </motion.div>
                    )
                })}

                {ss > 10 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute text-2xl font-bold text-white/20"
                    >
                        3 / 5
                    </motion.div>
                )}
            </div>
        )
    },
    {
        id: 'blockchain',
        title: "IMMUTABLE LEDGER",
        caption: "Metadata is stored on Polygon. File on IPFS.",
        duration: 4000,
        render: (ss: number) => (
            <div className="flex flex-col w-full h-full p-4 gap-4">
                {/* Blockchain */}
                <div className="flex-1 border-b border-white/10 flex items-center gap-4 px-4 overflow-hidden relative">
                    <div className="absolute left-0 text-[10px] font-bold text-purple-500 -top-2">POLYGON</div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-24 h-20 bg-purple-900/20 border border-purple-500/30 rounded-lg" />
                    ))}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex-shrink-0 w-32 h-24 bg-purple-500/20 border border-purple-500 rounded-xl p-3 flex flex-col justify-center"
                    >
                        <div className="text-[10px] text-purple-300 font-bold mb-1">NEW BLOCK</div>
                        <div className="h-1 w-full bg-purple-500/40 rounded mb-1" />
                        <div className="h-1 w-2/3 bg-purple-500/40 rounded" />
                    </motion.div>
                </div>

                {/* IPFS */}
                <div className="flex-1 flex items-center justify-around px-4 relative">
                    <div className="absolute left-0 text-[10px] font-bold text-blue-500 -top-2">IPFS STORAGE</div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Cloud className="w-20 h-20 text-blue-500/50" />
                    </motion.div>
                    {ss > 20 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded text-xs border border-blue-500/30"
                        >
                            CID: QmXy...7z9
                        </motion.div>
                    )}
                </div>
            </div>
        )
    },
    {
        id: 'verify',
        title: "VERIFICATION",
        caption: "Evidence matches the immutable blockchain record perfectly.",
        duration: 3000,
        render: (ss: number) => (
            <div className="flex flex-col items-center justify-center h-full w-full gap-6">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-xl border border-purple-500/50 bg-purple-900/20 flex items-center justify-center">
                            <FileKey className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-[10px] text-purple-400">LEDGER</span>
                    </div>

                    <div className="relative">
                        {ss > 10 ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_#22c55e]"
                            >
                                <Check className="w-6 h-6 text-black" />
                            </motion.div>
                        ) : (
                            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-xl border border-blue-500/50 bg-blue-900/20 flex items-center justify-center">
                            <FileVideo className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-[10px] text-blue-400">FILE</span>
                    </div>
                </div>

                {ss > 15 && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-xl font-bold text-green-400 tracking-widest"
                    >
                        VERIFIED
                    </motion.div>
                )}
            </div>
        )
    }
];

export default function IDECPreview({ isActive = false }: { isActive?: boolean }) {
    const [step, setStep] = useState(0);
    const [subStep, setSubStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            setSubStep(0);
            return;
        }

        const interval = setInterval(() => {
            setSubStep((prev) => prev + 1);
        }, 100);

        const scenarioTimer = setTimeout(() => {
            setStep((prev) => (prev + 1) % scenarios.length);
            setSubStep(0);
        }, scenarios[step].duration);

        return () => {
            clearInterval(interval);
            clearTimeout(scenarioTimer);
        };
    }, [isActive, step]);

    const CurrentScenario = scenarios[step];

    return (
        <div className="w-full h-full bg-[#030712] relative overflow-hidden flex flex-col font-sans select-none">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

            {/* Grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Main Stage */}
            <div className="flex-1 relative flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        {CurrentScenario.render(subStep)}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* HUD Footer */}
            <div className="bg-black/60 backdrop-blur-md border-t border-white/10 p-4">
                <div className="flex gap-1 mb-2">
                    {scenarios.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === step ? 'bg-blue-500' : 'bg-white/10'}`} />
                    ))}
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-1">{CurrentScenario.title}</h3>
                        <p className="text-sm text-gray-400 font-light">{CurrentScenario.caption}</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <div className="text-[10px] text-gray-500 font-mono">REC</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
