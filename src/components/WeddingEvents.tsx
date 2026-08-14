import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Heart, Crown, GlassWater, Calendar, Clock, MapPin, ExternalLink, Shirt } from 'lucide-react';
import { weddingConfig, WeddingEvent } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

const iconMap = {
  Sparkles: Sparkles,
  Sun: Sun,
  Heart: Heart,
  Crown: Crown,
  GlassWater: GlassWater,
  Music: Sparkles,
};

export const WeddingEvents: React.FC = () => {
  return (
    <section id="events" className="py-20 sm:py-28 bg-cream-100 relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mandala-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-maroon-light font-semibold block mb-2">
            Schedule of Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            The Wedding Celebration
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {weddingConfig.events.map((event: WeddingEvent, index: number) => {
            const IconComponent = iconMap[event.iconName] || Sparkles;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50, rotateX: -12, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1200 }}
                className={`relative group rounded-3xl p-8 sm:p-10 transition-all duration-500 shadow-xl border ${
                  event.highlight
                    ? 'bg-maroon-dark text-cream-100 border-gold shadow-gold/10'
                    : 'bg-cream-50 text-luxury-brown border-gold/30 hover:border-gold'
                }`}
              >
                {/* Highlight Badge if Ceremony */}
                {event.highlight && (
                  <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-gold-gradient text-maroon-dark text-xs font-bold uppercase tracking-widest shadow-md">
                    MAIN CEREMONY
                  </div>
                )}

                {/* Event Header with Icon */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span
                      className={`text-xs uppercase tracking-widest font-semibold block mb-1 ${
                        event.highlight ? 'text-gold' : 'text-maroon-light'
                      }`}
                    >
                      {event.subtitle}
                    </span>
                    <h3
                      className={`font-serif text-2xl sm:text-4xl font-semibold ${
                        event.highlight ? 'text-cream-100' : 'text-maroon-dark'
                      }`}
                    >
                      {event.name}
                    </h3>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:rotate-12 ${
                      event.highlight
                        ? 'bg-gold/20 border-gold text-gold'
                        : 'bg-gold/10 border-gold/40 text-maroon-dark'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-3.5 my-6">
                  <div className="flex items-center gap-3 text-sm sm:text-base">
                    <Calendar className={`w-4 h-4 shrink-0 ${event.highlight ? 'text-gold' : 'text-maroon-light'}`} />
                    <span className="font-semibold">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm sm:text-base">
                    <Clock className={`w-4 h-4 shrink-0 ${event.highlight ? 'text-gold' : 'text-maroon-light'}`} />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm sm:text-base">
                    <MapPin className={`w-4 h-4 shrink-0 mt-1 ${event.highlight ? 'text-gold' : 'text-maroon-light'}`} />
                    <div>
                      <span className="font-semibold block">{event.venue}</span>
                      <span className={`text-xs ${event.highlight ? 'text-cream-300' : 'text-luxury-brown/70'}`}>
                        {event.address}
                      </span>
                    </div>
                  </div>

                  {event.dressCode && (
                    <div className="flex items-center gap-3 text-xs sm:text-sm pt-2">
                      <Shirt className={`w-4 h-4 shrink-0 ${event.highlight ? 'text-gold' : 'text-maroon-light'}`} />
                      <span className="italic">Attire: {event.dressCode}</span>
                    </div>
                  )}
                </div>

                <p
                  className={`text-sm sm:text-base leading-relaxed mb-8 ${
                    event.highlight ? 'text-cream-200/90' : 'text-luxury-brown/80'
                  }`}
                >
                  {event.description}
                </p>

                {/* View Location Button */}
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-300 ${
                    event.highlight
                      ? 'bg-gold-gradient text-maroon-dark hover:brightness-110 shadow-md'
                      : 'bg-maroon-dark text-cream-100 hover:bg-maroon-light'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  VIEW LOCATION ON MAP
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
