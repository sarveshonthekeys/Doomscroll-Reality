import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex bg-[#0A1128] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Left Side: Chaos — video */}
      <motion.div
        className="w-1/2 h-full relative overflow-hidden border-r border-white/10"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.75, filter: 'saturate(0.3) brightness(0.6)' }}
          src={`${import.meta.env.BASE_URL}videos/chaos.mp4`}
          autoPlay
          muted
          playsInline
          loop
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Right Side: Clarity */}
      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.4 }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}images/split.png`}
          className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-right right-0 ml-[-100%]"
        />
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: 'rgba(150,150,150,0.1)' }} />
      </motion.div>

      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          className="bg-[#0A1128]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl text-center"
          style={{ padding: '6cqw 8cqw', width: '85cqw' }}
        >
          <h2 className="font-black text-white leading-[1.1] tracking-tight" style={{ fontSize: '11cqw' }}>
            <motion.span
              className="block text-white/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Your feed
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
            >
              shapes your
            </motion.span>
            <motion.span
              className="block mt-[2cqw]"
              style={{ color: 'var(--color-primary)', fontSize: '16cqw' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            >
              MIND
            </motion.span>
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
