import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

const SCENE_DURATIONS = {
  scene1: 3000,
  scene2: 3000,
  scene3: 3000,
  scene4: 3000,
  scene5: 3000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });

  return (
    <div className="relative w-full h-screen mx-auto overflow-hidden bg-color-bg-dark flex justify-center max-w-[calc(100vh*9/16)] border-x border-white/10 shadow-2xl">
      {/* Persistent noise overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Persistent background layers */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-color-bg-dark to-[#050814]"
          animate={{
            opacity: currentScene >= 3 ? 0.3 : 1
          }}
          transition={{ duration: 1 }}
        />
        
        {/* Glow orb */}
        <motion.div 
          className="absolute rounded-full blur-[100px] opacity-40 mix-blend-screen"
          style={{ width: '80vh', height: '80vh', background: 'var(--color-primary)' }}
          animate={{
            x: currentScene === 0 ? '-30%' : currentScene === 1 ? '10%' : currentScene === 2 ? '-10%' : currentScene === 3 ? '40%' : '5%',
            y: currentScene === 0 ? '-20%' : currentScene === 1 ? '40%' : currentScene === 2 ? '10%' : currentScene === 3 ? '-20%' : '30%',
            scale: currentScene === 4 ? 1.5 : 1,
            opacity: currentScene === 4 ? 0.2 : 0.4
          }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        
        <motion.div 
          className="absolute rounded-full blur-[120px] opacity-30 mix-blend-screen"
          style={{ width: '90vh', height: '90vh', background: 'var(--color-accent)' }}
          animate={{
            x: currentScene === 0 ? '40%' : currentScene === 1 ? '-20%' : currentScene === 2 ? '30%' : currentScene === 3 ? '-40%' : '-10%',
            y: currentScene === 0 ? '60%' : currentScene === 1 ? '-10%' : currentScene === 2 ? '50%' : currentScene === 3 ? '30%' : '-30%',
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <Scene1 key="scene1" />}
        {currentScene === 1 && <Scene2 key="scene2" />}
        {currentScene === 2 && <Scene3 key="scene3" />}
        {currentScene === 3 && <Scene4 key="scene4" />}
        {currentScene === 4 && <Scene5 key="scene5" />}
      </AnimatePresence>
    </div>
  );
}
