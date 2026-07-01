import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import Gallery from './components/Gallery';
import Reasons from './components/Reasons';
import Countdown from './components/Countdown';
import Quotes from './components/Quotes';
import Proposal from './components/Proposal';
import Footer from './components/Footer';

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  const handleLoadingFinish = () => {
    setShowLoading(false);
    setShowWelcome(true);
  };

  const handleWelcomeTap = () => {
    setShowWelcome(false);
    setShowContent(true);
    setTimeout(() => setShowMusicPlayer(true), 500);
  };

  useEffect(() => {
    document.title = 'For Princess Sofi ❤️';
  }, []);

  return (
    <div className="app" style={{ overflow: 'hidden' }}>
      {/* Loading Screen */}
      {showLoading && <LoadingScreen onFinish={handleLoadingFinish} />}

      {/* Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="music-overlay"
            onClick={handleWelcomeTap}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 1.5 }}
            >
              <span style={{ display: 'inline-block', animation: 'heartbeat 1s ease-in-out infinite' }}>❤️</span>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="music-overlay-title"
            >
              Welcome Princess Sofi ❤️
            </motion.div>

            <motion.div
              className="music-overlay-tap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Tap anywhere to continue
            </motion.div>

            <motion.div
              style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b4c6b', fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              I made something special just for you.
            </motion.div>

            <motion.div
              style={{ marginTop: '2rem', fontSize: '2rem' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💝
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <>
          <Hero />
          <LoveLetter />
          <Gallery />
          <Reasons />
          <Countdown />
          <Quotes />
          <Proposal />
          <Footer />
        </>
      )}

      {/* Music Player */}
      {showMusicPlayer && <MusicPlayer />}
    </div>
  );
};

export default App;
