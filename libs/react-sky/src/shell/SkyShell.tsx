// libs/react-sky/src/shell/SkyShell.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type GlassLevel = 'Stratus' | 'Cumulus' | 'Nimbus';

interface SkyContextType {
  theme: 'daylight' | 'midnight';
  glassLevel: GlassLevel;
  setTheme: (t: 'daylight' | 'midnight') => void;
}

const SkyContext = createContext<SkyContextType | undefined>(undefined);

export const SkyShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'daylight' | 'midnight'>('midnight');
  const [glassLevel] = useState<GlassLevel>('Cumulus');

  return (
    <SkyContext.Provider value={{ theme, glassLevel, setTheme }}>
      <div className={`sky-shell-root ${theme} min-h-screen relative overflow-hidden`}>
        {/* The Aurora Mesh Background Layers */}
        <div className="sky-aurora-container fixed inset-0 z-[-1]">
          <div className="aurora-layer layer-1"></div>
          <div className="aurora-layer layer-2"></div>
        </div>

        {/* Main Content Area */}
        <main className="relative z-10 p-8">
          {children}
        </main>
      </div>
    </SkyContext.Provider>
  );
};

export const useSky = () => {
  const context = useContext(SkyContext);
  if (!context) throw new Error('useSky must be used within a SkyShell');
  return context;
};
