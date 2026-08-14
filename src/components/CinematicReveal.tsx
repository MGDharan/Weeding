import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const CinematicReveal: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative h-[130vh] bg-luxury-dark overflow-hidden"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Zooming Cinematic Background */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/photos/photo-4.jpg"
            alt="Cinematic couple reveal"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-black/40 to-maroon-deep/90" />
        </motion.div>

        {/* Movie-style Text Content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center text-cream-100"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-xs sm:text-sm uppercase text-gold/90 font-medium block"
          >
            A Cinematic Love Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream-100 drop-shadow-2xl mt-4"
          >
            {weddingConfig.couple.quote}
          </motion.h2>

          <div className="w-48 mx-auto my-4">
            <OrnamentalDivider variant="gold" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-xl sm:text-3xl text-gold gold-text-gradient italic font-light max-w-2xl mx-auto"
          >
            "Two souls with but a single thought, two hearts that beat as one."
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-script text-3xl sm:text-4xl text-cream-200 block pt-2"
          >
            {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}
          </motion.span>

          {/* Wedding Hashtag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-maroon-dark/70 backdrop-blur-md border border-gold/40 text-gold text-sm sm:text-base font-semibold tracking-wider">
              #MuraliWedsPraveena
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};