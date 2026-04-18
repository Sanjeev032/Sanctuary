import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MoodConfig {
  _id: string;
  name: string;
  color: string;
  gradient: string;
  animationType: string;
}

interface MoodContextType {
  availableMoods: MoodConfig[];
  currentMood: MoodConfig | null;
  setCurrentMood: (mood: MoodConfig) => void;
  refreshMoods: () => Promise<void>;
  isLoading: boolean;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableMoods, setAvailableMoods] = useState<MoodConfig[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoods = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/moods');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAvailableMoods(data);
      }
    } catch (err) {
      console.error('Failed to fetch moods:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  // Sync the current mood's dynamic variables into CSS variables instantly
  useEffect(() => {
    if (currentMood) {
      document.documentElement.style.setProperty('--color-primary', currentMood.color);
      // Fallbacks if gradient isn't a true CSS recognizable pattern, or inject it specifically
      if (currentMood.gradient) {
        document.documentElement.style.setProperty('--biophilic-gradient', currentMood.gradient);
      }
    } else {
      // Revert to defaults or just leave as is
      document.documentElement.style.removeProperty('--color-primary');
      document.documentElement.style.removeProperty('--biophilic-gradient');
    }
  }, [currentMood]);

  return (
    <MoodContext.Provider value={{ availableMoods, currentMood, setCurrentMood, refreshMoods: fetchMoods, isLoading }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
