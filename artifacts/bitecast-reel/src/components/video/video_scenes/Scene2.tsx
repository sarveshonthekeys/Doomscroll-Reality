import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/scrolling1.jpg`}
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale"
        animate={{ scale: [1.15, 1.3], rotate: [0, -5] }}
        transition={{ duration: 3, ease: 'easeIn' }}
      />

      {/* Clock visual abstraction */}
      <motion.div
        className="absolute border-[1px] rounded-full flex items-center justify-center"
        style={{
          width: '80cqw',
          height: '80cqw',
          borderColor: 'rgba(244,63,94,0.3)',
        }}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ rotate: { duration: 3, ease: 'linear' }, opacity: { duration: 0.5 } }}
      >
        <div
          className="absolute bg-[var(--color-accent)] origin-bottom shadow-[0_0_15px_rgba(244,63,94,1)]"
          style={{ width: '1px', height: '40%', top: '10%' }}
        />
      </motion.div>

      <div className="relative z-10 text-center w-full" style={{ padding: '0 5cqw' }}>
        <motion.h2
          className="font-black text-white italic tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          style={{ fontSize: '20cqw' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          30 MINS
        </motion.h2>

        <motion.h3
          className="font-bold uppercase tracking-widest"
          style={{ fontSize: '9cqw', color: 'var(--color-accent)', marginTop: '-2cqw' }}
          initial={{ opacity: 0, letterSpacing: '0em' }}
          animate={phase >= 1 ? { opacity: 1, letterSpacing: '0.1em' } : { opacity: 0, letterSpacing: '0em' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Later...
        </motion.h3>

        {/* Endless scrolling UI metaphor */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-[4cqw] opacity-20 pointer-events-none -z-10 overflow-hidden"
          style={{ top: '30vh', width: '60cqw', height: '150vh' }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full bg-white/20 rounded-xl flex-shrink-0"
              style={{ height: '30cqw' }}
              animate={{ y: ['0%', '-300%'] }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
