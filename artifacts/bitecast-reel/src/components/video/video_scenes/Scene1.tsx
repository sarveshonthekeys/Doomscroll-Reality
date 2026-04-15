import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Scene1() {
  const [phase, setPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.playbackRate = 1.2;
    video.play().catch(() => {});
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55, filter: 'saturate(0.3) brightness(0.65)' }}
        src={`${import.meta.env.BASE_URL}videos/scrolling.mp4`}
        muted
        playsInline
        loop
      />

      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      <div className="relative z-10 w-full" style={{ padding: '0 10cqw' }}>
        <motion.div
          className="bg-[var(--color-accent)] rounded-full inline-block mb-[6cqw]"
          style={{ padding: '2cqw 6cqw', boxShadow: '0 0 24px rgba(204,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.2 }}
        >
          <span className="text-white font-bold tracking-widest uppercase" style={{ fontSize: '4cqw' }}>THE LOOP</span>
        </motion.div>

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
            style={{ color: 'var(--color-accent)' }}
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
