'use client';

import { useMemo } from 'react';

interface PipelineNode {
    name: string;
    description: string;
}

interface BlueprintPipelineProps {
    stages: PipelineNode[];
    className?: string;
    outputDirection?: 'right' | 'up';
}

export function BlueprintPipeline({ stages, className = "", outputDirection = 'right' }: BlueprintPipelineProps) {
    // Simple layout calculation
    const nodeWidth = 140; // Increased width
    const nodeHeight = 60;
    const gap = 40;

    // SVG viewBox needs to cover the connections
    // We'll overlay SVG on top of the HTML nodes for the lines
    return (
        <div className={`relative w-full h-full bg-[#0f172a] p-8 overflow-hidden font-mono ${className}`}>
            {/* Blueprint Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="relative z-10 flex items-center justify-center h-full w-full">
                <div className="flex items-center gap-[40px] mx-auto">
                    {stages.map((stage, i) => (
                        <div key={i} className="relative group">
                            {/* Connection Line to Next Node */}
                            {i < stages.length - 1 && (
                                <div className="absolute left-full top-1/2 w-[40px] h-[2px] -translate-y-1/2 overflow-hidden">
                                    <svg width="40" height="4" className="overflow-visible">
                                        <line
                                            x1="0" y1="2" x2="40" y2="2"
                                            stroke="#38bdf8"
                                            strokeWidth="2"
                                            strokeDasharray="6 4"
                                            className="animate-[dash_1s_linear_infinite]"
                                        />
                                    </svg>
                                </div>
                            )}

                            {/* Node Box */}
                            <div className="w-[140px] h-[60px] flex items-center justify-center border-2 border-white/80 bg-[#1e293b]/50 backdrop-blur-sm relative transition-transform hover:scale-105 cursor-default hover:border-[#38bdf8] shadow-[4px_4px_0px_rgba(255,255,255,0.1)]">
                                {/* Handwritten-style corners or decoration could go here */}
                                <span className="text-white font-bold text-xs tracking-wider uppercase text-center px-1">
                                    {stage.name}
                                </span>

                                {/* Description Tooltip (Handwritten Note style) */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 hidden group-hover:block z-20">
                                    <div className="bg-[#fefce8] text-slate-800 p-3 shadow-lg rotate-1 border border-slate-300 relative">
                                        {/* Note Pin */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full shadow-sm" />
                                        <p className="font-handwriting text-xs leading-relaxed font-semibold">
                                            {stage.description}
                                        </p>
                                    </div>
                                    {/* Sketchy Line to Box */}
                                    <svg className="absolute bottom-full left-1/2 -translate-x-1/2 w-4 h-4 text-white/50" viewBox="0 0 10 10">
                                        <line x1="5" y1="10" x2="5" y2="0" stroke="currentColor" strokeDasharray="2 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Final Output Arrow */}
                    {outputDirection === 'right' ? (
                        <div className="relative flex flex-col items-center">
                            <div className="w-[30px] h-[2px] bg-[#38bdf8]" />
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#38bdf8] border-b-[8px] border-b-transparent ml-[-2px]" />
                            <span className="absolute left-full ml-2 text-[10px] text-[#38bdf8] font-mono whitespace-nowrap animate-pulse">
                                TO VISUALIZATION -&gt;
                            </span>
                        </div>
                    ) : (
                        /* Upward Arrow (visually connecting to component above) */
                        <div className="absolute -top-12 right-10 flex flex-col items-center">
                            <span className="mb-2 text-[10px] text-[#38bdf8] font-mono whitespace-nowrap animate-pulse">
                                UPLINK TO GLOBE
                            </span>
                            <div className="w-[2px] h-[40px] bg-[#38bdf8] relative">
                                <div className="absolute -top-[2px] -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#38bdf8]" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Global Style for Dash Animation */}
            <style jsx global>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -10;
                }
              }
              .font-handwriting {
                  font-family: 'Courier New', Courier, monospace; 
              }
            `}</style>
        </div>
    );
}
