import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'experience' },
  { label: 'Properties', id: 'properties' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = navItems.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-4 md:py-5'
      }`}
      role="banner"
    >
      <nav
        className={`mx-4 lg:mx-8 flex items-center justify-between px-5 lg:px-8 py-3 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--surface)]/[0.92] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-light)]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 bg-transparent border-none cursor-pointer group" aria-label="Go to top">
          <span
            className={`text-[20px] font-normal tracking-tight transition-all duration-500 ${scrolled ? 'text-[var(--ink)]' : 'text-white'}`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Nestara
          </span>
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:scale-150 ${scrolled ? 'bg-[var(--brand)]' : 'bg-[var(--brand-light)]'}`} aria-hidden="true" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1" role="menubar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative text-[12px] font-medium tracking-[0.5px] bg-transparent border-none cursor-pointer px-4 py-2 transition-all duration-300 ${
                scrolled
                  ? activeSection === item.id ? 'text-[var(--brand)]' : 'text-[var(--ink)]/50 hover:text-[var(--ink)]'
                  : activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              role="menuitem"
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
              <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--brand)] transition-all duration-500 rounded-full ${
                activeSection === item.id ? 'w-4 opacity-100' : 'w-0 opacity-0'
              }`} aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* Right - Theme toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-400 cursor-pointer ${
              scrolled
                ? 'border-[var(--border-default)] bg-transparent hover:bg-[var(--brand-soft)] hover:border-[var(--brand)]/30'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--ink)' : 'white'} strokeWidth="1.5" className="opacity-60">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--ink)' : 'white'} strokeWidth="1.5" className="opacity-60">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          <a
            href="tel:+912067890123"
            className={`text-[12px] font-medium transition-all duration-400 ${
              scrolled ? 'text-[var(--ink)]/40 hover:text-[var(--brand)]' : 'text-white/40 hover:text-white'
            }`}
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            +91 20 6789 0123
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className={`px-5 py-2.5 text-[11px] font-semibold tracking-[1.5px] uppercase border cursor-pointer transition-all duration-400 ${
              scrolled
                ? 'border-[var(--border-default)] text-[var(--ink)] bg-transparent hover:bg-[var(--brand)] hover:text-white hover:border-[var(--brand)]'
                : 'border-white/15 text-white bg-transparent hover:bg-white hover:text-[var(--ink)] hover:border-white'
            }`}
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            ENQUIRE
          </button>
        </div>

        {/* Mobile - theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-400 cursor-pointer ${
              scrolled
                ? 'border-[var(--border-default)] bg-transparent'
                : 'border-white/10 bg-white/5'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--ink)' : 'white'} strokeWidth="1.5" className="opacity-60">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--ink)' : 'white'} strokeWidth="1.5" className="opacity-60">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 bg-transparent border-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-500 origin-center ${scrolled ? 'bg-[var(--ink)]' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-3.5 h-[1.5px] rounded-full transition-all duration-500 ${scrolled ? 'bg-[var(--ink)]' : 'bg-white'} ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-5 h-[1.5px] rounded-full transition-all duration-500 origin-center ${scrolled ? 'bg-[var(--ink)]' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-4 right-4 mt-2 bg-[var(--surface)]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[var(--border-light)] overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        role="menu"
        aria-hidden={!mobileOpen}
      >
        <div className="p-5 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full text-left px-4 py-3.5 text-[15px] font-normal text-[var(--text-secondary)] bg-transparent border-none cursor-pointer transition-all duration-300 hover:bg-[var(--brand-soft)] hover:text-[var(--brand)] hover:pl-6"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-3.5 bg-[var(--brand)] text-white text-[12px] font-semibold tracking-[1.5px] uppercase border-none cursor-pointer transition-all duration-400 hover:shadow-[0_4px_16px_rgba(139,105,20,0.2)]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
