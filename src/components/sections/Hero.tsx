'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Orchestrated entrance sequence
      const tl = gsap.timeline({ delay: 0.2 });

      // Image scales in
      tl.fromTo('.hero-image-wrapper',
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out' }
      );

      // Title lines reveal (word by word)
      tl.fromTo('.hero-title-line span',
        { y: '110%', rotateX: -80 },
        { y: '0%', rotateX: 0, duration: 1.4, ease: 'expo.out', stagger: 0.06 },
        '-=1.2'
      );

      // Subtitle fades
      tl.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      // Badge slides in
      tl.fromTo('.hero-badge',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      // Search bar rises
      tl.fromTo('.hero-search',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      // Scroll indicator
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
          gsap.set('.hero-image-wrapper', { yPercent: p * 20 });
          gsap.set(contentRef.current, { yPercent: -p * 40, opacity: 1 - p * 1.5 });
          gsap.set(badgeRef.current, { yPercent: -p * 30 });
        },
      });

      // Mouse-follow parallax on image (desktop only)
      if (window.innerWidth >= 1024) {
        const onMouse = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 12;
          gsap.to('.hero-image-wrapper img', { x, y, duration: 1.5, ease: 'power2.out' });
        };
        sectionRef.current?.addEventListener('mousemove', onMouse);
      }
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
      {/* Background Image */}
      <div className="hero-image-wrapper absolute inset-0">
        <Image
          src="/images/property-1.jpg"
          alt="Luxury modern villa in Pune with floor-to-ceiling windows"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
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
            {splitWords('Find Your')}
          </span>
          <span className="hero-title-line block text-[clamp(40px,8vw,90px)] overflow-hidden">
            {splitWords('Dream Home')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-white/50 text-[clamp(14px,1.5vw,18px)] max-w-lg leading-relaxed font-body mb-10">
          Premium real estate advisory in Pune. Curated homes in
          Koregaon Park, Kalyani Nagar, and Baner.
        </p>

        {/* Search Bar - hidden on mobile */}
        <div className="hero-search hidden md:block">
          <div className="flex items-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-sm overflow-hidden max-w-2xl hover:bg-white/[0.09] hover:border-white/[0.12] transition-all duration-500">
            <div className="flex-1 flex items-center gap-4 px-6 py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-40 flex-shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search by locality, project, or builder..."
                className="bg-transparent text-white placeholder-white/30 text-[14px] font-body w-full outline-none"
                aria-label="Search properties"
              />
            </div>
            <MagneticButton strength={0.2}>
              <button className="bg-[var(--brand)] hover:bg-[var(--brand-light)] text-white px-7 py-4 text-[11px] uppercase tracking-[2px] font-medium font-body transition-all duration-400 hover:shadow-[0_0_30px_rgba(196,164,78,0.3)]">
                Search
              </button>
            </MagneticButton>
          </div>
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
