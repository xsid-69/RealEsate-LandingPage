import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoTour() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.video-content', start: 'top 75%' } }
      );

      gsap.fromTo(
        '.video-frame',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.video-frame', start: 'top 80%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[var(--surface-alt)] py-28 lg:py-36 px-6 lg:px-16 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[var(--brand-soft)] rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Video with interactive play */}
          <div
            className="video-frame relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: '1000px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75"
              alt="Luxury villa interior walkthrough preview"
              className="w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              loading="lazy"
              decoding="async"
              width="800"
              height="640"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-700" />

            {/* Animated border frame */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-white/15 transition-all duration-700" />

            {/* Play button with pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulse rings */}
                <div className={`absolute inset-0 w-20 h-20 rounded-full border border-white/20 transition-all duration-1000 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
                <div className={`absolute inset-0 w-20 h-20 rounded-full border border-white/10 transition-all duration-1000 delay-200 ${isHovered ? 'scale-[1.8] opacity-0' : 'scale-100 opacity-60'}`} />

                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-700 group-hover:bg-[var(--brand)]/80 group-hover:border-[var(--brand-light)]/50 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(139,105,20,0.4)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1 transition-transform duration-500 group-hover:scale-110">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/[0.06]">
              <span className="text-white/80 text-[11px] font-medium">3:24</span>
            </div>
          </div>

          {/* Right - Text */}
          <div className="video-content flex flex-col gap-5">
            <h2
              className="text-[var(--ink)] leading-[1.1]"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              Experience before you visit
            </h2>

            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] max-w-[48ch]">
              Walk through our featured properties from anywhere. Our 360-degree virtual tours let you feel the space, the light, and the proportions before scheduling an in-person visit.
            </p>

            <div className="flex flex-col gap-5 mt-4">
              {[
                { icon: 'M23 7l-7 5 7 5V7z M1 5h15v14H1z', title: '4K Virtual Tours', desc: 'Every listed property, fully walkable' },
                { icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2', title: 'Live Video Calls', desc: 'On-site walkthroughs with your advisor' },
                { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', title: 'Neighbourhood Drives', desc: 'See the area at different times of day' },
              ].map((feature) => (
                <div key={feature.title} className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-11 h-11 flex items-center justify-center border border-[var(--border-light)] transition-all duration-500 group-hover/item:border-[var(--brand)] group-hover/item:bg-[var(--brand-soft)] group-hover/item:shadow-[0_2px_12px_rgba(139,105,20,0.1)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" className="transition-transform duration-500 group-hover/item:scale-110">
                      <path d={feature.icon}/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[var(--ink)] text-[14px] font-medium block transition-colors duration-500 group-hover/item:text-[var(--brand)]">{feature.title}</span>
                    <span className="text-[var(--text-tertiary)] text-[12px]">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="group/btn relative inline-flex items-center gap-3 bg-[var(--brand)] text-white px-8 py-4 text-[12px] font-medium tracking-[1.5px] uppercase cursor-pointer border-none overflow-hidden transition-all duration-500 hover:shadow-[0_4px_24px_rgba(139,105,20,0.3)]">
                <span className="relative z-10">Book a Virtual Tour</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-light)] to-[var(--brand)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
