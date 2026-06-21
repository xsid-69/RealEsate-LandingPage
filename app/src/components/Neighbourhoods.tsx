import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const areas = [
  {
    name: 'Koregaon Park',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    listings: 24,
    priceRange: '₹2.5 — 8 Cr',
    vibe: 'Leafy lanes, cafes, expat-friendly',
  },
  {
    name: 'Baner',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    listings: 18,
    priceRange: '₹1.8 — 6 Cr',
    vibe: 'IT corridor, modern towers, nightlife',
  },
  {
    name: 'Kalyani Nagar',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    listings: 15,
    priceRange: '₹3 — 12 Cr',
    vibe: 'Premium high-rises, river proximity',
  },
  {
    name: 'Viman Nagar',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    listings: 12,
    priceRange: '₹1.5 — 4 Cr',
    vibe: 'Airport access, family-oriented',
  },
];

export default function Neighbourhoods() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.neighbourhood-heading > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.neighbourhood-heading', start: 'top 78%' } }
      );

      gsap.utils.toArray('.neighbourhood-card').forEach((card, i) => {
        gsap.fromTo(
          card as Element,
          { y: 80, opacity: 0, scale: 0.93 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: card as Element, start: 'top 90%' } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[var(--surface)] py-28 lg:py-36 px-6 lg:px-16 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-[var(--brand-soft)] rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="neighbourhood-heading flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div>
            <h2
              className="text-[var(--ink)] leading-[1.1]"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(30px, 4vw, 48px)' }}
            >
              Explore Pune's finest<br className="hidden md:block" /> neighbourhoods
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed mt-4 lg:mt-0 max-w-sm">
            Each area has its own character. We'll help you find the one that fits yours.
          </p>
        </div>

        {/* Grid - 2x2 with premium hover interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {areas.map((area, i) => (
            <div
              key={area.name}
              className={`neighbourhood-card relative group cursor-pointer overflow-hidden ${i === 0 || i === 3 ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}
            >
              <img
                src={area.image}
                alt={`${area.name} neighbourhood in Pune`}
                loading="lazy"
                decoding="async"
                width="600"
                height="375"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/20 to-transparent transition-all duration-700 group-hover:from-[#0F0F0F]/90" />

              {/* Hover frame */}
              <div className="absolute inset-3 border border-white/0 group-hover:border-white/[0.1] transition-all duration-700" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transition-transform duration-700 translate-y-1 group-hover:translate-y-0">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white text-[20px] lg:text-[24px] transition-colors duration-500 group-hover:text-[var(--brand-light)]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {area.name}
                    </h3>
                    <p className="text-white/40 text-[13px] mt-1 group-hover:text-white/60 transition-colors duration-500">{area.vibe}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-white/70 text-[14px] font-medium block">{area.priceRange}</span>
                    <span className="text-white/30 text-[12px] block mt-0.5 group-hover:text-[var(--brand-light)]/70 transition-colors duration-500">{area.listings} listings</span>
                  </div>
                </div>

                {/* Expandable info bar on hover */}
                <div className="h-0 group-hover:h-10 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.08]">
                    <span className="text-white/50 text-[11px] uppercase tracking-wider">Explore area</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-50">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover arrow - top right */}
              <div className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/0 group-hover:bg-white/[0.1] border border-white/0 group-hover:border-white/[0.15] transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
