import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';

// Components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { LoginForm, RegisterForm } from './components/AuthForms';
import Onboarding from './components/Onboarding';
import Sanctuary from './components/Sanctuary';
import JournalPage from './components/JournalPage';
import MusicTherapy from './components/MusicTherapy';
import { BreathingReco, BreathingSession } from './components/Breathing';
import AdminPanel from './components/AdminPanel';

type Screen = 'login' | 'register' | 'onboarding' | 'sanctuary' | 'journal' | 'patterns' | 'breathing_reco' | 'breathing_session' | 'music_therapy' | 'admin_portal';

export default function App() {
  const { user, isLoading } = useAuth();
  const [screen, setScreen] = useState<Screen>('login');

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // If user is already logged in, we default to sanctuary unless they were in the middle of registration
        if (screen === 'login' || screen === 'register') {
           setScreen('sanctuary');
        }
      } else {
        setScreen('login');
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-4">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }} 
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" 
        />
        <p className="text-on-surface-variant font-bold tracking-widest text-xs uppercase animate-pulse">
          Initializing Sanctuary
        </p>
      </div>
    );
  }

  const renderScreen = () => {
    switch(screen) {
      case 'login': 
        return <LoginForm onSwitch={() => setScreen('register')} onSuccess={() => setScreen('sanctuary')} />;
      case 'register': 
        return <RegisterForm onSwitch={() => setScreen('login')} onSuccess={() => setScreen('onboarding')} />;
      case 'onboarding': 
        return <Onboarding onComplete={() => setScreen('sanctuary')} />;
      case 'sanctuary': 
        return <Sanctuary onNavigate={setScreen} />;
      case 'journal': 
        return <JournalPage />;
      case 'breathing_reco': 
        return <BreathingReco onStart={() => setScreen('breathing_session')} />;
      case 'breathing_session': 
        return <BreathingSession onEnd={() => setScreen('sanctuary')} />;
      case 'music_therapy': 
        return <MusicTherapy />;
      case 'admin_portal': 
        return user?.role === 'admin' ? <AdminPanel onNavigate={setScreen} /> : <Sanctuary onNavigate={setScreen} />;
      default: 
        return user ? <Sanctuary onNavigate={setScreen} /> : <LoginForm onSwitch={() => setScreen('register')} onSuccess={() => setScreen('sanctuary')} />;
    }
  };

  const showChrome = screen !== 'login' && screen !== 'register' && screen !== 'onboarding' && screen !== 'breathing_session' && screen !== 'admin_portal';

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      {showChrome && <Sidebar currentScreen={screen} onNavigate={setScreen} />}
      <main className={`flex-1 ${showChrome ? 'lg:ml-64' : ''}`}>
        {showChrome && <TopBar title={screen.replace('_', ' ').toUpperCase()} showBack={screen !== 'sanctuary'} onBack={() => setScreen('sanctuary')} />}
        <AnimatePresence mode="wait">
          <motion.div 
            key={screen} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.4 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
