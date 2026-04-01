import React from 'react';

type SkyBlur = 'stratus' | 'cumulus' | 'nimbus';
type SkyTheme = 'midnight' | 'daylight';

type SkyCardProps = React.HTMLAttributes<HTMLDivElement> & {
  blur?: SkyBlur;
  theme?: SkyTheme;
  glow?: string;
  rounded?: boolean;
};

const blurMap: Record<SkyBlur, string> = {
  stratus: 'blur(6px)',
  cumulus: 'blur(18px)',
  nimbus: 'blur(45px)',
};

const surfaceMap: Record<SkyTheme, { background: string; color: string; border: string; shadow: string }> = {
  midnight: {
    background: 'linear-gradient(155deg, rgba(8, 15, 33, 0.76), rgba(15, 23, 42, 0.42))',
    color: '#f8fafc',
    border: 'rgba(148, 163, 184, 0.24)',
    shadow: '0 24px 60px rgba(2, 6, 23, 0.35)',
  },
  daylight: {
    background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.76), rgba(226, 232, 240, 0.45))',
    color: '#0f172a',
    border: 'rgba(255, 255, 255, 0.65)',
    shadow: '0 24px 60px rgba(148, 163, 184, 0.24)',
  },
};

export const SkyCard = ({
  blur = 'cumulus',
  theme = 'midnight',
  glow = 'rgba(103, 232, 249, 0.14)',
  rounded = true,
  className = '',
  style,
  children,
  ...props
}: SkyCardProps) => {
  const surface = surfaceMap[theme];

  return (
    <div
      className={`sky-card relative overflow-hidden border ${rounded ? 'rounded-[2rem]' : 'rounded-none'} ${className}`.trim()}
      style={{
        background: surface.background,
        color: surface.color,
        borderColor: surface.border,
        boxShadow: `${surface.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.04)`,
        backdropFilter: blurMap[blur],
        WebkitBackdropFilter: blurMap[blur],
        width: '100%',
        maxWidth: '100%',
        ...style,
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${glow}, transparent 50%)`,
          opacity: 0.9,
        }}
      />
      <div className="sky-card__edge pointer-events-none absolute inset-0 rounded-[inherit]" />
      <div className="relative z-[1] min-w-0">{children}</div>
    </div>
  );
};
