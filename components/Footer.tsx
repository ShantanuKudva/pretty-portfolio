'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Name */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xl"
              style={{ fontFamily: 'var(--font-mrs-saint)' }}
            >
              Shantanu Kudva
            </span>
            <span className="text-background/40">|</span>
            <span className="text-sm text-background/70">Bengaluru, India</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ShantanuKudva"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/shantanu-kudva"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:kudvashantanu2002@gmail.com"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-all hover:scale-110"
              aria-label="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-background/50 text-center md:text-right">
            <p>&copy; {currentYear} Shantanu Kudva</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
