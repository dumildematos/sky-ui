// libs/react-sky/src/shell/SkyShell.tsx
import React, { createContext, useContext, useState } from 'react';

type GlassLevel = 'Stratus' | 'Cumulus' | 'Nimbus';

interface SkyContextType {
  theme: 'daylight' | 'midnight';
  glassLevel: GlassLevel;
  setTheme: (t: 'daylight' | 'midnight') => void;
}

const SkyContext = createContext<SkyContextType | undefined>(undefined);

export const SkyShell: React.FC<{
  children: React.ReactNode;
  theme?: 'daylight' | 'midnight';
  className?: string;
  fullHeight?: boolean;
  contentClassName?: string;
}> = ({ children, theme: forcedTheme, className = '', fullHeight = true, contentClassName = '' }) => {
  const [themeState, setThemeState] = useState<'daylight' | 'midnight'>(forcedTheme ?? 'midnight');
  const [glassLevel] = useState<GlassLevel>('Cumulus');
  const theme = forcedTheme ?? themeState;

  const setTheme = (nextTheme: 'daylight' | 'midnight') => {
    if (!forcedTheme) {
      setThemeState(nextTheme);
    }
  };

  return (
    <SkyContext.Provider value={{ theme, glassLevel, setTheme }}>
      <div className={`sky-shell-root ${theme} ${fullHeight ? 'min-h-screen' : 'min-h-0'} relative overflow-hidden ${className}`.trim()}>
        {/* The Aurora Mesh Background Layers */}
        <div className="sky-aurora-container fixed inset-0 z-[-1]">
          <div className="aurora-layer layer-1"></div>
          <div className="aurora-layer layer-2"></div>
        </div>

        {/* Main Content Area */}
        <main className={`relative z-10 ${fullHeight ? 'p-8' : 'p-0'} ${contentClassName}`.trim()}>
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
