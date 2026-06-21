import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { year: '2024', title: 'Best Luxury Brokerage', org: 'Pune Real Estate Awards' },
  { year: '2023', title: 'Top Customer Satisfaction', org: 'India Property Forum' },
  { year: '2023', title: 'Excellence in Service', org: 'Maharashtra RERA Council' },
  { year: '2022', title: 'Fastest Growing Agency', org: 'Economic Times RE' },
];

const partners = [
  'Panchshil Realty',
  'Godrej Properties',
  'Kolte-Patil',
  'Shapoorji Pallonji',
  'Lodha Group',
  'Kalpataru',
];

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.awards-heading',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.awards-heading', start: 'top 80%' } }
      );

      gsap.utils.toArray('.award-item').forEach((item, i) => {
        gsap.fromTo(
          item as Element,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: item as Element, start: 'top 90%' } }
        );
      });

      gsap.fromTo(
        '.partner-marquee',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.partner-marquee', start: 'top 90%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[var(--surface-dark)] py-28 lg:py-36 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="awards-heading text-center mb-16">
          <h2
            className="text-white leading-[1.1]"
            style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 3.5vw, 44px)' }}
          >
            Recognised for excellence
          </h2>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
          {awards.map((award) => (
            <div key={award.title} className="award-item bg-[var(--surface-dark)] p-8 text-center">
              <span className="text-[var(--brand-light)] text-[12px] tracking-[2px] uppercase font-medium block mb-3">{award.year}</span>
              <h3 className="text-white text-[16px] font-medium mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                {award.title}
              </h3>
              <span className="text-white/35 text-[12px]">{award.org}</span>
            </div>
          ))}
        </div>

        {/* Partner logos as marquee */}
        <div className="partner-marquee mt-20 pt-12 border-t border-white/[0.06]">
          <p className="text-center text-white/30 text-[11px] tracking-[2px] uppercase mb-8 font-medium">Trusted by leading developers</p>
          <div className="overflow-hidden">
            <div className="marquee-track flex items-center gap-16 whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...partners, ...partners].map((partner, i) => (
                <span key={i} className="text-white/25 text-[15px] font-medium tracking-wide hover:text-white/50 transition-colors duration-300 cursor-default">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
