import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing.');
    setEmail('');
  };

  const scrollTo = (id: string) => {
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
    <footer className="bg-[var(--surface-dark)] text-white pt-20 pb-8 px-6 lg:px-16 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <span className="text-[22px] font-normal block mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              Nestara
            </span>
            <p className="text-white/30 text-[13px] leading-[1.8] max-w-[240px]">
              Premium real estate advisory in Pune. Finding homes that feel like they were always yours.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-[12px] font-medium text-white/50 block mb-5 tracking-wide">Navigate</span>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About', id: 'experience' },
                { label: 'Properties', id: 'properties' },
                { label: 'Process', id: 'process' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-white/35 text-[13px] bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-white"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[12px] font-medium text-white/50 block mb-5 tracking-wide">Reach us</span>
            <ul className="flex flex-col gap-3 text-[13px] text-white/35">
              <li>+91 20 6789 0123</li>
              <li>hello@nestara.in</li>
              <li>Lane 7, Koregaon Park,<br />Pune 411001</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <span className="text-[12px] font-medium text-white/50 block mb-5 tracking-wide">Stay informed</span>
            <p className="text-white/30 text-[13px] mb-4 leading-[1.7]">
              New listings and market insights, no spam.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] border-r-0 text-white placeholder-white/20 py-3 px-4 text-[13px] rounded-l-sm focus:outline-none focus:border-[var(--brand)]/40 transition-colors duration-300"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                required
              />
              <button
                type="submit"
                className="bg-[var(--brand)] text-white px-4 rounded-r-sm cursor-pointer border-none transition-colors duration-300 hover:bg-[var(--brand-light)]"
                aria-label="Subscribe"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[11px]">
            &copy; 2024 Nestara Realty Pune. RERA Registered.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'RERA'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/20 text-[11px] transition-colors duration-300 hover:text-white/50"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Developer credit */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] text-center">
          <p className="text-white/40 text-[12px] tracking-wide font-medium">
            Designed & Developed by{' '}
            <a
              href="https://wa.me/919356851770"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-light)] hover:text-white transition-colors duration-300 underline underline-offset-2"
            >
              Siddhant
            </a>
            {' '}—{' '}
            <a
              href="tel:+919356851770"
              className="text-[var(--brand-light)] hover:text-white transition-colors duration-300"
            >
              +91 9356851770
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
