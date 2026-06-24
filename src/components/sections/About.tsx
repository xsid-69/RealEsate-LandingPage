'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';
import CountUp from '@/components/ui/CountUp';

const VALUES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Trust First',
    desc: 'Every recommendation is backed by data, honesty, and a decade of local expertise.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Curated, Not Listed',
    desc: 'We show you 5 perfect matches, not 500 options. Quality over quantity, always.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Lifestyle Match',
    desc: "We don't just sell properties — we match lifestyles to spaces that feel like home from day one.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'End-to-End Support',
    desc: 'From first call to keys in hand — paperwork, loans, interiors, and post-move support.',
  },
];

const MILESTONES = [
  { year: '2012', event: 'Founded in Koregaon Park with 3 advisors and a vision' },
  { year: '2016', event: 'Crossed 500 families settled, expanded to Baner & Kalyani Nagar' },
  { year: '2019', event: 'Launched virtual tours and digital advisory platform' },
  { year: '2022', event: 'Recognised as Best Luxury Brokerage at Pune Real Estate Awards' },
  { year: '2024', event: '10,000+ families settled — Pune\'s most trusted realty brand' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.about-header > *',
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: '.about-header', start: 'top 82%' } }
      );

      // Story text reveal
      gsap.fromTo('.about-story > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.about-story', start: 'top 78%' } }
      );

      // Values cards stagger
      document.querySelectorAll('.about-value').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        );
      });

      // Image reveal
      gsap.fromTo('.about-image',
        { clipPath: 'inset(0 100% 0 0)', scale: 1.1 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.8, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.about-image', start: 'top 80%' } }
      );

      // Image parallax
      gsap.to('.about-image img', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: '.about-image', start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      });

      // Milestones stagger from left
      gsap.fromTo('.about-milestone',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.about-timeline', start: 'top 78%' } }
      );

      // Timeline line grow
      gsap.fromTo('.about-timeline-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut',
          scrollTrigger: { trigger: '.about-timeline', start: 'top 80%' } }
      );

      // Stats entrance
      gsap.fromTo('.about-stat',
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.about-stats', start: 'top 82%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--brand)]/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--brand)]/[0.015] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="about-header text-center mb-20 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            About Nestara
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,56px)] font-cinzel text-[var(--ink)] leading-[1.05]">
            Where homes meet their families
          </TextReveal>
          <p className="mt-6 text-[var(--ink-muted)] text-[15px] leading-[1.9] font-body max-w-2xl mx-auto">
            Since 2012, we&apos;ve been Pune&apos;s most trusted name in premium real estate advisory —
            not as agents, but as partners in one of life&apos;s biggest decisions.
          </p>
        </div>

        {/* Story + Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-28">
          {/* Image */}
          <div className="about-image relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/property-2.jpg"
              alt="Nestara Realty office in Pune"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-white/20" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-white/20" />
          </div>

          {/* Story */}
          <div className="about-story flex flex-col gap-5">
            <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body">
              Our Story
            </span>
            <h3 className="text-[clamp(24px,3.5vw,36px)] font-cinzel text-[var(--ink)] leading-[1.15]">
              Built on referrals, driven by relationships
            </h3>
            <p className="text-[var(--ink-muted)] text-[15px] leading-[1.9] font-body">
              Nestara started with a simple belief: finding a home should feel personal, not transactional.
              Our founder, Arjun Mehta, left a corporate career to help one family find their dream home
              in Koregaon Park. That family referred three more. Those three referred twelve.
            </p>
            <p className="text-[var(--ink-muted)] text-[15px] leading-[1.9] font-body">
              Twelve years later, we&apos;ve settled over 10,000 families across Pune — and 98% of our
              business still comes through referrals. No cold calls, no spam. Just trust earned one
              family at a time.
            </p>
            <p className="text-[var(--ink-muted)] text-[15px] leading-[1.9] font-body">
              Today, our team of 15 advisors covers every premium micro-market in Pune. We work
              exclusively with vetted builders and verified listings, ensuring every property we
              recommend meets our standards before it reaches you.
            </p>

            {/* Stats */}
            <div className="about-stats grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--border-subtle)]">
              <div className="about-stat">
                <div className="text-[clamp(28px,3.5vw,38px)] font-cinzel text-[var(--brand)]">
                  <CountUp target={12} suffix="+" />
                </div>
                <span className="text-[11px] text-[var(--ink-muted)] uppercase tracking-[1.5px] mt-1 block font-body">
                  Years
                </span>
              </div>
              <div className="about-stat">
                <div className="text-[clamp(28px,3.5vw,38px)] font-cinzel text-[var(--brand)]">
                  <CountUp target={10} suffix="K+" />
                </div>
                <span className="text-[11px] text-[var(--ink-muted)] uppercase tracking-[1.5px] mt-1 block font-body">
                  Families
                </span>
              </div>
              <div className="about-stat">
                <div className="text-[clamp(28px,3.5vw,38px)] font-cinzel text-[var(--brand)]">
                  <CountUp target={98} suffix="%" />
                </div>
                <span className="text-[11px] text-[var(--ink-muted)] uppercase tracking-[1.5px] mt-1 block font-body">
                  Referrals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-3">
              What Sets Us Apart
            </span>
            <h3 className="text-[clamp(24px,3.5vw,36px)] font-cinzel text-[var(--ink)] leading-[1.15]">
              Our principles, your peace of mind
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((value, idx) => (
              <div
                key={idx}
                className="about-value group p-7 rounded-sm border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="w-12 h-12 rounded-sm bg-[var(--brand-soft)] border border-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] mb-5 group-hover:scale-110 group-hover:border-[var(--brand)]/30 transition-all duration-500">
                  {value.icon}
                </div>
                <h4 className="text-[16px] font-cinzel text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors duration-500">
                  {value.title}
                </h4>
                <p className="text-[13px] text-[var(--ink-muted)] leading-[1.8] font-body">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="about-timeline">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-3">
              Our Journey
            </span>
            <h3 className="text-[clamp(24px,3.5vw,36px)] font-cinzel text-[var(--ink)] leading-[1.15]">
              Milestones that shaped us
            </h3>
          </div>

          {/* Horizontal line */}
          <div className="relative mb-8">
            <div className="h-[1px] w-full bg-[var(--border-light)]">
              <div className="about-timeline-line absolute inset-0 h-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-light)] origin-left" />
            </div>
          </div>

          {/* Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="about-milestone group">
                <div className="w-3 h-3 rounded-full bg-[var(--brand)] mb-4 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(196,164,78,0.5)] transition-all duration-500" />
                <span className="text-[var(--brand)] text-[13px] font-mono block mb-1">{m.year}</span>
                <p className="text-[var(--ink-muted)] text-[13px] leading-[1.7] font-body">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
