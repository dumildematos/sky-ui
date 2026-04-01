import React from 'react';
import { SkyCard } from './SkyCard';

type SkyNavProps = React.HTMLAttributes<HTMLDivElement> & {
  theme?: 'midnight' | 'daylight';
  orientation?: 'horizontal' | 'vertical';
  rounded?: boolean;
};

export const SkyNav = ({
  children,
  className = '',
  theme = 'midnight',
  orientation = 'horizontal',
  rounded = true,
  ...props
}: SkyNavProps) => {
  const layoutClassName =
    orientation === 'vertical'
      ? 'flex-col items-stretch gap-2.5'
      : 'flex-row flex-wrap items-center gap-3 md:gap-4';

  return (
    <SkyCard blur="nimbus" theme={theme} rounded={rounded} className={`sky-nav px-4 py-3 ${className}`.trim()} {...props}>
      <div className={`flex min-w-0 ${layoutClassName}`.trim()}>{children}</div>
    </SkyCard>
  );
};
