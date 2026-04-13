import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 w-full text-center" style={{ padding: '0 8cqw' }}>
        <h2
          className="font-black text-[#0A1128] leading-[1.1] tracking-tight"
          style={{ fontSize: '15cqw' }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.3 }}
          >
            Did you
          </motion.span>
          <motion.span
            className="block"
            style={{ color: 'var(--color-accent)' }}
            initial={{ opacity: 0, y: 30, rotateX: 90 }}
            animate={phase >= 1 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 90 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            learn
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30, rotateX: 90 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 90 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            anything?
          </motion.span>
        </h2>
      </div>

      {/* Abstract confusion lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 10 50 Q 30 10, 50 50 T 90 50"
          fill="transparent"
          stroke="#0A1128"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, d: ['M 10 50 Q 30 10, 50 50 T 90 50', 'M 10 50 Q 30 90, 50 50 T 90 50', 'M 10 50 Q 30 10, 50 50 T 90 50'] }}
          transition={{ pathLength: { duration: 1.5 }, d: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <motion.path
          d="M 20 80 Q 50 20, 80 80"
          fill="transparent"
          stroke="#F43F5E"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={phase >= 1 ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1 }}
        />
      </svg>
    </motion.div>
  );
}
