'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import TiltCard from '@/components/ui/TiltCard';
import TextReveal from '@/components/ui/TextReveal';

const TESTIMONIALS = [
  {
    name: 'Priya & Rohit Sharma',
    detail: 'Bought in Koregaon Park',
    quote: 'Nestara understood what we wanted before we could articulate it. The home they found us is exactly where our kids will grow up.',
    stars: 5,
    initials: 'PS',
    featured: true,
  },
  {
    name: 'Ankit Deshmukh',
    detail: 'Invested in Baner',
    quote: 'Their market knowledge is unmatched. Helped me spot an undervalued project that appreciated 40% in two years.',
    stars: 5,
    initials: 'AD',
    featured: false,
  },
  {
    name: 'Meera Kulkarni',
    detail: 'Relocated from Mumbai',
    quote: 'Moving cities is stressful. Nestara handled everything — area tours, school proximity analysis, even helped set up utilities.',
    stars: 5,
    initials: 'MK',
    featured: false,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header with blur reveal
      gsap.fromTo('.test-header > *',
        { y: 50, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.test-header', start: 'top 82%' } }
      );

      // Cards cascade in with 3D rotation
      document.querySelectorAll('.test-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotateX: 12, scale: 0.9 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.3, ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        );
      });

      // Quote marks bounce in with spring
      gsap.fromTo('.quote-mark',
        { scale: 0, opacity: 0, rotate: -20 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.5)', stagger: 0.2,
          scrollTrigger: { trigger: '.test-grid', start: 'top 72%' } }
      );

      // Parallax offset on middle card
      const middleCard = document.querySelectorAll('.test-card')[1];
      if (middleCard) {
        gsap.to(middleCard, {
          yPercent: -8, ease: 'none',
          scrollTrigger: { trigger: '.test-grid', start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface-alt)]">
      <div className="max-w-7xl mx-auto">
        <div className="test-header text-center mb-16">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            Testimonials
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            What our families say
          </TextReveal>
        </div>

        <div className="test-grid grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {TESTIMONIALS.map((t, idx) => (
            <TiltCard
              key={idx}
              className={`test-card ${idx === 1 ? 'lg:mt-8' : ''}`}
              intensity={5}
              scale={1.01}
            >
              <div className={`p-8 rounded-sm border transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] ${
                t.featured
                  ? 'bg-[var(--surface-dark)] border-white/[0.06] text-white'
                  : 'bg-[var(--surface-elevated)] border-[var(--border-subtle)] hover:border-[var(--brand)]/20'
              }`}>
                {/* Stars */}
                <div className="flex gap-1 mb-5" role="img" aria-label={`Rating: ${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--brand)" className="opacity-80" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="quote-mark text-[48px] leading-none font-cinzel text-[var(--brand)]/20 mb-2">&ldquo;</div>

                {/* Quote */}
                <p className={`text-[14px] leading-[1.9] font-body mb-8 ${t.featured ? 'text-white/70' : 'text-[var(--ink-muted)]'}`}>
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-medium font-body ${
                    t.featured ? 'bg-white/10 text-white/70' : 'bg-[var(--brand-soft)] text-[var(--brand)]'
                  }`}>
                    {t.initials}
                  </div>
                  <div>
                    <span className={`text-[13px] font-medium font-body block ${t.featured ? 'text-white/90' : 'text-[var(--ink)]'}`}>
                      {t.name}
                    </span>
                    <span className={`text-[11px] font-body ${t.featured ? 'text-white/40' : 'text-[var(--ink-muted)]'}`}>
                      {t.detail}
                    </span>
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
