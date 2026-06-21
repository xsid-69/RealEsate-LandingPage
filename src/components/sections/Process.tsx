'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import TextReveal from '@/components/ui/TextReveal';

const STEPS = [
  { number: '01', title: 'Understand', desc: 'We listen to your lifestyle, budget, and aspirations to build a detailed brief.' },
  { number: '02', title: 'Curate', desc: 'Our team handpicks properties that match — never more than 5 options, always on-point.' },
  { number: '03', title: 'Experience', desc: 'Private viewings at your pace, with honest pros-and-cons for each home.' },
  { number: '04', title: 'Settle', desc: 'End-to-end paperwork, loan coordination, and post-move support until you feel at home.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.process-header > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.process-header', start: 'top 80%' } }
      );

      // Steps stagger
      gsap.fromTo('.process-step',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.process-steps', start: 'top 75%' } }
      );

      // Timeline line grows with scroll
      gsap.fromTo('.process-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.process-steps', start: 'top 70%', end: 'bottom 40%', scrub: 1 },
        }
      );

      // Glow dot follows the line
      gsap.fromTo('.process-glow-dot',
        { top: '0%' },
        {
          top: '100%', ease: 'none',
          scrollTrigger: { trigger: '.process-steps', start: 'top 70%', end: 'bottom 40%', scrub: 1 },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto">
        <div className="process-header mb-20 max-w-xl">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            How We Work
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            A refined process, from first call to keys in hand
          </TextReveal>
        </div>

        <div className="process-steps relative pl-8 lg:pl-16">
          {/* Timeline line */}
          <div className="absolute left-[11px] lg:left-[27px] top-0 bottom-0 w-[2px] bg-[var(--border-light)]">
            <div className="process-line-fill absolute inset-0 w-full bg-gradient-to-b from-[var(--brand)] to-[var(--brand-light)] origin-top" />
            {/* Glow dot */}
            <div className="process-glow-dot absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--brand)] shadow-[0_0_16px_4px_rgba(196,164,78,0.5)]" />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16 lg:gap-20">
            {STEPS.map((step) => (
              <div key={step.number} className="process-step group relative flex items-start gap-6 lg:gap-10">
                {/* Number dot */}
                <div className="relative z-10 -ml-8 lg:-ml-16 flex-shrink-0 w-[22px] h-[22px] lg:w-[26px] lg:h-[26px] rounded-full border-2 border-[var(--border-medium)] bg-[var(--surface-alt)] flex items-center justify-center group-hover:border-[var(--brand)] group-hover:shadow-[0_0_20px_rgba(196,164,78,0.3)] transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-[var(--ink-muted)] group-hover:bg-[var(--brand)] transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="flex-1 group-hover:translate-x-2 transition-transform duration-500 ease-expo-out">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-[var(--brand)]/50 text-[12px] font-mono tracking-wider">{step.number}</span>
                    <h3 className="text-[clamp(22px,3vw,30px)] font-cinzel text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors duration-500">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[var(--ink-muted)] text-[14px] leading-[1.8] font-body max-w-md">
                    {step.desc}
                  </p>
                  {/* Hover accent line */}
                  <div className="mt-4 h-[1.5px] w-0 group-hover:w-20 bg-gradient-to-r from-[var(--brand)] to-transparent transition-all duration-700 ease-expo-out" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
