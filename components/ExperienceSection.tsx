'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ParallaxBackground } from './ParallaxBackground';
import { TechStack } from './TechStack';

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  // Scroll-based spotlight logic (Closest to Center detection)
  useEffect(() => {
    // 1. Initial Fade In Observer (Keep existing logic)
    const fadeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('[data-experience-item]');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('custom-fade-up');
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) fadeObserver.observe(containerRef.current);

    // 2. Active Spotlight Detection
    const handleScroll = () => {
      const items = document.querySelectorAll('[data-experience-item]');
      let minDistance = Infinity;
      let closestIndex = 0;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const distance = Math.abs(itemCenter - screenCenter);

        if (distance < minDistance) {
          minDistance = distance;
          const indexStr = item.getAttribute('data-index');
          if (indexStr !== null) {
            closestIndex = Number(indexStr);
          }
        }
      });

      // Only update if changed to avoid renders
      setActiveStage(prev => (prev !== closestIndex ? closestIndex : prev));
    };

    // Throttle scroll event with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => {
      fadeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const stages = [
    {
      title: 'The Intern',
      period: 'Jan 2024 – July 2024',
      role: 'Software Engineering Intern',
      type: 'Internship',
      story: 'Started as a frontend engineer, mastering React and building APIs on the side. I built a comprehensive internal inventory system from scratch, transforming chaotic product information into a structured, organized digital resource for the company.',
      achievements: [
        'Built real-time alert aggregation system handling 5,000+ events/second',
        'Reduced API latency by 40% through database query optimization',
        'Gained deep understanding of ClickHouse, Kafka, and event streaming architecture',
        'Mentored by architects who shaped how I think about scalability',
      ],
      color: 'from-blue-500/10 to-indigo-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'The Software Engineer',
      period: 'July 2024 – Jan 2026',
      role: 'Software Engineer',
      type: 'Full-time',
      story: 'Transitioned from intern to full-time engineer with expanded responsibility. Led architecture decisions for critical infrastructure, owned the entire observability stack, and learned that good engineering is about empowering teams, not just writing code.',
      achievements: [
        'Architected real-time event processing with Apache Flink for 10,000+ events/sec',
        'Migrated from ELK to ClickHouse, achieving 50% faster queries on billions of logs',
        'Built comprehensive observability stack: Prometheus, Grafana, custom dashboards',
        'Designed API ingestion pipelines with 15x throughput improvement',
      ],
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'The Senior Backend Engineer',
      period: 'Jan 2026 – Present',
      role: 'Senior Backend Engineer',
      type: 'Core Infrastructure',
      story: 'Focused on critical infrastructure implementation and collaborating on architectural decisions. I work closely with senior engineering leadership to ideate and build scalable systems, bridging the gap between high-level design and rock-solid execution.',
      achievements: [
        'Migrated from ELK to ClickHouse, achieving 50% faster queries on billions of logs',
        'Built comprehensive observability stack: Prometheus, Grafana, custom dashboards',
        'Lead cross-functional teams on product & infrastructure roadmap',
        'Balanced innovation with operational excellence at scale',
      ],
      color: 'from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-500/20'
    },
  ];

  return (
    <section id="experience" className="relative w-full bg-background py-32">
      <ParallaxBackground opacity={0.05} speed={0.2} />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-24 space-y-6 max-w-3xl">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-medium text-foreground tracking-tight">
            Journey
          </h2>
          <p className="text-xl text-muted-foreground font-light tracking-wide max-w-2xl font-sans">
            From intern to leading critical infrastructure. A timeline of technical growth and ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">

          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="sticky top-0 h-screen flex flex-col justify-center py-20">

              {/* Company Header */}
              <div className="mb-12 space-y-4">
                <div className="w-48 h-auto relative mb-6">
                  <Image
                    src="/nivetti-logo.png"
                    alt="Nivetti Systems"
                    width={300}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-4xl font-serif text-foreground">Nivetti Systems</h3>
                  <div className="flex items-center gap-3 text-muted-foreground mt-2 font-mono text-sm">
                    <span>BANGALORE, IN</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>2023 — PRESENT</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Preview Card */}
              <div className="flex-1 w-full rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/50 backdrop-blur-sm shadow-2xl transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${stages[activeStage].color} transition-colors duration-700`} />

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 p-6 text-center bg-black/20 backdrop-blur-[2px]">
                  <div className="space-y-4 opacity-100 transition-opacity duration-300 transform translate-y-0 max-w-full">
                    <div className="text-5xl mb-4">
                      {activeStage === 0 && "🌱"}
                      {activeStage === 1 && "🚀"}
                      {activeStage === 2 && "🏗️"}
                    </div>
                    <h4 className="text-3xl font-serif text-white leading-tight">{stages[activeStage].role}</h4>
                    <p className="text-white/70 text-sm max-w-[200px] mx-auto font-sans uppercase tracking-widest">{stages[activeStage].type}</p>
                  </div>
                </div>

                {/* Decorative details */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">
                  ROLE_ID: 0{activeStage + 1}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Scrollable Roles List */}
          <div className="lg:col-span-7 space-y-16 py-8">
            {/* Mobile Company Header (Visible only on small screens) */}
            <div className="lg:hidden mb-12 space-y-4">
              <div className="w-40 h-auto relative mb-4">
                <Image
                  src="/nivetti-logo.png"
                  alt="Nivetti Systems"
                  width={200}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-3xl font-serif text-foreground">Nivetti Systems</h3>
              <p className="text-sm font-mono text-muted-foreground">2023 — PRESENT</p>
            </div>

            {stages.map((stage, index) => (
              <div
                key={index}
                data-experience-item
                data-index={index}
                className="group relative cursor-default transition-opacity duration-500"
                style={{ opacity: activeStage === index ? 1 : 0.3 }}
              >
                {/* Timeline Connector */}
                <div className="absolute -left-12 top-0 bottom-0 w-px bg-border hidden lg:block group-last:bottom-auto group-last:h-full">
                  <div className={`absolute top-8 -left-[5px] w-[11px] h-[11px] rounded-full border-2 transition-colors duration-300 ${activeStage === index ? 'bg-primary border-primary' : 'bg-background border-border'}`} />
                </div>

                <div className={`relative p-6 md:p-8 rounded-3xl border-2 border-dashed transition-all duration-300 ${activeStage === index ? `${stages[activeStage].color.replace('/10', '/5').replace('from-', 'bg-').split(' ')[0]} ${stages[activeStage].borderColor} shimmer-border` : 'border-border/40 bg-background/20'}`}>

                  {/* "VPC" Label Pill */}
                  <div className={`absolute -top-4 left-6 md:left-8 px-4 py-1.5 bg-background border border-border rounded-full text-xs font-mono tracking-widest uppercase shadow-sm ${activeStage === index ? 'text-primary border-primary/50' : 'text-muted-foreground'}`}>
                    {stage.period}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
                    <div>
                      <h4 className="text-xl md:text-2xl font-sans font-bold text-foreground">{stage.title}</h4>
                      <p className="text-primary font-medium mt-1 font-sans">{stage.role}</p>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-muted-foreground leading-relaxed font-sans">
                      {stage.story}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {stage.achievements.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start group/item">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors`} />
                        <p className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors font-sans">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>



      </div>
    </section>
  );
}
