import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-text">
          Made with <i className="bi bi-heart-fill"></i>
        </div>
        <div className="footer-name">
          Especially for Princess Sofi ❤️
        </div>
        <motion.div
          style={{ marginTop: '1.5rem', fontSize: '1.5rem', opacity: 0.5 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
