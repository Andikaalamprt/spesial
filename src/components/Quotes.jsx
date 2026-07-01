import React from 'react';
import { motion } from 'framer-motion';

const quotes = [
  { text: 'Aku tidak tahu bagaimana akhir cerita ini, tapi aku ingin kamu ada di dalamnya.', author: '— From My Heart' },
  { text: 'Kamu adalah alasan aku percaya pada takdir. Karena bertemu denganmu adalah hal terindah yang pernah terjadi.', author: '— For You' },
  { text: 'Setiap detik bersamamu adalah halaman baru dalam buku cerita terindahku.', author: '— My Love Story' },
  { text: 'Cinta sejati bukan tentang menemukan seseorang yang sempurna, tapi belajar melihat kesempurnaan dalam ketidaksempurnaan.', author: '— Wisdom of Love' },
  { text: 'Aku mencintaimu bukan karena kamu sempurna, tapi karena bersamamu, aku merasa sempurna.', author: '— My Heart' },
  { text: 'Kamu adalah rumah yang selalu ingin aku pulangi, setiap saat, setiap waktu.', author: '— Always' },
  { text: 'Jika hidup adalah sebuah lukisan, maka kamu adalah warna terindah di atas kanvasku.', author: '— My Muse' },
  { text: 'Aku tidak perlu kemana-mana karena bersamamu adalah tempat terbaik di dunia.', author: '— Forever Yours' },
];

const Quotes = () => {
  return (
    <section className="quotes-section" id="quotes">
      <motion.div
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Love Quotes 💕
      </motion.div>

      <motion.div
        className="quote-carousel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div id="quoteCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#quoteCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? 'active' : ''}
                aria-current={i === 0 ? 'true' : 'false'}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {quotes.map((quote, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <div className="quote-card">
                  <div className="quote-icon">💖</div>
                  <div className="quote-text">"{quote.text}"</div>
                  <div className="quote-author">{quote.author}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#quoteCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#quoteCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Quotes;
