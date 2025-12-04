'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const organizations = [
  {
    id: "LF",
    name: "Linux Foundation",
    courses: [
      "Open Source RT-Thread RTOS on RISC-V (LFD123)",
      "GitHub for Open Standards Development (LFD140)",
      "Secure AI/ML-Driven Software Development (LFEL1012)",
      "Web Auth & API Security"
    ]
  },
  {
    id: "DCSA",
    name: "Defense Counterintelligence and Security Agency",
    courses: [
      "Introduction to DOD Zero Trust",
      "Enterprise Mission Assurance Support Service (eMASS)",
      "ED508 Research Methods, Data Analysis & Reporting",
      "ED509 Assessment and Evaluation of DOD Security Programs",
      "ED511 Leadership in DOD Security",
      "ED512 Effective Communication in DOD Security",
      "ED514 Cybersecurity and Oversight of Info System Security"
    ]
  },
  {
    id: "NVIDIA",
    name: "NVIDIA Deep Learning Institute",
    courses: [
      "Synthetic Data Generation in Isaac Sim",
      "Leveraging ROS 2 & HIL in Isaac Sim",
      "Accelerate Data Science Workflows (Zero Code)",
      "Getting Started with AI on Jetson Nano",
      "An Even Easier Introduction to CUDA",
      "Disaster Risk Monitoring Using Satellite Imagery",
      "Building RAG Agents with LLMs"
    ]
  },
  {
    id: "BIG",
    name: "Basel Institute on Governance",
    courses: ["OSINT Certification"]
  },
  {
    id: "WHO",
    name: "World Health Organization",
    courses: ["HEARTS Technical Package"]
  },
  {
    id: "UNESCO",
    name: "United Nations Educational, Scientific and Cultural Organization",
    courses: ["OER Development"]
  },
  {
    id: "FEMA",
    name: "Federal Emergency Management Agency",
    courses: ["IPAWS & Hazardous Materials"]
  },
];

type Organization = typeof organizations[0];

export default function Certifications() {
  const [showOrgs, setShowOrgs] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  return (
    <section className="py-12 md:py-16 w-full relative" id="learning">
      <div
        className="mx-auto max-w-4xl px-8 text-center relative"
        onMouseEnter={() => setShowOrgs(true)}
        onMouseLeave={() => {
          setShowOrgs(false);
          setSelectedOrg(null);
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00145C] transition-colors duration-500 hover:text-[#70D7FF] cursor-pointer">
          My Learning <span className="font-semibold text-cyan-900 transition-all duration-300 hover:text-[#863FF3] hover:drop-shadow-[0_0_8px_rgba(134,63,243,0.8)] cursor-crosshair">Ecosystem</span>
        </h1>

        <AnimatePresence>
          {showOrgs && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4"
            >
              {organizations.map((org) => (
                <p
                  key={org.id}
                  onMouseEnter={() => setSelectedOrg(org)}
                  className="font-mono text-sm text-[#00145C] hover:text-[#70D7FF] cursor-pointer transition-colors"
                >
                  {org.name}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 mx-auto max-w-4xl px-8 h-48">
        <AnimatePresence mode="wait">
          {selectedOrg && (
            <motion.div
              key={selectedOrg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-[#863FF3] drop-shadow-[0_0_8px_rgba(134,63,243,0.8)] mb-4 text-center">{selectedOrg.name}</h3>
              <ul className="space-y-2">
                {selectedOrg.courses.map((course, j) => (
                  <li key={j} className="text-sm font-mono text-[#00145C] flex items-start gap-2">
                    <span className="text-cyan-900 mt-0.5">›</span> {course}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}