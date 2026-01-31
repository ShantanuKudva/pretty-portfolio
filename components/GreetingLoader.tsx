'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from './SplitText';
import { GridScan } from './GridScan';
import Squares from './Squares';

interface GreetingLoaderProps {
    onComplete: () => void;
}

const greetings = [
    { text: "Hello!", lang: "English" },
    { text: "ನಮಸ್ಕಾರ!", lang: "Kannada" }, // Namaskara
    { text: "नमस्ते!", lang: "Hindi" },    // Namaste
    { text: "नमस्कार!", lang: "Marathi" },  // Namaskar
    { text: "देव बरे करू!", lang: "Konkani" }, // Dev Boren Korun (Common Goan/Konkani)
];

const finalGreeting = "Nice to see you.";

export function GreetingLoader({ onComplete }: GreetingLoaderProps) {
    const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
    const [isFinal, setIsFinal] = useState(false);
    const [exit, setExit] = useState(false);
    const [whiteFlash, setWhiteFlash] = useState(false);

    useEffect(() => {
        if (exit) return;

        if (currentGreetingIndex < greetings.length) {
            const timeout = setTimeout(() => {
                setCurrentGreetingIndex((prev) => prev + 1);
            }, 1200); // Time per greeting
            return () => clearTimeout(timeout);
        } else {
            // After all greetings, show final
            setIsFinal(true);

            // Sequence: Show final greeting -> White Flash -> Fade Out
            const flashTimeout = setTimeout(() => {
                setWhiteFlash(true);

                const exitTimeout = setTimeout(() => {
                    setExit(true); // Start exit animation
                }, 400); // Wait for white flash to peak

                return () => clearTimeout(exitTimeout);
            }, 2500); // Time for final greeting

            return () => clearTimeout(flashTimeout);
        }
    }, [currentGreetingIndex, exit]);

    // Cleanup and notify parent after transition
    useEffect(() => {
        if (exit) {
            const timeout = setTimeout(onComplete, 1200); // Wait for fade out
            return () => clearTimeout(timeout);
        }
    }, [exit, onComplete]);

    // Lock scroll and jump to top while loader is active
    useEffect(() => {
        // Prevent browser from restoring scroll position
        const originalRestoration = window.history.scrollRestoration;
        if (originalRestoration) {
            window.history.scrollRestoration = 'manual';
        }

        // Lock scroll on both html and body to be robust
        const originalHtmlStyle = window.getComputedStyle(document.documentElement).overflow;
        const originalBodyStyle = window.getComputedStyle(document.body).overflow;

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Jump to top immediately
        window.scrollTo(0, 0);

        return () => {
            // Restore original styles
            document.documentElement.style.overflow = originalHtmlStyle === 'hidden' ? 'unset' : originalHtmlStyle;
            document.body.style.overflow = originalBodyStyle === 'hidden' ? 'unset' : originalBodyStyle;
            if (originalRestoration) {
                window.history.scrollRestoration = originalRestoration;
            }
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center text-white bg-black"
            initial={{ opacity: 1 }}
            animate={exit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ pointerEvents: exit ? 'none' : 'auto' }}
        >
            {/* White Flash Overlay */}
            <motion.div
                className="absolute inset-0 z-[60] bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: whiteFlash ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <GridScan
                            className="w-full h-full"
                            sensitivity={0.55}
                            lineThickness={1}
                            linesColor="#000000"
                            gridScale={0.1}
                            scanColor="#ffffff"
                            scanOpacity={1}
                            scanGlow={0.5}
                            enablePost
                            bloomIntensity={0.1}
                            chromaticAberration={0.002}
                            noiseIntensity={0.01}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                <AnimatePresence mode="wait">
                    {!isFinal && greetings[currentGreetingIndex] && (
                        <motion.div
                            key={currentGreetingIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-serif tracking-tight">
                                {greetings[currentGreetingIndex].text}
                            </h1>
                        </motion.div>
                    )}

                    {isFinal && !exit && (
                        <motion.div
                            key="final"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <SplitText
                                text={finalGreeting}
                                className="text-4xl md:text-6xl font-serif tracking-tight"
                                delay={50}
                                duration={0.6}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
