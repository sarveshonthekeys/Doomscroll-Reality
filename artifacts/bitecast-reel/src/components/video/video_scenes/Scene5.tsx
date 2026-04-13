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
      className="absolute inset-0 flex flex-col items-center justify-center bg-color-bg-light overflow-hidden"
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/logo.png`} 
        className="w-[40vw] h-[40vw] object-contain mb-8 drop-shadow-xl"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.4 }}
      />
      
      <div className="text-center px-[8vw]">
        <motion.h1 
          className="text-[16vw] font-black text-color-bg-dark tracking-tighter leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Bitecast
        </motion.h1>
        
        <motion.p 
          className="text-[5vw] font-medium text-color-text-muted mt-4 leading-tight"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          Curated self-improvement content.
        </motion.p>
        
        <motion.div
          className="mt-12 bg-color-primary text-white px-8 py-3 rounded-full inline-block font-bold text-[4.5vw] shadow-[0_10px_40px_rgba(0,209,178,0.4)]"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          COMING SOON
        </motion.div>
      </div>

      {/* Decorative clean UI elements */}
      <motion.div 
        className="absolute top-[10vh] left-[10vw] w-[15vw] h-[2vw] bg-color-text-muted/20 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '15vw' }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.div 
        className="absolute top-[15vh] left-[10vw] w-[25vw] h-[2vw] bg-color-text-muted/20 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '25vw' }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      
      <motion.div 
        className="absolute bottom-[10vh] right-[10vw] w-[20vw] h-[2vw] bg-color-primary/30 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '20vw' }}
        transition={{ duration: 1, delay: 1.4 }}
      />
    </motion.div>
  );
}
