'use client';

import { useState } from 'react';
import { GreetingLoader } from '@/components/GreetingLoader';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { HobbiesSection } from '@/components/HobbiesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { TechStack } from '@/components/TechStack';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <Navigation />
      {showLoader && <GreetingLoader onComplete={() => setShowLoader(false)} />}
      <main className="relative">
        <HeroSection />
        <ExperienceSection />
        <TechStack />
        <ProjectsSection />
        <HobbiesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}