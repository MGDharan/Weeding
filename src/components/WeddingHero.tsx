import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const WeddingHero: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)']);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Ken Burns Animated Background Image with Parallax */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/photos/photo-1.jpg"
          alt={`${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`}
          className="w-full h-full object-cover object-top animate-ken-burns filter brightness-75 scale-105"
        />
        {/* Soft Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-dark/60 to-black/50" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </motion.div>

      {/* Floating Ornaments */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, filter: blur }}
        className="absolute inset-0 pointer-events-none z-[1]"
      >
        <div className="absolute top-[18%] left-[8%] w-40 h-40 rounded-full border border-gold/20 animate-float-slow" />
        <div className="absolute top-[25%] right-[10%] w-24 h-24 rounded-full border border-gold/20 animate-float-medium" />
        <div className="absolute bottom-[22%] left-[15%] w-16 h-16 rounded-full border border-gold/15 animate-float-fast" />
      </motion.div>

      {/* Hero Foreground Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center text-cream-100 flex flex-col items-center justify-center h-full pt-16"
      >
        
        {/* Family Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase tracking-[0.25em] text-xs sm:text-sm text-gold/90 font-medium mb-3"
        >
          {weddingConfig.couple.invitationSubtitle}
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="my-2"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream-100 tracking-tight leading-none drop-shadow-2xl">
            <span className="block font-bold hover:text-gold transition-colors duration-500">
              {weddingConfig.couple.brideName}
            </span>
            <span className="font-script text-gold gold-text-gradient text-4xl sm:text-6xl md:text-7xl my-1 sm:my-2 block font-normal">
              &
            </span>
            <span className="block font-bold hover:text-gold transition-colors duration-500">
              {weddingConfig.couple.groomName}
            </span>
          </h1>
        </motion.div>

        {/* Ornamental Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full max-w-md my-4"
        >
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Tagline & Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col items-center space-y-3"
        >
          <p className="font-serif text-lg sm:text-2xl text-cream-200 tracking-wider italic font-light">
            "{weddingConfig.couple.tagline}"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gold/90 font-sans tracking-widest uppercase mt-2">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold/30 bg-maroon-dark/50 backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-gold" />
              <span>{weddingConfig.displayDate}</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold/30 bg-maroon-dark/50 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{weddingConfig.venue.name}, Ramanathapuram</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          onClick={() => {
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-cream-300 group-hover:text-gold transition-colors mb-2">
            Scroll to discover our story
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="p-2 rounded-full border border-gold/30 bg-maroon-dark/40 text-gold group-hover:border-gold group-hover:bg-gold/20"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};
