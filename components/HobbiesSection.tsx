'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Masonry from '@/components/ui/Masonry';
import Image from 'next/image';
import { HobbyMedia } from '@/lib/get-hobbies';

interface HobbiesSectionProps {
  initialMedia?: HobbyMedia[];
}

export function HobbiesSection({ initialMedia }: HobbiesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(true); // For container fade transition

  // Use provided media or fallback to empty
  const allMedia = initialMedia || [];

  const [displayMedia, setDisplayMedia] = useState(allMedia);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get current page items
  const currentItems = displayMedia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Check if all images on current page are loaded
  const allCurrentImagesLoaded = currentItems.every(item => loadedImages.has(item.id));

  // Randomize client-side only to prevent hydration mismatch
  useEffect(() => {
    setDisplayMedia([...allMedia].sort(() => Math.random() - 0.5));
    setMounted(true);
  }, []);

  // Handle image load
  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  }, []);

  // Custom smooth scroll with "Ease In Out 3" (Cubic)
  const scrollToTop = useCallback(() => {
    if (!containerRef.current) return;

    // Use getBoundingClientRect for accurate relative position to viewport
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const targetY = rect.top + scrollTop - 100; // Global position - offset

    const startY = scrollTop;
    const diff = targetY - startY;
    const duration = 800; // 0.8s duration for snappier feel
    let startTime: number | null = null;

    // Switch to Ease-Out Cubic (Power3.easeOut) for immediate response
    const easeOutCubic = (t: number) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startY + diff * easeOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Handle page change with fade transition
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage === currentPage) return;

    // Step 1: Fade out current content
    setIsVisible(false);

    // Step 2: After fade out, change page and scroll
    setTimeout(() => {
      setCurrentPage(newPage);
      scrollToTop();

      // Step 3: Fade in new content (with skeletons)
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    }, 300); // Match the CSS transition duration
  }, [currentPage, scrollToTop]);

  if (!mounted) return null; // Avoid flash of unshuffled content or layout shift

  return (
    <section id="hobbies" className="relative w-full bg-background py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div style={{
          backgroundImage: 'linear-gradient(45deg, #000 1px, transparent 1px), linear-gradient(-45deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} className="absolute inset-0" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-6 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight font-serif">
            <span className="italic">Beyond</span> Code
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Some things I enjoy when I&apos;m away from the keyboard.
          </p>
        </div>

        {/* Masonry Grid - Pure Images, No Hover Text */}
        <div className={`relative w-full min-h-[600px] transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Masonry
            items={currentItems}
            config={{
              columns: [1, 2, 3],
              gap: [16, 16, 16] // Tighter gap for image-wall feel
            }}
            enableAnimation={false}
            renderItem={(item) => (
              <div className="masonry-item select-none rounded-xl overflow-hidden relative">
                {/* Skeleton fades out as image fades in */}
                <div
                  className={`absolute inset-0 bg-foreground/10 z-10 transition-opacity duration-700 ease-out ${loadedImages.has(item.id) ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
                    }`}
                />
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  loading="lazy"
                  className={`w-full h-auto object-cover transition-opacity duration-700 ease-out ${loadedImages.has(item.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                  onLoad={() => handleImageLoad(item.id)}
                />
              </div>
            )}
          />

          {/* Pagination Controls */}
          {Math.ceil(displayMedia.length / itemsPerPage) > 1 && (
            <div className="flex justify-center items-center gap-6 mt-12 font-serif">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-full border border-border/50 text-foreground/80 hover:text-foreground hover:bg-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase text-xs tracking-wider"
              >
                Prev
              </button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(displayMedia.length / itemsPerPage) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1
                      ? 'bg-foreground scale-125'
                      : 'bg-foreground/20 hover:bg-foreground/40'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={() => handlePageChange(Math.min(Math.ceil(displayMedia.length / itemsPerPage), currentPage + 1))}
                disabled={currentPage === Math.ceil(displayMedia.length / itemsPerPage)}
                className="px-6 py-2 rounded-full border border-border/50 text-foreground/80 hover:text-foreground hover:bg-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase text-xs tracking-wider"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Skills Grid - Kept from previous version */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-lg">Languages</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Go (Golang)</li>
              <li>Python</li>
              <li>C++</li>
              <li>JavaScript/TypeScript</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-lg">Backend Technologies</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>ClickHouse</li>
              <li>Apache Flink</li>
              <li>PostgreSQL</li>
              <li>Redis, Kafka, Elasticsearch</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-lg">Infrastructure</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Docker, Ansible</li>
              <li>AWS</li>
              <li>Prometheus, Grafana</li>
              <li>CI/CD, Microservices</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
