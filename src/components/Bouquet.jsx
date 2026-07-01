import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Confetti = () => {
  const pieces = useMemo(() => {
    const colors = ['#ff6b6b', '#ff69b4', '#ffb6c1', '#d4af37', '#ff1493', '#ffd700', '#ff8e8e', '#ff4d6d'];
    return Array.from({ length: 60 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 2,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map((piece, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: piece.left,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            background: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            '--duration': `${piece.duration}s`,
            '--delay': `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Individual flower component with proper animation
const Flower = ({ emoji, x, y, delay, rotation, size = '2rem' }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `calc(50% + ${x}px)`,
      top: `calc(45% + ${y}px)`,
      fontSize: size,
      zIndex: 5 - Math.abs(y), // Higher flowers get higher z-index
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
    }}
    initial={{ scale: 0, opacity: 0, y: 30 }}
    animate={{
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: rotation,
    }}
    transition={{
      delay: delay,
      duration: 0.6,
      type: 'spring',
      stiffness: 120,
      damping: 12,
    }}
  >
    {emoji}
  </motion.div>
);

const Bouquet = ({ onClose }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),     // Stems grow
      setTimeout(() => setStage(2), 1800),    // Outer flowers appear
      setTimeout(() => setStage(3), 2800),    // Inner flowers + wrapper
      setTimeout(() => setStage(4), 4000),    // Bouquet complete + sway
      setTimeout(() => setStage(5), 5500),    // "Princess Sofi" title
      setTimeout(() => setStage(6), 7000),    // Thank you messages
      setTimeout(() => setStage(7), 9500),    // I LOVE YOU
      setTimeout(() => setStage(8), 13000),   // Ending
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Flowers arranged in a dome/bouquet shape
  // Coordinates are relative to center (50% width, 45% height of scene)
  const outerFlowers = [
    { emoji: '🌸', x: -75, y: -65, delay: 0.1, rotation: -25 },
    { emoji: '🌸', x: 75, y: -65, delay: 0.15, rotation: 25 },
    { emoji: '🌺', x: -60, y: -85, delay: 0.2, rotation: -18 },
    { emoji: '🌺', x: 60, y: -85, delay: 0.22, rotation: 18 },
    { emoji: '🌸', x: 0, y: -95, delay: 0.25, rotation: 0 },
  ];

  const middleFlowers = [
    { emoji: '🌹', x: -50, y: -45, delay: 0.3, rotation: -12 },
    { emoji: '🌹', x: 50, y: -45, delay: 0.32, rotation: 12 },
    { emoji: '🌹', x: -35, y: -65, delay: 0.35, rotation: -10 },
    { emoji: '🌹', x: 35, y: -65, delay: 0.37, rotation: 10 },
    { emoji: '🤍', x: -20, y: -80, delay: 0.4, rotation: -5 },
    { emoji: '🤍', x: 20, y: -80, delay: 0.42, rotation: 5 },
  ];

  const innerFlowers = [
    { emoji: '🌹', x: -30, y: -35, delay: 0.45, rotation: -8, size: '2.2rem' },
    { emoji: '🌹', x: 30, y: -35, delay: 0.47, rotation: 8, size: '2.2rem' },
    { emoji: '🌹', x: 0, y: -55, delay: 0.5, rotation: 0, size: '2.5rem' },
    { emoji: '💮', x: -38, y: -15, delay: 0.52, rotation: -12 },
    { emoji: '💮', x: 38, y: -15, delay: 0.55, rotation: 12 },
    { emoji: '🌹', x: 0, y: -25, delay: 0.58, rotation: 0, size: '2rem' },
  ];

  return (
    <AnimatePresence>
      {stage < 9 && (
        <motion.div
          className="bouquet-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            if (stage >= 5 && stage < 8) setStage(s => s + 1);
          }}
          style={{ zIndex: 10000 }}
        >
          {/* Confetti from start */}
          {stage >= 2 && <Confetti />}

          {/* Floating hearts after bouquet forms */}
          {stage >= 5 && stage < 8 && (
            <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', top: 0, left: 0 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  style={{
                    position: 'absolute',
                    fontSize: `${1 + Math.random() * 1.5}rem`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.3,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {['❤️', '💖', '💗', '💕'][i % 4]}
                </motion.div>
              ))}
            </div>
          )}

          {/* ============ BOUQUET SCENE ============ */}
          {(stage >= 1 && stage <= 5) && (
            <motion.div
              className="bouquet-scene"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                rotate: stage >= 4 ? [-2, 2, -2] : 0,
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Stems - growing from bottom */}
              <motion.div
                className="bouquet-stem"
                initial={{ height: 0 }}
                animate={{ height: '70%' }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  left: '50%',
                  bottom: '15%',
                  width: '4px',
                }}
              />
              <motion.div
                className="bouquet-stem"
                initial={{ height: 0 }}
                animate={{ height: '60%' }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  left: '40%',
                  bottom: '15%',
                  width: '3px',
                  transform: 'translateX(-50%) rotate(-12deg)',
                }}
              />
              <motion.div
                className="bouquet-stem"
                initial={{ height: 0 }}
                animate={{ height: '60%' }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  left: '60%',
                  bottom: '15%',
                  width: '3px',
                  transform: 'translateX(-50%) rotate(12deg)',
                }}
              />
              <motion.div
                className="bouquet-stem"
                initial={{ height: 0 }}
                animate={{ height: '50%' }}
                transition={{ duration: 1, delay: 0.7 }}
                style={{
                  left: '35%',
                  bottom: '15%',
                  width: '2px',
                  transform: 'translateX(-50%) rotate(-20deg)',
                }}
              />
              <motion.div
                className="bouquet-stem"
                initial={{ height: 0 }}
                animate={{ height: '50%' }}
                transition={{ duration: 1, delay: 0.7 }}
                style={{
                  left: '65%',
                  bottom: '15%',
                  width: '2px',
                  transform: 'translateX(-50%) rotate(20deg)',
                }}
              />

              {/* Flowers - appearing in layers */}
              {stage >= 2 && outerFlowers.map((f, i) => (
                <Flower key={`outer-${i}`} {...f} />
              ))}

              {stage >= 3 && (
                <>
                  {middleFlowers.map((f, i) => (
                    <Flower key={`mid-${i}`} {...f} />
                  ))}
                  {innerFlowers.map((f, i) => (
                    <Flower key={`inner-${i}`} {...f} />
                  ))}
                </>
              )}

              {/* Wrapper - wrapping the stems */}
              {stage >= 3 && (
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '8%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '110px',
                    height: '75px',
                    background: 'linear-gradient(135deg, #fff5ee, #f7e8e3)',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                    borderRadius: '0 0 8px 8px',
                    zIndex: 10,
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.15)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              )}

              {/* Ribbon */}
              {stage >= 3 && (
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '28%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '25px',
                    height: '50px',
                    background: '#ff69b4',
                    borderRadius: '0 0 10px 10px',
                    zIndex: 11,
                    boxShadow: '0 2px 8px rgba(255,105,180,0.3)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, originY: 0 }}
                />
              )}

              {/* Sparkles around bouquet */}
              {stage >= 3 && Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  style={{
                    position: 'absolute',
                    width: '3px',
                    height: '3px',
                    background: '#f0d68a',
                    borderRadius: '50%',
                    boxShadow: '0 0 6px #f0d68a',
                    left: `${25 + Math.random() * 50}%`,
                    top: `${10 + Math.random() * 55}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 2, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* ============ MESSAGES ============ */}
          {stage >= 5 && stage <= 7 && (
            <motion.div
              className="bouquet-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bouquet-message-title">Princess Sofi ❤️</div>

              {stage >= 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bouquet-message-text"
                >
                  This bouquet is for you.
                </motion.div>
              )}

              {stage >= 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="bouquet-message-text" style={{ fontSize: '1.3rem', marginTop: '1rem' }}>
                    Thank you for accepting my love.
                  </div>

                  {stage >= 7 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="bouquet-message-promise">
                        I promise to always cherish you,
                        <br />support you,
                        <br />and create beautiful memories together.
                      </div>

                      <motion.div
                        className="bouquet-final-title"
                        style={{ marginTop: '1.5rem' }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', duration: 1.5, delay: 0.3 }}
                      >
                        ❤️ I LOVE YOU
                        <br />PRINCESS SOFI ❤️
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Tap hint */}
          {stage >= 5 && stage < 7 && (
            <motion.div
              style={{
                position: 'fixed',
                bottom: '25px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.8rem',
                letterSpacing: '2px',
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to continue 💕
            </motion.div>
          )}

          {/* ============ ENDING ============ */}
          {stage === 8 && (
            <motion.div
              className="bouquet-ending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bouquet-ending-letter">
                <div className="bouquet-ending-title">💌</div>
                <div className="bouquet-message-text" style={{ fontSize: '1.3rem', lineHeight: 1.8 }}>
                  Today becomes the beginning
                  <br />of our beautiful story.
                </div>
              </div>

              <motion.div
                style={{ marginTop: '1.5rem', fontSize: '3rem' }}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💍
              </motion.div>

              <div className="bouquet-official">
                Officially My Girlfriend ❤️
              </div>

              <motion.button
                style={{
                  marginTop: '2rem',
                  padding: '12px 36px',
                  background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,105,180,0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
              >
                Continue <i className="bi bi-arrow-right"></i>
              </motion.button>
            </motion.div>
          )}

          {/* Small bouquet displayed during message stages */}
          {stage >= 5 && stage <= 7 && (
            <div style={{
              position: 'absolute',
              bottom: '25%',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              fontSize: '1.8rem',
              opacity: 0.7,
            }}>
              <motion.span animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>🌹</motion.span>
              <motion.span animate={{ y: [3, -3, 3] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}>🌸</motion.span>
              <motion.span animate={{ y: [-2, 4, -2] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}>🌹</motion.span>
              <motion.span animate={{ y: [3, -2, 3] }} transition={{ duration: 2.3, repeat: Infinity, delay: 0.2 }}>🤍</motion.span>
              <motion.span animate={{ y: [-4, 2, -4] }} transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}>🌺</motion.span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Bouquet;
