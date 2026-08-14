import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Heart, Sparkles } from 'lucide-react';

export const FamilySection: React.FC = () => {
  const families = weddingConfig.families;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-cream-100 via-cream-200 to-cream-100 relative overflow-hidden">
      {/* Background Subtle Mandala */}
      <div className="absolute inset-0 mandala-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-maroon-light font-semibold block mb-2">
            Family Heritage & Blessings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            With the Blessings of Our Families
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Two Columns: Bride Family & Groom Family */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Bride Family Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-10 rounded-3xl glass-card border border-gold/40 text-center relative group hover:border-gold hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/40 text-maroon-dark flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-gold" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-maroon-light font-semibold block mb-2">
              {families.bride.title}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-maroon-dark font-semibold mb-3">
              {weddingConfig.couple.brideFullName}
            </h3>

            <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent my-4" />

            <div className="space-y-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-luxury-brown/60 block">Parents</span>
                <p className="font-serif text-xl sm:text-2xl text-maroon-dark font-medium mt-1">
                  {families.bride.parents}
                </p>
              </div>

              {families.bride.grandparents && (
                <div className="pt-3">
                  <span className="text-xs uppercase tracking-widest text-luxury-brown/60 block">Elders' Blessings</span>
                  <p className="font-sans text-sm text-luxury-brown/80 italic mt-1">
                    {families.bride.grandparents}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Groom Family Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-10 rounded-3xl glass-card border border-gold/40 text-center relative group hover:border-gold hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/40 text-maroon-dark flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-gold fill-gold/20" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-maroon-light font-semibold block mb-2">
              {families.groom.title}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-maroon-dark font-semibold mb-3">
              {weddingConfig.couple.groomFullName}
            </h3>

            <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent my-4" />

            <div className="space-y-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-luxury-brown/60 block">Parents</span>
                <p className="font-serif text-xl sm:text-2xl text-maroon-dark font-medium mt-1">
                  {families.groom.parents}
                </p>
              </div>

              {families.groom.grandparents && (
                <div className="pt-3">
                  <span className="text-xs uppercase tracking-widest text-luxury-brown/60 block">Elders' Blessings</span>
                  <p className="font-sans text-sm text-luxury-brown/80 italic mt-1">
                    {families.groom.grandparents}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
