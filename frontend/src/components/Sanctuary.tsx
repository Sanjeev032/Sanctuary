import { useState, useEffect } from 'react';
import { Frown, Flower2 as Spa } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { useAuth } from '../context/AuthContext';

type Screen = 'login' | 'register' | 'onboarding' | 'sanctuary' | 'journal' | 'patterns' | 'breathing_reco' | 'breathing_session' | 'music_therapy' | 'admin_portal';

interface SanctuaryProps {
  onNavigate: (s: Screen) => void;
}

const Sanctuary = ({ onNavigate }: SanctuaryProps) => {
  const { currentMood } = useMood();
  const { token } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch('/api/v1/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error('Sanctuary frequency alignment failed.');
        return res.json();
      })
      .then(data => setDashboard(data))
      .catch(err => setError(err.message));
  }, [token]);

  if (error) return (
    <div className="p-10 text-center space-y-4">
      <Frown size={48} className="mx-auto text-error opacity-50" />
      <h2 className="text-2xl font-bold">Signal Lost</h2>
      <p className="text-on-surface-variant">{error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-full">Retry Connection</button>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 focus-in-expand">
      <section className="relative overflow-hidden rounded-[3rem] bg-surface-container-low p-8 md:p-14 flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-primary-container/20 rounded-full blur-[80px]" />
        <div className="relative z-10 flex-1 space-y-6">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">SYSTEM READY</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
            Good morning, <br />
            <span className="text-primary italic">{dashboard?.user?.name || 'Explorer'}.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Your sanctuary is ready. The entire UI environment is dynamically tuned to <strong style={{ color: currentMood?.color }}>{currentMood?.name || 'Nature'}</strong>.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <button onClick={() => onNavigate('breathing_reco')} className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Daily Reflection</button>
          </div>
        </div>
      </section>

      <section className="pt-8">
        <h2 className="text-2xl font-bold font-headline mb-8">Live Biophilic Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Sleep Quality', value: `${dashboard?.stats?.sleepQuality || 0}%`, progress: dashboard?.stats?.sleepQuality || 0 },
            { label: 'Mindful Minutes', value: dashboard?.stats?.mindfulMinutes || 0, progress: ((dashboard?.stats?.mindfulMinutes || 0)/60)*100 },
            { label: 'Mood Stability', value: `${dashboard?.stats?.moodStability || 0}%`, progress: dashboard?.stats?.moodStability || 0 },
            { label: 'Focus Flow', value: `${dashboard?.stats?.focusFlow || 0}%`, progress: dashboard?.stats?.focusFlow || 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] space-y-4">
              <p className="text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase">{stat.label}</p>
              <h3 className="text-4xl font-black text-on-surface">{stat.value}</h3>
              <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${Math.min(stat.progress, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sanctuary;
