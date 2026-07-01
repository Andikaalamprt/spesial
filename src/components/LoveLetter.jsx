import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const letterContent = `Hai Princess Sofi,

Mungkin ini adalah hal paling berani yang pernah kulakukan.

Aku hanya ingin jujur.

Sejak mengenalmu, hari-hariku terasa berbeda. Setiap hari yang kulalui kini terasa lebih berwarna. Aku menemukan alasan untuk tersenyum lebih sering, dan hatiku terasa lebih hangat.

Senyummu, caramu berbicara, cara kamu tertawa, semuanya selalu berhasil membuatku tersenyum tanpa sebab.

Aku tidak tahu bagaimana akhir cerita ini.

Tapi aku ingin mencoba menjadi bagian dari cerita hidupmu.

Setiap detik bersamamu adalah anugerah yang tak ternilai. Kamu membuat dunia ini terasa lebih indah hanya dengan keberadaanmu.

Karena itu...

Ada sesuatu yang ingin kutanyakan...`;

const LoveLetter = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);
  const hasStartedRef = useRef(false);

  const startTyping = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 20);
    intervalRef.current = interval;
  }, []);

  // Observer effect - triggers typing when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          startTyping();
        }
      },
      { threshold: 0.2 }
    );

    const el = document.getElementById('love-letter');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [startTyping]);

  // Cleanup interval on unmount only
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="love-letter-section" id="love-letter">
      <motion.div
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        A Letter For You 💌
      </motion.div>

      <motion.div
        className="love-letter-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="love-letter-header">
          <div className="love-letter-envelope">💌</div>
        </div>

        <div className="love-letter-content">
          {displayedText}
          {!isComplete && <span className="typing-cursor" />}
        </div>

        {isComplete && (
          <motion.div
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontSize: '1.5rem',
              color: '#ff69b4',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
          >
            ❤️
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default LoveLetter;
