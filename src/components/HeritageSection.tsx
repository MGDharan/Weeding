import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Landmark, Clock, Palette, Layers, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider';

interface HeritageLandmark {
  id: string;
  title: string;
  tamilName: string;
  category: string;
  era: string;
  location: string;
  image: string;
  description: string;
  highlights: string[];
  atmosphere: string;
  palette: { name: string; hex: string }[];
  tags: string[];
}

const heritageLandmarks: HeritageLandmark[] = [
  {
    id: 'ramanathaswamy-temple',
    title: 'Ramanathaswamy Temple & Holy Corridor',
    tamilName: 'ராமநாதசுவாமி கோவில்',
    category: 'Sacred Dravidian Architecture',
    era: '12th – 17th Century CE (Pandya & Sethupathi Dynasties)',
    location: 'Rameswaram, Ramanathapuram District',
    image: '/photos/heritage/ramanathaswamy-temple-sunset.jpg',
    description:
      'Renowned for containing the longest pillared temple corridors in the world (over 1,200 meters long with roughly 1,212 intricately sculpted granite pillars), illuminated here by traditional oil lamps and golden hour sunlight bouncing off the holy theertham water tank.',
    highlights: [
      'Over 1,200 meters of continuous carved stone colonnade',
      'Granite ceilings painted with centuries-old geometric and divine motifs',
      'Towering multi-tiered Rajagopuram facing the sunrise and sunset horizons',
      '22 Sacred Theerthams (holy water wells) with ceremonial stone steps',
    ],
    atmosphere:
      'A vivid twilight sky ablaze with molten amber, violet gradients, and warm crimson reflections casts a divine glow across the polished granite flagstones and quiet theertham waters.',
    palette: [
      { name: 'Molten Amber', hex: '#E8A33D' },
      { name: 'Deep Crimson', hex: '#7A1F2B' },
      { name: 'Imperial Violet', hex: '#4A336B' },
      { name: 'Granite Charcoal', hex: '#2E2A26' },
    ],
    tags: ['Dravidian Heritage', 'Pillared Hall', 'Sacred Theertham', 'Sethupathi Patronage'],
  },
  {
    id: 'pamban-sea-bridge',
    title: 'Historic Pamban Marine Bridge & Coastline',
    tamilName: 'பாம்பன் கடல் பாலம்',
    category: 'Maritime & Engineering Landmark',
    era: 'Opened 1914 (Colonial & Coastal Heritage)',
    location: 'Palk Strait / Gulf of Mannar, Ramanathapuram',
    image: '/photos/heritage/pamban-sea-bridge-sunset.jpg',
    description:
      "India's first sea bridge spanning over 2.06 km across the turbulent waters of the Palk Strait, connecting mainland Mandapam to Pamban Island. Captured at a dramatic sunset with shimmering ocean currents and distant temple silhouettes.",
    highlights: [
      'Historic Scherzer rolling lift cantilever span engineered for ship passage',
      'Spans 143 piers anchored into deep marine coral bedrock',
      'Panoramic ocean vista where the Gulf of Mannar meets the Palk Strait',
      'Historic marine gateway connecting mainland Tamil Nadu to sacred Rameswaram',
    ],
    atmosphere:
      'Fiery magenta and burning copper clouds radiate across the turquoise ocean surface, turning the steel cantilever silhouette into an iconic sunset emblem.',
    palette: [
      { name: 'Fiery Magenta', hex: '#B0225C' },
      { name: 'Burning Copper', hex: '#C66A2A' },
      { name: 'Palk Turquoise', hex: '#2E9C94' },
    ],
    tags: ['Maritime Heritage', 'Pamban Island', 'Ocean Sunset', 'Cantilever Landmark'],
  },
  {
    id: 'ramalinga-vilasam-palace',
    title: 'Ramalinga Vilasam Palace (Sethupathi Kings)',
    tamilName: 'ராமலிங்க விலாசம் அரண்மனை',
    category: 'Royal Heritage & Mural Art',
    era: '17th Century CE (Kizhavan Sethupathi Era)',
    location: 'Ramanathapuram Town Center',
    image: '/photos/heritage/ramalinga-vilasam-palace-sunset.jpg',
    description:
      'The historic royal durbar and palace of the Sethupathi Maharajas who protected and patronized the Rameswaram temple region. Famous for its sprawling stone courtyards, decorative arches, and peerless 17th-century vegetable-dye murals detailing royal processions and epics.',
    highlights: [
      'Durbar Hall with heavy stone pillars supporting carved wooden beams',
      'Exquisite 17th-century murals depicting battle scenes, treaties, and epics',
      'Secret subterranean chambers and elevated royal viewing galleries',
      'Distinctive blend of Marava royal heritage and Nayaka period arches',
    ],
    atmosphere:
      'Warm golden rays filter through open colonnaded courtyards, illuminating aged terracotta pigments and heritage stone masonry in a nostalgic royal glow.',
    palette: [
      { name: 'Terracotta Ochre', hex: '#B66A3B' },
      { name: 'Dusk Marigold', hex: '#D9A441' },
      { name: 'Sethupathi Bronze', hex: '#6E5430' },
      { name: 'Evening Slate', hex: '#3A3F4A' },
    ],
    tags: ['Royal Durbar', '17th Century Murals', 'Sethupathi Kingdom', 'Heritage Architecture'],
  },
  {
    id: 'ramnad-rajagopuram',
    title: 'Sacred Dravidian Rajagopuram at Twilight',
    tamilName: 'ராமநாதபுரம் ராஜகோபுரம்',
    category: 'Monumental Monument Architecture',
    era: 'Classical Dravidian Architecture',
    location: 'Ramanathapuram Heritage Circuit',
    image: '/photos/heritage/rajagopuram-twilight.jpg',
    description:
      'A majestic pyramidical temple tower carved with hundreds of tiers of mythological deities, celestial dancers, and guardian yalis, framed in dramatic low-angle perspective as the sunset sky turns into rich velvet indigo.',
    highlights: [
      'Multi-tiered stepped pyramidal structure with ornate stucco craftsmanship',
      'Ornate Kalasams (consecrated copper finials) crowning the spire peak',
      'Intricate friezes depicting scenes from the Ramayana and regional legends',
      'Acoustic stone carvings and precision Dravidian proportion mathematics',
    ],
    atmosphere:
      'The highest tiers catch the lingering ruby and gold rays while the lower base dissolves into mystical evening twilight.',
    palette: [
      { name: 'Ruby Horizon', hex: '#9E1B32' },
      { name: 'Saffron Dusk', hex: '#E08A2B' },
      { name: 'Midnight Indigo', hex: '#1C1B3B' },
      { name: 'Stucco Sandstone', hex: '#C9A06A' },
      { name: 'Kalasa Copper', hex: '#8C5A2B' },
    ],
    tags: ['Dravidian Tower', 'Sculpted Stucco'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

export const HeritageSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const landmark = heritageLandmarks[activeIndex];

  const prev = () => setActiveIndex((i) => (i - 1 + heritageLandmarks.length) % heritageLandmarks.length);
  const next = () => setActiveIndex((i) => (i + 1) % heritageLandmarks.length);

  return (
    <section id="heritage" className="relative py-20 sm:py-28 bg-maroon-deep overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.10)_0%,transparent_55%)]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-maroon-light/30 blur-[160px]" />
      <div className="absolute inset-0 mandala-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-2">
            The Land of the Sethus
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-semibold tracking-wide">
            Ramanathapuram <span className="text-gold">Sunset &amp; Heritage</span>
          </h2>
          <p className="mt-4 font-serif text-cream-200/80 italic max-w-xl mx-auto">
            Historic architectural landmarks of our homeland, glowing in radiant twilight — a tribute
            to the Dravidian stone masonry, Sethupathi royal palaces, and sacred ocean crossings of
            our beloved Ramnad.
          </p>
          <OrnamentalDivider variant="gold" />
        </motion.div>

        {/* Main Stage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Image Stage */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl min-h-[320px] sm:min-h-[440px] lg:min-h-[560px] bg-black/40">
            <AnimatePresence mode="wait">
              <motion.img
                key={landmark.id}
                src={landmark.image}
                alt={landmark.title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-transparent to-maroon-deep/30 pointer-events-none" />

            {/* Overlay caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-maroon-deep text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  <Landmark className="w-3 h-3" />
                  {landmark.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold text-[10px] sm:text-xs font-semibold">
                  <Clock className="w-3 h-3" />
                  {landmark.era}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl text-cream-100 font-semibold leading-snug drop-shadow">
                {landmark.title}
              </h3>
              <p className="mt-1 font-script text-lg sm:text-xl text-gold/90">{landmark.tamilName}</p>
            </div>

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              aria-label="Previous landmark"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-gold hover:text-maroon-deep text-cream-100 border border-gold/30 backdrop-blur transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next landmark"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-gold hover:text-maroon-deep text-cream-100 border border-gold/30 backdrop-blur transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 right-6 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold text-xs font-mono tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} / {String(heritageLandmarks.length).padStart(2, '0')}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-maroon-dark to-maroon-deep border border-gold/40 p-6 sm:p-8 text-cream-100 shadow-2xl flex flex-col">
            <div className="flex items-center gap-2 text-gold mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-cream-200/80">{landmark.location}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={landmark.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                {/* Description */}
                <p className="text-sm sm:text-base text-cream-200 leading-relaxed">
                  {landmark.description}
                </p>

                {/* Architectural Highlights */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-gold" />
                    <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                      Key Architectural Features
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {landmark.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-cream-300 leading-snug">
                        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sunset Atmosphere */}
                <div className="mt-6 rounded-2xl bg-black/30 border border-gold/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80 font-semibold mb-2">
                    Sunset Chromatic Experience
                  </p>
                  <p className="text-sm italic font-serif text-cream-200/90 leading-relaxed">
                    &ldquo;{landmark.atmosphere}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Palette */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-gold" />
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  Sunset Palette
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {landmark.palette.map((c) => (
                  <span
                    key={c.hex}
                    title={`${c.name} (${c.hex})`}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/30 border border-gold/20 text-[11px] text-cream-300"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Selector */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {heritageLandmarks.map((lm, i) => (
            <button
              key={lm.id}
              onClick={() => setActiveIndex(i)}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 text-left ${
                i === activeIndex
                  ? 'border-gold ring-2 ring-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.25)]'
                  : 'border-gold/20 hover:border-gold/50'
              }`}
            >
              <div className="relative h-28 sm:h-32 overflow-hidden">
                <img
                  src={lm.image}
                  alt={lm.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i === activeIndex ? 'brightness-100' : 'brightness-[0.55] group-hover:brightness-90'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-3 right-2 text-[11px] sm:text-xs font-semibold text-cream-100 leading-tight">
                  {lm.title}
                </p>
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur border border-gold/40 text-gold text-[9px] font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
