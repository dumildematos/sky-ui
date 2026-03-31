// libs/shared/utils/src/lib/mermaid-config.ts
export const getSkyMermaidConfig = (theme: 'daylight' | 'midnight') => ({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: theme === 'midnight' ? '#1e293b' : '#f1f5f9',
    primaryTextColor: theme === 'midnight' ? '#f8fafc' : '#0f172a',
    primaryBorderColor: 'rgba(255, 255, 255, 0.2)',
    lineColor: theme === 'midnight' ? '#67e8f9' : '#0ea5e9', // Arctic Mist
    secondaryColor: 'rgba(255, 255, 255, 0.05)',
    tertiaryColor: 'rgba(255, 255, 255, 0.1)',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis', // Smooth, organic lines
  },
});