import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Rohit Sharma',
    role: 'Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: '15 years in Pune real estate. Former Panchshil director.',
  },
  {
    name: 'Priya Deshmukh',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Closed 300+ premium transactions. Knows every lane in KP.',
  },
  {
    name: 'Aditya Kulkarni',
    role: 'Senior Advisor',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Specializes in off-market villas. Clients call him first.',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-heading > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.team-heading', start: 'top 78%' },
        }
      );

      gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.fromTo(
          member as Element,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: member as Element, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative bg-[var(--surface-warm)] py-28 lg:py-40 px-6 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="team-heading mb-14 lg:mb-20">
          <h2
            className="text-[var(--ink)] leading-[1.1]"
            style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 400 }}
          >
            The people behind the door
          </h2>
          <p className="text-[var(--text-secondary)] text-[15px] mt-4 max-w-md">
            Not agents — advisors who stake their reputation on every recommendation.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-member group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="533"
                />
                {/* Overlay that fades on hover */}
                <div className="absolute inset-0 bg-[var(--ink)]/10 group-hover:bg-transparent transition-all duration-700" />

                {/* Bottom gradient for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--ink)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Hover frame */}
                <div className="absolute inset-3 border border-white/0 group-hover:border-white/15 transition-all duration-700" />

                {/* Role badge appears on hover */}
                <div className="absolute bottom-4 left-4 bg-white/[0.1] backdrop-blur-md border border-white/[0.1] px-3 py-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-white text-[11px] font-medium tracking-wide">{member.role}</span>
                </div>
              </div>

              <h3
                className="text-[var(--ink)] text-[18px] transition-colors duration-500 group-hover:text-[var(--brand)]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {member.name}
              </h3>
              <span className="text-[var(--brand)] text-[11px] font-semibold tracking-[1.5px] uppercase block mt-1.5">
                {member.role}
              </span>
              <p className="text-[var(--text-secondary)] text-[13px] leading-[1.7] mt-3 group-hover:text-[var(--ink)] transition-colors duration-500">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
