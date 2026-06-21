import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 });

      tl.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' })
        .fromTo('.hero-line-1', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=1')
        .fromTo('.hero-line-2', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.7')
        .fromTo('.hero-subtitle', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo('.hero-badge', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3')
        .fromTo(searchRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.2');

      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: '30% top', end: '70% top', scrub: true },
      });
    }, heroRef);

    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
    if (window.innerWidth > 1024) {
      mouseMoveHandler = (e: MouseEvent) => {
        if (!imageRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 5;
        gsap.to(imageRef.current, { x, y, duration: 2, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    }

    return () => {
      ctx.revert();
      if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative w-full h-screen min-h-[600px] md:min-h-[700px] overflow-hidden bg-[#060606]" aria-label="Hero section">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="w-full h-full will-change-transform">
          <picture>
            <source media="(max-width: 640px)" srcSet="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=640&q=65" />
            <source media="(max-width: 1024px)" srcSet="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1024&q=70" />
            <img
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=75"
              alt="Modernist villa with infinity pool at golden hour"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
              width="1600"
              height="900"
            />
          </picture>
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#060606]/50 via-transparent to-[#060606]/80 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#060606]/60 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      {/* 10K+ Badge */}
      <div className="hero-badge absolute top-[18%] right-5 md:right-12 lg:right-20 z-10" aria-label="Over 10,000 families settled">
        <div className="bg-white/[0.06] backdrop-blur-lg border border-white/[0.08] px-5 py-4 md:px-6 md:py-5 text-center transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.09] hover:-translate-y-1">
          <span className="block text-[28px] md:text-[40px] font-normal text-white" style={{ fontFamily: "'Cinzel', serif" }}>10K<span className="text-[var(--brand-light)]">+</span></span>
          <span className="text-[9px] md:text-[10px] text-white/40 tracking-[2px] uppercase block mt-1 font-medium">Families Settled</span>
        </div>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="absolute inset-0 z-10 flex flex-col justify-center px-5 md:px-14 lg:px-20 xl:px-28">
        <div className="max-w-6xl">
          {/* Subtitle */}
          <div className="hero-subtitle flex items-center gap-3 md:gap-4 mb-5 md:mb-7">
            <div className="w-8 md:w-10 h-[1px] bg-gradient-to-r from-[var(--brand-light)] to-transparent" aria-hidden="true" />
            <p className="text-white/60 text-[10px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase font-medium">
              Upgrade your life with smart home technology
            </p>
          </div>

          {/* Main title */}
          <h1 style={{ fontFamily: "'Cinzel', serif" }}>
            <span className="block overflow-hidden mb-1">
              <span className="hero-line-1 inline-block text-white will-change-transform" style={{ fontSize: 'clamp(40px, 10vw, 130px)', fontWeight: 400, lineHeight: 0.9 }}>
                NESTARA
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line-2 inline-block will-change-transform" style={{ fontSize: 'clamp(40px, 10vw, 130px)', fontWeight: 400, lineHeight: 0.9, WebkitTextStroke: '1.5px rgba(255,255,255,0.6)', color: 'transparent' }}>
                HOME
              </span>
            </span>
          </h1>

          <p className="text-white/30 text-[12px] md:text-[13px] tracking-[4px] md:tracking-[5px] uppercase font-light mt-4 md:mt-5">& Realty, Pune</p>

          {/* Mobile CTA */}
          <div className="mt-6 md:hidden">
            <button
              onClick={() => { const el = document.getElementById('properties'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-[var(--brand)] text-white px-7 py-3.5 text-[11px] font-semibold tracking-[2px] uppercase border-none cursor-pointer transition-all duration-400 hover:shadow-[0_0_20px_rgba(139,105,20,0.3)]"
            >
              View Properties
            </button>
          </div>
        </div>
      </div>

      {/* Property Search Bar - desktop only */}
      <div ref={searchRef} className="hidden md:block absolute bottom-8 lg:bottom-10 left-6 right-6 md:left-14 md:right-14 lg:left-20 lg:right-20 xl:left-28 xl:right-28 z-20">
        <form
          className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] p-2.5 md:p-3 transition-all duration-500 hover:bg-white/[0.09] hover:border-white/[0.12]"
          onSubmit={(e) => { e.preventDefault(); const el = document.getElementById('properties'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
          role="search"
          aria-label="Property search"
        >
          <div className="flex items-center gap-0">
            <div className="flex-1 px-5 lg:px-6 py-3 border-r border-white/[0.06]">
              <label htmlFor="search-location" className="text-[10px] text-white/30 tracking-[1.5px] uppercase block mb-1 font-medium">Location</label>
              <select id="search-location" className="w-full bg-transparent text-white/90 text-[14px] font-medium border-none outline-none cursor-pointer appearance-none" defaultValue="">
                <option value="" className="bg-[#1a1a1a]">All Pune</option>
                <option value="koregaon" className="bg-[#1a1a1a]">Koregaon Park</option>
                <option value="baner" className="bg-[#1a1a1a]">Baner</option>
                <option value="kalyani" className="bg-[#1a1a1a]">Kalyani Nagar</option>
                <option value="viman" className="bg-[#1a1a1a]">Viman Nagar</option>
                <option value="hinjewadi" className="bg-[#1a1a1a]">Hinjewadi</option>
              </select>
            </div>
            <div className="flex-1 px-5 lg:px-6 py-3 border-r border-white/[0.06]">
              <label htmlFor="search-type" className="text-[10px] text-white/30 tracking-[1.5px] uppercase block mb-1 font-medium">Property Type</label>
              <select id="search-type" className="w-full bg-transparent text-white/90 text-[14px] font-medium border-none outline-none cursor-pointer appearance-none" defaultValue="">
                <option value="" className="bg-[#1a1a1a]">All Types</option>
                <option value="villa" className="bg-[#1a1a1a]">Villa</option>
                <option value="penthouse" className="bg-[#1a1a1a]">Penthouse</option>
                <option value="apartment" className="bg-[#1a1a1a]">Apartment</option>
                <option value="bungalow" className="bg-[#1a1a1a]">Bungalow</option>
              </select>
            </div>
            <div className="flex-1 px-5 lg:px-6 py-3 border-r border-white/[0.06]">
              <label htmlFor="search-budget" className="text-[10px] text-white/30 tracking-[1.5px] uppercase block mb-1 font-medium">Budget</label>
              <select id="search-budget" className="w-full bg-transparent text-white/90 text-[14px] font-medium border-none outline-none cursor-pointer appearance-none" defaultValue="">
                <option value="" className="bg-[#1a1a1a]">Any Budget</option>
                <option value="1-3" className="bg-[#1a1a1a]">₹1 — 3 Cr</option>
                <option value="3-5" className="bg-[#1a1a1a]">₹3 — 5 Cr</option>
                <option value="5-10" className="bg-[#1a1a1a]">₹5 — 10 Cr</option>
                <option value="10+" className="bg-[#1a1a1a]">₹10 Cr+</option>
              </select>
            </div>
            <div className="px-2 py-2">
              <button
                type="submit"
                className="bg-[var(--brand)] text-white px-8 lg:px-10 py-4 text-[11px] font-semibold tracking-[2px] uppercase cursor-pointer border-none transition-all duration-400 hover:shadow-[0_0_24px_rgba(139,105,20,0.3)] focus-visible:ring-2 focus-visible:ring-[var(--brand-light)]"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
