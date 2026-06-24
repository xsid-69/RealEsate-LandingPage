'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const FEATURES = [
  { icon: '4K', label: 'Virtual Tours', desc: 'Immersive 4K walkthroughs' },
  { icon: '📹', label: 'Live Video Calls', desc: 'Real-time guided visits' },
  { icon: '🚗', label: 'Neighbourhood Drives', desc: 'Area exploration on wheels' },
];

export default function VideoTour() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content slides from right with blur
      gsap.fromTo('.video-content > *',
        { x: 50, opacity: 0, filter: 'blur(6px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.video-content', start: 'top 78%' } }
      );

      // Video frame scales up with rotation
      gsap.fromTo('.video-frame',
        { scale: 0.88, opacity: 0, rotateY: -8 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.video-frame', start: 'top 82%' } }
      );

      // Parallax on video frame
      gsap.to('.video-frame', {
        yPercent: -5, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });

      // Slow Ken Burns on the video thumbnail
      gsap.to('.video-image', {
        scale: 1.08, xPercent: 3,
        duration: 20, ease: 'none', repeat: -1, yoyo: true,
      });

      // Feature items stagger
      gsap.fromTo('.video-feat',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.video-content', start: 'top 65%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Video frame */}
        <div className="video-frame relative group">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--surface-dark)]">
            <Image
              src="/images/property-3.jpg"
              alt="Virtual property tour preview"
              fill
              className="video-image object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-all duration-700" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="relative cursor-pointer bg-transparent border-none p-0" aria-label="Play virtual tour video">
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" aria-hidden="true" />
                <div className="absolute inset-0 rounded-full border border-white/10 scale-100 group-hover:scale-[1.8] group-hover:opacity-0 transition-all duration-1000 delay-200" aria-hidden="true" />
                {/* Rotating outer ring */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite]" aria-hidden="true" />
                {/* Button visual */}
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-[var(--brand)] group-hover:border-[var(--brand)] group-hover:shadow-[0_0_40px_rgba(196,164,78,0.4)] transition-all duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Frame border */}
            <div className="absolute inset-3 border border-white/0 group-hover:border-white/[0.08] transition-all duration-700 rounded-sm pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        <div className="video-content flex flex-col gap-6">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body">
            Virtual Experience
          </span>

          <TextReveal as="h2" className="text-[clamp(28px,4vw,44px)] font-cinzel text-[var(--ink)] leading-[1.15]">
            Tour homes without leaving yours
          </TextReveal>

          <p className="text-[var(--ink-muted)] text-[15px] leading-[1.9] font-body max-w-md">
            Our immersive virtual tours let you explore every corner, gauge natural light,
            and feel the space before scheduling an in-person visit.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4 mt-4">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="video-feat group/feat flex items-center gap-4 p-3 rounded-sm hover:bg-[var(--surface-alt)] transition-all duration-400">
                <div className="w-11 h-11 rounded-sm bg-[var(--brand-soft)] border border-[var(--border-subtle)] flex items-center justify-center text-[14px] group-hover/feat:scale-110 group-hover/feat:border-[var(--brand)]/30 transition-all duration-400">
                  {feat.icon}
                </div>
                <div>
                  <span className="text-[var(--ink)] text-[14px] font-medium font-body block">{feat.label}</span>
                  <span className="text-[var(--ink-muted)] text-[12px] font-body">{feat.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <MagneticButton strength={0.2}>
              <button className="btn-primary rounded-sm">
                Book a Virtual Tour
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
