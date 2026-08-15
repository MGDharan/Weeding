import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Copy, Check, RefreshCw, User, MessageSquare, Heart, PartyPopper, Feather, Crown, AlertCircle } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

const styleOptions = [
  { id: 'heartfelt', label: 'Heartfelt', icon: <Heart className="w-4 h-4" /> },
  { id: 'funny', label: 'Funny', icon: <PartyPopper className="w-4 h-4" /> },
  { id: 'poetic', label: 'Poetic', icon: <Feather className="w-4 h-4" /> },
  { id: 'royal', label: 'Royal', icon: <Crown className="w-4 h-4" /> },
];

const suggestions = [
  'Give me the funniest wish possible',
  'Make it emotional and touching',
  'Wish them a happy married life',
  'Something short and sweet',
];

const FALLBACK_SETS: Record<string, ((name: string, target: string) => string)[]> = {
  heartfelt: [
    (name, target) => `Dear ${name}, as ${target} begin their sacred journey together, may their home overflow with love, their hearts with laughter, and their lives with endless blessings. Wishing you both a lifetime of happiness on your wedding day!`,
    (name, target) => `${name} sends warmest wishes to ${target} — may the love you share today grow deeper with every passing year. Congratulations on your beautiful union!`,
  ],
  funny: [
    (name, target) => `Dear ${name}, since the Doctor and the Pharmacist are finally tying the knot, remember: marriage is the only medicine with no side effects — just pure happiness! Congratulations to ${target}!`,
    (name, target) => `${name} has a prescription for you: take two happy hearts daily, mix with laughter, and you'll live happily ever after. Congratulations ${target}!`,
  ],
  poetic: [
    (name, target) => `As two rivers meet and become one, may the lives of ${target} flow together in perfect harmony — bound by love, blessed by the stars, and written in the poetry of forever.`,
    (name, target) => `Dear ${name}, beneath the golden sky, two souls unite as one. May the blessings of the universe shower upon ${target} and light their path forever.`,
  ],
  royal: [
    (name, target) => `In honour of the magnificent union of ${target}, ${name} extends the grandest of blessings — may their kingdom be built on love, crowned with joy, and reign for eternity.`,
    (name, target) => `A royal celebration for a royal couple! ${name} wishes ${target} a reign of love, a court of joy, and a kingdom of endless happiness.`,
  ],
};

const localFallbackWish = (guest: string, style: string, customPrompt?: string): string => {
  const name = guest === 'a dear guest' ? 'dear guest' : guest.split(' ')[0];
  const target = 'Praveena and Muralidharan';
  const pool =
    customPrompt && customPrompt.toLowerCase().includes('fun')
      ? FALLBACK_SETS.funny
      : FALLBACK_SETS[style] || FALLBACK_SETS.heartfelt;
  return pool[Math.floor(Math.random() * pool.length)](name, target);
};

