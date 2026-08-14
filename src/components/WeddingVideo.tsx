import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { stopBackgroundMusic } from './MusicPlayer';

export const WeddingVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPoster, setShowPoster] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      stopBackgroundMusic();
      video.muted = false;
      setIsMuted(false);
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPoster(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative py-20 sm:py-28 bg-maroon-deep text-cream-100 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10)_0%,transparent_55%)]" />
      <div className="absolute inset-0 mandala-pattern opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-2">
            A Cinematic Memory
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-semibold tracking-wide">
            Our Love Story on Film
          </h2>
          <OrnamentalDivider variant="gold" />
          <p className="font-serif text-cream-200/80 italic text-sm sm:text-base max-w-xl mx-auto">
            Every frame holds a moment we can't wait to share with you. Press play to watch our journey unfold.
          </p>
        </motion.div>

        {/* Video Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-gold/40 shadow-2xl shadow-black/50 bg-black aspect-video"
        >
          <video
            ref={videoRef}
            src="/video/wedding-video.mp4"
            preload="metadata"
            playsInline
            loop
            muted
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Poster / Paused Overlay */}
          <AnimatePresence>
            {showPoster && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-maroon-deep/95 via-maroon-dark/80 to-maroon-deep/40"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                  className="text-center px-6"
                >
                  <span className="font-script text-3xl sm:text-4xl text-gold gold-text-gradient block mb-3">
                    {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-cream-300 block">
                    Wedding Film
                  </span>
                </motion.div>

                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative mt-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-gradient text-maroon-dark flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.55)] border border-gold-light/60"
                  aria-label="Play wedding video"
                >
                  <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping opacity-30" />
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-maroon-dark" />
                </motion.button>

                <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-cream-300/60">
                  Tap to play
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls while playing */}
          <AnimatePresence>
            {isPlaying && !showPoster && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-4 right-4 flex items-center gap-2"
              >
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-maroon-dark/80 backdrop-blur-md border border-gold/40 text-gold hover:bg-gold hover:text-maroon-dark transition-all"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-maroon-dark/80 backdrop-blur-md border border-gold/40 text-gold hover:bg-gold hover:text-maroon-dark transition-all"
                  aria-label="Pause video"
                >
                  <Pause className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingVideo;