import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Trash2, CheckCircle, Shield, Key, Clock, Database, Zap, Share2, Bell, Server } from 'lucide-react';

// Design Constants
const GLASS_PANEL = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl";
const TEXT_GLOW = "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]";

const scenarios = [
    {
        id: 'ingest',
        title: 'Secure Ingestion',
        caption: 'User uploads sensitive data. System immediately establishes a secure, encrypted tunnel.',
        icon: FileText,
        color: 'text-blue-400',
        content: (
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        className={`p-6 rounded-2xl ${GLASS_PANEL}`}
                    >
                        <FileText className="w-16 h-16 text-blue-400" />
                    </motion.div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute -bottom-4 left-0 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"
                    />
                </div>
                <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-white tracking-wide">Uploading...</h3>
                    <p className="font-mono text-[10px] text-blue-300/60">TLS 1.3 ENCRYPTED</p>
                </div>
            </div>
        )
    },
    {
        id: 'encrypt',
        title: 'AES-256 Encryption',
        caption: 'Data is encrypted using a specialized symmetric key (Fernet/AES-256).',
        icon: Lock,
        color: 'text-emerald-400',
        content: (
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-8 rounded-full ${GLASS_PANEL} relative z-10`}
                >
                    <Lock className="w-16 h-16 text-emerald-400" />
                </motion.div>
                <motion.div
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute inset-0 border-2 border-emerald-500/30 rounded-full animate-ping"
                />
                <div className="absolute -right-12 top-0 bg-black/60 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                    Ciphertext
                </div>
            </div>
        )
    },
    {
        id: 'fragment',
        title: 'Shamir Key Sharding',
        caption: 'The master key is split into 5 fragments. No single fragment can unlock the data.',
        icon: Key,
        color: 'text-yellow-400',
        content: (
            <div className="relative w-full max-w-sm h-48 flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.2, 0], opacity: [1, 1, 0] }}
                    transition={{ duration: 1, times: [0, 0.5, 1] }}
                    className="absolute z-10"
                >
                    <Key className="w-16 h-16 text-yellow-400" />
                </motion.div>

                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            scale: 1,
                            x: Math.cos((i * 72 * Math.PI) / 180) * 80,
                            y: Math.sin((i * 72 * Math.PI) / 180) * 80
                        }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                        className={`absolute w-8 h-8 rounded-full ${GLASS_PANEL} flex items-center justify-center backdrop-blur-md`}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_currentColor]" />
                    </motion.div>
                ))}
            </div>
        )
    },
    {
        id: 'distribute',
        title: 'Distributed Storage',
        caption: 'Shards are distributed to isolated storage nodes. Reconstructing the key requires 3/5 shares.',
        icon: Server,
        color: 'text-indigo-400',
        content: (
            <div className="grid grid-cols-5 gap-3">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className={`w-10 h-10 rounded-lg ${GLASS_PANEL} flex items-center justify-center`}>
                            <Database className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="w-1 h-8 bg-gradient-to-b from-indigo-500/50 to-transparent" />
                    </motion.div>
                ))}
            </div>
        )
    },
    {
        id: 'decay',
        title: 'Time-Bound Decay',
        caption: 'The Relevance Quantum (R_Q) score decays over time. When it hits threshold, deletion triggers.',
        icon: Clock,
        color: 'text-purple-400',
        content: (
            <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span>R_Q SCORE</span>
                    <span className="text-red-400">CRITICAL</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: ["100%", "60%", "30%", "10%"] }}
                        transition={{ duration: 3, times: [0, 0.4, 0.7, 1] }}
                        className="h-full bg-gradient-to-r from-purple-500 to-red-500 relative"
                    />
                    {/* Threshold marker */}
                    <div className="absolute top-0 bottom-0 left-[20%] w-0.5 bg-white/30" />
                </div>
                <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] text-gray-500">100%</span>
                    <span className="text-[10px] text-gray-500">THRESH</span>
                    <span className="text-[10px] text-gray-500">0%</span>
                </div>
            </div>
        )
    },
    {
        id: 'notify',
        title: 'Smart Notification',
        caption: 'System alerts owners before irreversible deletion events via integrated channels.',
        icon: Bell,
        color: 'text-orange-400',
        content: (
            <div className="relative">
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Bell className="w-16 h-16 text-orange-400" />
                </motion.div>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-black"
                >
                    !
                </motion.div>
                <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 ${GLASS_PANEL} rounded-lg flex items-center gap-2`}>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-white">DELETION IMMINENT</span>
                </div>
            </div>
        )
    },
    {
        id: 'destroy',
        title: 'Cryptographic Deletion',
        caption: 'Keys are shattered. Without them, the encrypted data is mathematically unrecoverable.',
        icon: Trash2,
        color: 'text-red-500',
        content: (
            <div className="relative w-full max-w-sm h-48 flex items-center justify-center">
                {/* Shattered pieces fading out */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 1, opacity: 1, x: Math.cos((i * 72 * Math.PI) / 180) * 80, y: Math.sin((i * 72 * Math.PI) / 180) * 80 }}
                        animate={{
                            scale: 0,
                            opacity: 0,
                            x: Math.cos((i * 72 * Math.PI) / 180) * 150, // Fly outward
                            y: Math.sin((i * 72 * Math.PI) / 180) * 150
                        }}
                        transition={{ duration: 0.8 }}
                        className={`absolute w-8 h-8 rounded-full ${GLASS_PANEL} flex items-center justify-center border-red-500/30`}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Trash2 className="w-16 h-16 text-red-500 opacity-50" />
                </motion.div>
            </div>
        )
    },
    {
        id: 'verify',
        title: 'Proof of Erasure',
        caption: 'A Zero-Knowledge Proof (ZKP) is generated to securely verify deletion to auditors.',
        icon: Shield,
        color: 'text-green-400',
        content: (
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    className={`relative p-8 rounded-full ${GLASS_PANEL}`}
                >
                    <Shield className="w-20 h-20 text-green-400" />
                    <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute inset-0 border-2 border-green-500/50 rounded-full"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="absolute -bottom-2 -right-2 bg-green-500 text-black p-2 rounded-full"
                    >
                        <CheckCircle className="w-6 h-6" />
                    </motion.div>
                </motion.div>
            </div>
        )
    }
];

const SRAVPreview = ({ isActive = false }: { isActive?: boolean }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setStep(0);
            return;
        }

        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % scenarios.length);
        }, 3500); // 3.5s per slide
        return () => clearInterval(timer);
    }, [isActive]);

    const CurrentScenario = scenarios[step];

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden flex flex-col">

            {/* Ambient Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_50%)] animate-spin-slow duration-[20s]" />
            </div>

            {/* Main Visual Area */}
            <div className="flex-1 relative flex items-center justify-center p-6">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {CurrentScenario.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Timeline / Progress Header - Minimal */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 px-8">
                {scenarios.map((_, i) => (
                    <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-500 ${i === step ? 'bg-white opacity-100' : i < step ? 'bg-white/30' : 'bg-white/10'}`}
                    />
                ))}
            </div>

            {/* Caption Area - Bottom Fixed */}
            <div className="relative z-20 bg-black/40 backdrop-blur-xl border-t border-white/10 p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <CurrentScenario.icon className={`w-5 h-5 ${CurrentScenario.color}`} />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                {CurrentScenario.title}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed">
                            {CurrentScenario.caption}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default SRAVPreview;
