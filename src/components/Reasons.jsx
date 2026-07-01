import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { icon: '❤️', title: 'Senyummu', text: 'Senyummu indah dan selalu bisa membuat hariku menjadi lebih baik.' },
  { icon: '🌸', title: 'Kebaikanmu', text: 'Kamu baik hati dan selalu peduli dengan orang-orang di sekitarmu.' },
  { icon: '✨', title: 'Cahayamu', text: 'Kamu selalu membuat hariku lebih baik hanya dengan kehadiranmu.' },
  { icon: '💖', title: 'Kenyamanan', text: 'Bersamamu aku merasa nyaman dan menjadi diriku sendiri.' },
  { icon: '🌹', title: 'Keistimewaanmu', text: 'Kamu spesial dan tidak ada yang bisa menggantikanmu di hatiku.' },
  { icon: '🌟', title: 'Segalanya', text: 'Kamu adalah alasan aku tersenyum setiap hari.' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const Reasons = () => {
  return (
    <section className="reasons-section" id="reasons">
      <motion.div
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Why I Like You 💭
      </motion.div>

      <motion.div
        className="reasons-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="reason-card"
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <span className="reason-icon">{reason.icon}</span>
            <h3 className="reason-title">{reason.title}</h3>
            <p className="reason-text">{reason.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Reasons;
