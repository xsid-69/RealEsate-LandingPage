'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-init';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;
    setIsDesktop(true);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      setHidden(false);
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power3.out', overwrite: true });
    };

    const onLeave = () => setHidden(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const attachHovers = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], select, .cursor-hover, input, textarea');
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };

    attachHovers();
    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s ease' }}
      aria-hidden="true"
    >
      <div
        className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          width: hovering ? '80px' : clicking ? '30px' : '50px',
          height: hovering ? '80px' : clicking ? '30px' : '50px',
          borderRadius: hovering ? '42% 58% 55% 45% / 52% 48% 52% 48%' : '50%',
        }}
      />
    </div>
  );
}
