'use client';

import { useRef, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const magneticRef = useMagnetic(strength);
  const Component = as;

  return (
    <Component
      ref={magneticRef as React.RefObject<any>}
      className={`inline-block ${className}`}
      onClick={onClick}
      {...(as === 'a' ? { href, target, rel } : { type })}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}
