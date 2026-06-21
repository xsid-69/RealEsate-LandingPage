'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-init';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;
    setMounted(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.55, ease: 'power3.out' });
    };

    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const observer = new MutationObserver(() => {
      const targets = document.querySelectorAll('a, button, [role="button"], select, .cursor-hover, input, textarea');
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const targets = document.querySelectorAll('a, button, [role="button"], select, .cursor-hover, input, textarea');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s ease' }}
        aria-hidden="true"
      >
        <div
          className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            width: hovering ? '10px' : clicking ? '4px' : '6px',
            height: hovering ? '10px' : clicking ? '4px' : '6px',
          }}
        />
      </div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s ease' }}
        aria-hidden="true"
      >
        <div
          className="rounded-full border -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-expo-out"
          style={{
            width: hovering ? '56px' : clicking ? '26px' : '38px',
            height: hovering ? '56px' : clicking ? '26px' : '38px',
            borderColor: hovering ? 'rgba(196,164,78,0.7)' : 'rgba(255,255,255,0.35)',
          }}
        />
      </div>
    </>
  );
}
