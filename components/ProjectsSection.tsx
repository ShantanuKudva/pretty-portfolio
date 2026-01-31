'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Globe } from './Globe';
import { ParallaxBackground } from './ParallaxBackground';
import { ComplexBlueprint } from './data-pipeline';
import { PlatformStack } from './pipeline/PlatformStack';

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const [showDSA, setShowDSA] = useState(false);
  const [isBlueprintZoomed, setIsBlueprintZoomed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGlobeVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isGlobeVisible) return;

    const timer = setTimeout(() => {
      setShowDSA(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [isGlobeVisible]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isBlueprintZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBlueprintZoomed]);

  return (
    <section id="projects" className="relative w-full bg-background py-24 md:py-32 overflow-hidden">
      <ParallaxBackground opacity={0.03} speed={0.3} />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 mb-24 md:mb-32">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-medium text-foreground tracking-tight">
            <span className="italic">Selected</span> Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl">
            Engineering scalable systems and visualizing complex data flows.
          </p>
        </div>

        {/* Project 1: Traffic Visualizer (Diagram LEFT, Content RIGHT) */}
        <div className="space-y-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Visual/Diagram */}
            <div className="order-2 lg:order-1 relative group perspective-1000">
              {/* Architecture Preview Helper Text */}
              <div className={`w-full aspect-square max-w-[500px] h-auto mx-auto rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/50 backdrop-blur-sm shadow-2xl transition-all duration-700 ${isGlobeVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {/* Architecture Preview Helper Text - Moved inside for better alignment */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
                  <span className="text-xs font-mono text-[#38bdf8] bg-[#38bdf8]/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#38bdf8]/20 animate-pulse shadow-sm">
                    CLICK TO INSPECT ARCHITECTURE
                  </span>
                </div>

                <div className="w-full h-full cursor-pointer flex items-center justify-center transform scale-[0.8] md:scale-[0.65] origin-center" onClick={() => setIsBlueprintZoomed(true)}>
                  <ComplexBlueprint animate={false} className="!p-0 !pt-0 justify-center" />
                  {/* Overlay to catch clicks and prevent interaction in preview */}
                  <div className="absolute inset-0 z-10" />
                </div>
              </div>

              {/* Portal for Full Screen View */}
              {isBlueprintZoomed && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] bg-[#0f172a]/95 backdrop-blur-xl flex flex-col">
                  {/* Header Toolbar */}
                  <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-[#0f172a] shrink-0 z-50">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">System Architecture</h3>
                      <span className="px-2 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-mono border border-[#38bdf8]/20 hidden md:inline-block">
                        LIVE_MONITORING
                      </span>
                    </div>
                    <button
                      onClick={() => setIsBlueprintZoomed(false)}
                      className="bg-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 text-white px-4 py-2 rounded-full text-sm font-mono border border-white/20 transition-all flex items-center gap-2"
                    >
                      <span className="hidden md:inline">CLOSE [X]</span>
                      <span className="md:hidden">X</span>
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                    {/* Main Canvas - scrollable on mobile */}
                    <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden flex items-center justify-center relative order-1 lg:order-1 bg-[#0f172a] p-0">
                      {/* Background Grid */}
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
                          backgroundSize: '40px 40px'
                        }}
                      />
                      <div className="w-full md:min-w-[800px] lg:min-w-[1000px] md:min-h-[600px] scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-100 origin-top md:origin-center transform-gpu flex items-center justify-center md:py-0 pt-8">
                        <ComplexBlueprint animate={true} startDelay={1000} />
                      </div>
                    </div>

                    {/* Architecture Details Sidebar */}
                    <div className="w-full h-1/3 lg:h-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0f172a]/50 backdrop-blur-md p-6 overflow-y-auto order-2 lg:order-2 shrink-0 z-40">
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-sm font-mono text-[#38bdf8] uppercase tracking-wider mb-2">Pipeline Flow</h4>
                          <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/10" />

                            {/* Step 1: Ingestion */}
                            <div className="relative pl-10 group">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full border border-white/20 bg-slate-900 flex items-center justify-center text-xs font-bold text-white group-hover:border-[#38bdf8] group-hover:text-[#38bdf8] transition-colors">1</div>
                              <h5 className="text-white font-bold mb-1">Ingestion</h5>
                              <div className="text-xs text-[#38bdf8] font-mono mb-2">WireSense + Vector</div>
                              <p className="text-sm text-slate-400 leading-relaxed hidden md:block">
                                High-performance packet capture at the edge. Raw network traffic is intercepted, serialized, and routed via Vector sidecars for processing.
                              </p>
                            </div>

                            {/* Step 2: Buffering */}
                            <div className="relative pl-10 group">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full border border-white/20 bg-slate-900 flex items-center justify-center text-xs font-bold text-white group-hover:border-[#38bdf8] group-hover:text-[#38bdf8] transition-colors">2</div>
                              <h5 className="text-white font-bold mb-1">Buffering</h5>
                              <div className="text-xs text-[#38bdf8] font-mono mb-2">Apache Kafka</div>
                              <p className="text-sm text-slate-400 leading-relaxed hidden md:block">
                                Decoupled event streaming backbone. Handles burst traffic (10k+ eps) with partitioned topics for parallel consumption.
                              </p>
                            </div>

                            {/* Step 3: Processing */}
                            <div className="relative pl-10 group">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full border border-white/20 bg-slate-900 flex items-center justify-center text-xs font-bold text-white group-hover:border-[#38bdf8] group-hover:text-[#38bdf8] transition-colors">3</div>
                              <h5 className="text-white font-bold mb-1">Processing</h5>
                              <div className="text-xs text-[#38bdf8] font-mono mb-2">ClickHouse + Workers</div>
                              <p className="text-sm text-slate-400 leading-relaxed hidden md:block">
                                Real-time analytics engine with columnar storage for efficient querying and aggregations on streaming data.
                              </p>
                            </div>

                            {/* Step 4: Serving */}
                            <div className="relative pl-10 group">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full border border-white/20 bg-slate-900 flex items-center justify-center text-xs font-bold text-white group-hover:border-[#38bdf8] group-hover:text-[#38bdf8] transition-colors">4</div>
                              <h5 className="text-white font-bold mb-1">Serving</h5>
                              <div className="text-xs text-[#38bdf8] font-mono mb-2">WebSocket API</div>
                              <p className="text-sm text-slate-400 leading-relaxed hidden md:block">
                                Low-latency real-time data delivery to web clients with automated fallback and reconnection handling.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="pt-4 border-t border-white/10">
                          <h4 className="text-sm font-mono text-[#38bdf8] uppercase tracking-wider mb-3">Key Metrics</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                              <div className="text-[10px] md:text-xs text-slate-400 mb-0.5">Throughput</div>
                              <div className="text-sm md:text-lg font-bold text-white">10k+ <span className="text-[8px] md:text-xs font-normal text-slate-500">eps</span></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                              <div className="text-[10px] md:text-xs text-slate-400 mb-0.5">Latency</div>
                              <div className="text-sm md:text-lg font-bold text-white">&lt;200 <span className="text-[8px] md:text-xs font-normal text-slate-500">ms</span></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                              <div className="text-[10px] md:text-xs text-slate-400 mb-0.5">Retention</div>
                              <div className="text-sm md:text-lg font-bold text-white">90 <span className="text-[8px] md:text-xs font-normal text-slate-500">days</span></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                              <div className="text-[10px] md:text-xs text-slate-400 mb-0.5">Uptime</div>
                              <div className="text-sm md:text-lg font-bold text-white">99.9 <span className="text-[8px] md:text-xs font-normal text-slate-500">%</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                document.body
              )}
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Project 01</span>
                  <div className="h-[1px] w-12 bg-border"></div>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
                  Traffic Visualizer
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Real-time network traffic monitoring system with 3D globe visualization. Processes thousands of events per second with intelligent threat detection and automated alerting.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <h4 className="font-medium text-foreground mb-1">Real-time Processing</h4>
                  <p className="text-sm text-muted-foreground">Handles 10K+ events/second with sub-second latency</p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <h4 className="font-medium text-foreground mb-1">Threat Detection</h4>
                  <p className="text-sm text-muted-foreground">Machine learning powered anomaly detection system</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {['React', 'Three.js', 'WebSockets', 'Kafka', 'ClickHouse', 'Docker'].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono border border-border text-muted-foreground bg-background/50">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/ShantanuKudva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  View on GitHub
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Live System Demo (Globe + Stats) */}
          <div className="space-y-8 animate-in fade-in duration-1000 slide-in-from-bottom-8">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div>
                <h4 className="text-xl md:text-2xl font-serif text-foreground">Live System Demo</h4>
                <p className="text-xs md:text-sm font-mono text-muted-foreground">INTERACTIVE DEMO • REAL-TIME TRAFFIC TELEMETRY</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground hidden md:inline">SYSTEM ONLINE</span>
              </div>
            </div>

            <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-background to-foreground/5 shadow-2xl relative">
              {isGlobeVisible && <Globe />}

              {/* Globe Interaction Hint */}
              <div className="absolute top-6 right-6 z-20 pointer-events-none">
                <span className="text-xs font-mono text-white/70 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  INTERACTIVE • DRAG TO ROTATE
                </span>
              </div>
              {/* Legend overlay */}
              <div className="absolute bottom-6 left-6 space-y-3 bg-background/80 backdrop-blur-md border border-border/40 rounded-xl p-4 text-xs md:text-sm z-10 pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-foreground">Critical Alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-foreground">Warnings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-foreground">Healthy Flow</span>
                </div>
              </div>
            </div>

            {/* Live Data Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-foreground/5 to-transparent hover:bg-foreground/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">Active Flows</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">10.2K</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-2">events/second</p>
              </div>

              <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-foreground/5 to-transparent hover:bg-foreground/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">Critical Alerts</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">4</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-2">active incidents</p>
              </div>

              <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-foreground/5 to-transparent hover:bg-foreground/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">RCA Coverage</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">98%</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-2">root cause analysis</p>
              </div>

              <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-foreground/5 to-transparent hover:bg-foreground/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">System Health</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">99.9%</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-2">uptime SLA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-border/40" />


        {/* Project 2: AWS Universe (Content LEFT, Diagram RIGHT) */}
        {showDSA && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-in fade-in duration-1000 mt-16">

            {/* Left Column: Content */}
            <div className="order-1 lg:order-1 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Project 02</span>
                  <div className="h-[1px] w-12 bg-border"></div>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
                  AWS Universe
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Enterprise-grade microservices infrastructure platform. A "Deploy Once, Use Everywhere" architecture that provides shared Keycloak, Kong, and Networking to independent service workloads.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <h4 className="font-medium text-foreground mb-1">Multi-Tenant Platform</h4>
                  <p className="text-sm text-muted-foreground">Shared authentication & gateway layer for all services</p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-colors">
                  <h4 className="font-medium text-foreground mb-1">Docker Swarm on AWS</h4>
                  <p className="text-sm text-muted-foreground">Auto-healing orchestration with Ansible bootstrapping</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {['Terraform', 'Ansible', 'Docker Swarm', 'Kong', 'Keycloak', 'AWS'].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono border border-border text-muted-foreground bg-background/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Visual/Diagram */}
            <div className="order-2 lg:order-2 w-full aspect-[3/4] sm:aspect-square max-w-[500px] h-auto mx-auto rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/50 backdrop-blur-sm shadow-2xl p-0 sm:p-8 flex items-center justify-center group">
              <div className="w-full scale-[0.65] sm:scale-90 group-hover:scale-[0.7] sm:group-hover:scale-100 transition-transform duration-500">
                <PlatformStack />
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">INFRASTRUCTURE MAP</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}