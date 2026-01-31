'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Wait a bit before completing
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-bold tracking-tighter">
                    {percent}%
                </div>
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
