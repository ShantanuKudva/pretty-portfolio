'use client';

import { useRef, useState, useEffect } from 'react';
import Masonry from '@/components/ui/Masonry';
import Image from 'next/image';

export function HobbiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // ALL media from your public/hobbies folders
  const allMedia = [
    // Cricket
    { id: 'c1', src: '/hobbies/cricket/7B07A3E6-2CA8-43ED-BD31-1CDC0CA29C53_1_102_o.jpeg', type: 'image' as const, alt: 'Cricket' },
    { id: 'c2', src: '/hobbies/cricket/9635424F-9477-42E1-8419-54D631FA809C_1_102_o.jpeg', type: 'image' as const, alt: 'Cricket' },
    // Foodie
    { id: 'f1', src: '/hobbies/foodie/01D9302C-9895-4CFA-98A9-1658DD2175D8_1_201_a.jpg', type: 'image' as const, alt: 'Food' },
    { id: 'f2', src: '/hobbies/foodie/0FA680EA-4707-4E13-89BF-3953AE7AE4F6_1_201_a.jpg', type: 'image' as const, alt: 'Food' },
    // Guitar
    { id: 'g1', src: '/hobbies/guitar/IMG_0469.jpg', type: 'image' as const, alt: 'Guitar' },
    // Lifestyle
    { id: 'l1', src: '/hobbies/lifestyle/397106A6-774D-458C-9DC1-28557EFCEEC7_1_105_c.jpeg', type: 'image' as const, alt: 'Lifestyle' },
    { id: 'l2', src: '/hobbies/lifestyle/B5935FF5-745A-4715-9DBA-D04E28CB30F9_1_105_c.jpeg', type: 'image' as const, alt: 'Lifestyle' },
    // Photography - ALL images
    { id: 'p1', src: '/hobbies/photography/1E23C33F-B210-4290-90DB-4FCB7C9C2E74_4_5005_c.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p2', src: '/hobbies/photography/41C96AB2-C1B9-413E-94C6-D365DDB44449_1_102_a.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p3', src: '/hobbies/photography/4878904B-39DA-4AF4-8C2F-789F6529F781_4_5005_c.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p4', src: '/hobbies/photography/6B1D6A35-562D-45AE-BC94-0A0758963035_1_105_c.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p5', src: '/hobbies/photography/70B5D684-0B46-4B8A-9218-BBC95E577C7B_1_102_a.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p6', src: '/hobbies/photography/812625D8-E12D-4D47-A769-E556E449FB72_4_5005_c.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p7', src: '/hobbies/photography/876EC093-C6E3-4F96-B33E-886428B00E45_1_102_a.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p8', src: '/hobbies/photography/8916EF0C-A23E-447E-88A5-18E6FF1DD2AB_1_102_a.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p9', src: '/hobbies/photography/9100E3DA-8B35-423C-8394-53C75894269F_1_201_a.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p10', src: '/hobbies/photography/94B5B149-F60F-4BBF-A081-E834296EFC88_4_5005_c.jpeg', type: 'image' as const, alt: 'Photography' },
    { id: 'p11', src: '/hobbies/photography/IMG_1320.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p12', src: '/hobbies/photography/IMG_1324.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p13', src: '/hobbies/photography/IMG_20250614_150211_Original.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p14', src: '/hobbies/photography/IMG_2114.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p15', src: '/hobbies/photography/IMG_2208.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p16', src: '/hobbies/photography/IMG_2217.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p17', src: '/hobbies/photography/IMG_2218.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p18', src: '/hobbies/photography/IMG_2261.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p19', src: '/hobbies/photography/IMG_2486.jpg', type: 'image' as const, alt: 'Photography' },
    { id: 'p20', src: '/hobbies/photography/IMG_2494.jpg', type: 'image' as const, alt: 'Photography' },
    // Running
    { id: 'r1', src: '/hobbies/running/BBC2D3E6-BB85-42CD-9E3B-C02B42931375_1_105_c.jpeg', type: 'image' as const, alt: 'Running' },
  ];

  const [displayMedia, setDisplayMedia] = useState(allMedia);

  // Randomize client-side only to prevent hydration mismatch
  useEffect(() => {
    setDisplayMedia([...allMedia].sort(() => Math.random() - 0.5));
    setMounted(true);
  }, []);

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
        <div className="relative w-full min-h-[600px]">
          <Masonry
            items={displayMedia}
            config={{
              columns: [1, 2, 3],
              gap: [16, 16, 16] // Tighter gap for image-wall feel
            }}
            renderItem={(item) => (
              <div className="masonry-item select-none rounded-xl overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          />
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
