import React, { useRef, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${
        y * -maxTilt
      }deg) translateZ(10px)`;

      if (glare) {
        const glareEl = el.querySelector('[data-tilt-glare]') as HTMLElement | null;
        if (glareEl) {
          glareEl.style.opacity = '1';
          glareEl.style.background = `radial-gradient(circle at ${(e.clientX - rect.left) / rect.width * 100}% ${
            (e.clientY - rect.top) / rect.height * 100
          }%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
        }
      }
    },
    [maxTilt, glare],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    if (glare) {
      const glareEl = el.querySelector('[data-tilt-glare]') as HTMLElement | null;
      if (glareEl) glareEl.style.opacity = '0';
    }
  }, [glare]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          data-tilt-glare
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-300 mix-blend-overlay"
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  );
};

export default TiltCard;