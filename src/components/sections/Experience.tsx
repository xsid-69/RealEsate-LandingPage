'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import CountUp from '@/components/ui/CountUp';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Image reveal with clip-path + rotation
      gsap.fromTo('.exp-image',
        { clipPath: 'inset(20% 0 20% 0)', scale: 1.15, rotate: 2 },
        {
          clipPath: 'inset(0% 0 0% 0)', scale: 1, rotate: 0,
          duration: 1.8, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.exp-image', start: 'top 80%', end: 'bottom 50%', toggleActions: 'play none none none' },
        }
      );

      // Right content stagger
      gsap.fromTo('.exp-content > *',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.exp-content', start: 'top 75%' },
        }
      );

      // Stats cards entrance
      gsap.fromTo('.stat-card',
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.9, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <div className="relative group">
          <div className="exp-image relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src="/images/property-2.jpg"
              alt="Elegant living space with natural light"
              fill
              className="object-cover transition-transform duration-[1500ms] ease-expo-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Hover frame */}
            <div className="absolute inset-3 border border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none rounded-sm" />
          </div>
          {/* Corner accents */}
          <div className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-[var(--brand-light)]/0 group-hover:border-[var(--brand-light)]/60 transition-all duration-700 delay-100" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-[var(--brand-light)]/0 group-hover:border-[var(--brand-light)]/60 transition-all duration-700 delay-100" />
        </div>

        {/* Content */}
        <div className="exp-content flex flex-col gap-6">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body">
            Our Story
          </span>

          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            We find homes that feel like they were always yours
          </TextReveal>

          <p className="text-[var(--ink-muted)] text-[15px] leading-[1.9] max-w-lg font-body">
            For over a decade, Nestara Realty has curated premium living experiences in Pune&apos;s most
            sought-after neighbourhoods. We don&apos;t just sell properties — we match lifestyles.
          </p>

          {/* Stats */}
          <div className="stats-grid grid grid-cols-3 gap-4 mt-6">
            <div className="stat-card p-5 rounded-sm bg-[var(--surface-alt)] border border-[var(--border-subtle)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand-soft)] transition-all duration-500 group/stat">
              <div className="text-[clamp(28px,3.5vw,38px)] font-cinzel text-[var(--ink)] group-hover/stat:text-[var(--brand)] transition-colors duration-500">
                <CountUp target={12} suffix="+" />
              </div>
              <span className="text-[11px] text-[var(--ink-muted)] uppercase tracking-[1.5px] mt-1 block font-body">
                Years in Pune
              </span>
            </div>
            <div className="stat-card p-5 rounded-sm bg-[var(--surface-alt)] border border-[var(--border-subtle)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand-soft)] transition-all duration-500 group/stat">
              <div className="text-[clamp(28px,3.5vw,38px)] font-cinzel text-[var(--ink)] group-hover/stat:text-[var(--brand)] transition-colors duration-500">
                <CountUp target={2400} suffix="+" />
              </div>
              <span className="text-[11px] text-[var(--ink-muted)] uppercase tracking-[1.5px] mt-1 block font-body">
                Families Settled
              </span>
            </div>
            <div className="stat-card p-5 rounded-sm bg-[var(--surface-alt)] border border-[var(--border-subtle)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand-soft)] transition-all duration-500 group/stat">
              <div className="text-[clamp(28px,3.5vw,38px)] font-cinzel text-[var(--ink)] group-hover/stat:text-[var(--brand)] transition-colors duration-500">
                <CountUp target={98} suffix="%" />
              </div>
              <span className="text-[11px] text-[var(--ink-muted)] uppercase tracking-[1.5px] mt-1 block font-body">
                Referral Rate
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <MagneticButton strength={0.2}>
              <button className="btn-primary rounded-sm">
                Start a Conversation
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
