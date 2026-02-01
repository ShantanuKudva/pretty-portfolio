'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

interface MasonryProps {
    items: any[];
    config?: {
        columns: number[]; // [1, 2, 3] for [mobile, tablet, desktop]
        gap: number[];    // [10, 20, 20]
    };
    renderItem: (item: any, index: number) => React.ReactNode;
    enableAnimation?: boolean;
}

function useMedia(queries: string[], values: number[], defaultValue: number) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const mediaQueryLists = queries.map(q => window.matchMedia(q));

        const getValue = () => {
            const index = mediaQueryLists.findIndex(mql => mql.matches);
            return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
        };

        setValue(getValue);

        const handler = () => setValue(getValue);
        mediaQueryLists.forEach(mql => mql.addEventListener('change', handler));

        return () => mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler));
    }, [queries, values, defaultValue]);

    return value;
}

export default function Masonry({ items, config, renderItem, enableAnimation = true }: MasonryProps) {
    const { columns: columnCounts, gap: gapCounts } = config || {
        columns: [1, 2, 3],
        gap: [15, 20, 30]
    };

    const columnCount = useMedia(
        ['(min-width: 1024px)', '(min-width: 768px)', '(max-width: 767px)'],
        [columnCounts[2], columnCounts[1], columnCounts[0]],
        columnCounts[2]
    );

    const gap = useMedia(
        ['(min-width: 1024px)', '(min-width: 768px)', '(max-width: 767px)'],
        [gapCounts[2], gapCounts[1], gapCounts[0]],
        gapCounts[2]
    );

    const containerRef = useRef<HTMLDivElement>(null);

    // Distribute items into columns
    const columns = useMemo(() => {
        const cols: any[][] = Array.from({ length: columnCount }, () => []);
        items.forEach((item, i) => {
            cols[i % columnCount].push(item);
        });
        return cols;
    }, [items, columnCount]);

    // Animation
    useEffect(() => {
        if (!containerRef.current || !enableAnimation) return;

        const elements = containerRef.current.querySelectorAll('.masonry-item');

        gsap.fromTo(elements,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power3.out',
                clearProps: 'all' // Cleanup for hover effects
            }
        );

    }, [columns, enableAnimation]); // Re-run when layout changes

    return (
        <div ref={containerRef} className="masonry-container">
            <div
                className="masonry-grid"
                style={{ gap: `${gap}px` }}
            >
                {columns.map((col, colIndex) => (
                    <div
                        key={colIndex}
                        className="masonry-column"
                        style={{
                            // gap: `${gap}px`  // Handled by margin-bottom in CSS or flex gap
                            gap: `${gap}px`
                        }}
                    >
                        {col.map((item, itemIndex) => {
                            // Find original index if needed, but for rendering we just need logic
                            return (
                                <div key={item.id || itemIndex} className="w-full">
                                    {renderItem(item, itemIndex)}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
