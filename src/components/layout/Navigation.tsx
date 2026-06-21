'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap-init';
import { useTheme } from '@/context/ThemeProvider';
import MagneticButton from '@/components/ui/MagneticButton';

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'experience' },
  { label: 'Properties', id: 'properties' },
  { label: 'Areas', id: 'neighbourhoods' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const items = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
      gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'expo.out', delay: 0.1 });
    }
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
        scrolled
          ? 'bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border-light)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <MagneticButton strength={0.2} onClick={() => scrollTo('hero')} className="cursor-hover">
          <span className="text-[22px] font-cinzel text-[var(--ink)] tracking-tight">
            Nestara
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand)] ml-0.5 mb-2 transition-transform duration-500 group-hover:scale-150" />
          </span>
        </MagneticButton>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`relative text-[12px] uppercase tracking-[2px] font-medium transition-colors duration-400 font-body bg-transparent border-none cursor-pointer ${
                  activeSection === id ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-[var(--brand)] transition-all duration-500 ease-expo-out ${
                    activeSection === id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--border-light)] hover:bg-[var(--border-medium)] transition-all duration-400"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          {/* Phone */}
          <a
            href="tel:+912067890123"
            className="text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] tracking-wide transition-colors duration-400 font-body"
          >
            +91 20 6789 0123
          </a>

          {/* CTA */}
          <MagneticButton strength={0.15}>
            <button
              onClick={() => scrollTo('contact')}
              className={`text-[11px] uppercase tracking-[2px] font-medium px-5 py-2.5 rounded-sm transition-all duration-500 font-body ${
                scrolled
                  ? 'bg-[var(--brand)] text-white hover:shadow-[0_8px_30px_rgba(139,105,20,0.3)]'
                  : 'border border-[var(--ink)]/20 text-[var(--ink)] hover:bg-[var(--brand)] hover:text-white hover:border-transparent'
              }`}
            >
              Enquire
            </button>
          </MagneticButton>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--border-light)]"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-[var(--ink)] transition-all duration-400 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[var(--ink)] transition-all duration-400 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[var(--ink)] transition-all duration-400 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 right-0 bg-[var(--surface)]/95 backdrop-blur-2xl border-b border-[var(--border-light)] py-8 px-6"
        >
          <ul className="flex flex-col gap-5">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id} className="mobile-nav-item">
                <button
                  onClick={() => scrollTo(id)}
                  className={`text-[13px] uppercase tracking-[2.5px] font-medium font-body bg-transparent border-none cursor-pointer transition-colors duration-300 ${
                    activeSection === id ? 'text-[var(--brand)]' : 'text-[var(--ink-muted)]'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo('contact')}
            className="mt-6 w-full btn-primary justify-center mobile-nav-item"
          >
            Get in Touch
          </button>
        </div>
      )}
    </nav>
  );
}
