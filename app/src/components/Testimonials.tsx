import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'They didn\'t show us fifty options. They showed us three — and the second one made my wife cry. We moved in eight weeks later.',
    name: 'Vikram & Anjali Deshmukh',
    detail: 'Bought in Koregaon Park, 2023',
    rating: 5,
  },
  {
    quote: 'I was relocating from Bangalore with two weeks to decide. Nestara made it feel unhurried. That takes real skill.',
    name: 'Sneha Iyer',
    detail: 'Bought in Baner, 2024',
    rating: 5,
  },
  {
    quote: 'The negotiation alone saved us more than their fee. But it was the after-sale support that made us send our friends.',
    name: 'Rajesh Kulkarni',
    detail: 'Bought in Kalyani Nagar, 2023',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-heading > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonial-heading', start: 'top 80%' },
        }
      );

      gsap.utils.toArray('.testimonial-item').forEach((item, i) => {
        gsap.fromTo(
          item as Element,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: item as Element, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--surface)] py-28 lg:py-40 px-6 lg:px-16 overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--brand-soft)] rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="testimonial-heading flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20">
          <h2
            className="text-[var(--ink)] leading-[1.1]"
            style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 400 }}
          >
            In their words
          </h2>
          <p className="text-[var(--text-secondary)] text-[14px] mt-4 lg:mt-0">
            From families who found home through us
          </p>
        </div>

        {/* Testimonials - staggered with hover lift */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5" style={{ perspective: '1200px' }}>
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              className={`testimonial-item ${i === 1 ? 'lg:mt-12' : ''}`}
            >
              <div className={`relative p-7 lg:p-8 h-full flex flex-col justify-between border transition-all duration-700 cursor-default group
                ${i === 0
                  ? 'bg-[var(--surface-dark)] border-white/[0.06] hover:border-[var(--brand)]/30 hover:shadow-[0_8px_40px_rgba(139,105,20,0.1)]'
                  : 'bg-[var(--surface-elevated)] border-[var(--border-subtle)] hover:border-[var(--brand)]/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]'
                }
                hover:-translate-y-2
              `}>
                {/* Quote mark */}
                <div className={`absolute top-5 right-6 text-[48px] leading-none font-serif transition-opacity duration-500 ${i === 0 ? 'text-white/[0.05]' : 'text-[var(--brand)]/10'} group-hover:opacity-100 opacity-60`}>
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill={i === 0 ? 'rgba(196,164,78,0.8)' : 'var(--brand)'} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                <blockquote
                  className={`text-[16px] lg:text-[17px] leading-[1.8] font-light ${i === 0 ? 'text-white/80' : 'text-[var(--ink)]'}`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  "{item.quote}"
                </blockquote>

                <div className={`mt-8 pt-5 border-t ${i === 0 ? 'border-white/[0.06]' : 'border-[var(--border-subtle)]'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-medium ${i === 0 ? 'bg-[var(--brand)]/20 text-[var(--brand-light)]' : 'bg-[var(--brand-soft)] text-[var(--brand)]'}`}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <span className={`block text-[13px] font-medium ${i === 0 ? 'text-white' : 'text-[var(--ink)]'}`}>
                        {item.name}
                      </span>
                      <span className={`block text-[11px] mt-0.5 ${i === 0 ? 'text-white/35' : 'text-[var(--text-tertiary)]'}`}>
                        {item.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
