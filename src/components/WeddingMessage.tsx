import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Heart } from 'lucide-react';

export const WeddingMessage: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden flex items-center justify-center bg-maroon-deep">
      {/* Background Photograph */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/photos/photo-6.jpg"
          alt={`${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`}
          className="w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-dark/80 to-maroon-deep" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-cream-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="p-8 sm:p-14 rounded-3xl glass-dark-card gold-border-glow shadow-2xl max-w-3xl mx-auto space-y-6"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
            <Heart className="w-6 h-6 fill-gold" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block">
            With Heartfelt Gratitude
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-100 leading-tight">
            Your Presence Is The Greatest Gift
          </h2>

          <OrnamentalDivider variant="gold" />

          <p className="font-serif text-lg sm:text-2xl text-cream-200 italic leading-relaxed">
            "As we embark on this sacred journey of togetherness, your blessings, laughter, and presence mean more to us than words can ever express. Please join us to celebrate our love and write the first chapter of our new beginning."
          </p>

          <div className="pt-4">
            <span className="font-script text-4xl sm:text-5xl text-gold gold-text-gradient block">
              With love & blessings,
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-cream-100 font-semibold tracking-wider block mt-2">
              {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
            </span>
            <span className="text-xs uppercase tracking-widest text-cream-300 block mt-1">
              & Both Families
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
