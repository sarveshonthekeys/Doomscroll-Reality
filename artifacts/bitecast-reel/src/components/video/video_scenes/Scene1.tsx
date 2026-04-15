import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >

      <div className="relative z-10 w-full" style={{ padding: '0 10cqw' }}>
        <h1 className="font-black leading-[1.15] text-white tracking-tight drop-shadow-2xl" style={{ fontSize: '11cqw' }}>
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.4 }}
          >
            You scroll
          </motion.span>

          <motion.span
            className="block"
            style={{ color: '#AAAAAA' }}
            initial={{ opacity: 0, x: 50 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            for&nbsp;'inspiration'
          </motion.span>
        </h1>
      </div>

      {/* Glitch effect */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay bg-white opacity-0"
        animate={{
          opacity: [0, 0.8, 0, 0.2, 0, 0.5, 0],
          clipPath: [
            'inset(0% 0 100% 0)',
            'inset(20% 0 70% 0)',
            'inset(10% 0 80% 0)',
            'inset(50% 0 40% 0)',
            'inset(80% 0 10% 0)',
            'inset(30% 0 60% 0)',
            'inset(100% 0 0% 0)',
          ],
        }}
        transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1], repeat: Infinity, repeatDelay: 1.5 }}
      />
    </motion.div>
  );
}
