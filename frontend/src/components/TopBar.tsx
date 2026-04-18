import { ArrowLeft as ArrowBack, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const TopBar = ({ title, showBack, onBack }: TopBarProps) => {
  const { user, logout } = useAuth();
  
  // Attempt to generate initials safely from user.name, default to 'E' (Explorer)
  const initials = user?.name ? user.name.charAt(0).toUpperCase() : 'E';

  return (
    <header className="flex justify-between items-center px-6 py-4 w-full z-30 sticky top-0 bg-surface/80 backdrop-blur-xl border-b border-surface-container-high md:pl-72">
      <div className="flex items-center gap-4">
        {showBack && (
          <button onClick={onBack} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
            <ArrowBack size={20} />
          </button>
        )}
        <h2 className="text-xl font-bold text-on-surface tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm ring-2 ring-primary/50">
            {initials}
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-error hover:bg-error/10 rounded-full transition-all"
            title="Log Out"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
