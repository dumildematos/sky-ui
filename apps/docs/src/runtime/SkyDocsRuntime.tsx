import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from '@docusaurus/router';
import { animate, stagger } from 'animejs';
import { Search, Sparkles } from 'lucide-react';

type RuntimeTheme = 'midnight' | 'daylight';
type DocsFramework = 'react' | 'angular';

const DEFAULT_PRIMARY_COLOR = '#67e8f9';
const DEFAULT_SECONDARY_COLOR = '#c084fc';

function normalizeHexColor(value: string, fallback: string) {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim();
  const shortHexMatch = /^#([0-9a-f]{3})$/i.exec(normalized);
  if (shortHexMatch) {
    const [red, green, blue] = shortHexMatch[1].split('');
    return `#${red}${red}${green}${green}${blue}${blue}`.toLowerCase();
  }

  if (/^#[0-9a-f]{6}$/i.test(normalized)) {
    return normalized.toLowerCase();
  }

  return fallback;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHexColor(hex, DEFAULT_PRIMARY_COLOR).slice(1);
  const value = parseInt(normalized, 16);

  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
}

function mixHexColors(source: string, target: string, amount: number) {
  const safeAmount = Math.max(0, Math.min(1, amount));
  const sourceRgb = hexToRgb(source);
  const targetRgb = hexToRgb(target);
  const mixChannel = (channel: keyof typeof sourceRgb) => {
    return Math.round(sourceRgb[channel] + (targetRgb[channel] - sourceRgb[channel]) * safeAmount);
  };

  return `#${[mixChannel('red'), mixChannel('green'), mixChannel('blue')]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
}

type RuntimeContextValue = {
  theme: RuntimeTheme;
  toggleTheme: () => void;
  setTheme: (theme: RuntimeTheme) => void;
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  resetColors: () => void;
  preferredFramework: DocsFramework;
  setPreferredFramework: (framework: DocsFramework) => void;
  isPaletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
};

const runtimeItems = [
  { label: 'Overview', description: 'Landing page and hero station', to: '/' },
  { label: 'React Overview', description: 'React setup and component track', to: '/react' },
  { label: 'React Starter Kit', description: 'Compose SkyShell, SkyCard, and charts in React', to: '/react/starter-kit' },
  { label: 'React SkyButton', description: 'Glass action control for React apps', to: '/react/sky-button' },
  { label: 'React SkyNav', description: 'Navigation shells for React layouts', to: '/react/sky-nav' },
  { label: 'React SkyWidget', description: 'Telemetry card and chart surface for React', to: '/react/sky-widget' },
  { label: 'Angular Overview', description: 'Angular setup and component track', to: '/angular' },
  { label: 'Angular Starter Kit', description: 'Compose standalone Sky UI surfaces in Angular', to: '/angular/starter-kit' },
  { label: 'Angular SkyButton', description: 'Glass action control for Angular apps', to: '/angular/sky-button' },
  { label: 'Angular SkyNav', description: 'Navigation shells for Angular layouts', to: '/angular/sky-nav' },
  { label: 'Angular SkyWidget', description: 'Telemetry card and chart surface for Angular', to: '/angular/sky-widget' },
];

const SkyDocsRuntimeContext = createContext<RuntimeContextValue | undefined>(undefined);

function SkyCommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    inputRef.current?.focus();
    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: [0, 1],
        scale: [0.96, 1],
        y: [24, 0],
        duration: 420,
      });
    }
    animate('.sky-command-item', {
      opacity: [0, 1],
      y: [16, 0],
      delay: stagger(45),
      duration: 320,
    });
  }, [isOpen]);

  const items = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return runtimeItems;
    }
    return runtimeItems.filter((item) => {
      return `${item.label} ${item.description}`.toLowerCase().includes(normalizedQuery);
    });
  }, [query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="sky-command-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="sky-command-palette"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sky-command-search-row">
          <Search size={18} className="sky-glow-icon text-cyan-200" />
          <input
            ref={inputRef}
            className="sky-command-input"
            placeholder="Search docs, starter kit, components..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="sky-command-close" type="button" onClick={onClose}>
            Esc
          </button>
        </div>
        <div className="sky-command-results">
          {items.map((item) => (
            <button
              key={item.to}
              type="button"
              className="sky-command-item"
              onClick={() => {
                window.location.assign(item.to);
                onClose();
              }}
            >
              <div>
                <div className="sky-command-item-title">{item.label}</div>
                <div className="sky-command-item-description">{item.description}</div>
              </div>
              <Sparkles size={16} className="sky-glow-icon text-cyan-200/80" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkyDocsRuntimeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [theme, setThemeState] = useState<RuntimeTheme>('midnight');
  const [primaryColor, setPrimaryColorState] = useState(DEFAULT_PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColorState] = useState(DEFAULT_SECONDARY_COLOR);
  const [preferredFramework, setPreferredFrameworkState] = useState<DocsFramework>('react');
  const [isPaletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('sky-docs-theme');
    const storedPrimaryColor = window.localStorage.getItem('sky-docs-primary-color');
    const storedSecondaryColor = window.localStorage.getItem('sky-docs-secondary-color');
    const storedFramework = window.localStorage.getItem('sky-docs-framework');

    if (storedTheme === 'daylight' || storedTheme === 'midnight') {
      setThemeState(storedTheme);
    }

    setPrimaryColorState(normalizeHexColor(storedPrimaryColor ?? '', DEFAULT_PRIMARY_COLOR));
    setSecondaryColorState(normalizeHexColor(storedSecondaryColor ?? '', DEFAULT_SECONDARY_COLOR));

    if (storedFramework === 'react' || storedFramework === 'angular') {
      setPreferredFrameworkState(storedFramework);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.skyTheme = theme;
    document.body.classList.toggle('sky-theme-daylight', theme === 'daylight');
    document.body.classList.toggle('sky-theme-midnight', theme === 'midnight');
    window.localStorage.setItem('sky-docs-theme', theme);
  }, [theme]);

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    const normalizedPrimaryColor = normalizeHexColor(primaryColor, DEFAULT_PRIMARY_COLOR);
    const normalizedSecondaryColor = normalizeHexColor(secondaryColor, DEFAULT_SECONDARY_COLOR);
    const primaryRgb = hexToRgb(normalizedPrimaryColor);
    const secondaryRgb = hexToRgb(normalizedSecondaryColor);

    rootStyle.setProperty('--sky-primary', normalizedPrimaryColor);
    rootStyle.setProperty('--sky-primary-rgb', `${primaryRgb.red} ${primaryRgb.green} ${primaryRgb.blue}`);
    rootStyle.setProperty('--sky-secondary', normalizedSecondaryColor);
    rootStyle.setProperty('--sky-secondary-rgb', `${secondaryRgb.red} ${secondaryRgb.green} ${secondaryRgb.blue}`);
    rootStyle.setProperty('--ifm-color-primary', normalizedPrimaryColor);
    rootStyle.setProperty('--ifm-color-primary-dark', mixHexColors(normalizedPrimaryColor, '#000000', 0.12));
    rootStyle.setProperty('--ifm-color-primary-darker', mixHexColors(normalizedPrimaryColor, '#000000', 0.18));
    rootStyle.setProperty('--ifm-color-primary-darkest', mixHexColors(normalizedPrimaryColor, '#000000', 0.3));
    rootStyle.setProperty('--ifm-color-primary-light', mixHexColors(normalizedPrimaryColor, '#ffffff', 0.12));
    rootStyle.setProperty('--ifm-color-primary-lighter', mixHexColors(normalizedPrimaryColor, '#ffffff', 0.22));
    rootStyle.setProperty('--ifm-color-primary-lightest', mixHexColors(normalizedPrimaryColor, '#ffffff', 0.38));
    rootStyle.setProperty('--ifm-color-secondary', normalizedSecondaryColor);
    rootStyle.setProperty('--ifm-link-color', normalizedPrimaryColor);
    rootStyle.setProperty('--ifm-navbar-link-hover-color', normalizedPrimaryColor);
    window.localStorage.setItem('sky-docs-primary-color', normalizedPrimaryColor);
    window.localStorage.setItem('sky-docs-secondary-color', normalizedSecondaryColor);
  }, [primaryColor, secondaryColor]);

  useEffect(() => {
    window.localStorage.setItem('sky-docs-framework', preferredFramework);
  }, [preferredFramework]);

  useEffect(() => {
    setPaletteOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const setTheme = useCallback((nextTheme: RuntimeTheme) => setThemeState(nextTheme), []);
  const setPrimaryColor = useCallback(
    (color: string) => setPrimaryColorState(normalizeHexColor(color, DEFAULT_PRIMARY_COLOR)),
    [],
  );
  const setSecondaryColor = useCallback(
    (color: string) => setSecondaryColorState(normalizeHexColor(color, DEFAULT_SECONDARY_COLOR)),
    [],
  );
  const resetColors = useCallback(() => {
    setPrimaryColorState(DEFAULT_PRIMARY_COLOR);
    setSecondaryColorState(DEFAULT_SECONDARY_COLOR);
  }, []);
  const setPreferredFramework = useCallback((framework: DocsFramework) => setPreferredFrameworkState(framework), []);
  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'midnight' ? 'daylight' : 'midnight'));
  }, []);

  const value = useMemo<RuntimeContextValue>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      primaryColor,
      secondaryColor,
      setPrimaryColor,
      setSecondaryColor,
      resetColors,
      preferredFramework,
      setPreferredFramework,
      isPaletteOpen,
      openPalette: () => setPaletteOpen(true),
      closePalette: () => setPaletteOpen(false),
    }),
    [
      theme,
      toggleTheme,
      setTheme,
      primaryColor,
      secondaryColor,
      setPrimaryColor,
      setSecondaryColor,
      resetColors,
      preferredFramework,
      setPreferredFramework,
      isPaletteOpen,
    ],
  );

  return (
    <SkyDocsRuntimeContext.Provider value={value}>
      {children}
      <SkyCommandPalette isOpen={isPaletteOpen} onClose={() => setPaletteOpen(false)} />
    </SkyDocsRuntimeContext.Provider>
  );
}

export function useSkyDocsRuntime() {
  const context = useContext(SkyDocsRuntimeContext);
  if (!context) {
    throw new Error('useSkyDocsRuntime must be used within SkyDocsRuntimeProvider');
  }
  return context;
}