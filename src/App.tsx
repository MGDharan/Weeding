import React, { useState } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { Navbar } from './components/Navbar';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { Dock } from './components/Dock';
import { Preloader } from './components/Preloader';
import { WeddingHero } from './components/WeddingHero';
import { CoupleIntro } from './components/CoupleIntro';
import { OurStory } from './components/OurStory';
import { WeddingCountdown } from './components/WeddingCountdown';
import { WeddingEvents } from './components/WeddingEvents';
import { MainCeremonySpotlight } from './components/MainCeremonySpotlight';
import { CinematicReveal } from './components/CinematicReveal';
import { PhotoGallery } from './components/PhotoGallery';
import { FamilySection } from './components/FamilySection';
import { RSVPForm } from './components/RSVPForm';
import { VenueSection } from './components/VenueSection';
import { WeddingMessage } from './components/WeddingMessage';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { PhotoMarquee } from './components/PhotoMarquee';
import { WeddingVideo } from './components/WeddingVideo';
import { WeddingFun } from './components/WeddingFun';
import { AIWishGenerator } from './components/AIWishGenerator';
import { HeritageSection } from './components/HeritageSection';

export const App: React.FC = () => {
  const [preloading, setPreloading] = useState(true);

  return (
    <div className="relative min-h-screen bg-cream-100 text-luxury-brown selection:bg-gold selection:text-maroon-dark overflow-x-hidden">
      {/* Cinematic Preloader */}
      <Preloader onComplete={() => setPreloading(false)} />

      {/* Buttery Smooth Scrolling */}
      <SmoothScroll />

      {/* Premium Custom Cursor */}
      <CursorGlow />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Floating Rose/Marigold Petals Overlay */}
      <PetalCanvas />

      {/* Floating Luxury Header Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <WeddingHero />
        <CoupleIntro />
        <OurStory />
        <WeddingCountdown />
        <WeddingEvents />
        <MainCeremonySpotlight />
        <CinematicReveal />
        <PhotoGallery />

        {/* Scrolling Photo Marquee */}
        <PhotoMarquee />

        {/* Cinematic Wedding Film */}
        <WeddingVideo />

        {/* Funny Wedding Survival Guide */}
        <WeddingFun />

        {/* AI Wish Studio */}
        <AIWishGenerator />

        {/* Ramanathapuram Sunset & Heritage */}
        <HeritageSection />

        <FamilySection />
        <RSVPForm />
        <VenueSection />
        <WeddingMessage />
      </main>

      {/* Floating Audio Music Player */}
      <MusicPlayer />

      {/* macOS-Style Dock Navigation */}
      {!preloading && <Dock />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
