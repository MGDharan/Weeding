import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, Heart, CalendarPlus } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { downloadICS } from '../utils/calendar';
import { useIsDesktop } from '../hooks/useIsDesktop';

export const MainCeremonySpotlight: React.FC = () => {
  const ceremony = weddingConfig.mainCeremony;
  const isDesktop = useIsDesktop();

  const handleAddToCalendar = () => {
    downloadICS({
      title: `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} Wedding`,
      description: `${ceremony.subtitle} — Join us to celebrate our wedding ceremony.`,
      location: `${ceremony.venue}, ${ceremony.address}`,
      start: weddingConfig.weddingDate,
      end: new Date(new Date(weddingConfig.weddingDate).getTime() + 4 * 60 * 60 * 1000).toISOString(),
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-maroon-deep text-cream-100 relative overflow-hidden">
      {/* Background Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-maroon-dark via-maroon-deep to-black opacity-95" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Ceremony Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative p-3 bg-maroon-dark gold-border-glow rounded-3xl shadow-2xl overflow-hidden group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <img
                  src={ceremony.photo}
                  alt={ceremony.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="font-script text-3xl sm:text-4xl text-gold gold-text-gradient">
                    Sacred Thirumangalyam
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Ceremony Highlight Details */}
          <motion.div
            initial={{ opacity: 0, x: isDesktop ? 40 : 0, y: isDesktop ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/50 text-gold text-xs tracking-widest uppercase font-bold">
              <Heart className="w-3.5 h-3.5 fill-gold" />
              THE GRAND WEDDING RITUAL
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight">
              {ceremony.title}
            </h2>

            <div className="font-script text-4xl sm:text-5xl text-gold gold-text-gradient">
              {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
            </div>

            <OrnamentalDivider variant="gold" className="justify-center lg:justify-start" />

            <div className="space-y-4 text-cream-200 text-base sm:text-lg">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Calendar className="w-5 h-5 text-gold shrink-0" />
                <span className="font-semibold">{ceremony.date}</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span>{ceremony.time}</span>
              </div>

              <div className="flex items-start justify-center lg:justify-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block text-cream-100">{ceremony.venue}</span>
                  <span className="text-sm text-cream-300">{ceremony.address}</span>
                </div>
              </div>
            </div>

            <p className="text-cream-300 text-sm sm:text-base leading-relaxed pt-2">
              We request the honor of your presence and blessings as we tie the sacred Thirumangalyam and unite our lives in holy matrimony.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold-gradient text-maroon-dark font-bold tracking-widest text-sm shadow-xl hover:brightness-110 transition-all transform hover:-translate-y-0.5"
              >
                <MapPin className="w-5 h-5" />
                VIEW ON GOOGLE MAPS
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={handleAddToCalendar}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-gold/50 text-gold font-bold tracking-widest text-sm shadow-xl hover:bg-gold/20 hover:text-cream-100 transition-all transform hover:-translate-y-0.5"
              >
                <CalendarPlus className="w-5 h-5" />
                ADD TO CALENDAR
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
