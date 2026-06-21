'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from '@/lib/gsap-init';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
}

export default function TiltCard({ children, className = '', intensity = 10, scale = 1.02 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * intensity,
      rotateX: -y * intensity,
      scale,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
