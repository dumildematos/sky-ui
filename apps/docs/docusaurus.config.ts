import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import type { Config } from '@docusaurus/types';

const repoRoot = path.resolve(__dirname, '../..');

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
  themeConfig: {
    navbar: {
      title: 'Sky UI',
      items: [
        {
          to: '/',
          label: 'Overview',
          position: 'left',
        },
        {
          to: '/sky-button',
          label: 'SkyButton',
          position: 'left',
        },
        {
          to: '/sky-widget',
          label: 'SkyWidget',
          position: 'left',
        },
      ],
    },
  },
};

export default config;