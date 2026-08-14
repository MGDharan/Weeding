import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Sparkles } from 'lucide-react';

export const OurStory: React.FC = () => {
  const timelineRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="story" className="py-20 sm:py-28 bg-maroon-dark text-cream-100 relative overflow-hidden">
      {/* Background Subtle Gradient & Mandala Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-maroon-light/30 via-maroon-dark to-maroon-deep opacity-90" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-gold/90 font-medium block mb-2">
            Timeline of Love
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-semibold tracking-wide">
            Our Journey
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Vertical Timeline */}
        <div
          ref={timelineRef}
          className="relative border-l-2 border-gold/30 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-gold/20 md:before:via-gold md:before:to-gold/20 ml-4 md:ml-0"
        >
          {/* Scroll Progress Line */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-gold-accent via-gold to-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10"
          />
          
          {weddingConfig.story.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`mb-16 last:mb-0 relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Timeline Node Marker */}
                <div className="absolute -left-[25px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-maroon-deep border-2 border-gold text-gold flex items-center justify-center shadow-lg shadow-gold/20 z-20">
                  <Sparkles className="w-4 h-4 text-gold animate-pulse-subtle" />
                </div>

                {/* Card Container */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-8">
                  <div className="p-6 sm:p-8 rounded-2xl glass-dark-card gold-border group hover:border-gold transition-all duration-500 shadow-xl">
                    
                    {/* Date Badge */}
                    <div className="inline-block px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs tracking-widest font-semibold uppercase mb-3">
                      {item.date}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-gold gold-text-gradient font-semibold mb-3">
                      {item.title}
                    </h3>

                    <p className="text-cream-200/90 font-sans text-sm sm:text-base leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Milestone Image if available */}
                    {item.photo && (
                      <div className="overflow-hidden rounded-xl aspect-[16/9] border border-gold/20 mt-4">
                        <img
                          src={item.photo}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty Half Space for Desktop Balance */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
