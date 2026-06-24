'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ target, suffix = '', prefix = '', duration = 2, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setHasAnimated(true);
        gsap.to(obj, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [target, suffix, prefix, duration, hasAnimated]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
