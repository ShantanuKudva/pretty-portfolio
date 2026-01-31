'use client';

import React, { useMemo, useState } from "react";

// Minimal Tooltip wrapper
function SimpleTooltip({ children, content }: { children: React.ReactNode; content: string }) {
    return (
        <div className="group relative flex">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-background bg-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">
                {content}
            </div>
        </div>
    );
}

// Improved Seeded Random
function seededRandom(seed: number) {
    let h = Math.imul(seed ^ 0xdeadbeef, 2654435761);
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

const PROBLEM_NAMES = [
    "Two Sum", "LRU Cache", "Merge Intervals", "Trapping Rain Water",
    "Word Break", "Median of Two Sorted Arrays", "Course Schedule", "Alien Dictionary",
    "Design Twitter", "Serialize and Deserialize Binary Tree"
];

const DIFF_COLORS = {
    EASY: "text-green-500",
    MEDIUM: "text-yellow-500",
    HARD: "text-red-500"
};

export function StreakDemo() {
    const [selectedDay, setSelectedDay] = useState<any | null>(null);

    const days = useMemo(() => {
        const data = [];
        const today = new Date();
        const demoYear = today.getFullYear();

        // Generate for full year
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(demoYear, month + 1, 0).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(demoYear, month, day);
                const dateStr = formatDate(date);

                const startOfYear = new Date(demoYear, 0, 1);
                const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
                const seed = dayOfYear * 1234 + month * 567 + day;
                const r1 = seededRandom(seed);
                const r2 = seededRandom(seed + 1);

                const isCompleted = r1 > 0.3;
                const numProblems = isCompleted ? (r2 > 0.8 ? 4 : r2 > 0.5 ? 2 : 1) : 0;

                // Generate mock problems
                const problems = [];
                if (isCompleted) {
                    for (let i = 0; i < numProblems; i++) {
                        const pSeed = seed + i * 99;
                        const diff = seededRandom(pSeed) > 0.7 ? "HARD" : seededRandom(pSeed) > 0.3 ? "MEDIUM" : "EASY";
                        problems.push({
                            name: PROBLEM_NAMES[Math.floor(seededRandom(pSeed + 1) * PROBLEM_NAMES.length)],
                            difficulty: diff,
                            time: `${8 + Math.floor(seededRandom(pSeed + 2) * 12)}:${Math.floor(seededRandom(pSeed + 3) * 60).toString().padStart(2, '0')}`
                        });
                    }
                }

                data.push({
                    date: dateStr,
                    completed: isCompleted,
                    problemCount: numProblems,
                    problems
                });
            }
        }
        return data;
    }, []);

    const months = useMemo(() => {
        const result = [];
        const currentYear = new Date().getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
            const start = new Date(currentYear, monthIdx, 1);
            const end = new Date(currentYear, monthIdx + 1, 0);
            const weeks: any[][] = [];
            let currentWeek: any[] = [];
            const startDay = start.getDay();

            for (let j = 0; j < startDay; j++) currentWeek.push({ date: null });

            for (let day = 1; day <= end.getDate(); day++) {
                const date = new Date(currentYear, monthIdx, day);
                const dateStr = formatDate(date);
                const dayData = days.find((d) => d.date === dateStr);
                currentWeek.push({ date, data: dayData });
                if (currentWeek.length === 7) {
                    weeks.push(currentWeek);
                    currentWeek = [];
                }
            }
            if (currentWeek.length > 0) {
                while (currentWeek.length < 7) currentWeek.push({ date: null });
                weeks.push(currentWeek);
            }
            result.push({ name: monthNames[monthIdx], weeks });
        }
        return result;
    }, [days]);

    return (
        <div className="space-y-6">
            {/* Heatmap */}
            <div className="w-full overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                    {months.map((month, m) => (
                        <div key={m} className="flex flex-col gap-2">
                            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">
                                {month.name}
                            </div>
                            <div className="flex flex-col gap-[3px]">
                                {month.weeks.map((week, w) => (
                                    <div key={w} className="flex gap-[3px]">
                                        {week.map((day, d) => {
                                            if (!day.date) return <div key={d} className="h-2.5 w-2.5 invisible" />;

                                            const count = day.data?.problemCount || 0;
                                            let color = "bg-zinc-200 dark:bg-zinc-800"; // Explicit visible gray
                                            if (count > 3) color = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]";
                                            else if (count > 2) color = "bg-emerald-500/90";
                                            else if (count > 0) color = "bg-emerald-600/80";

                                            const isSelected = selectedDay && day.data && selectedDay.date === day.data.date;

                                            return (
                                                <SimpleTooltip
                                                    key={d}
                                                    content={`${day.date.toLocaleDateString()}: ${count} problems`}
                                                >
                                                    <div
                                                        onClick={() => day.data?.completed && setSelectedDay(day.data)}
                                                        className={`h-2.5 w-2.5 rounded-[1px] ${color} cursor-pointer hover:ring-1 hover:ring-foreground/50 transition-all ${isSelected ? 'ring-2 ring-foreground/80 z-10' : ''}`}
                                                    />
                                                </SimpleTooltip>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Details Panel */}
            <div className="min-h-[120px] transition-all duration-300">
                {selectedDay ? (
                    <div className="bg-background/40 border border-border/50 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="font-semibold text-foreground flex items-center gap-2">
                                Activity on {new Date(selectedDay.date).toLocaleDateString()}
                                <span className="text-xs font-normal text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded-full">
                                    {selectedDay.problemCount} Solved
                                </span>
                            </h5>
                            <button onClick={() => setSelectedDay(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                        </div>

                        {/* Daily Heatmap Grid (24h) */}
                        <div className="mb-4">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">24-Hour Activity Distribution</p>
                            <div className="grid grid-cols-12 md:grid-cols-24 gap-[2px]">
                                {Array.from({ length: 24 }).map((_, hour) => {
                                    // Check if any problem was solved in this hour
                                    const activeProb = selectedDay.problems.find((p: any) => {
                                        const h = parseInt(p.time.split(':')[0]);
                                        return h === hour;
                                    });

                                    return (
                                        <SimpleTooltip
                                            key={hour}
                                            content={activeProb ? `Hour ${hour}:00 - ${activeProb.name} (${activeProb.difficulty})` : `${hour}:00 - No activity`}
                                        >
                                            <div className={`h-3 rounded-[1px] transition-all ${activeProb ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                                        </SimpleTooltip>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-[8px] text-muted-foreground mt-1 font-mono">
                                <span>00:00</span>
                                <span>12:00</span>
                                <span>23:00</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedDay.problems.map((p: any, i: number) => (
                                <div key={i} className="flex items-center justify-between bg-background/60 p-2 rounded-lg border border-border/30">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-foreground/90">{p.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-bold ${DIFF_COLORS[p.difficulty as keyof typeof DIFF_COLORS]}`}>
                                            {p.difficulty}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-mono">{p.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50 text-sm py-8 border border-dashed border-border/30 rounded-xl">
                        <span className="mb-1">Select a green square to view activity details</span>
                        <span className="text-xs opacity-70">Interaction Preview</span>
                    </div>
                )}
            </div>
        </div>
    );
}
