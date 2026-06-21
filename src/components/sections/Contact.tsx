'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', property: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.contact-left', start: 'top 75%' } }
      );

      gsap.fromTo('.contact-form',
        { y: 80, opacity: 0, scale: 0.97 },
        { scale: 1, y: 0, opacity: 1, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 80%' } }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will reach out within 24 hours.');
    setFormData({ name: '', phone: '', email: '', property: '', message: '' });
  };

  const inputClasses = (field: string) =>
    `w-full bg-[var(--surface-alt)] border text-[var(--ink)] placeholder-[var(--text-tertiary)] py-4 px-5 text-[14px] font-body rounded-sm outline-none transition-all duration-500 ${
      focused === field
        ? 'border-[var(--brand-light)]/50 bg-[var(--surface)] shadow-[0_0_25px_rgba(196,164,78,0.08)]'
        : 'border-[var(--border-default)] hover:border-[var(--border-medium)]'
    }`;

  const CONTACT_INFO = [
    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>), label: '+91 20 6789 0123', href: 'tel:+912067890123' },
    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>), label: 'hello@nestara.in', href: 'mailto:hello@nestara.in' },
    { icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>), label: 'Lane 7, Koregaon Park, Pune', href: '#' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-28 lg:py-40 px-6 lg:px-16 bg-[var(--surface)] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -right-32 w-64 h-64 rounded-full bg-[var(--brand)]/[0.03] blur-3xl" />
      <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-[var(--brand)]/[0.02] blur-3xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        {/* Left */}
        <div className="contact-left flex flex-col gap-6">
          <span className="text-[11px] uppercase tracking-[4px] text-[var(--brand)] font-medium font-body">
            Get in Touch
          </span>

          <TextReveal as="h2" className="text-[clamp(32px,5vw,52px)] font-cinzel text-[var(--ink)] leading-[1.1]">
            Let&apos;s find your next home
          </TextReveal>

          <p className="text-[var(--ink-muted)] text-[15px] leading-[1.9] font-body max-w-md">
            Whether you&apos;re buying your first home or expanding your portfolio,
            we&apos;d love to hear from you.
          </p>

          {/* Contact info */}
          <div className="flex flex-col gap-4 mt-6">
            {CONTACT_INFO.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group/contact flex items-center gap-4 p-3 -ml-3 rounded-sm hover:bg-[var(--surface-alt)] transition-all duration-400"
              >
                <div className="w-11 h-11 rounded-sm bg-[var(--surface-alt)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--ink-muted)] group-hover/contact:border-[var(--brand)]/30 group-hover/contact:text-[var(--brand)] group-hover/contact:scale-105 transition-all duration-400">
                  {item.icon}
                </div>
                <span className="text-[var(--ink-muted)] text-[14px] font-body group-hover/contact:text-[var(--ink)] transition-colors duration-400">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="contact-form flex flex-col gap-4" aria-label="Contact form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="sr-only">Your name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className={inputClasses('name')}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="sr-only">Phone number</label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                className={inputClasses('phone')}
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">Email address</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              className={inputClasses('email')}
              required
            />
          </div>
          <div>
            <label htmlFor="contact-property" className="sr-only">Property type</label>
            <select
              id="contact-property"
              value={formData.property}
              onChange={(e) => setFormData({ ...formData, property: e.target.value })}
              onFocus={() => setFocused('property')}
              onBlur={() => setFocused(null)}
              className={inputClasses('property')}
              aria-label="Select property type"
            >
              <option value="">Property type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <textarea
              id="contact-message"
              placeholder="Tell us what you're looking for..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              className={`${inputClasses('message')} resize-none h-32`}
              rows={4}
            />
          </div>
          <div className="mt-2">
            <MagneticButton strength={0.15}>
              <button type="submit" className="btn-primary rounded-sm w-full sm:w-auto justify-center group/btn relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform duration-400">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-[var(--brand-light)] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-expo-out" />
              </button>
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
}
