'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from './ui/GlassSurface';
import { SiGithub } from 'react-icons/si';
import { FiMenu, FiX } from 'react-icons/fi';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force dark mode - CRITICAL FIX
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'hobbies'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Close mobile menu if open
      setIsMobileMenuOpen(false);

      // Small delay to allow menu closing animation to start before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Hobbies', id: 'hobbies' },
    { label: 'Contact', id: 'contact' }, // Added Contact
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Navbar Container - Fixed & Pointer Events controlled */}
      <nav className="fixed top-6 left-0 w-full z-50 pointer-events-none px-6 md:px-12 flex items-start justify-between">

        {/* Left: SK Logo - Enhanced Glass Surface with Smooth Watery Animation */}
        <motion.div
          className="pointer-events-auto"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          animate={{
            width: isLogoHovered ? (window.innerWidth < 768 ? 160 : 200) : 48,
            scale: isLogoHovered ? 1.02 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
            mass: 1
          }}
        >
          <GlassSurface
            width="100%"
            height={48}
            borderRadius={50}
            borderWidth={1.5}
            blur={isLogoHovered ? 16 : 12}
            displace={isLogoHovered ? 2.0 : 0.5}
            distortionScale={isLogoHovered ? -100 : -180}
            redOffset={isLogoHovered ? 5 : 0}
            greenOffset={isLogoHovered ? 15 : 10}
            blueOffset={isLogoHovered ? 25 : 20}
            brightness={isLogoHovered ? 70 : 50}
            opacity={0.95}
            mixBlendMode="screen"
            className="flex items-center justify-center border border-white/20 overflow-hidden shadow-lg"
          >
            <motion.div
              layout
              className="flex items-center text-white"
              style={{ fontFamily: 'var(--font-instrument-sans)' }}
            >
              <motion.span
                animate={{
                  fontSize: isLogoHovered ? "1.25rem" : "1.375rem",
                  letterSpacing: isLogoHovered ? "0.025em" : "-0.05em",
                  fontWeight: isLogoHovered ? 200 : 100
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
              >
                S
              </motion.span>

              <motion.span
                initial={false}
                animate={{
                  width: isLogoHovered ? "auto" : 0,
                  opacity: isLogoHovered ? 1 : 0,
                  marginRight: isLogoHovered ? "0.25em" : 0,
                  x: isLogoHovered ? 0 : -10
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.8,
                  delay: isLogoHovered ? 0.05 : 0
                }}
                className="overflow-hidden whitespace-nowrap"
                style={{ fontSize: "1.25rem", letterSpacing: "0.025em", fontWeight: 100 }}
              >
                hantanu
              </motion.span>

              <motion.span
                animate={{
                  fontSize: isLogoHovered ? "1.25rem" : "1.375rem",
                  letterSpacing: isLogoHovered ? "0.025em" : "-0.05em",
                  fontWeight: isLogoHovered ? 200 : 100
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
              >
                K
              </motion.span>

              <motion.span
                initial={false}
                animate={{
                  width: isLogoHovered ? "auto" : 0,
                  opacity: isLogoHovered ? 1 : 0,
                  x: isLogoHovered ? 0 : -10
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.8,
                  delay: isLogoHovered ? 0.1 : 0
                }}
                className="overflow-hidden whitespace-nowrap"
                style={{ fontSize: "1.25rem", letterSpacing: "0.025em", fontWeight: 100 }}
              >
                udva
              </motion.span>
            </motion.div>
          </GlassSurface>
        </motion.div>

        {/* Desktop Menu */}
        <div className="pointer-events-auto hidden md:block">
          <GlassSurface
            height={56}
            width="auto"
            borderRadius={50}
            borderWidth={1}
            blur={12}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
          >
            <div className="flex items-center justify-center gap-8 px-8 h-full">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm font-medium transition-colors duration-300 relative ${activeSection === item.id ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in zoom-in duration-300" />
                  )}
                </a>
              ))}
              <div className="w-px h-4 bg-border/50 mx-2" />
              <a
                href="https://github.com/ShantanuKudva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-all hover:scale-110"
              >
                <SiGithub className="w-4 h-4" />
              </a>
            </div>
          </GlassSurface>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="pointer-events-auto md:hidden p-3 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-foreground relative z-50"
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 items-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-3xl font-serif font-light ${activeSection === item.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10 w-full flex justify-center gap-8"
              >
                <a
                  href="https://github.com/ShantanuKudva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-all p-2 bg-white/5 rounded-full"
                >
                  <SiGithub className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Gradient Fade (only visible when menu is closed) */}
      {!isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-40 pointer-events-none" />
      )}
    </>
  );
}