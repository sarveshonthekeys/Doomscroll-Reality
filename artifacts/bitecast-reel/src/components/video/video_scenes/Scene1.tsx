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
      className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/scrolling1.jpg`} 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
        animate={{ scale: [1, 1.15], filter: ['blur(0px)', 'blur(5px)'] }}
        transition={{ duration: 3, ease: 'linear' }}
      />
      
      <div className="relative z-10 w-full px-[10vw]">
        <motion.div 
          className="bg-color-accent px-6 py-2 rounded-full inline-block mb-6 shadow-[0_0_30px_rgba(244,63,94,0.5)]"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.2 }}
        >
          <span className="text-white font-bold tracking-widest text-[3vw] uppercase">THE LOOP</span>
        </motion.div>
        
        <h1 className="text-[12vw] font-black leading-[1.1] text-white tracking-tight drop-shadow-2xl">
          <motion.span 
            className="block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.4 }}
          >
            You scroll
          </motion.span>
          
          <motion.span 
            className="block text-color-primary"
            initial={{ opacity: 0, x: 50 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            for 'inspiration'
          </motion.span>
        </h1>
      </div>
      
      {/* Glitch effects */}
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
            'inset(100% 0 0% 0)'
          ]
        }}
        transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1], repeat: Infinity, repeatDelay: 1.5 }}
      />
    </motion.div>
  );
}
