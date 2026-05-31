import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'DCR',
  tagline: 'A Cargo-style build tool for C/C++ projects',
  favicon: 'img/favicon.ico',

  url: 'https://dcr.dexoron.su',
  baseUrl: '/',

  organizationName: 'dexoron',
  projectName: 'dcr-site',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: { label: 'English' },
      ru: { label: 'Русский' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/dexoron/dcr/tree/main/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DCR',
      logo: {
        alt: 'DCR Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {type: 'localeDropdown', position: 'right'},
        {
          href: 'https://github.com/dexoron/dcr',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Commands',
              to: '/docs/commands/dcr-init-or-new',
            },
            {
              label: 'Configuration',
              to: '/docs/configuration/dcr.toml-overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/dexoron/dcr/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/dexoron/dcr/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/dexoron/dcr',
            },
            {
              label: 'Releases',
              href: 'https://github.com/dexoron/dcr/releases',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dexoron. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['c', 'cpp', 'cmake', 'bash'],
    },
  },
};

export default config;
