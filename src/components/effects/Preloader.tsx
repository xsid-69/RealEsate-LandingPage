'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap-init';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);

  const handleComplete = useCallback(() => {
    gsap.to(preloaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.4,
      onComplete,
    });
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const tick = () => {
      current += (100 - current) * 0.06;
      if (current > 99.5) {
        setProgress(100);
        handleComplete();
        return;
      }
      setProgress(Math.floor(current));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [handleComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#040404]"
      aria-hidden="true"
    >
      <div className="text-center">
        <h2
          className="text-white text-[clamp(36px,8vw,64px)] font-normal leading-none tracking-tight font-cinzel"
        >
          Nestara
        </h2>
        <p className="text-white/20 text-[11px] tracking-[5px] uppercase mt-3 font-medium font-body">
          Pune
        </p>
      </div>
      <div className="mt-12 w-40 h-[1px] bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-light)] transition-all duration-150 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-white/15 text-[11px] mt-5 font-mono tracking-widest">{progress}%</span>
    </div>
  );
}
