'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Preloader from '@/components/effects/Preloader';
import Cursor from '@/components/effects/Cursor';
import GrainOverlay from '@/components/effects/GrainOverlay';
import SmoothScroll from '@/components/effects/SmoothScroll';
import Chatbot from '@/components/ui/Chatbot';

const Experience = dynamic(() => import('@/components/sections/Experience'));
const Properties = dynamic(() => import('@/components/sections/Properties'));
const Neighbourhoods = dynamic(() => import('@/components/sections/Neighbourhoods'));
const Process = dynamic(() => import('@/components/sections/Process'));
const VideoTour = dynamic(() => import('@/components/sections/VideoTour'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const Team = dynamic(() => import('@/components/sections/Team'));
const Awards = dynamic(() => import('@/components/sections/Awards'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <Cursor />
          <GrainOverlay />
          <Chatbot />
          <SmoothScroll>
            <main className="overflow-x-hidden w-full max-w-full">
              <Navigation />
              <Hero />
              <Experience />
              <Properties />
              <Neighbourhoods />
              <Process />
              <VideoTour />
              <Testimonials />
              <Team />
              <Awards />
              <Contact />
              <Footer />
            </main>
          </SmoothScroll>
        </>
      )}
    </>
  );
}
