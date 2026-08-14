import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, Heart, Calendar, Image as ImageIcon, MapPin, Send, ChevronUp, Sparkles, Landmark } from 'lucide-react';
import { scrollToTarget } from './SmoothScroll';

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const dockItems: DockItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: <Home className="w-5 h-5" /> },
  { id: 'story', label: 'Our Story', href: '#story', icon: <Heart className="w-5 h-5" /> },
  { id: 'events', label: 'Events', href: '#events', icon: <Calendar className="w-5 h-5" /> },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: <ImageIcon className="w-5 h-5" /> },
  { id: 'ai-wish', label: 'AI Wish', href: '#ai-wish', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'heritage', label: 'Heritage', href: '#heritage', icon: <Landmark className="w-5 h-5" /> },
  { id: 'venue', label: 'Venue', href: '#venue', icon: <MapPin className="w-5 h-5" /> },
  { id: 'rsvp', label: 'RSVP', href: '#rsvp', icon: <Send className="w-5 h-5" /> },
];

export const Dock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = dockItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const dock = dockRef.current;
    if (!dock) return;
    const rect = dock.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const getMagnitude = useCallback(
    (index: number) => {
      if (mouseX === null || !dockRef.current) return 1;
      const dock = dockRef.current;
      const items = dock.querySelectorAll('[data-dock-item]');
      const item = items[index] as HTMLElement | undefined;
      if (!item) return 1;

      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(mouseX - itemCenter);
      const influence = 96;
      const strength = Math.max(0, 1 - distance / influence);
      return 1 + strength * 0.55;
    },
    [mouseX],
  );

  const handleDockLeave = () => {
    setMouseX(null);
    setHovered(null);
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 select-none max-w-[calc(100vw-2rem)]">
      {/* Tooltip Label */}
      <div className="flex justify-center mb-2 sm:mb-3">
        <div
          className={`px-4 py-1.5 rounded-full bg-maroon-dark/95 backdrop-blur-md border border-gold/50 text-gold text-[10px] sm:text-xs font-semibold tracking-widest uppercase shadow-xl transition-all duration-300 ${
            hovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0 pointer-events-none'
          }`}
        >
          {hovered ? dockItems.find((item) => item.id === hovered)?.label : ''}
        </div>
      </div>

      {/* Dock Bar */}
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleDockLeave}
        className="flex items-end gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-3xl bg-maroon-dark/85 backdrop-blur-xl border border-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        {dockItems.map((item, index) => {
          const magnitude = getMagnitude(index);
          const isActive = activeSection === item.id;
          const isHovered = hovered === item.id;

          return (
            <button
              key={item.id}
              data-dock-item
              onClick={() => {
                scrollToTarget(item.href);
                setHovered(null);
              }}
              onMouseEnter={() => setHovered(item.id)}
              aria-label={item.label}
              className="relative focus:outline-none"
              style={{
                transform: `translateY(${(1 - magnitude) * -14}px) scale(${magnitude})`,
                transition: 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isHovered ? 10 : 1,
              }}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-gradient text-maroon-dark border-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                    : 'bg-maroon-deep/80 text-gold/90 border-gold/30 hover:border-gold'
                }`}
              >
                {item.icon}
              </span>

              {/* Active Indicator Dot */}
              <span
                className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-gold shadow-[0_0_8px_rgba(212,175,55,1)]' : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}

        {/* Separator */}
        <div className="hidden sm:block w-px h-8 bg-gold/25 mx-1" />

        {/* Back to Top */}
        <button
          data-dock-item
          onClick={() => scrollToTarget(0)}
          onMouseEnter={() => setHovered('top')}
          aria-label="Back to top"
          className="hidden sm:flex relative focus:outline-none"
          style={{
            transform: `translateY(${(1 - getMagnitude(dockItems.length)) * -14}px) scale(${getMagnitude(dockItems.length)})`,
            transition: 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <span className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-maroon-deep/80 text-cream-200 border border-gold/30 hover:border-gold transition-all duration-300">
            <ChevronUp className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
};