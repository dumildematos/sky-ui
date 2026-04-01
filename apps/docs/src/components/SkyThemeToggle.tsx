import React from 'react';
import { MoonStar, SunMedium } from 'lucide-react';
import { SkyButton } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

export function SkyThemeToggle() {
  const { theme, toggleTheme } = useSkyDocsRuntime();

  return (
    <SkyButton type="button" color={theme === 'midnight' ? 'violet' : 'amber'} theme={theme} onClick={toggleTheme}>
      <span className="flex items-center gap-2">
        {theme === 'midnight' ? <SunMedium size={14} className="sky-glow-icon" /> : <MoonStar size={14} className="sky-glow-icon" />}
        {theme === 'midnight' ? 'Daylight' : 'Midnight'}
      </span>
    </SkyButton>
  );
}