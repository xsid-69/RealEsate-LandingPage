'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.hero-video-wrapper',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'expo.out' }
      );

      tl.fromTo('.hero-title-line span',
        { y: '110%', rotateX: -80 },
        { y: '0%', rotateX: 0, duration: 1.4, ease: 'expo.out', stagger: 0.06 },
        '-=1.4'
      );

      tl.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      tl.fromTo('.hero-badge',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      tl.fromTo('.hero-search',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo('.hero-scroll-hint',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set('.hero-video-wrapper', { yPercent: p * 15 });
          gsap.set(contentRef.current, { yPercent: -p * 40, opacity: 1 - p * 1.5 });
          gsap.set(badgeRef.current, { yPercent: -p * 30 });
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
        <span className="inline-block" style={{ transformOrigin: 'bottom' }}>
          {word}
        </span>
      </span>
    ));

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Video */}
      <div className="hero-video-wrapper absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/property-1.jpg"
        >
          <source src="/videos/living-room.mp4" type="video/mp4" />
        </video>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-16 max-w-7xl mx-auto"
      >
        {/* Badge */}
        <div ref={badgeRef} className="hero-badge mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] hover:-translate-y-0.5 transition-transform duration-500">
            <span className="w-2 h-2 rounded-full bg-[var(--brand)] animate-pulse" />
            <span className="text-white/70 text-[11px] tracking-[2px] uppercase font-body font-medium">
              10,000+ Families Settled
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title text-white font-cinzel leading-[0.95] tracking-tight mb-6">
          <span className="hero-title-line block text-[clamp(40px,8vw,90px)] overflow-hidden">
            {splitWords('Nestara')}
          </span>
          <span className="hero-title-line block text-[clamp(40px,8vw,90px)] overflow-hidden text-white/40">
            {splitWords('Home')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-white/50 text-[clamp(13px,1.4vw,16px)] max-w-md leading-relaxed font-body mb-10 tracking-wide uppercase">
          & Realty, Pune
        </p>

        {/* Search Bar - hidden on mobile */}
        <div className="hero-search hidden md:block">
          <form role="search" aria-label="Property search" className="flex items-stretch bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-sm overflow-hidden max-w-3xl">
            <div className="flex-1 grid grid-cols-3 divide-x divide-white/[0.06]">
              <div className="px-6 py-5">
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-body block mb-1">Location</span>
                <span className="text-white text-[14px] font-body">All Pune</span>
              </div>
              <div className="px-6 py-5">
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-body block mb-1">Property Type</span>
                <span className="text-white text-[14px] font-body">All Types</span>
              </div>
              <div className="px-6 py-5">
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-body block mb-1">Budget</span>
                <span className="text-white text-[14px] font-body">Any Budget</span>
              </div>
            </div>
            <MagneticButton strength={0.2}>
              <button type="submit" className="bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white px-8 text-[11px] uppercase tracking-[2.5px] font-semibold font-body transition-all duration-400 hover:shadow-[0_0_30px_rgba(196,164,78,0.3)] h-full" aria-label="Search properties">
                Search
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[10px] tracking-[3px] uppercase font-body">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 w-full h-3 bg-white/60 animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
