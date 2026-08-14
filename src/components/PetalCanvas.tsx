import React, { useEffect, useRef, useState } from 'react';
import { Flower } from 'lucide-react';

export const PetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Petal object structure
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;
    }

    const petalColors = [
      'rgba(212, 175, 55, 0.7)', // Gold
      'rgba(197, 160, 89, 0.65)', // Champagne
      'rgba(230, 90, 110, 0.6)',  // Soft Rose
      'rgba(240, 140, 40, 0.65)', // Marigold
      'rgba(255, 240, 200, 0.7)', // Jasmine White
    ];

    const maxPetals = Math.min(Math.floor(width / 35), 35);
    const petals: Petal[] = Array.from({ length: maxPetals }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.sin(Math.random() * Math.PI) * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.4 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, 0, p.size);
        ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size / 2, -p.size, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-20"
        />
      )}
      {/* Floating Toggle Controls */}
      <button
        onClick={() => setIsActive(!isActive)}
        title={isActive ? 'Disable floating flower petals' : 'Enable floating flower petals'}
        className="fixed bottom-24 left-4 sm:bottom-6 sm:left-6 z-40 p-3 rounded-full bg-maroon-dark/80 backdrop-blur-md border border-gold/40 text-gold hover:text-cream-100 hover:border-gold shadow-lg transition-all duration-300 group focus:outline-none"
        aria-label="Toggle Petals Animation"
      >
        <Flower className={`w-5 h-5 ${isActive ? 'rotate-12 text-gold' : 'opacity-50'} transition-transform group-hover:scale-110`} />
      </button>
    </>
  );
};
