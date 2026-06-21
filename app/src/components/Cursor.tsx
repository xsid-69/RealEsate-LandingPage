import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.15, ease: 'power2.out' });
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.6, ease: 'power3.out' });
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

    const hoverTargets = document.querySelectorAll('a, button, [role="button"], select, .cursor-hover');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s ease' }}
        aria-hidden="true"
      >
        <div
          className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            width: hovering ? '8px' : clicking ? '4px' : '6px',
            height: hovering ? '8px' : clicking ? '4px' : '6px',
          }}
        />
      </div>
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none mix-blend-difference"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.3s ease' }}
        aria-hidden="true"
      >
        <div
          className="rounded-full border border-white/60 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: hovering ? '50px' : clicking ? '28px' : '36px',
            height: hovering ? '50px' : clicking ? '28px' : '36px',
            borderColor: hovering ? 'rgba(196,164,78,0.6)' : 'rgba(255,255,255,0.4)',
          }}
        />
      </div>
    </>
  );
}
