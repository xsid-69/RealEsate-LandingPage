'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import TiltCard from '@/components/ui/TiltCard';
import TextReveal from '@/components/ui/TextReveal';

const AREAS = [
  { name: 'Koregaon Park', vibe: 'Leafy lanes, boutique cafes', price: '₹1.5–6 Cr', listings: 24, image: '/images/property-1.jpg' },
  { name: 'Kalyani Nagar', vibe: 'Riverfront living, modern towers', price: '₹1.2–4 Cr', listings: 31, image: '/images/property-2.jpg' },
  { name: 'Baner', vibe: 'Tech corridor, vibrant nightlife', price: '₹70L–2.5 Cr', listings: 45, image: '/images/property-3.jpg' },
  { name: 'Boat Club Road', vibe: 'Heritage charm, quiet luxury', price: '₹3–12 Cr', listings: 8, image: '/images/property-1.jpg' },
];

export default function Neighbourhoods() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header with staggered blur reveal
      gsap.fromTo('.neigh-header > *',
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: '.neigh-header', start: 'top 82%' } }
      );

      // Cards stagger in from alternating sides
      document.querySelectorAll('.neigh-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, x: i % 2 === 0 ? -40 : 40, opacity: 0, scale: 0.92, rotateY: i % 2 === 0 ? -8 : 8 },
          { y: 0, x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        );
      });

      // Inner parallax on each card image
      document.querySelectorAll('.neigh-card').forEach((card) => {
        const img = card.querySelector('.neigh-img');
        if (img) {
          gsap.fromTo(img, { yPercent: -12 }, {
            yPercent: 12, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          });
        }
      });

      // Reveal line under header
      gsap.fromTo('.neigh-reveal-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut',
          scrollTrigger: { trigger: '.neigh-header', start: 'top 78%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="neighbourhoods" ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto">
        <div className="neigh-header mb-16">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            Neighbourhoods
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            Pune&apos;s most coveted addresses
          </TextReveal>
          <div className="neigh-reveal-line mt-6 h-[1px] w-full max-w-xs bg-gradient-to-r from-[var(--brand)] to-transparent origin-left" />
        </div>

        <div className="neigh-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {AREAS.map((area, idx) => (
            <TiltCard key={idx} className="neigh-card group cursor-pointer" intensity={5} scale={1.01}>
              <div className={`relative overflow-hidden rounded-sm ${idx % 3 === 0 ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
                <div className="neigh-img absolute inset-0 scale-[1.2]">
                  <Image
                    src={area.image}
                    alt={`${area.name} neighbourhood in Pune`}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-expo-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/30 to-transparent group-hover:from-[#0F0F0F]/90 transition-all duration-700" />

                {/* Frame */}
                <div className="absolute inset-3 border border-white/0 group-hover:border-white/[0.08] transition-all duration-700 rounded-sm pointer-events-none" />

                {/* Arrow */}
                <div className="absolute top-5 right-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-700 ease-expo-out">
                    <h3 className="text-white text-[clamp(20px,2.5vw,26px)] font-cinzel mb-1 group-hover:text-[var(--brand-light)] transition-colors duration-500">
                      {area.name}
                    </h3>
                    <p className="text-white/40 text-[13px] font-body">{area.vibe}</p>
                  </div>

                  {/* Expandable bar */}
                  <div className="mt-3 h-0 group-hover:h-11 overflow-hidden transition-all duration-700 ease-expo-out">
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                      <div className="flex items-center gap-4">
                        <span className="text-white/60 text-[12px] font-body">{area.price}</span>
                        <span className="text-white/30 text-[11px] font-body">{area.listings} listings</span>
                      </div>
                      <span className="text-[var(--brand-light)] text-[11px] uppercase tracking-[2px] font-medium font-body">
                        Explore area →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
