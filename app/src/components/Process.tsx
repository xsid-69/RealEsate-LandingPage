import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Understand',
    description: 'We begin with a conversation — not a catalog. Your lifestyle, your priorities, the neighbourhood energy you want to wake up to.',
  },
  {
    num: '02',
    title: 'Curate',
    description: 'Our team hand-selects 3-5 properties that match. No endless scrolling. No compromises disguised as options.',
  },
  {
    num: '03',
    title: 'Experience',
    description: 'Private walkthroughs at your pace. We handle scheduling, logistics, and every question the builder won\'t answer honestly.',
  },
  {
    num: '04',
    title: 'Settle',
    description: 'From negotiation to paperwork to possession — we stay until the last signature is dry and the first light is switched on.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-heading > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.process-heading', start: 'top 80%' },
        }
      );

      gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.fromTo(
          step as Element,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: step as Element, start: 'top 88%' },
          }
        );
      });

      gsap.fromTo(
        '.process-line-inner',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.inOut',
          transformOrigin: 'top',
          scrollTrigger: { trigger: '.process-line-inner', start: 'top 75%', end: 'bottom 50%', scrub: 1 },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-[var(--surface-warm)] py-28 lg:py-40 px-6 lg:px-16 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--brand-soft)] rounded-full blur-[150px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="process-heading max-w-2xl mb-16 lg:mb-24">
          <h2
            className="text-[var(--ink)] leading-[1.1]"
            style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 400 }}
          >
            How we work
          </h2>
          <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] mt-5 max-w-lg">
            Not an algorithm. Not a marketplace. A deliberate, human process that respects the weight of what you're deciding.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connecting line */}
          <div className="absolute left-[19px] lg:left-[28px] top-0 bottom-0 w-[1px] bg-[var(--border-default)] hidden md:block overflow-hidden">
            <div className="process-line-inner w-full h-full bg-gradient-to-b from-[var(--brand)] via-[var(--brand-light)] to-transparent" />
          </div>

          <div className="flex flex-col gap-14 lg:gap-20">
            {steps.map((step) => (
              <div key={step.title} className="process-step relative flex gap-8 lg:gap-14 items-start group cursor-default">
                {/* Number dot */}
                <div className="relative z-10 flex-shrink-0 hidden md:flex flex-col items-center">
                  <div className="w-[38px] h-[38px] lg:w-[56px] lg:h-[56px] rounded-full bg-[var(--surface)] border border-[var(--border-default)] flex items-center justify-center transition-all duration-500 group-hover:border-[var(--brand)] group-hover:shadow-[0_0_20px_rgba(139,105,20,0.15)]">
                    <span className="text-[11px] lg:text-[12px] font-semibold text-[var(--text-tertiary)] tracking-wider transition-colors duration-500 group-hover:text-[var(--brand)]">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-xl pt-1 lg:pt-3 transition-all duration-500 group-hover:translate-x-2">
                  <span className="text-[var(--brand)] text-[11px] font-semibold tracking-[2px] uppercase md:hidden mb-2 block">{step.num}</span>
                  <h3
                    className="text-[var(--ink)] text-[24px] lg:text-[30px] mb-4 transition-colors duration-500 group-hover:text-[var(--brand)]"
                    style={{ fontFamily: "'Cinzel', serif", fontWeight: 400 }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-[14px] leading-[1.9]">
                    {step.description}
                  </p>
                  <div className="w-0 group-hover:w-16 h-[1px] bg-gradient-to-r from-[var(--brand)] to-transparent mt-5 transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
