'use client';

import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
    opacity?: number;
    speed?: number; // 0 to 1, where 1 moves at same speed as scroll (static), 0.5 is half speed
}

export function ParallaxBackground({ opacity = 0.03, speed = 0.5 }: ParallaxBackgroundProps) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY * speed);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div
                className="absolute inset-0"
                style={{
                    opacity,
                    transform: `translateY(${offset}px)`,
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px',
                    height: '200%' // Ensure enough height to scroll
                }}
            />
        </div>
    );
}
