import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [wasAutoPlayBlocked, setWasAutoPlayBlocked] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [scrollStarted, setScrollStarted] = useState<boolean>(false);

  // Detect whether the audio file exists
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => {
      setAudioAvailable(true);
    };

    const onError = () => {
      setAudioAvailable(false);
    };

    audio.addEventListener('canplay', onCanPlay, { once: true });
    audio.addEventListener('error', onError, { once: true });
    audio.load();
  }, []);

  const [audioAvailable, setAudioAvailable] = useState<boolean>(false);

  // Attempt automatic playback on mount (browsers may block this)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAutomatically = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setWasAutoPlayBlocked(false);
        })
        .catch((err) => {
          setWasAutoPlayBlocked(true);
          console.log('Auto-play blocked by browser:', err);
        });
    };

    playAutomatically();
  }, []);

  // If auto-play was blocked, listen for scroll gestures to start music
  useEffect(() => {
    if (!wasAutoPlayBlocked) return;
    if (scrollStarted) return;

    const audio = audioRef.current;
    if (!audio) return;

const handleScroll = () => {
      setScrollStarted(true);
      // Remove all scroll listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('mousemove', handleScroll);

      audio.play().then(() => setIsPlaying(true));
    };

    // Add scroll listeners for both mouse and touch
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);
    window.addEventListener('mousemove', handleScroll);
  }, [wasAutoPlayBlocked, scrollStarted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        // play() was prevented; we don't fall back to synth
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={weddingConfig.music.audioUrl}
      />

      {/* Floating Music Control Button */}
      <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        {/* Play Status Tooltip */}
        <div
          className={`hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full bg-maroon-dark/90 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold tracking-wider transition-all duration-500 shadow-lg ${
            isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <Music className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
          <span>{weddingConfig.music.title}</span>

          {/* Animated Soundwave Bars */}
          <div className="flex items-end gap-0.5 h-4 ml-1">
            <span className="w-0.5 bg-gold soundwave-bar" />
            <span className="w-0.5 bg-gold soundwave-bar" />
            <span className="w-0.5 bg-gold soundwave-bar" />
            <span className="w-0.5 bg-gold soundwave-bar" />
          </div>
        </div>

        {/* Main Floating Toggle Button */}
        <button
          onClick={toggleMusic}
          className={`p-3.5 rounded-full backdrop-blur-md border shadow-2xl transition-all duration-300 group focus:outline-none ${
            isPlaying
              ? 'bg-gold-gradient text-maroon-dark border-gold shadow-gold/30 scale-105'
              : 'bg-maroon-dark/90 text-gold border-gold/40 hover:border-gold hover:text-cream-100'
          }`}
          title={isPlaying ? 'Pause Background Music' : 'Play Wedding Music'}
          aria-label="Toggle Wedding Music"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </>
  );
};