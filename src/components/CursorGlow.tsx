import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHoveringInteractive(
        !!target.closest('a, button, [role="button"], input, select, textarea, [data-tilt-glare], img'),
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 z-[90] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`rounded-full border border-gold/60 bg-transparent transition-all duration-300 ${
            hoveringInteractive ? 'w-9 h-9 border-gold' : 'w-7 h-7 border-gold/60'
          }`}
          style={{ boxShadow: '0 0 12px rgba(212,175,55,0.35)' }}
        />
      </motion.div>

      {/* Gold Dot */}
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 z-[91] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
      </motion.div>
    </>
  );
};