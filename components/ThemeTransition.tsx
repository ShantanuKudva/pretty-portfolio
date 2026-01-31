'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Squares from './Squares';

interface ThemeTransitionProps {
    isActive: boolean;
    toTheme: 'dark' | 'light';
    onTransitionComplete: () => void;
}

export function ThemeTransition({ isActive, toTheme, onTransitionComplete }: ThemeTransitionProps) {
    const [lockedToTheme, setLockedToTheme] = useState<'dark' | 'light'>(toTheme);

    // Lock the theme target when activation starts to ensure consistent animation colors
    useEffect(() => {
        if (isActive) {
            setLockedToTheme(toTheme);
        }
    }, [isActive, toTheme]);

    // Switching TO dark: Dark Splash with White Lines
    // Switching TO light: Light Splash with Dark Lines
    const isToDark = lockedToTheme === 'dark';

    const backgroundColor = isToDark ? '#000000' : '#ffffff';
    const borderColor = isToDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
    const hoverFillColor = isToDark ? '#222' : '#eee';

    return (
        <AnimatePresence
            onExitComplete={() => {
                // Optional cleanup
            }}
        >
            {isActive && (
                <motion.div
                    className="fixed inset-0 z-[200] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onAnimationComplete={(definition) => {
                        // In framer-motion, triggering logic on complete requires checking the state
                        // Here we assume if it's visible, we finished entering.
                        if (isActive) {
                            onTransitionComplete();
                        }
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: backgroundColor }}
                    />
                    <Squares
                        direction="diagonal"
                        speed={0.5}
                        borderColor={borderColor}
                        squareSize={40}
                        hoverFillColor={hoverFillColor}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
