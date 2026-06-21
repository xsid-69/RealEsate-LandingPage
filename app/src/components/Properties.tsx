import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
    title: 'Riviera Residences',
    location: 'Koregaon Park',
    price: '₹3.2 Cr',
    type: 'Villa',
    area: '3,200 sq.ft',
    beds: 4,
    baths: 3,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85',
    title: 'Sky Villas Tower',
    location: 'Baner',
    price: '₹5.8 Cr',
    type: 'Penthouse',
    area: '4,500 sq.ft',
    beds: 5,
    baths: 4,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
    title: 'The Amber Estate',
    location: 'Kalyani Nagar',
    price: '₹4.5 Cr',
    type: 'Villa',
    area: '3,800 sq.ft',
    beds: 4,
    baths: 3,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85',
    title: 'Lotus Terraces',
    location: 'Viman Nagar',
    price: '₹2.8 Cr',
    type: 'Apartment',
    area: '2,400 sq.ft',
    beds: 3,
    baths: 2,
  },
];

export default function Properties() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.prop-header > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.prop-header', start: 'top 78%' },
        }
      );

      gsap.utils.toArray('.prop-item').forEach((card, i) => {
        gsap.fromTo(
          card as Element,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card as Element, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="relative bg-[var(--surface-dark)] py-28 lg:py-40 px-6 lg:px-16 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--brand)]/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--brand)]/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="prop-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-16">
          <div>
            <h2
              className="text-white leading-[1.1]"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 400 }}
            >
              Selected properties
            </h2>
            <p className="text-white/35 text-[15px] leading-relaxed mt-4 max-w-md">
              Each listing is personally vetted. We don't do volume — we do conviction.
            </p>
          </div>
          <button className="mt-6 lg:mt-0 group flex items-center gap-3 text-white/50 text-[13px] font-medium border border-white/[0.1] px-6 py-3 bg-transparent cursor-pointer transition-all duration-500 hover:border-[var(--brand-light)]/40 hover:text-white hover:bg-white/[0.03]">
            <span>View all</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-500 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Featured - takes 7 cols */}
          <div className="prop-item lg:col-span-7 group cursor-pointer">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
              <img
                src={properties[0].image}
                alt={properties[0].title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                loading="lazy"
                decoding="async"
                width="800"
                height="500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent transition-opacity duration-500 group-hover:from-[#0A0A0A]/90" />

              {/* Hover reveal border */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.08] transition-all duration-700 m-3" />

              {/* Type badge */}
              <div className="absolute top-5 left-5 bg-white/[0.08] backdrop-blur-md border border-white/[0.06] px-3 py-1.5 transition-all duration-500 group-hover:bg-[var(--brand)]/20 group-hover:border-[var(--brand-light)]/20">
                <span className="text-[10px] text-white/70 uppercase tracking-[1.5px] font-medium">{properties[0].type}</span>
              </div>

              {/* Arrow reveal */}
              <div className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/0 border border-white/0 group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] text-white/40">{properties[0].area}</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                  <span className="text-[11px] text-white/40">{properties[0].beds} Bed</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                  <span className="text-[11px] text-white/40">{properties[0].baths} Bath</span>
                </div>
                <h3 className="text-white text-[22px] lg:text-[28px]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {properties[0].title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white/50 text-[13px]">{properties[0].location}, Pune</span>
                  <span className="text-[var(--brand-light)] text-[18px] font-medium">{properties[0].price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right stack - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
            {properties.slice(1, 3).map((property) => (
              <div key={property.id} className="prop-item group cursor-pointer">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />

                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.08] transition-all duration-700 m-2" />

                  <div className="absolute top-4 left-4 bg-white/[0.08] backdrop-blur-md border border-white/[0.06] px-2.5 py-1 transition-all duration-500 group-hover:bg-[var(--brand)]/20 group-hover:border-[var(--brand-light)]/20">
                    <span className="text-[9px] text-white/70 uppercase tracking-[1.5px] font-medium">{property.type}</span>
                  </div>

                  <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 bg-white/[0.1] border border-white/[0.15]">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-700">
                    <h3 className="text-white text-[17px]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {property.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white/45 text-[12px]">{property.location}</span>
                      <span className="text-[var(--brand-light)] text-[15px] font-medium">{property.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom banner */}
          <div className="prop-item lg:col-span-12 group cursor-pointer">
            <div className="relative aspect-[21/9] lg:aspect-[3/1] overflow-hidden">
              <img
                src={properties[3].image}
                alt={properties[3].title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="800"
                height="267"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent" />

              <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.06] transition-all duration-700 m-3" />

              <div className="absolute top-5 left-5 lg:top-6 lg:left-8 bg-white/[0.08] backdrop-blur-md border border-white/[0.06] px-3 py-1.5 transition-all duration-500 group-hover:bg-[var(--brand)]/20 group-hover:border-[var(--brand-light)]/20">
                <span className="text-[10px] text-white/70 uppercase tracking-[1.5px] font-medium">{properties[3].type}</span>
              </div>

              <div className="absolute top-5 right-5 lg:top-6 lg:right-8 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 bg-white/[0.1] border border-white/[0.15]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-end p-6 lg:p-10 max-w-md translate-y-1 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] text-white/40">{properties[3].area}</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                  <span className="text-[11px] text-white/40">{properties[3].beds} Bed</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                  <span className="text-[11px] text-white/40">{properties[3].baths} Bath</span>
                </div>
                <h3 className="text-white text-[22px] lg:text-[26px]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {properties[3].title}
                </h3>
                <div className="flex items-center gap-6 mt-3">
                  <span className="text-white/50 text-[13px]">{properties[3].location}, Pune</span>
                  <span className="text-[var(--brand-light)] text-[17px] font-medium">{properties[3].price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
