import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Bouquet from './Bouquet';

const Proposal = () => {
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const [showBouquet, setShowBouquet] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const noBtnRef = useRef(null);
  const buttonsRef = useRef(null);

  const getRandomPosition = useCallback(() => {
    if (!buttonsRef.current) return {};
    const parentRect = buttonsRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 50;

    const padding = 20;
    const maxX = parentRect.width - btnWidth - padding;
    const maxY = parentRect.height - btnHeight - padding;

    let x = Math.random() * Math.max(maxX, 80);
    let y = Math.random() * Math.max(maxY, 60);

    x = Math.max(padding, Math.min(x, maxX));
    y = Math.max(padding, Math.min(y, maxY));

    return {
      position: 'absolute',
      left: x,
      top: y,
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  }, []);

  const handleNoHover = useCallback(() => {
    setHoverCount(prev => prev + 1);
    const position = getRandomPosition();
    setNoBtnStyle(position);
  }, [getRandomPosition]);

  const handleYesClick = () => {
    setShowBouquet(true);
  };

  return (
    <>
      <section className="proposal-section" id="proposal">
        {/* Stars Background */}
        <div className="proposal-stars">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'white',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="proposal-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="proposal-question-top">Princess Sofi...</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8, type: 'spring' }}
          >
            <div className="proposal-question-main">
              Would you be my girlfriend?
            </div>
          </motion.div>

          <motion.div
            style={{ fontSize: '3rem', marginBottom: '2rem' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ❤️
          </motion.div>

          {/* Buttons container with position: relative for NO button escape */}
          <div
            className="proposal-buttons"
            ref={buttonsRef}
            style={{ position: 'relative', minHeight: '120px' }}
          >
            {/* YES Button */}
            <motion.button
              className="proposal-btn-yes"
              onClick={handleYesClick}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(255, 105, 180, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              YES <i className="bi bi-heart-fill"></i>
            </motion.button>

            {/* NO Button - runs away from cursor */}
            <motion.button
              ref={noBtnRef}
              className="proposal-btn-no"
              style={noBtnStyle}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={(e) => e.preventDefault()}
              whileHover={{ scale: 0.9 }}
            >
              NO 🙈
            </motion.button>
          </div>

          {hoverCount > 0 && (
            <motion.div
              style={{
                marginTop: '2rem',
                color: '#e0bfb8',
                fontSize: '0.9rem',
                fontWeight: 300,
                textAlign: 'center',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {hoverCount <= 2 ? '😊 Hehe, you can\'t escape love!' :
               hoverCount <= 4 ? '🙈 Stop running! Just say YES!' :
               '😍 There is no escaping from true love!'}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Bouquet Animation */}
      {showBouquet && <Bouquet onClose={() => setShowBouquet(false)} />}
    </>
  );
};

export default Proposal;
