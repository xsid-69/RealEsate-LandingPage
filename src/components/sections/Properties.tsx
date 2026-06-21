'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import TiltCard from '@/components/ui/TiltCard';
import TextReveal from '@/components/ui/TextReveal';

const PROPERTIES = [
  {
    title: 'The Canopy Residences',
    location: 'Koregaon Park, Pune',
    price: '₹3.2 Cr onwards',
    type: 'Villa',
    image: '/images/property-1.jpg',
    aspect: 'aspect-[16/10]',
    cols: 'lg:col-span-7',
  },
  {
    title: 'Skyline One',
    location: 'Kalyani Nagar, Pune',
    price: '₹1.8 Cr onwards',
    type: 'Penthouse',
    image: '/images/property-2.jpg',
    aspect: 'aspect-[16/9]',
    cols: 'lg:col-span-5',
  },
  {
    title: 'Riviera Heights',
    location: 'Baner, Pune',
    price: '₹95 L onwards',
    type: 'Apartment',
    image: '/images/property-3.jpg',
    aspect: 'aspect-[16/9]',
    cols: 'lg:col-span-5',
  },
  {
    title: 'The Orchid Estate',
    location: 'Boat Club Road, Pune',
    price: '₹5.5 Cr onwards',
    type: 'Mansion',
    image: '/images/property-1.jpg',
    aspect: 'aspect-[3/1]',
    cols: 'lg:col-span-7',
  },
];

export default function Properties() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Header slides in with blur reveal
      gsap.fromTo('.prop-header > *',
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: '.prop-header', start: 'top 82%' } }
      );

      // Cards cascade in with stagger and rotation
      gsap.fromTo('.prop-card',
        { y: 120, opacity: 0, scale: 0.9, rotateX: 8 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, stagger: 0.15, duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: '.prop-grid', start: 'top 85%' } }
      );

      // Each card image has parallax
      document.querySelectorAll('.prop-card').forEach((card) => {
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(img, { yPercent: -10 }, {
            yPercent: 10, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        }
      });

      // Horizontal scroll reveal line
      gsap.fromTo('.prop-reveal-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut',
          scrollTrigger: { trigger: '.prop-header', start: 'top 80%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="properties" ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="prop-header mb-16">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            Featured Properties
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1] max-w-2xl">
            Handpicked residences in Pune&apos;s finest locales
          </TextReveal>
          <div className="prop-reveal-line mt-6 h-[1px] w-full max-w-xs bg-gradient-to-r from-[var(--brand)] to-transparent origin-left" />
        </div>

        {/* Grid */}
        <div className="prop-grid grid grid-cols-1 lg:grid-cols-12 gap-5">
          {PROPERTIES.map((prop, idx) => (
            <TiltCard
              key={idx}
              className={`prop-card ${prop.cols} group cursor-pointer`}
              intensity={6}
              scale={1.01}
            >
              <div className={`relative ${prop.aspect} overflow-hidden rounded-sm bg-[var(--surface-dark)]`}>
                <Image
                  src={prop.image}
                  alt={`${prop.title} — ${prop.location}`}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-expo-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-700" />

                {/* Frame border */}
                <div className="absolute inset-3 border border-white/0 group-hover:border-white/[0.08] transition-all duration-700 rounded-sm pointer-events-none" />

                {/* Type badge */}
                <div className="absolute top-5 left-5">
                  <span className="text-[10px] uppercase tracking-[2px] font-medium font-body bg-white/[0.08] backdrop-blur-md text-white/80 px-3 py-1.5 rounded-sm border border-white/[0.06] group-hover:bg-[var(--brand)]/80 group-hover:border-[var(--brand)]/40 transition-all duration-500">
                    {prop.type}
                  </span>
                </div>

                {/* Arrow */}
                <div className="absolute top-5 right-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <div className="w-9 h-9 rounded-full bg-white/[0.1] backdrop-blur-md flex items-center justify-center border border-white/[0.1] group-hover:rotate-[-45deg] transition-transform duration-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-700 ease-expo-out">
                  <h3 className="text-white text-[clamp(18px,2.5vw,24px)] font-cinzel mb-1">{prop.title}</h3>
                  <p className="text-white/50 text-[13px] font-body mb-2">{prop.location}</p>
                  <span className="text-[var(--brand-light)] text-[14px] font-medium font-body">{prop.price}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
