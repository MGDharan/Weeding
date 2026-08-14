import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar, Image as ImageIcon, MapPin, Send, Home, Sparkles, Landmark } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { scrollToTarget } from './SmoothScroll';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Our Story', href: '#story', icon: Heart },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Gallery', href: '#gallery', icon: ImageIcon },
    { name: 'AI Wish', href: '#ai-wish', icon: Sparkles },
    { name: 'Heritage', href: '#heritage', icon: Landmark },
    { name: 'Venue', href: '#venue', icon: MapPin },
    { name: 'RSVP', href: '#rsvp', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      {/* Desktop Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-maroon-dark/90 backdrop-blur-md border-b border-gold/30 shadow-xl'
            : 'py-5 bg-gradient-to-b from-black/70 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Initials Brand Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <span className="font-serif text-2xl sm:text-3xl text-gold font-bold tracking-widest group-hover:scale-105 transition-transform">
              {weddingConfig.couple.brideName[0]} & {weddingConfig.couple.groomName[0]}
            </span>
            <span className="h-4 w-[1px] bg-gold/40 hidden sm:inline-block" />
            <span className="text-xs tracking-widest text-cream-200 uppercase font-light hidden sm:inline-block">
              Wedding Invitation
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gold/20 text-gold border border-gold/50 shadow-sm'
                      : 'text-cream-200 hover:text-gold hover:bg-gold/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#rsvp"
              onClick={(e) => scrollToSection(e, '#rsvp')}
              className="ml-3 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider bg-gold-gradient text-maroon-dark hover:brightness-110 shadow-md hover:shadow-gold/20 transition-all duration-300"
            >
              RSVP NOW
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gold hover:text-cream-100 hover:bg-gold/10 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-maroon-dark/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center px-6 pt-20 pb-10 transition-all duration-300">
          <div className="text-center mb-8">
            <h3 className="font-serif text-3xl text-gold gold-text-gradient mb-1">
              {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
            </h3>
            <p className="text-xs uppercase tracking-widest text-cream-300">
              {weddingConfig.displayDate}
            </p>
          </div>

          <div className="flex flex-col space-y-4 w-full max-w-xs text-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl border border-gold/20 text-cream-100 text-lg font-serif tracking-wider hover:bg-gold/20 hover:border-gold hover:text-gold transition-all"
                >
                  <Icon className="w-5 h-5 text-gold" />
                  {link.name}
                </a>
              );
            })}
          </div>

          <a
            href="#rsvp"
            onClick={(e) => scrollToSection(e, '#rsvp')}
            className="mt-8 w-full max-w-xs text-center py-3.5 rounded-full font-bold tracking-widest bg-gold-gradient text-maroon-dark text-lg shadow-lg"
          >
            CONFIRM ATTENDANCE
          </a>
        </div>
      )}
    </>
  );
};
