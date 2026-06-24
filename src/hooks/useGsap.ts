'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-init';

export function useGsap(callback: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(ctx!);
    }, ref.current);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (ref.current?.contains(t.trigger as Element)) t.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
