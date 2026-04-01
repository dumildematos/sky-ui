import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import type { Config } from '@docusaurus/types';

const repoRoot = path.resolve(__dirname, '../..');
const packageVersion = require(path.resolve(repoRoot, 'package.json')).version;

const config: Config = {
  title: 'Sky UI',
  tagline: 'Glassmorphism components for Angular and React',
  url: 'http://localhost:3000',
  baseUrl: '/',
  organizationName: 'sky-ui',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        pages: false,
        theme: {
          customCss: [
            path.resolve(repoRoot, 'libs/shared/styles/src/lib/engine.css'),
            require.resolve('./src/css/custom.css'),
          ],
        },
      },
    ],
  ],
  plugins: [
    function nxTsconfigPathsPlugin() {
      return {
        name: 'nx-tsconfig-paths',
        configureWebpack() {
          return {
            resolve: {
              plugins: [
                new TsconfigPathsPlugin({
                  configFile: path.resolve(repoRoot, 'tsconfig.base.json'),
                  extensions: ['.ts', '.tsx', '.js', '.jsx'],
                }),
              ],
            },
          };
        },
      };
    },
  ],
  customFields: {
    libraryVersions: [packageVersion],
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Sky UI',
      items: [
        {
          to: '/',
          label: 'Overview',
          position: 'left',
        },
        {
          to: '/react',
          label: 'React',
          position: 'left',
        },
        {
          to: '/angular',
          label: 'Angular',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            { label: 'Overview', to: '/' },
            { label: 'React Docs', to: '/react' },
            { label: 'Angular Docs', to: '/angular' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/dumildematos/sky-ui' },
            { label: 'Issues', href: 'https://github.com/dumildematos/sky-ui/issues' },
            { label: 'Pull Requests', href: 'https://github.com/dumildematos/sky-ui/pulls' },
          ],
        },
        {
          title: 'Help',
          items: [
            { label: 'Starter Kit', to: '/starter-kit' },
            { label: 'SkyButton', to: '/sky-button' },
            { label: 'SkyWidget', to: '/sky-widget' },
          ],
        },
      ],
      copyright: 'SkyUI Documentation Hub',
    },
  },
};

export default config;