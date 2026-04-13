import { useEffect, useRef, useState } from 'react';

const N = {
  C3: 130.81, E3: 164.81, G3: 196.00,
  A3: 220.00, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
};

function click(ctx: AudioContext, dest: AudioNode, t: number, vol = 0.12) {
  const len = Math.floor(ctx.sampleRate * 0.015);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.5);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  g.gain.value = vol;
  src.connect(g);
  g.connect(dest);
  try { src.start(Math.max(t, ctx.currentTime)); } catch (_) {}
}

function note(
  ctx: AudioContext, dest: AudioNode,
  freq: number, t: number, dur: number, vol = 0.05, type: OscillatorType = 'sine'
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const st = Math.max(t, ctx.currentTime);
  g.gain.setValueAtTime(0, st);
  g.gain.linearRampToValueAtTime(vol, st + 0.05);
  g.gain.setTargetAtTime(0, st + dur * 0.75, dur * 0.07);
  osc.connect(g);
  g.connect(dest);
  try {
    osc.start(st);
    osc.stop(st + dur + 0.3);
  } catch (_) {}
}

function scheduleScene(ctx: AudioContext, dest: AudioNode, scene: number) {
  const now = ctx.currentTime + 0.06;

  if (scene === 0) {
    // Chaotic scrolling + minor melody
    [0, 0.13, 0.31, 0.42, 0.57, 0.79, 0.88, 1.12, 1.25, 1.42, 1.63, 1.78, 1.94, 2.18, 2.35, 2.52, 2.72, 2.88]
      .forEach(t => click(ctx, dest, now + t, 0.1));
    [
      [N.A3, 0, 0.5], [N.C4, 0.5, 0.3], [N.E4, 0.9, 0.4],
      [N.G4, 1.4, 0.3], [N.A4, 1.8, 0.5], [N.G4, 2.4, 0.3], [N.E4, 2.8, 0.3],
    ].forEach(([f, t, d]) => note(ctx, dest, f, now + t, d, 0.04, 'triangle'));
    note(ctx, dest, N.A3 / 2, now, 3, 0.04, 'sine');

  } else if (scene === 1) {
    // Rapid, anxious scrolling — closer clicks, faster descending melody
    for (let i = 0; i < 28; i++) {
      const t = i * 0.1 + (Math.random() * 0.04 - 0.02);
      click(ctx, dest, now + Math.min(Math.max(t, 0), 2.9), 0.09);
    }
    [
      [N.A4, 0, 0.22], [N.G4, 0.24, 0.22], [N.F4, 0.48, 0.22],
      [N.E4, 0.72, 0.22], [N.D4, 1.02, 0.22], [N.C4, 1.28, 0.22],
      [N.A3, 1.56, 0.38], [N.C4, 2.08, 0.22], [N.E4, 2.38, 0.28], [N.A4, 2.72, 0.28],
    ].forEach(([f, t, d]) => note(ctx, dest, f, now + t, d, 0.04, 'sawtooth'));

  } else if (scene === 2) {
    // Low thud then complete silence
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);
    g.gain.setValueAtTime(0.35, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(g);
    g.connect(dest);
    try { osc.start(now); osc.stop(now + 0.35); } catch (_) {}

  } else if (scene === 3) {
    // Uplifting — C major chord arpeggiated upward
    [N.C3, N.G3, N.C4, N.E4, N.G4, N.C5].forEach((f, i) =>
      note(ctx, dest, f, now + i * 0.13, 2.5, 0.04, 'sine')
    );
    [
      [N.C5, 0.8, 0.4], [N.D5, 1.3, 0.4], [N.E5, 1.8, 0.55], [N.G5, 2.45, 0.6],
    ].forEach(([f, t, d]) => note(ctx, dest, f, now + t, d, 0.055, 'sine'));

  } else if (scene === 4) {
    // Bright resolution — Bitecast reveal
    [N.C3, N.E3, N.G3, N.C4, N.E4, N.G4].forEach((f, i) =>
      note(ctx, dest, f, now + i * 0.09, 3, 0.04, 'sine')
    );
    [
      [N.C5, 0.2, 0.3], [N.E5, 0.55, 0.3], [N.G5, 0.9, 0.35],
      [N.A5, 1.3, 0.5], [N.G5, 1.9, 0.35], [N.E5, 2.3, 0.4], [N.C5, 2.75, 0.65],
    ].forEach(([f, t, d]) => note(ctx, dest, f, now + t, d, 0.06, 'sine'));
  }
}

export function AudioManager({ currentScene }: { currentScene: number }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const sceneGainRef = useRef<GainNode | null>(null);
  const [ready, setReady] = useState(false);
  const [showTap, setShowTap] = useState(true);

  const startAudio = () => {
    if (ctxRef.current) {
      ctxRef.current.resume();
      setShowTap(false);
      return;
    }
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0.45;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    ctx.resume().then(() => {
      setReady(true);
      setShowTap(false);
    });
  };

  // Try to auto-start (works if user has already interacted with the page)
  useEffect(() => {
    const tryAuto = async () => {
      try {
        const ctx = new AudioContext();
        await ctx.resume();
        if (ctx.state === 'running') {
          const master = ctx.createGain();
          master.gain.value = 0.45;
          master.connect(ctx.destination);
          ctxRef.current = ctx;
          masterRef.current = master;
          setReady(true);
          setShowTap(false);
        } else {
          ctx.close();
        }
      } catch (_) {}
    };
    tryAuto();
    return () => { ctxRef.current?.close(); };
  }, []);

  // Play audio when scene changes and audio is ready
  useEffect(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master || !ready) return;

    // Fade out previous scene's channel
    if (sceneGainRef.current) {
      const old = sceneGainRef.current;
      old.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
      setTimeout(() => { try { old.disconnect(); } catch (_) {} }, 700);
    }

    const sceneGain = ctx.createGain();
    sceneGain.gain.value = 1;
    sceneGain.connect(master);
    sceneGainRef.current = sceneGain;

    scheduleScene(ctx, sceneGain, currentScene);
  }, [currentScene, ready]);

  if (!showTap) return null;

  return (
    <button
      className="absolute z-[100] cursor-pointer"
      style={{
        bottom: '12cqw',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.65)',
        color: 'white',
        fontSize: '4cqw',
        padding: '2.5cqw 6cqw',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.25)',
        backdropFilter: 'blur(8px)',
        whiteSpace: 'nowrap',
      }}
      onClick={startAudio}
    >
      Tap for audio
    </button>
  );
}
