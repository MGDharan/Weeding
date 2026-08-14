import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const WeddingCountdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(weddingConfig.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-cream-200 via-cream-100 to-cream-200 relative overflow-hidden">
      {/* Background Subtle Mandala */}
      <div className="absolute inset-0 mandala-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-maroon-dark text-xs tracking-widest uppercase font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-maroon-light" />
            Anticipating The Big Day
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            The Countdown Begins
          </h2>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Countdown Display */}
        {timeLeft.isComplete ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-12 rounded-3xl glass-card gold-border-glow max-w-2xl mx-auto"
          >
            <h3 className="font-serif text-4xl sm:text-6xl text-maroon-dark font-bold mb-4">
              Today is the day! ❤️
            </h3>
            <p className="text-luxury-brown font-serif text-xl sm:text-2xl italic">
              "We begin our journey forever today. Thank you for celebrating with us!"
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {timeBlocks.map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="p-6 sm:p-8 rounded-2xl glass-card border border-gold/40 hover:border-gold hover:shadow-xl hover:shadow-gold/10 text-center transition-all duration-300 transform group-hover:-translate-y-1">
                  
                  {/* Number Counter with Animated Digit Transition */}
                  <div className="relative h-16 sm:h-20 overflow-hidden flex items-center justify-center mb-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={block.value}
                        initial={{ y: 28, opacity: 0, filter: 'blur(4px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -28, opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-maroon-dark gold-text-gradient block leading-none"
                      >
                        {String(block.value).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Label */}
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-maroon-light uppercase block">
                    {block.label}
                  </span>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
