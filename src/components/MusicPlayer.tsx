import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';

// Raag Yaman scale (Sa Re Ga Ma# Pa Dha Ni Sa'), base A3 = 220 Hz
const RAGA_FREQS = [220, 247.5, 275, 293.33, 330, 371.25, 412.5, 440];

interface SynthNode {
  stop: () => void;
}

// Global hook so other components (e.g. the video player) can pause/stop the
// background music. Set by the MusicPlayer on mount.
let stopMusicExternal: (() => void) | null = null;
export const stopBackgroundMusic = (): void => {
  stopMusicExternal?.();
};

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioAvailable, setAudioAvailable] = useState<boolean>(false);
  const [audioChecked, setAudioChecked] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthMasterRef = useRef<GainNode | null>(null);
  const synthNodesRef = useRef<SynthNode[]>([]);
  const loopTimerRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);
  const autoStartedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const audioAvailableRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    audioAvailableRef.current = audioAvailable;
  }, [audioAvailable]);

  // Detect whether the audio file actually exists on the server
  useEffect(() => {
    let cancelled = false;
    const audio = audioRef.current;
    if (!audio) return;

    const markUnavailable = () => {
      if (!cancelled) {
        setAudioAvailable(false);
        setAudioChecked(true);
      }
    };
    const markAvailable = () => {
      if (!cancelled) {
        setAudioAvailable(true);
        setAudioChecked(true);
      }
    };

    audio.addEventListener('error', markUnavailable, { once: true });
    audio.addEventListener('canplaythrough', markAvailable, { once: true });
    // Force the browser to probe the resource so the events fire
    audio.load();

    return () => {
      cancelled = true;
      audio.removeEventListener('error', markUnavailable);
      audio.removeEventListener('canplaythrough', markAvailable);
    };
  }, []);

  // Auto-play background music on the first user interaction (browsers block
  // audio before a user gesture). Also respect the persisted preference.
  useEffect(() => {
    const stored = sessionStorage.getItem('wedding_audio_playing');
    if (stored === 'false') return;

    const start = () => {
      if (autoStartedRef.current || isPlayingRef.current) return;
      autoStartedRef.current = true;
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
      startPlayback();
    };

    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    window.addEventListener('touchstart', start, { once: true });

    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const playNote = (ctx: AudioContext, dest: AudioNode, freq: number, start: number, dur: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.value = freq;
    shimmer.type = 'sine';
    shimmer.frequency.value = 5.5;
    shimmerGain.gain.value = 2.5;
    shimmer.connect(shimmerGain);
    shimmerGain.connect(osc.frequency);
    shimmer.start(start);
    shimmer.stop(start + dur + 0.1);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(start);
    osc.stop(start + dur + 0.1);

    synthNodesRef.current.push({
      stop: () => {
        try {
          osc.stop();
          shimmer.stop();
        } catch {
          /* not started yet */
        }
      },
    });
  };

  // Ambient melody loop — a gentle ascending/descending raga arpeggio
  const scheduleMelodyLoop = (ctx: AudioContext, master: GainNode) => {
    const pattern = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7];
    const stepDur = 0.95;
    const loopDur = pattern.length * stepDur;

    const scheduleIteration = () => {
      if (stoppedRef.current) return;
      let t = ctx.currentTime + 0.1;
      pattern.forEach((i) => {
        playNote(ctx, master, RAGA_FREQS[i], t, stepDur * 1.8);
        t += stepDur;
      });
      loopTimerRef.current = window.setTimeout(scheduleIteration, loopDur * 1000);
    };

    scheduleIteration();
  };

  const startAmbientSynth = () => {
    try {
      stoppedRef.current = false;
      if (!synthCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.9, ctx.currentTime);
      master.connect(ctx.destination);
      synthMasterRef.current = master;

      // Warm drone under the melody (Sa & Pa)
      [RAGA_FREQS[0], RAGA_FREQS[4]].forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(master);
        osc.start();
        synthNodesRef.current.push({
          stop: () => {
            try {
              osc.stop();
            } catch {
              /* not started yet */
            }
          },
        });
      });

      scheduleMelodyLoop(ctx, master);
    } catch (e) {
      console.warn('Web Audio synth initialized with exception:', e);
    }
  };

  const stopAmbientSynth = () => {
    stoppedRef.current = true;
    if (loopTimerRef.current !== null) {
      window.clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    synthNodesRef.current.forEach((node) => node.stop());
    synthNodesRef.current = [];
    if (synthMasterRef.current && synthCtxRef.current) {
      const ctx = synthCtxRef.current;
      try {
        synthMasterRef.current.gain.setValueAtTime(0.0001, ctx.currentTime);
      } catch {
        /* context may be closed */
      }
    }
    synthMasterRef.current = null;
  };

  const startPlayback = () => {
    isPlayingRef.current = true;
    const audio = audioRef.current;
    if (audio && audioAvailableRef.current) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          sessionStorage.setItem('wedding_audio_playing', 'true');
        })
        .catch((err) => {
          console.warn('Audio MP3 play prevented, starting Web Audio synth:', err);
          startAmbientSynth();
          setIsPlaying(true);
          sessionStorage.setItem('wedding_audio_playing', 'true');
        });
    } else {
      startAmbientSynth();
      setIsPlaying(true);
      sessionStorage.setItem('wedding_audio_playing', 'true');
    }
  };

  const stopPlayback = () => {
    isPlayingRef.current = false;
    const audio = audioRef.current;
    if (audio) audio.pause();
    stopAmbientSynth();
    setIsPlaying(false);
    sessionStorage.setItem('wedding_audio_playing', 'false');
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      startPlayback();
    } else {
      stopPlayback();
    }
  };

  // Expose the stop function so the video player can pause background music
  useEffect(() => {
    stopMusicExternal = stopPlayback;
    return () => {
      stopMusicExternal = null;
    };
  }, [stopPlayback]);

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.music.audioUrl}
        loop
        preload="auto"
        onError={() => {
          if (audioChecked) setAudioAvailable(false);
        }}
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
