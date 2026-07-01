import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const audioContextRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const loopTimeoutRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Simple melodic progression using Web Audio API (romantic tune)
  const melody = [
    // First phrase
    { note: 261.63, time: 0 },      // C4
    { note: 329.63, time: 0.4 },    // E4
    { note: 392.00, time: 0.8 },    // G4
    { note: 523.25, time: 1.2 },    // C5
    { note: 392.00, time: 1.6 },    // G4
    { note: 349.23, time: 2.0 },    // F4
    { note: 329.63, time: 2.4 },    // E4
    { note: 293.66, time: 2.8 },    // D4
    // Second phrase
    { note: 261.63, time: 3.2 },    // C4
    { note: 329.63, time: 3.6 },    // E4
    { note: 392.00, time: 4.0 },    // G4
    { note: 523.25, time: 4.4 },    // C5
    { note: 523.25, time: 4.8 },    // C5
    { note: 493.88, time: 5.2 },    // B4
    { note: 440.00, time: 5.6 },    // A4
    { note: 392.00, time: 6.0 },    // G4
    // Third phrase
    { note: 349.23, time: 6.4 },    // F4
    { note: 440.00, time: 6.8 },    // A4
    { note: 523.25, time: 7.2 },    // C5
    { note: 587.33, time: 7.6 },    // D5
    { note: 523.25, time: 8.0 },    // C5
    { note: 493.88, time: 8.4 },    // B4
    { note: 440.00, time: 8.8 },    // A4
    { note: 392.00, time: 9.2 },    // G4
    // Final phrase
    { note: 261.63, time: 9.6 },    // C4
    { note: 329.63, time: 10.0 },   // E4
    { note: 392.00, time: 10.4 },   // G4
    { note: 523.25, time: 10.8 },   // C5
    { note: 392.00, time: 11.2 },   // G4
    { note: 523.25, time: 11.6 },   // C5
    { note: 659.25, time: 12.0 },   // E5
    { note: 523.25, time: 12.4 },   // C5
  ];

  const totalDuration = 12.8;

  // Use a ref for isPlaying to avoid stale closure issues
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const playMelody = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    if (ctx.state === 'closed') return;
    if (ctx.state === 'suspended') ctx.resume();

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.12, ctx.currentTime);
    masterGain.connect(ctx.destination);

    melody.forEach(({ note, time }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, ctx.currentTime + time);

      // Add gentle attack and release
      noteGain.gain.setValueAtTime(0, ctx.currentTime + time);
      noteGain.gain.linearRampToValueAtTime(volume * 0.12, ctx.currentTime + time + 0.05);
      noteGain.gain.setValueAtTime(volume * 0.12, ctx.currentTime + time + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.38);

      osc.connect(noteGain);
      noteGain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + 0.38);
    });

    // Update progress
    let elapsed = 0;
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      elapsed += 0.05;
      setProgress(Math.min(elapsed / totalDuration, 0.98));
      if (elapsed >= totalDuration) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setProgress(0);
        // Check using ref instead of stale closure
        if (isPlayingRef.current) {
          loopTimeoutRef.current = setTimeout(playMelody, 300);
        }
      }
    }, 50);
  }, [volume, melody, totalDuration]);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  const togglePlay = () => {
    initAudio();

    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(playMelody, 100);
    } else {
      setIsPlaying(false);
      setProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <motion.div
      className="music-player"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <button className="music-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
        <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
      </button>

      <div className="music-progress">
        <div className="music-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      <div style={{ position: 'relative' }}>
        <button
          className="music-btn"
          onClick={() => setShowVolume(!showVolume)}
          title="Volume"
        >
          <i className={`bi ${volume > 0 ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'}`}></i>
        </button>
        {showVolume && (
          <div
            style={{
              position: 'absolute',
              bottom: '45px',
              right: '0',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(15px)',
              padding: '8px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '80px', accentColor: '#ff69b4', cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
