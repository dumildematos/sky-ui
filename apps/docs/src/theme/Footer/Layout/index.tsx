import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';

export default function FooterLayout({ style, links, logo, copyright }: any) {
  return (
    <footer className={clsx(ThemeClassNames.layout.footer.container, 'footer', { 'footer--dark': style === 'dark' })}>
      <div className="footer__inner">
        {links}
        {(logo || copyright) && <div className="footer__bottom text--center">{logo && <div className="margin-bottom--sm">{logo}</div>}{copyright}</div>}
      </div>
    </footer>
  );
}