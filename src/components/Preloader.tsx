import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';

interface PreloaderProps {
  onComplete: () => void;
}

/* ---------- Decorative ring with ornamental dots ---------- */

const MonogramRing = ({ progress }: { progress: number }) => {
  const RING_R = 60;
  const RING_C = 2 * Math.PI * RING_R;

  return (
    <div className="relative w-52 h-52 sm:w-60 sm:h-60">
      {/* Outer dashed halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-gold/30"
      />
      {/* Inner thin ring */}
      <div className="absolute inset-3 rounded-full border border-gold/20" />

      {/* Progress ring */}
      <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 150 150">
        <defs>
          <linearGradient id="preloader-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FAF0CA" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#E5C158" />
          </linearGradient>
        </defs>
        <circle cx="75" cy="75" r={RING_R} fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="1.5" />
        <motion.circle
          cx="75"
          cy="75"
          r={RING_R}
          fill="none"
          stroke="url(#preloader-ring-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          animate={{ strokeDashoffset: RING_C * (1 - progress / 100) }}
          transition={{ ease: 'linear', duration: 0.2 }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.7))' }}
        />
      </svg>

      {/* Center monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-28 h-28 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-maroon-dark/92 to-maroon-deep/90 border border-gold/40 shadow-[0_0_40px_rgba(213,175,55,2)] flex items-center justify-center">
          <span className="font-script gold-text-gradient leading-none flex flex-col items-center">
            <span className="text-5xl sm:text-4xl">M</span>
            <span className="text-sm sm:text-base leading-none my-0.8">&amp;</span>
            <span className="text-5xl sm:text-4xl">P</span>
          </span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Preloader ---------- */

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const ready = progress >= 100;

  useEffect(() => {
    if (ready) return;
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 22);
    return () => clearInterval(interval);
  }, [ready]);

  const enterWorld = () => {
    if (ready) setVisible(false);
  };

  useEffect(() => {
    if (!ready) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') enterWorld();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const blessingPhrases = [
    'Lighting the Lamps...',
    'Gathering Blessings...',
    'Preparing the Mandapam...',
    'Scenting the Air with Jasmine...',
    'Draping the Flowers...',
    'Summoning the Muhurtham...',
  ];
  const blessingPhrase =
    blessingPhrases[Math.min(Math.floor((progress / 100) * blessingPhrases.length), blessingPhrases.length - 1)];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon-deep overflow-hidden select-none"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(14px)' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* ---- Ambient background ---- */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/photos/heritage/ramanathaswamy-temple-sunset.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/80 via-maroon-deep/70 to-maroon-deep/90" />
          <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-[140px]" />
          <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-maroon-light/40 blur-[140px]" />
          <div className="absolute inset-0 mandala-pattern opacity-30" />

          {/* ---- Couple welcoming guests (groom left, bride right) ---- */}
          <div className="absolute inset-x-0 bottom-0 z-[5] flex items-end justify-between pointer-events-none px-2 sm:px-8">
            <motion.div
              initial={{ opacity: 0, x: -90, y: 70 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="relative"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gold/15 blur-[80px] rounded-full" />
              <motion.img
                src="/cartoon/groom.png"
                alt={weddingConfig.couple.groomName}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative h-[26vh] sm:h-[42vh] lg:h-[52vh] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] select-none"
                draggable={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 90, y: 70 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="relative"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gold/15 blur-[80px] rounded-full" />
              <motion.img
                src="/cartoon/bride.png"
                alt={weddingConfig.couple.brideName}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="relative h-[26vh] sm:h-[42vh] lg:h-[52vh] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] select-none"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* ---- Fine border frame ---- */}
          <div className="absolute inset-4 sm:inset-6 rounded-[1.6rem] border border-gold/20 pointer-events-none" />
          <div className="absolute inset-5 sm:inset-7 rounded-[1.4rem] border border-gold/10 pointer-events-none" />

          {/* ---- Content ---- */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 pb-28 pt-8 sm:pb-16">

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.45em' }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[10px] sm:text-xs uppercase text-gold/80 font-semibold"
            >
              {weddingConfig.couple.invitationSubtitle}
            </motion.p>

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.35 }}
              className="mt-7"
            >
              <MonogramRing progress={progress} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-7 font-serif text-3xl sm:text-5xl leading-tight gold-text-gradient"
            >
              {weddingConfig.couple.brideName}
              <span className="mx-3 text-gold/60 font-script text-2xl sm:text-3xl">&amp;</span>
              {weddingConfig.couple.groomName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-3 flex items-center gap-3"
            >
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <Heart className="w-3.5 h-3.5 text-gold/80" fill="currentColor" />
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-3 text-[11px] sm:text-sm italic text-cream-300/60 font-serif tracking-wide"
            >
              {weddingConfig.couple.tagline}
            </motion.p>

            {/* Animated blessing message (replaces numeric counter) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={blessingPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="font-script text-xl sm:text-2xl gold-text-gradient leading-none"
                >
                  {blessingPhrase}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </motion.div>

            {/* Progress line */}
            <div className="relative mt-5 w-56 sm:w-72 h-[3px] rounded-full bg-maroon-light/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-medium via-gold to-gold-accent transition-[width] duration-200 ease-linear relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>

            {/* Enter button */}
            <AnimatePresence>
              {ready && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
                  className="mt-8"
                >
                  <motion.button
                    onClick={enterWorld}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative overflow-hidden rounded-full px-9 sm:px-11 py-3.5 bg-gradient-to-r from-gold-accent via-gold to-gold-medium text-maroon-deep font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-gold-light/60"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <span className="relative inline-flex items-center gap-2.5">
                      Enter the Invitation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                  <p className="mt-3 text-[9px] tracking-[0.28em] uppercase text-cream-300/40">
                    Press Enter to continue
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};