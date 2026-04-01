import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ExternalLink, MoonStar, Palette, Search, SunMedium } from 'lucide-react';
import { useSkyDocsRuntime } from '../runtime/SkyDocsRuntime';

const colorPresets = [
  { label: 'Nebula', primary: '#67e8f9', secondary: '#c084fc' },
  { label: 'Solar', primary: '#f59e0b', secondary: '#fb7185' },
  { label: 'Signal', primary: '#22d3ee', secondary: '#34d399' },
  { label: 'Orbit', primary: '#60a5fa', secondary: '#a78bfa' },
];

function formatVersion(version: string) {
  return version.startsWith('v') ? version : `v${version}`;
}

function getPopoverPosition(triggerRect: DOMRect) {
  const viewportWidth = window.innerWidth;
  const maxWidth = Math.min(352, viewportWidth - 24);
  const left = Math.min(
    Math.max(12, triggerRect.right - maxWidth),
    Math.max(12, viewportWidth - maxWidth - 12),
  );

  return {
    position: 'fixed' as const,
    top: triggerRect.bottom + 12,
    left,
    width: maxWidth,
  };
}

export function SkyNavbarControls() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const {
    theme,
    toggleTheme,
    openPalette,
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
    resetColors,
  } = useSkyDocsRuntime();
  const paletteRef = useRef<HTMLDivElement>(null);
  const paletteButtonRef = useRef<HTMLButtonElement>(null);
  const palettePopoverRef = useRef<HTMLDivElement>(null);
  const [isColorPaletteOpen, setColorPaletteOpen] = useState(false);
  const [palettePopoverStyle, setPalettePopoverStyle] = useState<React.CSSProperties>();
  const versionOptions = useMemo(() => {
    const versions = Array.isArray(customFields?.libraryVersions) ? customFields.libraryVersions : [];
    return versions.length > 0 ? versions.map((version) => formatVersion(String(version))) : ['v0.0.0'];
  }, [customFields]);
  const [selectedVersion, setSelectedVersion] = useState(versionOptions[0]);

  useEffect(() => {
    const storedVersion = window.localStorage.getItem('sky-docs-version');
    if (storedVersion && versionOptions.includes(storedVersion)) {
      setSelectedVersion(storedVersion);
      return;
    }

    setSelectedVersion(versionOptions[0]);
  }, [versionOptions]);

  useEffect(() => {
    window.localStorage.setItem('sky-docs-version', selectedVersion);
  }, [selectedVersion]);

  useEffect(() => {
    if (!isColorPaletteOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const clickedTrigger = paletteRef.current?.contains(target);
      const clickedPopover = palettePopoverRef.current?.contains(target);
      if (!clickedTrigger && !clickedPopover) {
        setColorPaletteOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isColorPaletteOpen]);

  useEffect(() => {
    if (!isColorPaletteOpen) {
      return undefined;
    }

    const updatePopoverPosition = () => {
      const triggerRect = paletteButtonRef.current?.getBoundingClientRect();
      if (!triggerRect) {
        return;
      }

      setPalettePopoverStyle(getPopoverPosition(triggerRect));
    };

    updatePopoverPosition();
    window.addEventListener('resize', updatePopoverPosition);
    window.addEventListener('scroll', updatePopoverPosition, true);

    return () => {
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition, true);
    };
  }, [isColorPaletteOpen]);

  const palettePopover = isColorPaletteOpen && typeof document !== 'undefined' && palettePopoverStyle
    ? createPortal(
        <div ref={palettePopoverRef} className="sky-navbar-popover sky-navbar-popover--portal" style={palettePopoverStyle}>
          <div className="sky-navbar-popover-header">
            <div>
              <div className="sky-navbar-popover-title">Brand colors</div>
              <div className="sky-navbar-popover-copy">Set primary and secondary accents for the docs shell.</div>
            </div>
            <button type="button" className="sky-navbar-text-button" onClick={resetColors}>
              Reset
            </button>
          </div>

          <div className="sky-navbar-swatch-grid">
            {colorPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="sky-navbar-swatch"
                onClick={() => {
                  setPrimaryColor(preset.primary);
                  setSecondaryColor(preset.secondary);
                }}
              >
                <span className="sky-navbar-swatch-colors">
                  <span className="sky-navbar-color-dot sky-navbar-color-dot--large" style={{ backgroundColor: preset.primary }} />
                  <span className="sky-navbar-color-dot sky-navbar-color-dot--large" style={{ backgroundColor: preset.secondary }} />
                </span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          <label className="sky-navbar-color-field">
            <span>Primary</span>
            <div className="sky-navbar-color-input-row">
              <input type="color" value={primaryColor} onChange={(event) => setPrimaryColor(event.target.value)} />
              <span>{primaryColor}</span>
            </div>
          </label>

          <label className="sky-navbar-color-field">
            <span>Secondary</span>
            <div className="sky-navbar-color-input-row">
              <input type="color" value={secondaryColor} onChange={(event) => setSecondaryColor(event.target.value)} />
              <span>{secondaryColor}</span>
            </div>
          </label>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div className="sky-navbar-actions">
        <button type="button" className="sky-navbar-control" onClick={openPalette} aria-label="Open search">
          <Search size={16} />
          <span className="sky-navbar-control-label">Search</span>
          <span className="sky-navbar-shortcut">Ctrl K</span>
        </button>

        <div ref={paletteRef} className="sky-navbar-palette-wrap">
          <button
            ref={paletteButtonRef}
            type="button"
            className="sky-navbar-control sky-navbar-control--icon-only sky-navbar-control--palette"
            onClick={() => setColorPaletteOpen((current) => !current)}
            aria-expanded={isColorPaletteOpen}
            aria-label="Open color palette"
          >
            <Palette size={16} />
          </button>
        </div>

        <label className="sky-navbar-select-wrap" aria-label="Library version">
          <span className="sky-navbar-select-label">Lib</span>
          <select
            className="sky-navbar-select"
            value={selectedVersion}
            onChange={(event) => setSelectedVersion(event.target.value)}
          >
            {versionOptions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="sky-navbar-control" onClick={toggleTheme} aria-label="Toggle light and dark mode">
          {theme === 'midnight' ? <SunMedium size={16} /> : <MoonStar size={16} />}
          <span className="sky-navbar-control-label">{theme === 'midnight' ? 'Light' : 'Dark'}</span>
        </button>

        <a
          className="sky-navbar-control"
          href="https://github.com/dumildematos/sky-ui"
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub repository"
        >
          <ExternalLink size={16} />
          <span className="sky-navbar-control-label">GitHub</span>
        </a>
      </div>
      {palettePopover}
    </>
  );
}