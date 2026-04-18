import { 
  Flower2 as Spa, Wind as Air, Music2 as Music, BarChart3 as Insights, 
  Edit3 as JournalIcon, Wind
} from 'lucide-react';

type Screen = 'login' | 'register' | 'onboarding' | 'sanctuary' | 'journal' | 'patterns' | 'breathing_reco' | 'breathing_session' | 'music_therapy' | 'admin_portal';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (s: Screen) => void;
}

const Sidebar = ({ currentScreen, onNavigate }: SidebarProps) => {
  const navItems = [
    { id: 'sanctuary', label: 'Sanctuary', icon: Spa },
    { id: 'music_therapy', label: 'Music Therapy', icon: Music },
    { id: 'breathing_reco', label: 'Breathing', icon: Wind },
    { id: 'patterns', label: 'Patterns', icon: Insights },
    { id: 'journal', label: 'Journal', icon: JournalIcon },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-surface-container-low flex-col p-6 gap-2 z-40 rounded-r-3xl">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-black text-primary tracking-tight">Peace</h1>
        <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest mt-1">Your Living Sanctuary</p>
      </div>
      <nav className="flex flex-col gap-1 flex-grow">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => onNavigate(item.id as Screen)}
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 font-medium ${currentScreen === item.id ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <item.icon size={20} strokeWidth={currentScreen === item.id ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
