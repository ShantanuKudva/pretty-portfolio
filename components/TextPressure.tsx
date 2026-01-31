'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TextPressureProps {
    text?: string;
    fontFamily?: string;
    className?: string;
    textColor?: string;
    fontSize?: number;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    flex?: boolean;
    stroke?: boolean;
    scale?: boolean;
    minFontSize?: number;
}

export default function TextPressure({
    text = 'Compressa',
    fontFamily = '',
    className = '',
    textColor = '#000000',
    fontSize = 200,
    width = true,
    weight = true,
    italic = true,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    minFontSize = 24,
}: TextPressureProps) {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Determine spans after initial render
        spansRef.current = spansRef.current.slice(0, text.length);
        setLoading(false);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;

        const animate = () => {
            // Smooth cursor follow
            const dx = mouseRef.current.x - cursorRef.current.x;
            const dy = mouseRef.current.y - cursorRef.current.y;
            cursorRef.current.x += dx * 0.1;
            cursorRef.current.y += dy * 0.1;

            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();

                spansRef.current.forEach((span) => {
                    if (!span) return;

                    const rect = span.getBoundingClientRect();
                    const spanCenter = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                    };

                    const dist = Math.hypot(
                        cursorRef.current.x - spanCenter.x,
                        cursorRef.current.y - spanCenter.y
                    );

                    // Interaction Radius
                    const maxDist = 300;
                    const proximity = Math.max(0, 1 - dist / maxDist);

                    // Calculate Effects
                    // Weight: 100 to 900
                    const fontWeight = weight ? 100 + proximity * 800 : 400;

                    // Width: 100% (normal) to 150%? standard web fonts use font-stretch.
                    // Variable fonts usually use 'wdth' axis.
                    const fontWidth = width ? 100 + proximity * 100 : 100; // 100-200

                    // Italic: 0 to 1 (slnt or ital axis). 
                    // Standard CSS italic is binary. Variable fonts use 'ital' 0-1 or 'slnt' deg.

                    // Scale: 1 to 1.5
                    const scaleVal = scale ? 1 + proximity * 0.5 : 1;

                    // Alpha: 1 down to 0 or 0 to 1?
                    const alphaVal = alpha ? 1 - proximity : 1;

                    // Apply Styles
                    span.style.fontVariationSettings = `
            'wght' ${fontWeight},
            'wdth' ${fontWidth}
          `;

                    if (scale) {
                        span.style.transform = `scaleY(${scaleVal})`;
                    }

                    if (alpha) {
                        span.style.opacity = alphaVal.toString();
                    }

                    // Stroke
                    // ...

                });
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [text, weight, width, scale, alpha]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className} ${flex ? 'flex justify-between' : ''}`}
            style={{ fontFamily }}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    ref={(el) => { spansRef.current[i] = el; }}
                    className="inline-block transition-transform duration-75 will-change-transform"
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: i * 0.03,
                        type: "spring",
                        damping: 12,
                        stiffness: 200
                    }}
                    style={{
                        fontSize: `clamp(${minFontSize}px, ${fontSize}px, ${fontSize}px)`,
                        color: stroke ? 'transparent' : textColor,
                        WebkitTextStroke: stroke ? `1px ${textColor}` : 'none',
                        // Default variation settings
                        fontVariationSettings: "'wght' 100, 'wdth' 100",
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    );
}
