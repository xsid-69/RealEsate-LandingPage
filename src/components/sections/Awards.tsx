'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import TextReveal from '@/components/ui/TextReveal';
import Marquee from '@/components/ui/Marquee';

const AWARDS = [
  { year: '2024', title: 'Best Luxury Brokerage', org: 'Pune Real Estate Awards' },
  { year: '2023', title: 'Top Client Satisfaction', org: 'India Property Forum' },
  { year: '2023', title: 'Excellence in Service', org: 'Maharashtra RERA Council' },
  { year: '2022', title: 'Emerging Brand of the Year', org: 'ET Real Estate Summit' },
];

const PARTNERS = ['Godrej', 'Lodha', 'Panchshil', 'Kolte-Patil', 'Shapoorji', 'Kumar', 'Marvel', 'Nyati'];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.awards-header > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.awards-header', start: 'top 80%' } }
      );

      gsap.fromTo('.award-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: '.awards-grid', start: 'top 80%' } }
      );

      gsap.fromTo('.partners-section',
        { opacity: 0 },
        { opacity: 1, duration: 1.2,
          scrollTrigger: { trigger: '.partners-section', start: 'top 85%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto">
        <div className="awards-header text-center mb-16">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            Recognition
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            Awards & partnerships
          </TextReveal>
        </div>

        {/* Awards grid */}
        <div className="awards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {AWARDS.map((award, idx) => (
            <div
              key={idx}
              className="award-item group p-6 rounded-sm border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:border-[var(--brand)]/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Shimmer border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(196,164,78,0.1), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite',
                }}
              />

              <span className="text-[var(--brand)] text-[13px] font-mono block mb-2">{award.year}</span>
              <h4 className="text-[var(--ink)] text-[16px] font-cinzel mb-1 group-hover:text-[var(--brand)] transition-colors duration-500">
                {award.title}
              </h4>
              <span className="text-[var(--ink-muted)] text-[12px] font-body">{award.org}</span>
            </div>
          ))}
        </div>

        {/* Partners marquee */}
        <div className="partners-section">
          <p className="text-center text-[11px] uppercase tracking-[3px] text-[var(--ink-muted)] font-body mb-8">
            Trusted Builder Partners
          </p>
          <Marquee speed={25} className="py-4 border-y border-[var(--border-subtle)]">
            <div className="flex items-center gap-16 px-8">
              {PARTNERS.map((partner, idx) => (
                <span
                  key={idx}
                  className="text-[var(--ink-muted)]/40 text-[18px] lg:text-[22px] font-cinzel whitespace-nowrap hover:text-[var(--ink-muted)] transition-colors duration-300"
                >
                  {partner}
                </span>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
