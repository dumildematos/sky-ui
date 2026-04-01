import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { prefersReducedMotion, ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import ExpandButton from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import styles from './styles.module.css';
import { SkyCard } from '@sky-ui/react-sky';
import { useSkyDocsRuntime } from '../../../../runtime/SkyDocsRuntime';

function ResetOnSidebarChange({ children }: { children: React.ReactNode }) {
  const sidebar = useDocsSidebar();
  return <React.Fragment key={sidebar?.name ?? 'noSidebar'}>{children}</React.Fragment>;
}

export default function DocRootLayoutSidebar({ sidebar, hiddenSidebarContainer, setHiddenSidebarContainer }: any) {
  const { theme } = useSkyDocsRuntime();
  const { pathname } = useLocation();
  const [hiddenSidebar, setHiddenSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value: boolean) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  if (pathname === '/') {
    return null;
  }

  return (
    <aside
      className={clsx(ThemeClassNames.docs.docSidebarContainer, styles.docSidebarContainer, hiddenSidebarContainer && styles.docSidebarContainerHidden)}
      onTransitionEnd={(event) => {
        if (!event.currentTarget.classList.contains(styles.docSidebarContainer)) {
          return;
        }
        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}
    >
      <ResetOnSidebarChange>
        <div className={clsx(styles.sidebarViewport, hiddenSidebar && styles.sidebarViewportHidden)}>
          <SkyCard
            theme={theme}
            blur="cumulus"
            className="sky-sidebar-shell p-4"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--sky-cursor-x', `${event.clientX - rect.left}px`);
              event.currentTarget.style.setProperty('--sky-cursor-y', `${event.clientY - rect.top}px`);
            }}
          >
            <DocSidebar sidebar={sidebar} path={pathname} onCollapse={toggleSidebar} isHidden={hiddenSidebar} />
          </SkyCard>
          {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}