'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  splitBy?: 'words' | 'chars';
  trigger?: boolean;
  scrub?: boolean;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  splitBy = 'words',
  trigger = true,
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = containerRef.current;
    const text = children;
    el.innerHTML = '';

    const units = splitBy === 'chars' ? text.split('') : text.split(' ');

    units.forEach((unit, i) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.textContent = unit;

      wrapper.appendChild(inner);
      el.appendChild(wrapper);

      if (splitBy === 'words' && i < units.length - 1) {
        const space = document.createTextNode(' ');
        el.appendChild(space);
      }
    });

    const inners = el.querySelectorAll('span > span');

    const animConfig: gsap.TweenVars = {
      y: '0%',
      duration: 1.2,
      ease: 'expo.out',
      stagger,
      delay,
    };

    if (trigger) {
      gsap.to(inners, {
        ...animConfig,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: scrub ? undefined : 'play none none none',
          scrub: scrub ? 1 : false,
        },
      });
    } else {
      gsap.to(inners, animConfig);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, stagger, splitBy, trigger, scrub]);

  return <Tag ref={containerRef as any} className={className}>{children}</Tag>;
}
