const config = {
  title: 'WorkFlow3',
  tagline: 'All-inclusive work flow reporting and monitoring',
  favicon: 'img/favicon.ico',

  url: 'https://sykis17.github.io', 

  baseUrl: '/WorkFlow3/', // TÄRKEÄ: Varmista että tämä on sama kuin GitHub-reposi nimi!

  organizationName: 'sykis17',
  projectName: 'WorkFlow3',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'ignore', // Estää kaatumisen rikkinäisiin 
  onBrokenMarkdownLinks: 'ignore',

i18n: {
    defaultLocale: 'fi',
    locales: ['fi', 'en', 'uk'],
    localeConfigs: {
      fi: {
        label: 'Suomi',
        direction: 'ltr',
        htmlLang: 'fi-FI',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      uk: {
        label: 'Ukraina',
        direction: 'ltr',
        htmlLang: 'uk-UK',
      },
    },
  },

presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', 
        },
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],


themes: [
    '@docusaurus/theme-mermaid',
    '@docusaurus/theme-live-codeblock',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["fi", "en"],
        docsRouteBasePath: "/", 
        // Tämä rivi on kriittinen: se estää pluginia etsimästä kansioita vääristä paikoista
        indexDocs: true,
        indexBlog: false,
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    mermaid: {
      theme: {light: 'neutral', dark: 'forest'},
    },
    navbar: {
      title: 'Legal Portal',
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'html',
          position: 'right',
          value: '<button onclick="window.print()" style="cursor:pointer; background: #25c2a0; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; margin-left: 10px;">Lataa PDF / Tulosta</button>',
        },
      ],
    },
  },
};

module.exports = config;