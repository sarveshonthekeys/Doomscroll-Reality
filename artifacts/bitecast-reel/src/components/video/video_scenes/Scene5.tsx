import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle red glow behind logo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '60cqw',
          height: '60cqw',
          background: 'radial-gradient(circle, rgba(150,150,150,0.15) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -75%)',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />

      {/* Bitecast logo — inverted for dark background */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        className="object-contain"
        style={{
          width: '35cqw',
          height: '35cqw',
          marginBottom: '6cqw',
          filter: 'invert(1)',
        }}
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.4 }}
      />

      <div className="text-center" style={{ padding: '0 8cqw' }}>
        <motion.h1
          className="font-black text-white tracking-tighter leading-none"
          style={{ fontSize: '18cqw' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Bitecast
        </motion.h1>

        <motion.p
          className="font-medium leading-tight"
          style={{ fontSize: '5cqw', color: '#888888', marginTop: '4cqw' }}
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          Curated self-improvement content.
        </motion.p>

        <motion.div
          className="text-white font-bold rounded-full inline-block"
          style={{
            marginTop: '10cqw',
            background: 'var(--color-primary)',
            padding: '3cqw 8cqw',
            fontSize: '5cqw',
            boxShadow: '0 10px 40px rgba(150,150,150,0.2)',
            letterSpacing: '0.05em',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          COMING SOON
        </motion.div>
      </div>

      {/* Decorative dark lines */}
      <motion.div
        className="absolute rounded-full"
        style={{ top: '10vh', left: '10cqw', height: '1.5cqw', background: 'rgba(255,255,255,0.1)' }}
        initial={{ width: 0 }}
        animate={{ width: '15cqw' }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ top: 'calc(10vh + 4cqw)', left: '10cqw', height: '1.5cqw', background: 'rgba(255,255,255,0.07)' }}
        initial={{ width: 0 }}
        animate={{ width: '25cqw' }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ bottom: '10vh', right: '10cqw', height: '1.5cqw', background: 'rgba(150,150,150,0.3)' }}
        initial={{ width: 0 }}
        animate={{ width: '20cqw' }}
        transition={{ duration: 1, delay: 1.4 }}
      />
    </motion.div>
  );
}
