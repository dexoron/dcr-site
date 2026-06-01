import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'DCR',
  tagline: 'A Cargo-style build tool for C/C++ projects',
  favicon: 'brand/dcr-icon.svg',

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

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {tagName: 'link', rel: 'icon', href: '/brand/dcr-icon.svg'},
          {tagName: 'link', rel: 'manifest', href: '/manifest.json'},
          {tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes'},
          {tagName: 'meta', name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'},
          {tagName: 'link', rel: 'apple-touch-icon', href: '/brand/dcr-app-icon-light.png', sizes: '180x180'},
          {tagName: 'link', rel: 'apple-touch-icon', href: '/brand/dcr-app-icon-light.png', sizes: '152x152'},
          {tagName: 'link', rel: 'apple-touch-icon', href: '/brand/dcr-app-icon-light.png', sizes: '120x120'},
          {tagName: 'meta', name: 'theme-color', content: '#181818'},
          {tagName: 'link', rel: 'mask-icon', href: '/brand/dcr-icon.svg', color: '#5C8DBC'},
          {tagName: 'meta', name: 'msapplication-TileColor', content: '#181818'},
          {tagName: 'script', innerHTML: `
(function(){
  var mq = window.matchMedia('(prefers-color-scheme:dark)');
  var dark = mq.matches;

  var icon = dark ? '/brand/dcr-app-icon-dark.png' : '/brand/dcr-app-icon-light.png';
  document.querySelectorAll('link[rel="apple-touch-icon"]').forEach(function(l){ l.href = icon; });

  var color = dark ? '#181818' : '#ffffff';
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = color;
})();
          `},
        ],
      },
    ],
  ],

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
    image: 'brand/banner.png',
    pwa: {
      manifest: {
        name: 'DCR',
        short_name: 'DCR',
        description: 'A Cargo-style build tool for C/C++ projects',
        theme_color: '#181818',
        background_color: '#181818',
        display: 'standalone',
        icons: [
          {src: '/brand/dcr-app-icon-light.png', sizes: '192x192', type: 'image/png'},
          {src: '/brand/dcr-app-icon-light.png', sizes: '512x512', type: 'image/png'},
          {src: '/brand/dcr-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable'},
        ],
      },
    },
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
              to: '/docs/commands/project-commands',
            },
            {
              label: 'Reference',
              to: '/docs/reference/dcr-toml',
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
      copyright: `<a href="https://github.com/dexoron/dexoron/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">GPL-3.0 License © ${new Date().getFullYear()}</a> <a href="https://github.com/dexoron/dcr" target="_blank" rel="noopener noreferrer">Dexoron</a> & <a href="https://github.com/dexoron/dcr/graphs/contributors" target="_blank" rel="noopener noreferrer">DCR Contributors</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['c', 'cpp', 'cmake', 'bash'],
    },
  },
};

export default config;
