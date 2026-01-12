// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WorkFlow3',
  tagline: 'All-inclusive work flow reporting and monitoring',
  favicon: 'img/favicon.ico',

  url: 'https://sykis17.github.io', 
  baseUrl: '/WorkFlow3/', 

  organizationName: 'sykis17',
  projectName: 'WorkFlow3',
  deploymentBranch: 'gh-pages',
  trailingSlash: false, 

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fi',
    locales: ['fi', 'en', 'uk'],
    localeConfigs: {
      fi: { label: 'Suomi', htmlLang: 'fi-FI' },
      en: { label: 'English', htmlLang: 'en-US' },
      uk: { label: 'Українська', htmlLang: 'uk-UA' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', 
        },
        blog: false, 
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'log',
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    '@docusaurus/theme-live-codeblock',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["fi", "en"], // Huom: ukrainaa ei välttämättä tueta natiivisti tässä pluginissa, fi/en riittää
        docsRouteBasePath: "/", 
        indexDocs: true,
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },
      navbar: {
        title: 'WorkFlow3',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Dokumentaatio',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'html',
            position: 'right',
            value: '<button onclick="window.print()" style="cursor:pointer; background: #2563eb; color: white; border: none; padding: 6px 15px; border-radius: 8px; font-weight: bold; margin-left: 10px; font-size: 12px; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">📄 PDF / Tulosta</button>',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} WorkFlow3. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;