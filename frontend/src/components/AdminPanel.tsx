import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, Edit } from 'lucide-react';
import { useMood } from '../context/MoodContext';

export default function AdminPanel({ onNavigate }: { onNavigate: (s: any) => void }) {
  const [activeTab, setActiveTab] = useState<'music' | 'moods' | 'stats' | 'recommendations'>('music');
  const [data, setData] = useState<any[]>([]);
  const { refreshMoods } = useMood();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', color: '#3e6842', url: 'https://cdn.pixabay.com/audio/default.mp3' });

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab: string) => {
    setIsLoading(true);
    try {
      const path = tab === 'stats' ? '/admin-portal-xyz/stats' 
                 : tab === 'recommendations' ? '/admin-portal-xyz/recommendations'
                 : `/api/v1/${tab}`; 
                 
      const res = await fetch(path, { headers: { Authorization: `Bearer ${token}` } });
      const result = await res.json();
      if (Array.isArray(result)) setData(result);
      else if (result && typeof result === 'object' && result.data) setData(result.data);
      else setData([result]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean, tab: string) => {
    try {
      await fetch(`/admin-portal-xyz/${tab}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (tab === 'moods') refreshMoods();
      fetchData(tab);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string, tab: string) => {
    if (!confirm('Area you sure?')) return;
    try {
      await fetch(`/admin-portal-xyz/${tab}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (tab === 'moods') refreshMoods();
      fetchData(tab);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`/admin-portal-xyz/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(activeTab === 'moods' 
          ? { name: formData.name, color: formData.color, animationType: 'breath' } 
          : { title: formData.name, url: formData.url, type: 'ambient' })
      });
      setIsCreating(false);
      setFormData({ name: '', color: '#3e6842', url: 'https://cdn.pixabay.com/audio/default.mp3' });
      if (activeTab === 'moods') refreshMoods();
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-surface">
      <header className="flex justify-between items-center mb-10 pb-6 border-b border-surface-container-high">
        <div>
          <h1 className="text-3xl font-black text-on-surface flex items-center gap-3">
             <Lock className="text-secondary" /> Restricted Access
          </h1>
          <p className="text-on-surface-variant font-medium mt-1">System Configuration & Data Management</p>
        </div>
        <button onClick={() => onNavigate('sanctuary')} className="px-6 py-2 bg-surface-container-high rounded-full font-bold hover:bg-surface-container-low transition-all">Back to UI</button>
      </header>

      <div className="flex gap-6">
        <aside className="w-64 flex flex-col gap-2">
           {['music', 'moods', 'stats', 'recommendations'].map(tab => (
             <button key={tab} onClick={() => { setActiveTab(tab as any); setIsCreating(false); }} className={`p-4 text-left rounded-2xl font-bold font-headline capitalize transition-colors ${activeTab === tab ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface'}`}>
               {tab} Management
             </button>
           ))}
        </aside>

        <main className="flex-1 bg-surface-container-lowest p-8 rounded-[2rem] border border-surface-container-high shadow-sm">
           <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-bold capitalize">{activeTab} Details</h2>
             {(activeTab === 'music' || activeTab === 'moods') && !isCreating && (
               <button onClick={() => setIsCreating(true)} className="px-5 py-2 bg-secondary text-white rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all"><Plus size={18}/> Add {activeTab === 'moods' ? 'Mood' : 'Music'}</button>
             )}
           </div>

           {isCreating && (
              <form onSubmit={handleCreateSubmit} className="mb-8 p-6 bg-surface-container-low rounded-2xl space-y-4 shadow-sm border border-surface-container-high">
                <h3 className="font-bold">Create New {activeTab === 'moods' ? 'Mood' : 'Music Track'}</h3>
                <div>
                   <label className="text-xs font-bold text-on-surface-variant uppercase">Title / Name</label>
                   <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full mt-1 p-3 rounded-xl border-none focus:ring-2 focus:ring-primary" placeholder="E.g. Ethereal Morning" />
                </div>
                {activeTab === 'moods' ? (
                  <div>
                     <label className="text-xs font-bold text-on-surface-variant uppercase">Hex Color Configuration</label>
                     <input required value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} type="color" className="w-full h-12 mt-1 rounded-xl cursor-pointer" />
                  </div>
                ) : (
                  <div>
                     <label className="text-xs font-bold text-on-surface-variant uppercase">Stream URL</label>
                     <input required value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} type="text" className="w-full mt-1 p-3 rounded-xl border-none focus:ring-2 focus:ring-primary" />
                  </div>
                )}
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2 bg-transparent text-on-surface-variant font-bold hover:bg-surface-container-high rounded-full">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-primary text-on-primary font-bold rounded-full">Save to Database</button>
                </div>
              </form>
           )}

           {isLoading ? <p>Loading system records...</p> : (
             <ul className="space-y-4">
               {data.length > 0 ? data.map((item: any, i) => (
                 <li key={item._id || i} className="p-5 border border-surface-container-high rounded-2xl flex justify-between items-center hover:bg-surface-container-low transition-colors">
                   <div className="flex flex-col">
                      <span className="font-bold text-lg">{item.title || item.name || `Data Point ${i+1}`}</span>
                      <span className="text-xs text-on-surface-variant font-mono">{item._id}</span>
                      {activeTab === 'stats' && <span className="text-sm mt-1">Sleep: {item.sleepQuality} | Mindful: {item.mindfulMinutes}</span>}
                   </div>
                   <div className="flex items-center gap-4">
                     {(activeTab === 'music' || activeTab === 'moods') && (
                       <>
                         <button onClick={() => handleToggleActive(item._id, item.isActive, activeTab)} className={`text-xs font-bold px-3 py-1 rounded-full border ${item.isActive ? 'border-primary text-primary hover:bg-primary/10' : 'border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10'}`}>
                           {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                         </button>
                         <button className="p-2 hover:bg-white rounded-xl"><Edit size={18} className="text-tertiary" /></button>
                         <button onClick={() => handleDelete(item._id, activeTab)} className="p-2 hover:bg-white rounded-xl"><Trash2 size={18} className="text-error" /></button>
                       </>
                     )}
                   </div>
                 </li>
               )) : <p className="opacity-50">No records found mapped to this module.</p>}
             </ul>
           )}
        </main>
      </div>

    </div>
  );
}
