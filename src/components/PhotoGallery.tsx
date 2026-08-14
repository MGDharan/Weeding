import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart, Camera, Sparkles } from 'lucide-react';
import { weddingConfig, GalleryPhoto } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Cursor } from './core/cursor';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'couple', label: 'Couple Portraits' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'candid', label: 'Candid Moments' },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? weddingConfig.gallery
      : weddingConfig.gallery.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos]);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-maroon-dark text-xs tracking-widest uppercase font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-maroon-light" />
            Capturing Memories
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            Wedding Gallery
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-maroon-dark text-gold border border-gold shadow-md'
                  : 'bg-cream-50 text-luxury-brown/80 border border-gold/30 hover:border-gold hover:text-maroon-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Uniform Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredPhotos.map((photo: GalleryPhoto, idx: number) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-maroon-dark border border-gold/30 hover:border-gold transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10"
              >
                {/* Maroon Fill Background (shows on small images / loading) */}
                <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon-light to-maroon-deep" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)]" />

                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                  }}
                  className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />
                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Hover Title & Icon */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between text-cream-100">
                  <div>
                    <span className="font-serif text-lg font-semibold text-gold block">
                      {photo.title}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-cream-300">
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold text-gold">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Custom Cursor on Image Hover */}
                <Cursor
                  attachToParent
                  variants={{
                    initial: { scale: 0.4, opacity: 0, rotate: -15 },
                    animate: { scale: 1, opacity: 1, rotate: 0 },
                    exit: { scale: 0.4, opacity: 0, rotate: -15 },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 22,
                  }}
                  className="left-10 top-5"
                >
                  <div className="flex items-center gap-2 rounded-full border border-gold/60 bg-maroon-dark/90 backdrop-blur-md px-3 py-1.5 shadow-[0_0_20px_rgba(212,175,55,0.45)]">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold whitespace-nowrap">
                      View
                    </span>
                  </div>
                </Cursor>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-maroon-dark/80 text-gold border border-gold/40 hover:bg-gold hover:text-maroon-dark transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-maroon-dark/80 text-gold border border-gold/40 hover:bg-gold hover:text-maroon-dark transition-all"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-maroon-dark/80 text-gold border border-gold/40 hover:bg-gold hover:text-maroon-dark transition-all"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <motion.img
                key={filteredPhotos[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl border border-gold/40 shadow-2xl cursor-zoom-in"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
              />

              <div className="mt-4 text-center text-cream-100">
                <h3 className="font-serif text-2xl text-gold font-semibold">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-cream-300">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
