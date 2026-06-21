'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';

const TEAM = [
  { name: 'Arjun Mehta', role: 'Founder & Lead Advisor', bio: 'Pune native with 15 years in luxury real estate. Built Nestara from a single referral.', image: '/images/property-1.jpg', initials: 'AM' },
  { name: 'Sneha Patil', role: 'Client Relations', bio: 'Former hospitality professional. Ensures every client feels like the only client.', image: '/images/property-2.jpg', initials: 'SP' },
  { name: 'Vikram Joshi', role: 'Market Analyst', bio: 'Data-driven strategist. Tracks micro-markets so our clients invest at the right time.', image: '/images/property-3.jpg', initials: 'VJ' },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Header with blur reveal
      gsap.fromTo('.team-header > *',
        { y: 50, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.team-header', start: 'top 82%' } }
      );

      // Team members stagger in with scale and rotation
      document.querySelectorAll('.team-member').forEach((member, i) => {
        gsap.fromTo(member,
          { y: 100, opacity: 0, scale: 0.9, rotateY: i % 2 === 0 ? -10 : 10 },
          { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: member, start: 'top 88%' } }
        );
      });

      // Parallax within team images
      document.querySelectorAll('.team-member').forEach((member) => {
        const img = member.querySelector('.team-img');
        if (img) {
          gsap.fromTo(img, { yPercent: -8 }, {
            yPercent: 8, ease: 'none',
            scrollTrigger: { trigger: member, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          });
        }
      });

      // Role badges elastic entrance
      gsap.fromTo('.team-role-badge',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'elastic.out(1, 0.6)',
          scrollTrigger: { trigger: '.team-grid', start: 'top 60%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto">
        <div className="team-header text-center mb-16">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body block mb-4">
            The Team
          </span>
          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            People who make it happen
          </TextReveal>
        </div>

        <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member, idx) => (
            <div key={idx} className="team-member group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-5">
                <div className="team-img absolute inset-0 scale-[1.15]">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1000ms] ease-expo-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--ink)]/10 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Frame */}
                <div className="absolute inset-3 border border-white/0 group-hover:border-white/15 transition-all duration-700 rounded-sm pointer-events-none" />

                {/* Role badge - slides from left */}
                <div className="absolute bottom-5 left-5 translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-600 ease-expo-out">
                  <span className="team-role-badge text-[10px] uppercase tracking-[2px] font-medium font-body bg-[var(--brand)]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-[18px] font-cinzel text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors duration-500">
                {member.name}
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] font-body mt-1 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
