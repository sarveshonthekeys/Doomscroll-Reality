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
        className="absolute w-[80vw] h-[80vw] border-[1px] border-color-accent/30 rounded-full flex items-center justify-center"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ rotate: { duration: 3, ease: 'linear' }, opacity: { duration: 0.5 } }}
      >
        <div className="absolute w-[1px] h-[40%] bg-color-accent top-[10%] origin-bottom shadow-[0_0_15px_rgba(244,63,94,1)]" />
      </motion.div>
      
      <div className="relative z-10 text-center w-full px-[5vw]">
        <motion.h2 
          className="text-[18vw] font-black text-white italic tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          30 MINS
        </motion.h2>
        
        <motion.h3 
          className="text-[8vw] font-bold text-color-accent uppercase tracking-widest mt-[-2vw]"
          initial={{ opacity: 0, letterSpacing: '0em' }}
          animate={phase >= 1 ? { opacity: 1, letterSpacing: '0.1em' } : { opacity: 0, letterSpacing: '0em' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Later...
        </motion.h3>
        
        {/* Endless scrolling ui metaphor */}
        <div className="absolute top-[30vh] left-1/2 -translate-x-1/2 w-[60vw] h-[150vh] flex flex-col gap-4 opacity-20 pointer-events-none -z-10">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-full h-[30vw] bg-white/20 rounded-xl"
              animate={{ y: ['0%', '-300%'] }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
