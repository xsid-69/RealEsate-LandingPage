import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-left > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-left', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.contact-form',
        { y: 80, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry. Our team will contact you shortly.');
    setFormData({ name: '', phone: '', email: '', property: '', message: '' });
  };

  const inputClass = (fieldName: string) =>
    `w-full bg-white/[0.03] border text-white placeholder-white/20 py-4 px-5 text-[14px] focus:outline-none transition-all duration-500 ${
      focusedField === fieldName
        ? 'border-[var(--brand-light)]/50 bg-white/[0.06] shadow-[0_0_20px_rgba(139,105,20,0.08)]'
        : 'border-white/[0.07] hover:border-white/[0.12]'
    }`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[var(--surface-dark)] py-28 lg:py-40 px-6 lg:px-16 overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[var(--brand)]/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[var(--brand)]/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        {/* Left */}
        <div className="contact-left flex flex-col gap-5 lg:sticky lg:top-32">
          <h2
            className="text-white leading-[1.1]"
            style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 400 }}
          >
            Let's start with a conversation
          </h2>
          <p className="text-white/40 text-[15px] leading-[1.9] max-w-md">
            No pressure. No hard sell. Tell us what you're looking for and we'll tell you honestly whether we can help.
          </p>

          <div className="flex flex-col gap-5 mt-6">
            {[
              { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.66.27 1.3.5 1.92a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.62.23 1.26.4 1.92.5A2 2 0 0 1 22 16.92z', text: '+91 20 6789 0123' },
              { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', text: 'hello@nestara.in' },
              { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', text: 'Lane 7, Koregaon Park, Pune 411001' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-4 group/contact cursor-default">
                <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover/contact:border-[var(--brand-light)]/30 group-hover/contact:bg-[var(--brand)]/10">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-50 group-hover/contact:opacity-80 transition-opacity duration-500">
                    <path d={item.icon}/>
                  </svg>
                </div>
                <span className="text-white/60 text-[14px] group-hover/contact:text-white/90 transition-colors duration-500">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-white/20 text-[12px] mt-8">Mon — Sat, 10 AM — 7 PM</p>
        </div>

        {/* Right - Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: 'name', placeholder: 'Your name', type: 'text' },
              { name: 'phone', placeholder: 'Phone number', type: 'tel' },
              { name: 'email', placeholder: 'Email', type: 'email' },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                className={inputClass(field.name)}
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                required
              />
            ))}

            <select
              name="property"
              value={formData.property}
              onChange={handleChange}
              onFocus={() => setFocusedField('property')}
              onBlur={() => setFocusedField(null)}
              className={`${inputClass('property')} appearance-none cursor-pointer ${!formData.property ? 'text-white/30' : 'text-white'}`}
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              required
            >
              <option value="">What are you looking for?</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="apartment">Premium Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="plot">Plot</option>
            </select>

            <textarea
              name="message"
              placeholder="Anything else we should know (budget, timeline, must-haves...)"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={4}
              className={`${inputClass('message')} resize-none`}
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            />

            <button
              type="submit"
              className="group/submit relative w-full bg-[var(--brand)] text-white py-4.5 text-[13px] font-medium tracking-[1.5px] uppercase flex items-center justify-center gap-3 cursor-pointer border-none mt-2 overflow-hidden transition-all duration-500 hover:shadow-[0_4px_30px_rgba(139,105,20,0.3)]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              <span className="relative z-10">Send enquiry</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10 transition-transform duration-500 group-hover/submit:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-light)] to-[var(--brand)] opacity-0 group-hover/submit:opacity-100 transition-opacity duration-500" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
