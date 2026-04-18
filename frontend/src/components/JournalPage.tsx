import { useState, useEffect } from 'react';
import { useMood } from '../context/MoodContext';

const JournalPage = () => {
  const { currentMood } = useMood();
  const [journals, setJournals] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchJournals = () => {
    const token = localStorage.getItem('token');
    fetch('/api/v1/journals', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(setJournals)
      .catch(console.error);
  };

  useEffect(() => fetchJournals(), []);

  const handleSave = async () => {
    if(!title || !content) return;
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/v1/journals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, mood: currentMood?.name || 'Smile' })
      });
      setTitle(''); setContent('');
      fetchJournals();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex-1 bg-surface-container-lowest rounded-[3rem] p-8 md:p-16 border border-surface-container-high flex flex-col gap-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-5 pointer-events-none" style={{ backgroundColor: currentMood?.color }} />
        <div className="space-y-4 z-10 w-full relative">
           <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Entry Title..." className="text-4xl md:text-5xl font-black text-on-surface bg-transparent border-none p-0 focus:ring-0 w-full placeholder:text-surface-container-high"/>
        </div>
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Chronicle your thoughts..." className="flex-1 text-xl md:text-2xl font-medium leading-relaxed text-on-surface bg-transparent border-none p-0 focus:ring-0 resize-none z-10 relative"/>
        <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-surface-container-high z-10 relative">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Mood Tag: {currentMood?.name || 'Unset'}</span>
          </div>
          <button onClick={handleSave} className="px-10 py-4 bg-primary text-on-primary rounded-full font-bold shadow-lg hover:scale-105 transition-all">Save Context</button>
        </div>
      </div>

      <aside className="w-full md:w-80 flex flex-col gap-8">
        <div className="bg-surface-container-low/50 backdrop-blur-xl p-8 rounded-[2.5rem] space-y-8 h-full border border-surface-container-high">
          <h3 className="font-bold text-on-surface">Digital Memory</h3>
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
            {journals.map((entry: any) => (
              <div key={entry._id} className="w-full bg-surface-container-lowest p-6 rounded-3xl text-left shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase text-on-surface-variant/40">{new Date(entry.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs font-bold text-primary">{entry.mood}</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface">{entry.title}</h4>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-3">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default JournalPage;