export const AIWishGenerator: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [style, setStyle] = useState('heartfelt');
  const [event, setEvent] = useState('the wedding ceremony');
  const [wish, setWish] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateWish = async (customPrompt?: string) => {
    setLoading(true);
    setError(null);
    setWish('');
    setCopied(false);

    try {
      const res = await fetch('/api/ai/wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName.trim() || 'a dear guest',
          style,
          event,
          ...(customPrompt ? { customPrompt } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Could not reach the AI service.');
      }

      const data = await res.json();
      setWish(data.wish);
    } catch (err) {
      setWish(localFallbackWish(guestName.trim() || 'a dear guest', style, customPrompt));
      setError('AI service is temporarily unavailable — here is a wish written for you instead.');
    } finally {
      setLoading(false);
    }
  };

  const copyWish = async () => {
    try {
      await navigator.clipboard.writeText(wish);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="ai-wish" className="py-20 sm:py-28 bg-gradient-to-b from-cream-200 via-cream-100 to-cream-200 relative overflow-hidden">
      {/* Background Mandala */}
      <div className="absolute inset-0 mandala-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-maroon-dark text-xs tracking-widest uppercase font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-maroon-light" />
            AI Powered
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-maroon-dark font-semibold tracking-wide">
            AI Wedding Wish Studio
          </h2>
          <OrnamentalDivider variant="gold" />
          <p className="text-luxury-brown/75 text-sm sm:text-base max-w-2xl mx-auto">
            Struggling to find the perfect words for {weddingConfig.couple.brideName} & {weddingConfig.couple.groomName}? Let our AI craft a beautiful, unique wish for you in seconds.
          </p>
        </motion.div>

        {/* AI Studio Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-10 rounded-3xl glass-card gold-border-glow shadow-2xl"
        >
          {/* Inputs */}
          <div className="space-y-6">
            {/* Guest Name */}
            <div>
              <label className="text-xs uppercase tracking-widest text-maroon-light font-semibold block mb-2">
                Your Name (optional)
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Arumugam Uncle"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-cream-50 border border-gold/40 text-luxury-brown placeholder-luxury-brown/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm"
                />
              </div>
            </div>

            {/* Style Selector */}
            <div>
              <label className="text-xs uppercase tracking-widest text-maroon-light font-semibold block mb-3">
                Choose a Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {styleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStyle(opt.id)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${
                      style === opt.id
                        ? 'bg-maroon-dark text-gold border-gold shadow-md scale-[1.03]'
                        : 'bg-cream-50 text-luxury-brown/80 border-gold/30 hover:border-gold'
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-xs uppercase tracking-widest text-maroon-light font-semibold block mb-2">
                Occasion
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <select
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-cream-50 border border-gold/40 text-luxury-brown focus:outline-none focus:border-gold text-sm appearance-none"
                >
                  <option value="the wedding ceremony">Wedding Ceremony</option>
                  <option value="the grand reception">Grand Reception</option>
                  <option value="both the wedding and reception">Both Events</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => generateWish()}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gold-gradient text-maroon-dark font-bold tracking-widest text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  AI IS CRAFTING YOUR WISH...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  GENERATE MY WISH
                </>
              )}
            </button>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest text-luxury-brown/50 font-semibold">
                Try:
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => generateWish(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-maroon-dark hover:bg-gold/25 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-700 flex items-center gap-3 text-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* AI Result */}
          <AnimatePresence>
            {(wish || loading) && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 p-6 sm:p-8 rounded-2xl bg-maroon-dark text-cream-100 border border-gold/50 relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none" />

                {loading ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gold text-sm font-bold tracking-widest">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      CRAFTING YOUR PERFECT WISH
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-3.5 bg-gold/20 rounded-full animate-pulse w-full" />
                      <div className="h-3.5 bg-gold/20 rounded-full animate-pulse w-11/12" />
                      <div className="h-3.5 bg-gold/20 rounded-full animate-pulse w-9/12" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="text-xs uppercase tracking-widest text-gold font-bold">
                        Your AI Wish for {guestName ? guestName : 'the Couple'}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={copyWish}
                          className="p-2.5 rounded-full bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-maroon-dark transition-all"
                          title={copied ? 'Copied!' : 'Copy wish'}
                          aria-label="Copy wish"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => generateWish()}
                          className="p-2.5 rounded-full bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-maroon-dark transition-all"
                          title="Regenerate"
                          aria-label="Regenerate wish"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="font-serif text-xl sm:text-2xl italic text-cream-100 leading-relaxed">
                      "{wish}"
                    </p>

                    <div className="mt-5 pt-4 border-t border-gold/30 flex items-center justify-between">
                      <span className="text-xs text-cream-300/70">
                        For the occasion: {event}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-gold">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI GENERATED
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-xs text-luxury-brown/50 mt-6"
        >
          Powered by NVIDIA AI · Wishes are AI-generated for inspiration. The best wish is always the one from your heart.
        </motion.p>
      </div>
    </section>
  );
};

export default AIWishGenerator;