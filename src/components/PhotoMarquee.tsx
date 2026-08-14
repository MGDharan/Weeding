import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';

export const PhotoMarquee: React.FC = () => {
  const photos = weddingConfig.gallery;

  const strip = [...photos, ...photos, ...photos];

  return (
    <div className="relative py-10 bg-maroon-deep overflow-hidden border-y border-gold/20">
      <div className="flex w-max animate-[marquee_40s_linear_infinite]">
        {strip.map((photo, i) => (
          <motion.div
            key={`${photo.id}-${i}`}
            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
            className="shrink-0 mx-3 w-48 sm:w-64 aspect-[3/2] rounded-2xl overflow-hidden border border-gold/30 shadow-lg"
          >
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-maroon-deep to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-maroon-deep to-transparent pointer-events-none" />
    </div>
  );
};

export default PhotoMarquee;