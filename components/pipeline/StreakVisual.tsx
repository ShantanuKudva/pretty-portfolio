'use client';

import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';

export function StreakVisual() {
    // Generate a mock contribution grid (7 days x 12 weeks)
    const weeks = 12;
    const days = 7;
    const grid = Array.from({ length: weeks * days }).map((_, i) => ({
        level: Math.random() > 0.7 ? 0 : Math.floor(Math.random() * 4) + 1, // 0-4 intensity
        id: i,
    }));

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-slate-950/50">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />

            {/* Main Feature: Streak Card */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-sm w-full"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Current Streak</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-bold text-white">42</span>
                            <span className="text-sm text-slate-500">days</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center border border-orange-500/30">
                        <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                </div>

                {/* Heatmap Visualization */}
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                        <span>Activity</span>
                        <span>Last 3 Months</span>
                    </div>
                    <div className="grid grid-flow-col grid-rows-7 gap-1">
                        {grid.map((cell, i) => (
                            <motion.div
                                key={cell.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.005 + 0.5 }}
                                className={`w-2 h-2 rounded-[1px] ${cell.level === 0 ? 'bg-slate-800/50' :
                                        cell.level === 1 ? 'bg-orange-900/40' :
                                            cell.level === 2 ? 'bg-orange-700/60' :
                                                cell.level === 3 ? 'bg-orange-600' :
                                                    'bg-orange-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-green-500/10 text-green-500">
                            <TrendingUp className="w-3 h-3" />
                        </div>
                        <div className="text-xs">
                            <div className="text-slate-300 font-medium">Top 5%</div>
                            <div className="text-slate-600">Consistency</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-300 font-medium">156</div>
                        <div className="text-[10px] text-slate-600 uppercase">Problems Solved</div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}
