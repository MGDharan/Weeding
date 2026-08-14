import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Laugh, Stethoscope, Pill, Music, Utensils, Camera, Wine, ShieldCheck, Brain } from 'lucide-react';

interface Rule {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const rules: Rule[] = [
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Eat First, Talk Later",
    text: "The food will be amazing. If we catch you chatting on an empty plate, we will personally refill it. No fasting allowed at this wedding.",
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "The Dance Floor Is Mandatory",
    text: "Sitting down is strictly for eating. The moment the beat drops, your chair becomes your enemy. Family honor is at stake.",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Smile For Every Photo",
    text: "There will be 10,000 photographs. We know, we know. But our future children need proof that you attended.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Free Medical Advice Corner",
    text: "The groom is a Doctor and the bride is a Pharmacist. Feel free to get a diagnosis AND your prescription filled at the same table.",
  },
  {
    icon: <Wine className="w-6 h-6" />,
    title: "Laughter Prescribed Daily",
    text: "Side effects of this wedding may include: extreme joy, sore cheeks from smiling, and a sudden urge to get married. Consult your pharmacist (the bride) for details.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "No Tears Allowed (Except Happy Ones)",
    text: "We accept happy tears, laughing tears, and tears from eating too much chili. Sad tears will be checked out by the on-duty doctor immediately.",
  },
];

const funFacts = [
  "She studied all those medicine names just so she could finally pronounce 'Muralidharan'.",
  "He became a doctor for the noble cause of healing... and to finally impress her family.",
  "Their first argument was about who takes the bigger share of 'bondas'.",
  "Together they can cure anything — he diagnoses, she prescribes, and the wedding food heals the rest.",
];

export const WeddingFun: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-maroon-deep via-maroon-dark to-maroon-deep text-cream-100 relative overflow-hidden">
      {/* Background Mandala */}
      <div className="absolute inset-0 mandala-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs tracking-widest uppercase font-bold mb-3">
            <Laugh className="w-3.5 h-3.5" />
            A Little Humour
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-semibold tracking-wide">
            The Wedding Survival Guide
          </h2>
          <OrnamentalDivider variant="gold" />
          <p className="text-cream-200/80 text-sm sm:text-base italic max-w-2xl mx-auto">
            Official rules issued by the couple (a Doctor & a Pharmacist — yes, you'll be very well taken care of).
          </p>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 35, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1000 }}
              className="group p-6 sm:p-8 rounded-3xl glass-dark-card border border-gold/30 hover:border-gold transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                {rule.icon}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-gold font-semibold mb-2">
                {rule.title}
              </h3>
              <p className="text-cream-200/85 text-sm leading-relaxed">{rule.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Fun Facts Marquee-ish List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="p-8 sm:p-10 rounded-3xl bg-maroon-deep/60 border border-gold/30 gold-border-glow">
            <h3 className="font-serif text-2xl sm:text-3xl text-center text-cream-100 font-semibold mb-8">
              <span className="text-gold gold-text-gradient">Did You Know?</span> Fun Facts About The Couple
            </h3>
            <div className="space-y-5">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center">
                    {i % 2 === 0 ? <Stethoscope className="w-4 h-4" /> : <Pill className="w-4 h-4" />}
                  </span>
                  <p className="font-serif text-lg sm:text-xl text-cream-200 italic leading-relaxed">
                    {fact}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <span className="inline-block px-5 py-2 rounded-full bg-gold-gradient text-maroon-dark text-xs font-bold tracking-widest uppercase shadow-lg">
                {weddingConfig.couple.initials} — Prescribed A Lifetime Of Love
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingFun;