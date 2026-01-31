'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import AtomicPipeline from './AtomicPipeline'; // Import AtomicPipeline component

type DeploymentStage = 1 | 2 | 3;

const CONSISTENT_SPRING = {
    type: "spring",
    stiffness: 260,
    damping: 20
} as const;

export function ComplexBlueprint({
    className = "",
    stageDuration = 2500,
    animate = true,
    startDelay = 0
}: {
    className?: string,
    stageDuration?: number,
    animate?: boolean,
    startDelay?: number
}) {
    const [currentStage, setCurrentStage] = useState<DeploymentStage>(1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!animate) {
            setCurrentStage(1);
            setProgress(0);
            return;
        }

        let animationFrameId: number;
        let timeoutId: NodeJS.Timeout;
        let startTime: number;

        const startAnimation = () => {
            startTime = Date.now();
            const totalCircleDuration = stageDuration * 3;

            const loop = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const cycleElapsed = elapsed % totalCircleDuration;

                // Calculate Stage (1, 2, 3)
                const stageIndex = Math.floor(cycleElapsed / stageDuration);
                const nextStage = (stageIndex + 1) as DeploymentStage;

                // Calculate Progress (0-100 for current stage)
                const stageProgress = (cycleElapsed % stageDuration) / stageDuration;

                // Batch updates to avoid tear
                setCurrentStage(prev => nextStage);
                setProgress(stageProgress * 100);

                animationFrameId = requestAnimationFrame(loop);
            };

            animationFrameId = requestAnimationFrame(loop);
        };

        if (startDelay > 0) {
            timeoutId = setTimeout(startAnimation, startDelay);
        } else {
            startAnimation();
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [stageDuration, animate, startDelay]);

    return (
        <div className={`relative w-full h-full p-0 sm:p-4 md:p-8 pt-8 sm:pt-12 md:pt-8 font-mono flex flex-col items-center justify-start md:justify-center overflow-hidden bg-transparent ${className}`}>

            {/* Timeline Progress Bar */}
            {animate && (
                <div className="absolute top-0 sm:top-2 md:top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-4 z-20 w-40 sm:w-64">
                    <div className="flex items-center justify-between w-full relative">
                        {/* Background Track */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-900/40 -z-10" />

                        {/* Active Progress Track - Smooth linear interpolation across stages */}
                        <div className="absolute top-1/2 left-0 h-[1px] bg-cyan-500/50 -z-10"
                            style={{
                                width: currentStage === 1 ? `${progress * 0.333}%` :
                                    currentStage === 2 ? `${33.33 + (progress * 0.333)}%` :
                                        `${66.66 + (progress * 0.333)}%`,
                                transition: 'width 120ms ease-out'
                            }}
                        />

                        {[1, 2, 3].map(s => (
                            <div key={s} className="relative group cursor-pointer" onClick={() => {/* Optional: Add manual seek logic here later */ }}>
                                <motion.div
                                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-150 ${currentStage >= s ? 'bg-cyan-950 border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-950 border-cyan-900'}`}
                                >
                                    {currentStage === s && (
                                        <motion.div
                                            className="absolute inset-0 bg-cyan-400 rounded-full"
                                            layoutId="active-peg"
                                            transition={CONSISTENT_SPRING}
                                        />
                                    )}
                                </motion.div>
                                <div className={`absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 text-[7px] sm:text-[9px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-200 ${currentStage === s ? 'text-cyan-400' : 'text-slate-600'}`}>
                                    {s === 1 && 'Atomic'}
                                    {s === 2 && 'Replica'}
                                    {s === 3 && 'Cloud'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Area - Fixed Height to prevent jumping */}
            <LayoutGroup id={`blueprint-stage-${currentStage}`}>
                <div className="relative mt-8 sm:mt-10 md:mt-0 flex items-center justify-center w-full max-w-4xl md:max-w-6xl min-h-[200px] sm:min-h-[250px] md:min-h-[500px] h-auto origin-top">
                    <AnimatePresence initial={false}>

                        {/* STAGE 1: Single Atomic Instance */}
                        {currentStage === 1 && (
                            <motion.div
                                key="stage-1"
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={CONSISTENT_SPRING}
                            >
                                <NetworkVPC label="ATOMIC • PRIMARY" labelLg="PRIMARY INSTANCE • ATOMIC" color="cyan" layoutId="main-vpc" className="flex flex-col items-center">
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            layout
                                            layoutId="pipeline-main-stage1"
                                            transition={CONSISTENT_SPRING}
                                            className="will-change-transform"
                                        >
                                            <AtomicPipeline isMain idPrefix="stage1" enableLayout={true} />
                                        </motion.div>
                                    </div>
                                </NetworkVPC>
                            </motion.div>
                        )}

                        {/* STAGE 2: Replicated Stack */}
                        {currentStage === 2 && (
                            <motion.div
                                key="stage-2"
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={CONSISTENT_SPRING}
                            >

                                <NetworkVPC label="REPLICA • CONSUMERS" labelLg="REPLICATED STACK • CONSUMER GROUPS" color="white" layoutId="vpc-container-stage2" className="flex gap-1 sm:gap-2 md:gap-12 flex-row justify-center items-center">
                                    <motion.div
                                        key="replica-1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                    >
                                        <div className="text-center mb-1 md:mb-3 hidden md:block">
                                            <div className="text-xs text-cyan-400/60 font-mono uppercase tracking-widest">Replica-1</div>
                                            <div className="text-[10px] text-white/30 mt-1">Shard: A</div>
                                        </div>
                                        <AtomicPipeline isReplica idPrefix="stage2-rep1" enableLayout={false} />
                                    </motion.div>

                                    <div className="flex flex-col items-center">
                                        <div className="text-center mb-1 md:mb-3 hidden md:block">
                                            <div className="text-xs text-yellow-400 font-mono uppercase tracking-widest font-bold">Replica-2 [LEADER]</div>
                                            <div className="text-[10px] text-white/30 mt-1">Shard: B</div>
                                        </div>
                                        <motion.div
                                            key="replica-2"
                                            layout
                                            layoutId="pipeline-main-stage2"
                                            transition={CONSISTENT_SPRING}
                                        >
                                            <AtomicPipeline isMain isReplica idPrefix="stage2" enableLayout={true} />
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        key="replica-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                    >
                                        <div className="text-center mb-1 md:mb-3 hidden md:block">
                                            <div className="text-xs text-cyan-400/60 font-mono uppercase tracking-widest">Replica-3</div>
                                            <div className="text-[10px] text-white/30 mt-1">Shard: C</div>
                                        </div>
                                        <AtomicPipeline isReplica idPrefix="stage2-rep3" enableLayout={false} />
                                    </motion.div>
                                </NetworkVPC>
                            </motion.div>
                        )}

                        {/* STAGE 3: Distributed Cloud */}
                        {currentStage === 3 && (
                            <motion.div
                                key="stage-3"
                                className="absolute inset-0 flex items-center justify-center pt-8 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={CONSISTENT_SPRING}
                            >
                                <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-12 justify-center w-full relative">
                                    {/* AWS Primary Instance */}
                                    <motion.div
                                        key="aws-primary"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                    >
                                        <NetworkVPC label="AWS • PRIMARY" labelLg="AWS us-east-1 • Primary" color="green" className="!p-2 sm:!p-4 md:!p-6 flex flex-col items-center" layoutId="vpc-container-stage3" enableLayout={true}>
                                            <motion.div
                                                layout
                                                layoutId="pipeline-main-stage3"
                                                transition={CONSISTENT_SPRING}
                                            >
                                                <AtomicPipeline isMain idPrefix="stage3-aws" enableLayout={true} />
                                            </motion.div>
                                        </NetworkVPC>
                                    </motion.div>

                                    {/* VPC Peering */}
                                    <motion.div
                                        key="vpc-peering"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.1, delay: 0.05, ease: "easeOut" }}
                                    >
                                        <NetworkVPC label="PEERING" labelLg="VPC PEERING" color="cyan" className="!p-2 sm:!p-4 flex flex-col items-center justify-center h-full min-h-[60px] md:min-h-[140px]" enableLayout={true}>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex md:flex-col items-center gap-2 mb-1">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                                    <div className="w-8 sm:w-12 h-[2px] md:w-[2px] md:h-12 bg-cyan-400/30 relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-cyan-400/60 -translate-x-full md:-translate-y-full animate-[shimmer_1s_infinite]" />
                                                    </div>
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                                </div>
                                                <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest hidden md:block">VPN TUNNEL</span>
                                            </div>
                                        </NetworkVPC>
                                    </motion.div>

                                    {/* GCP Secondary Instance */}
                                    <motion.div
                                        key="gcp-secondary"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.1, ease: "easeOut" }}
                                    >
                                        <NetworkVPC label="GCP • SECONDARY" labelLg="GCP us-central1 • Secondary" color="purple" className="!p-2 sm:!p-4 md:!p-6 flex flex-col items-center" enableLayout={true}>
                                            <motion.div layout transition={CONSISTENT_SPRING}>
                                                <AtomicPipeline isMain idPrefix="stage3-gcp" enableLayout={true} />
                                            </motion.div>
                                        </NetworkVPC>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </LayoutGroup>

            {/* Stage Description */}
            {animate && (
                <div className="relative mt-4 md:absolute md:bottom-12 text-center z-20 pointer-events-none w-full px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <p className="text-[10px] md:text-base text-cyan-200/80 font-mono tracking-wide bg-slate-950/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm shadow-xl max-w-[90%] md:max-w-none mx-auto leading-tight">
                                {currentStage === 1 && "Single-node architecture for low-latency processing."}
                                {currentStage === 2 && "Horizontally scaled consumers with sharded topics."}
                                {currentStage === 3 && "Multi-region deployment with VPC peering and disaster recovery."}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

// VPC Wrapper - Optimized for Morphing
function NetworkVPC({ children, label, labelLg, color = "white", className = "", layoutId, enableLayout = true }: { children: React.ReactNode, label: string, labelLg?: string, color?: "green" | "purple" | "cyan" | "white", className?: string, layoutId?: string, enableLayout?: boolean }) {
    const colorClasses = {
        cyan: "border-cyan-400/50 bg-cyan-500/5 text-cyan-400 shimmer-border",
        green: "border-green-500/50 bg-green-500/5 text-green-400 shimmer-border",
        purple: "border-purple-500/50 bg-purple-500/5 text-purple-400 shimmer-border",
        white: "border-cyan-400/30 bg-white/3 text-white/60"
    };

    return (
        <motion.div
            layout={enableLayout}
            layoutId={layoutId}
            transition={enableLayout ? CONSISTENT_SPRING : undefined}
            className={`border-2 border-dashed rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-6 relative flex items-center justify-center will-change-transform ${colorClasses[color]} ${className}`}
        >
            {/* Mobile label */}
            <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={CONSISTENT_SPRING}
                className={`absolute -top-2 sm:-top-3 md:-top-4 left-1/2 -translate-x-1/2 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-slate-900/95 border border-current rounded-full text-[6px] sm:text-[8px] md:text-xs font-black tracking-tight sm:tracking-wider md:tracking-widest uppercase whitespace-nowrap shadow-lg ${labelLg ? 'md:hidden' : ''} z-20`}
            >
                {label}
            </motion.div>
            {/* Desktop label (if labelLg provided) */}
            {labelLg && (
                <motion.div
                    key={labelLg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={CONSISTENT_SPRING}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900/95 border border-current rounded-full text-xs font-black tracking-widest uppercase whitespace-nowrap shadow-lg hidden md:block"
                >
                    {labelLg}
                </motion.div>
            )}
            {children}
        </motion.div>
    );
}

// Enhanced Node Components
function SourceNode({ name, label, isMain }: { name: string, label: string, isMain: boolean }) {
    return (
        <motion.div
            layout
            transition={CONSISTENT_SPRING}
            className="relative"
        >
            <div className={`
                px-3 py-2 flex flex-col items-center gap-1 rounded-lg border
                ${isMain ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/30' : 'border-cyan-300/40 bg-cyan-500/8'}
                text-center transition-all
            `}>
                <span className="text-xs font-bold text-cyan-300">{name}</span>
                <span className="text-[8px] text-cyan-400/60 uppercase">{label}</span>
            </div>
        </motion.div>
    );
}

function PipelineNode({ name, label, isMain, highlight }: { name: string, label: string, isMain: boolean, highlight?: boolean }) {
    return (
        <motion.div
            layout
            transition={CONSISTENT_SPRING}
            className="relative"
        >
            {/* Stack layers for replicated view */}
            <AnimatePresence>
                {isMain && (
                    <motion.div
                        key="stack"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={CONSISTENT_SPRING}
                    >
                        <div className="absolute top-[-2px] left-[2px] w-full h-full border border-white/15 bg-slate-800/40 rounded-lg -z-10" />
                        <div className="absolute top-[-4px] left-[4px] w-full h-full border border-white/10 bg-slate-800/20 rounded-lg -z-20" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`
                px-4 py-2.5 flex flex-col items-center gap-1 rounded-lg border-2 transition-all
                ${highlight ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/40' : isMain ? 'border-cyan-300/60 bg-slate-900/80' : 'border-white/20 bg-slate-950/60'}
                relative z-10
            `}>
                <span className="text-xs font-bold text-white">{name}</span>
                <span className="text-[8px] text-white/50 uppercase mt-0.5">{label}</span>
            </div>

            {/* Badge for main instance */}
            <AnimatePresence>
                {isMain && (
                    <motion.div
                        className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 text-[9px] font-black px-2 py-1 rounded-full shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        PRIMARY
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
