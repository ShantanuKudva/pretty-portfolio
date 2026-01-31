'use client';

import { motion, useAnimation, Variant } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
    text?: string;
    className?: string;
    delay?: number;
    duration?: number;
    onLetterAnimationComplete?: () => void;
}

export function SplitText({
    text = '',
    className = '',
    delay = 50, // ms
    duration = 0.5,
    onLetterAnimationComplete
}: SplitTextProps) {
    const letters = text.split('');
    const [completeCount, setCompleteCount] = useState(0);

    // Reset complete count when text changes
    useEffect(() => {
        setCompleteCount(0);
    }, [text]);

    useEffect(() => {
        if (completeCount === letters.length && letters.length > 0) {
            if (onLetterAnimationComplete) onLetterAnimationComplete();
        }
    }, [completeCount, letters.length, onLetterAnimationComplete]);

    const defaultVariants: { [key: string]: Variant } = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * (delay / 1000), // convert ms to s
                duration: duration,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className={`inline-block overflow-hidden ${className}`}>
            {letters.map((letter, i) => (
                <motion.span
                    key={`${text}-${i}`}
                    custom={i}
                    variants={defaultVariants}
                    initial="hidden"
                    animate="visible"
                    onAnimationComplete={() => setCompleteCount(prev => prev + 1)}
                    className="inline-block will-change-transform"
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </div>
    );
}
