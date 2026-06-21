import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(15% 0 15% 0)', scale: 1.1 },
        {
          clipPath: 'inset(0% 0 0% 0)',
          scale: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: imageRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.exp-text > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-text', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.exp-stat',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.exp-stats', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[var(--surface)] py-28 lg:py-40 px-6 lg:px-16 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-[400px] h-[400px] bg-[var(--brand-soft)] rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - left side with reveal effect */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden group cursor-pointer"
            style={{ willChange: 'clip-path, transform' }}
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=75"
              alt="Sunlit villa courtyard with mature trees and clean architectural lines"
              className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/20 to-transparent" />

            {/* Hover overlay frame */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-700" />

            {/* Corner accents on hover */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/0 group-hover:border-[var(--brand-light)]/50 transition-all duration-700 delay-100" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/0 group-hover:border-[var(--brand-light)]/50 transition-all duration-700 delay-100" />
          </div>

          {/* Text - right side */}
          <div className="exp-text flex flex-col gap-6 lg:gap-8 lg:py-8">
            <h2
              className="text-[var(--ink)] leading-[1.1]"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 400 }}
            >
              We find homes that <em className="not-italic text-[var(--brand)]">feel</em> like they were always yours
            </h2>

            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] max-w-[50ch]">
              Nestara was built on a simple conviction: the right home isn't found through listings — it's discovered through understanding. We spend time learning how you live before we show you where you could.
            </p>

            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] max-w-[50ch]">
              Since 2012, we've guided over two thousand families into homes across Pune's most desirable neighbourhoods. Not through volume, but through precision.
            </p>

            <div className="exp-stats grid grid-cols-3 gap-6 mt-4 pt-8 border-t border-[var(--border-subtle)]">
              {[
                { value: '12', label: 'Years in Pune' },
                { value: '2,400', label: 'Families settled' },
                { value: '98%', label: 'Referral rate' },
              ].map((stat) => (
                <div key={stat.label} className="exp-stat group/stat cursor-default">
                  <span
                    className="block text-[28px] lg:text-[34px] font-light text-[var(--ink)] transition-colors duration-500 group-hover/stat:text-[var(--brand)]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[12px] text-[var(--text-secondary)] mt-1 block transition-colors duration-500 group-hover/stat:text-[var(--ink)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group/btn inline-flex items-center gap-3 border border-[var(--border-medium)] px-7 py-4 text-[12px] font-medium tracking-[1.5px] uppercase text-[var(--ink)] bg-transparent cursor-pointer transition-all duration-500 hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white hover:shadow-[0_4px_20px_rgba(139,105,20,0.2)]"
              >
                Start a conversation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-500 group-hover/btn:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
