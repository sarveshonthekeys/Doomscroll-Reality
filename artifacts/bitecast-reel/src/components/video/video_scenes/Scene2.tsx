import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 3;
    video.playbackRate = 1.4;
    video.play().catch(() => {});
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.6 }}
    >
      {/* Same scrolling video, continued from a later timestamp */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.3, filter: 'saturate(0.15) brightness(0.5)' }}
        src={`${import.meta.env.BASE_URL}videos/scrolling.mp4`}
        muted
        playsInline
        loop
      />

      {/* Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Clock visual abstraction */}
      <motion.div
        className="absolute border-[1px] rounded-full flex items-center justify-center"
        style={{
          width: '80cqw',
          height: '80cqw',
          borderColor: 'rgba(204,0,0,0.3)',
        }}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ rotate: { duration: 3, ease: 'linear' }, opacity: { duration: 0.5 } }}
      >
        <div
          className="absolute bg-[var(--color-accent)] origin-bottom"
          style={{ width: '1px', height: '40%', top: '10%', boxShadow: '0 0 15px rgba(204,0,0,1)' }}
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

      </div>
    </motion.div>
  );
}
