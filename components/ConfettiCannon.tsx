"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

// Register Observer plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(Observer);
}

export default function ConfettiCannon() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<SVGSVGElement>(null);
    const handRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef<boolean>(false);

    // Elements references
    const rockRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<SVGGElement>(null);
    const lineRef = useRef<SVGLineElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);

    // State for line drawing
    const startPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current || !handRef.current) return;

        const container = containerRef.current;

        // Quick setters for performance
        const xSetter = gsap.quickTo(handRef.current, "x", { duration: 0.1 });
        const ySetter = gsap.quickTo(handRef.current, "y", { duration: 0.1 });

        // Mouse movement handler for the hand cursor
        const handleMouseMove = (e: MouseEvent) => {
            // For absolute positioning in a relative container at the top of the page,
            // pageX/Y works well.
            xSetter(e.pageX);
            ySetter(e.pageY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Observer for dragging
        Observer.create({
            target: container,
            type: "pointer",
            onPress: (e) => startDrawing(e),
            onDrag: (e) => draggingRef.current && updateDrawing(e),
            onDragEnd: () => clearDrawing(),
            onRelease: () => clearDrawing()
        });

        // Helper functions
        const startDrawing = (e: any) => {
            draggingRef.current = true;
            // Use page coordinates if available, or fallback
            const x = e.pageX ?? (e.x + window.scrollX);
            const y = e.pageY ?? (e.y + window.scrollY);

            startPos.current = { x, y };

            // Show drag elements
            if (dragRef.current) dragRef.current.style.opacity = "1";
            if (rockRef.current) gsap.set(rockRef.current, { opacity: 0 });

            // Setup line start
            if (lineRef.current) {
                lineRef.current.setAttribute("x1", String(x));
                lineRef.current.setAttribute("y1", String(y));
                lineRef.current.setAttribute("x2", String(x));
                lineRef.current.setAttribute("y2", String(y));
            }

            // Setup circle/image start
            if (circleRef.current) {
                circleRef.current.setAttribute("cx", String(x));
                circleRef.current.setAttribute("cy", String(y));
                gsap.set(circleRef.current, { scale: 1, rotation: 0 });
            }
        };

        const updateDrawing = (e: any) => {
            if (!dragRef.current) return;

            const cursorX = e.pageX ?? (e.x + window.scrollX);
            const cursorY = e.pageY ?? (e.y + window.scrollY);

            const dx = cursorX - startPos.current.x;
            const dy = cursorY - startPos.current.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            // Limit drag distance visually if needed
            let x2 = cursorX;
            let y2 = cursorY;

            if (distance < 30) {
                x2 = startPos.current.x;
                y2 = startPos.current.y;
            }

            if (lineRef.current) {
                lineRef.current.setAttribute("x2", String(x2));
                lineRef.current.setAttribute("y2", String(y2));
            }

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Rotate/scale things
            if (circleRef.current) {
                gsap.set(circleRef.current, {
                    rotation: angle - 45,
                    transformOrigin: "center center",
                    x: dx,
                    y: dy
                });
            }

            // Rotate hand
            gsap.to(handRef.current, {
                rotation: angle - 90,
                duration: 0.1,
                overwrite: true
            });
        };

        const clearDrawing = () => {
            if (!draggingRef.current) return;
            draggingRef.current = false;

            // Calculate distance for force
            const dx = (circleRef.current?.getBoundingClientRect().left || 0) + 20 + window.scrollX - startPos.current.x;
            const dy = (circleRef.current?.getBoundingClientRect().top || 0) + 20 + window.scrollY - startPos.current.y;
            const force = Math.sqrt(dx * dx + dy * dy);

            createExplosion(startPos.current.x, startPos.current.y, force);

            // Reset UI
            if (dragRef.current) dragRef.current.style.opacity = "0";
            if (rockRef.current) gsap.set(rockRef.current, { opacity: 1 });

            // Wiggle effect on the idle rock (if we had one separate)

            // Reset hand rotation
            gsap.to(handRef.current, { rotation: 0, duration: 0.2 });
        };

        const createExplosion = (x: number, y: number, force: number) => {
            const count = Math.min(20, Math.max(5, Math.floor(force / 10)));

            for (let i = 0; i < count; i++) {
                const el = document.createElement("div");
                el.classList.add("confetti-particle");
                const colors = ["#FFD700", "#FF6347", "#00BFFF", "#32CD32", "#FF69B4"];
                el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                el.style.width = Math.random() * 10 + 5 + "px";
                el.style.height = Math.random() * 10 + 5 + "px";
                el.style.position = "absolute";
                el.style.left = x + "px";
                el.style.top = y + "px";
                el.style.borderRadius = "50%";
                el.style.pointerEvents = "none";
                el.style.zIndex = "100";
                if (containerRef.current) containerRef.current.appendChild(el);

                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * force * 1.5 + 100;

                const destX = x + Math.cos(angle) * velocity;
                const destY = y + Math.sin(angle) * velocity;

                gsap.to(el, {
                    x: destX - x,
                    duration: Math.random() * 1 + 0.5,
                    ease: "power1.out"
                });

                gsap.to(el, {
                    y: (destY - y) + 500,
                    duration: Math.random() * 1 + 0.5,
                    ease: "power2.in",
                    onComplete: () => el.remove()
                });

                gsap.to(el, {
                    rotation: Math.random() * 720,
                    duration: 1
                });
            }
        };

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-10 overflow-visible pointer-events-auto">
            {/* Full screen SVG canvas for drawing the line */}
            <svg ref={canvasRef} className="w-full h-full absolute top-0 left-0 pointer-events-none overflow-visible">
                <g ref={dragRef} style={{ opacity: 0 }}>
                    <line
                        ref={lineRef}
                        stroke="#fffce1"
                        strokeWidth="4"
                        strokeDasharray="8"
                        strokeLinecap="round"
                    />
                    <circle
                        ref={circleRef}
                        r="20"
                        fill="#333"
                        stroke="#fff"
                        strokeWidth="2"
                    />
                </g>
            </svg>

            {/* The 'Hand' Cursor Follower */}
            <div
                ref={handRef}
                className="absolute top-0 left-0 w-12 h-12 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
                <span className="text-4xl filter drop-shadow-lg">🖐️</span>
            </div>
        </div>
    );
}
