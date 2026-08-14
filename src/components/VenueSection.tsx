import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Phone, Mail } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const VenueSection: React.FC = () => {
  const venue = weddingConfig.venue;

  return (
    <section id="venue" className="py-20 sm:py-28 bg-cream-100 relative overflow-hidden">
      {/* Background Mandala */}
      <div className="absolute inset-0 mandala-pattern opacity-25 pointer-events-none" />

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
            Location & Directions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            The Wedding Destination
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Venue Information & Google Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address & Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-maroon-dark text-cream-100 border border-gold flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold text-gold flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>

              <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
                Official Venue
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-cream-100 font-bold mb-4">
                {venue.name}
              </h3>

              <div className="h-[1px] w-20 bg-gradient-to-r from-gold to-transparent mb-6" />

              <p className="text-cream-200 text-base sm:text-lg leading-relaxed mb-2 font-medium">
                {venue.address}
              </p>
              <p className="text-gold text-sm tracking-wider uppercase mb-8">
                {venue.cityState}
              </p>

              <div className="space-y-3 pt-4 border-t border-gold/30 text-sm text-cream-300">
                {weddingConfig.rsvp.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>Conciege Desk: {weddingConfig.rsvp.contactPhone}</span>
                  </div>
                )}
                {weddingConfig.rsvp.contactEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    <span>Inquiries: {weddingConfig.rsvp.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-8 pt-6 border-t border-gold/30">
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-maroon-dark font-bold text-sm tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4 fill-maroon-dark" />
                GET DIRECTIONS
              </a>

              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-maroon-deep border border-gold/40 text-gold font-bold text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-gold/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                OPEN IN GOOGLE MAPS
              </a>
            </div>

          </motion.div>

          {/* Embedded Map Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border border-gold/40 min-h-[380px] sm:min-h-[450px]"
          >
            <iframe
              title="Wedding Venue Google Maps Location"
              src={venue.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '100%' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-90 hover:saturate-100 transition-all duration-500"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
