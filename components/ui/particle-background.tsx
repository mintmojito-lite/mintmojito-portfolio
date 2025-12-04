"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let isHoveringButton = false;
        const mouse = { x: 0, y: 0 };

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Handle mouse movement and button detection
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            const target = e.target as HTMLElement;
            // Check if hovering over a SPECIFIC target element
            if (target.closest(".magnetic-target")) {
                isHoveringButton = true;
            } else {
                isHoveringButton = false;
            }
        };

        // Handle click for explosion
        const handleClick = () => {
            if (isHoveringButton) {
                particles.forEach((p) => {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;

                    // Explosion force (Increased for "vroo" speed)
                    const force = 100;
                    p.vx = forceDirectionX * force * (Math.random() * 0.5 + 0.5);
                    p.vy = forceDirectionY * force * (Math.random() * 0.5 + 0.5);
                });
            }
        };

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth / 10, 150);

            for (let i = 0; i < particleCount; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const vx = (Math.random() - 0.5) * 0.5;
                const vy = (Math.random() - 0.5) * 0.5;
                const density = Math.random() * 30 + 1;

                particles.push({
                    x,
                    y,
                    vx,
                    vy,
                    size,
                    baseX: x,
                    baseY: y,
                    density,
                });
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Friction (less friction = fly further)
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Base movement (drift) if velocity is low
                if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1) {
                    // Add a little random drift back
                    p.vx += (Math.random() - 0.5) * 0.02;
                    p.vy += (Math.random() - 0.5) * 0.02;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Boundary check (bounce)
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Interaction Logic
                if (isHoveringButton) {
                    // Global Attraction to mouse
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    // No distance check - ALL particles come
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;

                    // Stronger attraction (Increased for "so speed")
                    const attractionStrength = 8.0;

                    // Only attract if not currently exploding (high velocity)
                    if (Math.abs(p.vx) < 5 && Math.abs(p.vy) < 5) {
                        p.vx += forceDirectionX * attractionStrength;
                        p.vy += forceDirectionY * attractionStrength;
                    }
                }

                // Draw particle
                ctx.fillStyle = "#9C95F9"; // Updated color
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Setup
        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: "transparent" }}
        />
    );
}
