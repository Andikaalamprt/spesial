import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particle = ({ type, index, total }) => {
  const style = useMemo(() => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 5;
    return {
      left: `${left}%`,
      top: `${top}%`,
      '--duration': `${duration}s`,
      '--delay': `${delay}s`,
    };
  }, []);

  if (type === 'heart') {
    const emojis = ['❤️', '💖', '💗', '💕', '♥️'];
    return (
      <div className="particle heart-particle" style={style}>
        {emojis[index % emojis.length]}
      </div>
    );
  }
  if (type === 'sparkle') {
    return <div className="particle sparkle-particle" style={style} />;
  }
  if (type === 'star') {
    return <div className="particle star-particle" style={style} />;
  }
  if (type === 'sakura') {
    const emojis = ['🌸', '🌺', '💮'];
    return (
      <div className="particle sakura-particle" style={style}>
        {emojis[index % emojis.length]}
      </div>
    );
  }
  return null;
};

const Hero = () => {
  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) items.push({ type: 'heart', index: i });
    for (let i = 0; i < 30; i++) items.push({ type: 'sparkle', index: i });
    for (let i = 0; i < 40; i++) items.push({ type: 'star', index: i });
    for (let i = 0; i < 15; i++) items.push({ type: 'sakura', index: i });
    return items;
  }, []);

  const scrollToLoveLetter = () => {
    const el = document.getElementById('love-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background particles */}
      <div className="hero-bg-animation">
        {particles.map((p, i) => (
          <Particle key={i} type={p.type} index={p.index} total={particles.length} />
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <div className="hero-greeting">
            Hi Princess Sofi ❤️
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <div className="hero-message">
            I have something to tell you...
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <button className="hero-btn" onClick={scrollToLoveLetter}>
            <i className="bi bi-envelope-heart-fill"></i>
            Open My Letter
            <i className="bi bi-arrow-down-circle"></i>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ marginTop: '4rem', fontSize: '1.5rem', opacity: 0.3 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <i className="bi bi-chevron-down"></i>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
