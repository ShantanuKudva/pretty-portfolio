'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONSISTENT_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 20
} as const;

interface AtomicPipelineProps {
  isMain?: boolean;
  isReplica?: boolean;
  idPrefix?: string;
  enableLayout?: boolean;
}

export default function AtomicPipeline({ isMain = false, isReplica = false, idPrefix = "", enableLayout = true }: AtomicPipelineProps) {
  const showStack = isReplica;
  const p = (id: string) => idPrefix ? `${idPrefix}-${id}` : id;

  return (
    <motion.div
      layout={enableLayout}
      className="flex flex-col items-center gap-1 md:gap-2 min-h-[150px] md:min-h-[200px] will-change-transform"
      transition={CONSISTENT_SPRING}
    >
      {/* Sources: WireSense, Vector */}
      <div className="flex items-center gap-2 md:gap-3">
        <Node name="Wire" label="Sense" showStack={showStack} layoutId={isMain ? p("n-src") : undefined} enableLayout={enableLayout} />
        <div className="w-4 md:w-6 h-[2px] flow-h opacity-40" />
        <Node name="VEC" label="Router" showStack={showStack} layoutId={isMain ? p("n-vec") : undefined} enableLayout={enableLayout} />
      </div>
      <div className="w-[2px] h-4 md:h-6 flow-v opacity-40" />

      {/* Kafka - Central Hub */}
      <div className="border border-dashed border-[#38bdf8]/30 rounded-lg md:rounded-xl p-1.5 md:p-2.5 bg-[#38bdf8]/5 shadow-sm relative">
        <Node name="KAFKA" label="Broker" showStack={showStack} highlight layoutId={isMain ? p("n-kafka") : undefined} enableLayout={enableLayout} />

        {/* Consumer Group Indicators */}
        <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400" title="ClickHouse" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400" title="Flink" />
        </div>
      </div>
      <div className="w-[2px] h-4 md:h-6 flow-v opacity-40" />

      {/* Consumer Groups */}
      <div className="flex items-center gap-2 md:gap-3">
        <Node name="CLICK" label="House" showStack={showStack} layoutId={isMain ? p("n-click") : undefined} enableLayout={enableLayout} />
        <div className="w-3 md:w-4 h-[2px] flow-h opacity-40" />
        <Node name="FLINK" label="Stream" showStack={showStack} layoutId={isMain ? p("n-flink") : undefined} enableLayout={enableLayout} />
      </div>
      <div className="w-[2px] h-4 md:h-6 flow-v opacity-40" />
      {/* Alert Storage */}
      <div className="flex items-center justify-center">
        <Node name="PG" label="Alerts" showStack={showStack} layoutId={isMain ? p("n-postgres") : undefined} enableLayout={enableLayout} />
      </div>
    </motion.div>
  );
}

// Node Component
function Node({
  name,
  label,
  showStack,
  highlight,
  layoutId,
  enableLayout = true
}: {
  name: string;
  label: string;
  showStack?: boolean;
  highlight?: boolean;
  layoutId?: string;
  enableLayout?: boolean;
}) {
  // Dynamic color based on node type
  const getNodeColors = (name: string) => {
    if (name.includes('KAFKA')) return 'border-[#38bdf8] bg-[#38bdf8]/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]';
    if (name.includes('CLICK')) return 'border-blue-400 bg-blue-500/20 shadow-[0_0_15px_rgba(96,165,250,0.2)]';
    if (name.includes('FLINK')) return 'border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.2)]';
    if (name.includes('PG')) return 'border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(167,139,250,0.2)]';
    if (name.includes('Wire') || name.includes('VEC')) return 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
    return 'border-white/30 bg-slate-950/90';
  };
  return (
    <motion.div
      className="relative will-change-transform"
      layout={enableLayout}
      layoutId={layoutId}
      transition={CONSISTENT_SPRING}
    >
      {/* Stack Layers for Replication Visualization */}
      <AnimatePresence>
        {showStack && (
          <motion.div
            key="stack-vis"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute top-[-3px] left-[3px] w-full h-full border border-white/20 bg-slate-800/60 -z-10 rounded-lg" />
            <div className="absolute top-[-6px] left-[6px] w-full h-full border border-white/10 bg-slate-800/40 -z-20 rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core Node */}
      <div className={`
        min-w-[45px] md:min-w-[60px] min-h-[30px] md:min-h-[40px] w-auto h-auto flex flex-col items-center justify-center
        border ${highlight ? getNodeColors(name) : getNodeColors(name)}
        rounded-md md:rounded-lg text-center z-10 relative backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1
      `}>
        <span className="text-[8px] md:text-[10px] text-white font-black tracking-tighter">{name}</span>
        <span className="text-[6px] md:text-[8px] text-white/40 uppercase">{label}</span>
      </div>

      {/* Replication Badge */}
      <AnimatePresence>
        {showStack && (
          <motion.div
            className="absolute -top-2 -right-2 bg-[#38bdf8] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full z-20 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            x3
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
