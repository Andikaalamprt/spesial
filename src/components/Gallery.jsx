import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  { emoji: '🌹', caption: 'You are my rose 🌹', color: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)' },
  { emoji: '🌸', caption: 'Beautiful like sakura 🌸', color: 'linear-gradient(135deg, #ffb6c1, #ff69b4)' },
  { emoji: '✨', caption: 'You shine so bright ✨', color: 'linear-gradient(135deg, #f0d68a, #d4af37)' },
  { emoji: '💖', caption: 'My princess 💖', color: 'linear-gradient(135deg, #ff69b4, #ff1493)' },
  { emoji: '🌙', caption: 'My moonlight 🌙', color: 'linear-gradient(135deg, #87ceeb, #6a5acd)' },
  { emoji: '☀️', caption: 'My sunshine ☀️', color: 'linear-gradient(135deg, #ffd700, #ffa500)' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotate: -10 },
  visible: { opacity: 1, y: 0, rotate: 0 },
};

const Gallery = () => {
  return (
    <section className="gallery-section" id="gallery">
      <motion.div
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Our Gallery 📸
      </motion.div>

      <motion.div
        className="gallery-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className="polaroid-card"
            variants={itemVariants}
            whileHover={{
              rotate: index % 2 === 0 ? -3 : 3,
              scale: 1.05,
              transition: { type: 'spring', stiffness: 300 },
            }}
          >
            <div
              className="polaroid-img"
              style={{ background: item.color }}
            >
              <span style={{ fontSize: '4rem' }}>{item.emoji}</span>
            </div>
            <div className="polaroid-caption">{item.caption}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
