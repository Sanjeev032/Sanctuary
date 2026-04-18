import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { useMood } from '../context/MoodContext';

const MusicTherapy = () => {
  const { currentMood } = useMood();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Dynamically fetch tracks filtering by current global mood
    const qs = currentMood?.name ? `?mood=${encodeURIComponent(currentMood.name)}` : '';
    fetch(`/api/v1/music${qs}`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setTracks(data); })
      .catch(console.error);
  }, [currentMood]);

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col lg:flex-row">
      <div className="absolute inset-0 -z-20 transition-colors duration-1000" style={{ backgroundColor: currentMood?.color || '#3e6842', opacity: 0.8 }} />
      {currentTrack && (
        <audio ref={audioRef} src={currentTrack.url} onEnded={() => { setCurrentTrackIndex((p)=>(p+1)%tracks.length); setIsPlaying(false); }} onPlay={()=>setIsPlaying(true)} onPause={()=>setIsPlaying(false)}/>
      )}

      <div className="relative z-10 w-full lg:ml-64 p-6 md:p-12 lg:p-16 flex flex-col gap-12 text-white">
        <header className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-black">{currentMood ? `${currentMood.name} Frequencies` : 'Audio Core'}</h1>
          <p className="opacity-70 text-lg max-w-xl">Dynamically synced. Currently playing: {currentTrack?.title || 'Awaiting connection...'}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1">
          <div className="lg:col-span-8 bg-black/20 backdrop-blur-3xl p-10 md:p-16 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center gap-16">
            <div className="flex items-end gap-2 h-48 md:h-64">
               {[0.1, 0.4, 0.2, 0.8, 0.5, 0.9, 0.3, 0.7, 0.4, 0.6, 0.2].map((d, i) => (
                 <motion.div key={i} animate={{ height: isPlaying ? [`${30 + d*40}%`, `${10 + d*60}%`, `${30 + d*40}%`] : '10%' }} transition={{ duration: 1.5 + d, repeat: Infinity }} className="w-2 md:w-4 rounded-full bg-white"/>
               ))}
            </div>
            <div className="flex items-center gap-10">
               <button onClick={()=>togglePlay()} className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                 {isPlaying ? <Pause size={48} fill="currentColor"/> : <Play size={48} fill="currentColor"/>}
               </button>
            </div>
          </div>

          <aside className="lg:col-span-4 bg-black/20 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 flex flex-col gap-8">
            <h3 className="text-xl font-bold">Fetched Queue</h3>
            <div className="space-y-3 overflow-y-auto max-h-[400px]">
              {tracks.length > 0 ? tracks.map((track, i) => (
                <button key={track._id} onClick={() => { setCurrentTrackIndex(i); setIsPlaying(false); }} className={`w-full flex items-center gap-5 p-4 rounded-2xl ${i === currentTrackIndex ? 'bg-white/20' : 'hover:bg-white/5'}`}>
                   <div className="text-left flex-1">
                     <h4 className="font-bold text-sm">{track.title}</h4>
                     <p className="text-[10px] opacity-50 uppercase">{track.type}</p>
                   </div>
                </button>
              )) : <p className="opacity-50 text-sm">No synchronized tracks found.</p>}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MusicTherapy;
