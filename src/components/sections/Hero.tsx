'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Video scales in dramatically
      tl.fromTo('.hero-video-wrapper',
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: 'expo.out' }
      );

      // Vignette fades in
      tl.fromTo('.hero-vignette',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.inOut' },
        '-=2'
      );

      // Title letters slide up with 3D rotation
      tl.fromTo('.hero-title-line span span',
        { y: '120%', rotateX: -90, opacity: 0 },
        { y: '0%', rotateX: 0, opacity: 1, duration: 1.6, ease: 'expo.out', stagger: 0.04 },
        '-=1.6'
      );

      // Subtitle fades in with blur
      tl.fromTo('.hero-subtitle',
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=1'
      );

      // Badge pops in with spring
      tl.fromTo('.hero-badge',
        { y: 25, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(2)' },
        '-=0.7'
      );

      // Search bar slides up
      tl.fromTo('.hero-search',
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.5'
      );

      // Scroll hint fades in
      tl.fromTo('.hero-scroll-hint',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

      // Side decorations
      tl.fromTo('.hero-side-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: 'expo.out' },
        '-=1.5'
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set('.hero-video-wrapper', { yPercent: p * 20, scale: 1 + p * 0.1 });
          gsap.set(contentRef.current, { yPercent: -p * 50, opacity: 1 - p * 1.8 });
          gsap.set(badgeRef.current, { yPercent: -p * 35 });
          gsap.set('.hero-scroll-hint', { opacity: 1 - p * 4 });
        },
      });

      // Floating animation for badge
      gsap.to('.hero-badge-inner', {
        y: -6,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="inline-block" style={{ transformOrigin: 'bottom center' }}>
        {char === ' ' ? ' ' : char}
      </span>
    ));

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Video */}
      <div className="hero-video-wrapper absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/property-1.jpg"
        >
          <source src="/videos/hero-drone.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer overlays for depth */}
        <div className="hero-vignette absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Side decorative line */}
      <div className="hero-side-line hidden lg:block absolute left-10 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top z-10" />
      <div className="hero-side-line hidden lg:block absolute right-10 top-1/3 bottom-1/3 w-[1px] bg-gradient-to-b from-transparent via-[var(--brand)]/20 to-transparent origin-top z-10" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-16 max-w-7xl mx-auto"
      >
        {/* Badge */}
        <div ref={badgeRef} className="hero-badge mb-8">
          <div className="hero-badge-inner inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] shadow-[0_0_30px_rgba(196,164,78,0.08)]">
            <span className="relative w-2.5 h-2.5 rounded-full bg-[var(--brand)]">
              <span className="absolute inset-0 rounded-full bg-[var(--brand)] animate-ping opacity-50" />
            </span>
            <span className="text-white/80 text-[11px] tracking-[2px] uppercase font-body font-medium">
              10,000+ Families Settled
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title text-white font-cinzel leading-[0.9] tracking-tight mb-6" style={{ perspective: '1000px' }}>
          <span className="hero-title-line block text-[clamp(44px,9vw,100px)] overflow-hidden">
            {splitChars('Nestara')}
          </span>
          <span className="hero-title-line block text-[clamp(44px,9vw,100px)] overflow-hidden text-white/30">
            {splitChars('Home')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-white/50 text-[clamp(13px,1.4vw,16px)] max-w-md leading-relaxed font-body mb-12 tracking-[3px] uppercase">
          & Realty, Pune
        </p>

        {/* Search Bar */}
        <div className="hero-search hidden md:block">
          <form role="search" aria-label="Property search" className="flex items-stretch bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-md overflow-hidden max-w-3xl shadow-[0_8px_60px_rgba(0,0,0,0.3)] hover:border-white/[0.15] transition-all duration-700">
            <div className="flex-1 grid grid-cols-3 divide-x divide-white/[0.06]">
              <div className="px-6 py-5 group/field hover:bg-white/[0.03] transition-colors duration-300">
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-body block mb-1.5 group-hover/field:text-[var(--brand)] transition-colors duration-300">Location</span>
                <span className="text-white text-[14px] font-body">All Pune</span>
              </div>
              <div className="px-6 py-5 group/field hover:bg-white/[0.03] transition-colors duration-300">
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-body block mb-1.5 group-hover/field:text-[var(--brand)] transition-colors duration-300">Property Type</span>
                <span className="text-white text-[14px] font-body">All Types</span>
              </div>
              <div className="px-6 py-5 group/field hover:bg-white/[0.03] transition-colors duration-300">
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-body block mb-1.5 group-hover/field:text-[var(--brand)] transition-colors duration-300">Budget</span>
                <span className="text-white text-[14px] font-body">Any Budget</span>
              </div>
            </div>
            <MagneticButton strength={0.2}>
              <button type="submit" className="bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white px-10 text-[11px] uppercase tracking-[2.5px] font-semibold font-body transition-all duration-500 hover:shadow-[0_0_40px_rgba(196,164,78,0.4)] h-full hover:px-12" aria-label="Search properties">
                Search
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-white/30 text-[10px] tracking-[4px] uppercase font-body">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 w-full h-4 bg-white/70 animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="hidden lg:block absolute top-8 right-8 w-16 h-16 border-t border-r border-white/[0.08] z-10" />
      <div className="hidden lg:block absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/[0.08] z-10" />

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(350%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
