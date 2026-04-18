import { motion } from 'motion/react';
import { Wind as Air, Wind, Meh, ArrowRight as ArrowForward } from 'lucide-react';
import { useMood } from '../context/MoodContext';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const { availableMoods, currentMood, setCurrentMood, isLoading } = useMood();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-surface">
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full blur-[100px] opacity-20 transition-colors duration-1000" style={{ backgroundColor: currentMood ? currentMood.color : 'var(--color-primary)' }} />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-10 transition-colors duration-1000" style={{ backgroundColor: currentMood ? currentMood.color : 'var(--color-secondary)' }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl text-center mb-16 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6">How are you feeling?</h1>
        <p className="text-on-surface-variant text-lg md:text-xl font-medium">Select a dynamic frequency to power your UI.</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl z-10">
        {isLoading ? (
          <p className="col-span-full text-center animate-pulse">Tuning modules...</p>
        ) : availableMoods.length > 0 ? (
          availableMoods.map((mood, i) => (
            <motion.button key={mood._id} onClick={() => setCurrentMood(mood)}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center gap-4">
              <div className={`w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 hover:scale-105 ${currentMood?._id === mood._id ? 'border-4 shadow-xl' : ''}`}
                   style={{ backgroundColor: `${mood.color}20`, color: mood.color, borderColor: mood.color }}>
                {mood.animationType === 'pulse' ? <Wind size={48} /> : <Air size={48} />}
              </div>
              <span className="font-bold text-lg" style={{ color: currentMood?._id === mood._id ? mood.color : 'currentColor' }}>{mood.name}</span>
            </motion.button>
          ))
        ) : (
          <div className="col-span-full text-center space-y-4">
            <Meh size={48} className="mx-auto opacity-20" />
            <p className="text-on-surface-variant font-bold">The Sanctuary is currently empty.</p>
            <p className="text-sm opacity-50">Please contact an administrator to seed your initial frequencies.</p>
          </div>
        )}
      </div>
      <div className="mt-20 flex flex-col items-center gap-6 z-10">
        <button onClick={onComplete} disabled={!currentMood} className={`px-12 py-5 rounded-full font-bold text-lg shadow-xl text-white flex items-center gap-3 transition-all ${!currentMood ? 'opacity-50' : 'opacity-100 hover:scale-105'}`} style={{ backgroundColor: currentMood ? currentMood.color : '#ccc' }}>
          Enter Sanctuary <ArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
