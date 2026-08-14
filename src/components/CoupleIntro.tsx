import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Heart, Stethoscope, Pill } from 'lucide-react';
import { Parallax } from './Parallax';
import { TiltCard } from './TiltCard';

export const CoupleIntro: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-200 relative overflow-hidden">
      {/* Background Subtle Mandala */}
      <div className="absolute inset-0 mandala-pattern opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-maroon-light font-semibold block mb-2">
            Welcome To Our Celebration
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            Two Hearts, One Beautiful Journey
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Grid Layout: Photo & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Framed Couple Portrait */}
          <Parallax speed={0.15} className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <TiltCard maxTilt={8}>
                <div className="relative group p-4 bg-cream-100 gold-border-glow rounded-3xl shadow-2xl max-w-md w-full">
                  {/* Decorative Corner Ornaments */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-lg" />
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-lg" />
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />

                  <div className="overflow-hidden rounded-2xl aspect-[4/5] relative">
                    <img
                      src="/photos/photo-2.jpg"
                      alt={`${weddingConfig.couple.brideName} and ${weddingConfig.couple.groomName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="font-script text-3xl text-gold gold-text-gradient drop-shadow-md">
                        {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </Parallax>

          {/* Emotional Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 text-center lg:text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-maroon-dark text-xs tracking-widest uppercase font-semibold">
              <Heart className="w-3.5 h-3.5 text-maroon-light fill-maroon-light" />
              Our Prelude
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-maroon-dark font-medium leading-relaxed italic">
              "{weddingConfig.couple.bioParagraph}"
            </h3>

            <p className="text-luxury-brown/80 font-sans text-base sm:text-lg leading-relaxed">
              With the blessings of our parents, grandparents, and loved ones, we are taking our next step toward creating a lifetime of memories together. We are overjoyed to share this sacred milestone with the people who mean the world to us.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 border-t border-gold/30">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-maroon-light block">The Groom</span>
                <span className="font-serif text-2xl text-maroon-dark font-semibold">{weddingConfig.couple.groomFullName}</span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-maroon-dark/80 bg-gold/15 border border-gold/30 px-2.5 py-0.5 rounded-full">
                  <Stethoscope className="w-3 h-3 text-maroon-light" />
                  {weddingConfig.couple.groomTitle}
                </span>
              </div>
              <span className="font-script text-3xl text-gold hidden sm:inline">&</span>
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-maroon-light block">The Bride</span>
                <span className="font-serif text-2xl text-maroon-dark font-semibold">{weddingConfig.couple.brideFullName}</span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-maroon-dark/80 bg-gold/15 border border-gold/30 px-2.5 py-0.5 rounded-full">
                  <Pill className="w-3 h-3 text-maroon-light" />
                  {weddingConfig.couple.brideTitle}
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
