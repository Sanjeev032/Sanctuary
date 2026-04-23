import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wind } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { useAuth } from '../context/AuthContext';

interface BreathingRecoProps {
  onStart: () => void;
}

export const BreathingReco = ({ onStart }: BreathingRecoProps) => {
  const { currentMood } = useMood();
  const [practice, setPractice] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/v1/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => { if (data.practice) setPractice(data.practice); })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <header className="space-y-4">
        <span className="text-primary font-bold tracking-widest text-xs uppercase">SYNCED RECOMMENDATION</span>
        <h1 className="text-5xl md:text-6xl font-black text-on-surface leading-tight">Neural Regulation</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 text-white p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col justify-between min-h-[450px]" style={{ backgroundColor: currentMood?.color || 'var(--color-primary)' }}>
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="space-y-8 relative z-10">
            <Wind size={36} />
            <h2 className="text-4xl font-extrabold">{practice ? practice.title : 'Loading...'}</h2>
            <p className="opacity-80 max-w-md text-lg">{practice ? practice.description : 'Aligning frequencies...'}</p>
          </div>
          <button onClick={onStart} className="relative z-10 bg-white px-12 py-5 rounded-full font-bold text-lg text-black self-start hover:scale-105 transition-transform">Initiate Sequence</button>
        </div>
      </div>
    </div>
  );
};

interface BreathingSessionProps {
  onEnd: () => void;
}

export const BreathingSession = ({ onEnd }: BreathingSessionProps) => {
  const { currentMood } = useMood();
  const { token } = useAuth();
  const [seconds, setSeconds] = useState(4);
  const [phase, setPhase] = useState('Inhale');

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s > 1 ? s - 1 : 4), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 4) setPhase(p => p === 'Inhale' ? 'Hold' : p === 'Hold' ? 'Exhale' : 'Inhale');
  }, [seconds]);

  const handleEndSession = async () => {
    try {
        await fetch('/api/v1/sessions/breathing', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ duration: 60 }) 
        });
    } catch(e) {}
    onEnd();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="48%" className="stroke-surface-container-high" strokeWidth="4" fill="none" />
          <motion.circle cx="50%" cy="50%" r="48%" stroke={currentMood?.color || "var(--color-primary)"} strokeWidth="6" fill="none" strokeLinecap="round" initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }} animate={{ strokeDashoffset: seconds * 250 }} transition={{ duration: 1, ease: 'linear' }} />
        </svg>
        <span className="text-8xl font-black text-primary">{seconds.toString().padStart(2, '0')}</span>
        <motion.div animate={{ scale: phase === 'Inhale' ? 1.5 : 1 }} transition={{ duration: 4, ease: 'easeInOut' }} className="absolute inset-0 rounded-full -z-10 blur-3xl opacity-50" style={{ backgroundColor: currentMood?.color || 'var(--color-primary)' }}/>
      </div>
      <h1 className="text-5xl font-extrabold text-on-surface mt-10 animate-pulse">{phase}...</h1>
      <button onClick={handleEndSession} className="mt-10 px-10 py-4 bg-primary text-on-primary rounded-full font-bold">Terminate Session</button>
    </div>
  );
};
