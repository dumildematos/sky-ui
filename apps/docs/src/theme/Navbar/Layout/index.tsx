import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import { SkyNav } from '@sky-ui/react-sky';
import { SkyNavbarControls } from '../../../components/SkyNavbarControls';
import { useSkyDocsRuntime } from '../../../runtime/SkyDocsRuntime';

function NavbarBackdrop(props: React.ComponentProps<'div'>) {
  return <div role="presentation" {...props} className={clsx('navbar-sidebar__backdrop', props.className)} />;
}

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useSkyDocsRuntime();
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={clsx(
        ThemeClassNames.layout.navbar.container,
        'navbar',
        'navbar--fixed-top',
        hideOnScroll && ['navbarHideable', !isNavbarVisible && 'navbarHidden'],
        {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}
    >
      <div className="sky-navbar-frame">
        <SkyNav theme={theme} rounded={false} className="w-full sky-navbar-shell">
          <div className="min-w-0 flex-1">{children}</div>
          <SkyNavbarControls />
        </SkyNav>
      </div>
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}