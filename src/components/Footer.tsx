import React from 'react';
import { ChevronUp, Heart, Share2, MessageCircle } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareText = encodeURIComponent(
    `You're invited! Join us for the wedding of ${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} on ${weddingConfig.displayDate} in Ramanathapuram. ❤️`,
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;
  const shareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <footer className="bg-luxury-dark text-cream-100 py-16 px-4 border-t border-gold/30 relative">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        
        {/* Monogram Logo */}
        <div className="inline-block p-4 rounded-full border border-gold/40 bg-maroon-dark/50">
          <span className="font-serif text-3xl font-bold text-gold tracking-widest">
            {weddingConfig.couple.initials}
          </span>
        </div>

        <div>
          <h3 className="font-serif text-3xl sm:text-4xl text-cream-100 font-semibold">
            {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
          </h3>
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-medium mt-1">
            {weddingConfig.displayDate} • Ramanathapuram, Tamil Nadu
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-cream-300 font-medium">
          <a href="#home" className="hover:text-gold transition-colors">Home</a>
          <a href="#story" className="hover:text-gold transition-colors">Our Story</a>
          <a href="#events" className="hover:text-gold transition-colors">Events</a>
          <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
          <a href="#venue" className="hover:text-gold transition-colors">Venue</a>
          <a href="#rsvp" className="hover:text-gold transition-colors">RSVP</a>
        </div>

        <div className="h-[1px] w-48 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Share Buttons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-dark border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-maroon-dark transition-all duration-300 group"
            aria-label="Share via WhatsApp"
          >
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            WhatsApp Invite
          </a>
          <button
            onClick={async () => {
              try {
                await navigator.share({
                  title: `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} Wedding`,
                  text: shareText,
                  url: window.location.href,
                });
              } catch {
                window.open(shareUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-dark border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase hover:bg-gold hover:text-maroon-dark transition-all duration-300 group"
            aria-label="Share invitation"
          >
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Share Invite
          </button>
        </div>

        {/* Back to Top */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-maroon-dark border border-gold/40 text-gold hover:bg-gold hover:text-maroon-dark transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <span className="text-[10px] uppercase tracking-widest text-cream-300/60">
            Back to Top
          </span>
        </div>

        <p className="text-xs text-cream-300/50 flex items-center justify-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-gold fill-gold inline" /> for {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
        </p>

        <p className="text-xs text-cream-300/70 flex items-center justify-center gap-1.5">
          Crafted by
          <a
            href="https://zynocraftx.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-cream-100 font-semibold tracking-wide transition-colors"
          >
            Zynocraft
          </a>
          · Technology
        </p>

      </div>
    </footer>
  );
};
