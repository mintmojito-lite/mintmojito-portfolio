"use client";
import React from "react";
import StackingCards from "./StackingCards";
import DynamicSystems from "./DynamicSystems";

const projects = [
  {
    id: "SRAV",
    name: "SRAV Secure Retentive Attenuation & Verification Time-Bound Data Decay Security System",
    short: "Data Decay Architecture",
    detail: "Cryptographic decay system enforcing time-bound access and irreversible precision attenuation for sensitive data.",
    stack: ["Security", "Data", "ZK-Logic", "Compliance"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "PQER",
    name: "Predictive Quantum-Entanglement Router  Moving Target Defense System for DDoS Mitigation",
    short: "Quantum MTD Router",
    detail: "Predictive entanglement-based routing achieving continuous attack-surface shift for DDoS immunity.",
    stack: ["Networking", "Defense", "Simulation"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "ZKUA",
    name: "Zero-Knowledge Unified Access Privacy-Preserving Federated Medical Intelligence Framework",
    short: "Zero-Knowledge FL",
    detail: "Federated Medical AI where global model trust is verifiable without exposing private data.",
    stack: ["ZKP", "FL", "PyTorch"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "EVI",
    name: "Immutable Digital Evidence Chain-of-Custody & Forensic Verification System",
    short: "Digital Forensics Ledger",
    detail: "Immutable chain-of-custody protocol with tamperproof hash-linked logging for evidence handling.",
    stack: ["Forensics", "Web3"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "MMDE",
    name: "Multi-Metric Disease Evaluation Clinical Analytics & Risk Assessment Simulator",
    short: "Medical Risk Analytics",
    detail: "WHO-aligned multi-metric simulator for early clinical risk detection.",
    stack: ["Health-AI", "Analytics"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "LIPIPARVATHAM",
    name: "Offline Indian-Language Phonetic Transliteration & Unicode Normalization System",
    short: "Offline Transliterator",
    detail: "Sub-50ms offline NLP transliteration engine supporting multiple Indian languages.",
    stack: ["NLP", "Unicode", "Mobile"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "MINDBITE",
    name: "Adaptive Mood-Based Food Recommendation & Nutrition Personalization Application",
    short: "Mood-Based Food System",
    detail: "PCOD, region and health-aware recommendation engine with high-fidelity UI ecosystem.",
    stack: ["UX", "Firebase"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "SCHEMIC",
    name: "Semantic Schema-Driven Code Generation Engine",
    short: "Auto-Infrastructure",
    detail: "Generates multi-service backend scaffolds from high-level schemas. 75% faster delivery.",
    stack: ["Python", "DevTools"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "NEUROV2",
    name: "High-Performance JIT Transpiling Engine for Python-to-C++ Parallel Execution",
    short: "JIT C++ Transpiler",
    detail: "AST-based compiler converting Python to multi-core C++ kernels. True parallelism unlocked.",
    stack: ["Compiler", "OpenMP"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "ATCA-AI",
    name: "ATCA-AI",
    short: "Active Thermal Control Architecture",
    detail: "AI-driven urban thermal control system featuring real-time 3D airflow simulation, micro-climate prediction, and urban heat mitigation using reinforcement learning and voxel-based GIS modeling.",
    stack: ["GeoAI", "PyTorch", "Reinforcement Learning", "PyVista", "NumPy"],
    docLink: "https://github.com/mintmojito-lite/ATCA-AI"
  },

  {
    id: "GHOST-AI",
    name: "Ghost Navigation System",
    short: "AI GPS-blackout navigation for hypersonic flight",
    detail: "A physics + AI fusion navigation model that keeps a hypersonic glide vehicle on a safe path even when GPS and communication blackout happens due to plasma. Fully simulated, ethical aerospace research.",
    stack: ["PyTorch", "NumPy", "Physics Sim", "GNC"],
    docLink: "https://github.com/mintmojito-lite/Ghost-AI"
  }
  ,
  {
    id: "CGRAG",
    name: "GPU-Optimized Graph Retrieval-Augmented Generation Query Analyzer",
    short: "GPU Graph Retrieval",
    detail: "Graph-accelerated Retrieval-Augmented Generation engine using RAPIDS/cuGraph.",
    stack: ["CUDA", "RAG"],
    docLink: "https://github.com/mintmojito-lite"
  },

  {
    id: "DFEC",
    name: "Dynamic Federated Edge Compliance Secure Adaptive Policy Enforcement on Edge Networks",
    short: "Parallel Entropy Compression",
    detail: "Fault-resistant data compression kernel optimized for multi-core distributed execution.",
    stack: ["C++", "Systems"],
    docLink: "https://github.com/mintmojito-lite"
  },
  {
    id: "ECHO",
    name: "Project Echo-DIGITAL TWIN",
    short: "Vector Intelligence Core Based On Our Memory",
    detail: "An next gen agentic ai that can behave excatly like you from text to viedo , this project is on going anyone can join .",
    stack: ["Vector DB", "NLP"],
    docLink: "https://github.com/mintmojito-lite"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full relative z-20">
      <div className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          <DynamicSystems />
        </h1>
        <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
          Scroll down to explore
        </p>
      </div>

      <StackingCards projects={projects} />

      <div className="h-[10vh]" />
    </section>
  );
}
