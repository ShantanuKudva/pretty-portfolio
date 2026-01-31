'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import LightRays from './LightRays';
import ProfileCard from '@/components/ProfileCard';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden pt-32 pb-12 md:py-32">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.4}
          lightSpread={0.8}
          rayLength={1.5}
          className="w-full h-full opacity-80"
        />
      </div>


      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left side - Content */}
        <motion.div
          className="space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-serif text-foreground tracking-tight leading-tight">
              Backend Engineer <span className="italic text-muted-foreground">&</span> <span className="italic">System Architect</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              Building <span className="font-serif italic text-foreground text-xl">scalable distributed systems</span> with Go, Python, and modern backend technologies. Specialized in high-throughput real-time systems, infrastructure optimization, and data reliability.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <a
              href="https://linkedin.com/in/shantanu-kudva"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Connect
            </a>
            <a
              href="https://github.com/ShantanuKudva"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-foreground text-foreground font-medium rounded-lg hover:bg-foreground hover:text-background transition-colors"
            >
              View Code
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6 border-t border-border">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-mono text-muted-foreground uppercase tracking-widest">
              <span>Backend Engineer</span>
              <span className="text-foreground/30">•</span>
              <span>Strategic Thinker</span>
              <span className="text-foreground/30">•</span>
              <span>Persistent Learner</span>
              <span className="text-foreground/30">•</span>
              <span>Fitness Enthusiast</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Profile Card */}
        <div className="relative w-[280px] md:w-[400px] aspect-[0.718] mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Shantanu Kudva"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}