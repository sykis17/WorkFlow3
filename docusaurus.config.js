const config = {
  title: 'Maritime-Portal',
  tagline: 'Modernizing Maritime Law',
  url: 'https://sykis17.github.io', 
  baseUrl: '/Maritime-Portal/', // TÄRKEÄ: Varmista että tämä on sama kuin GitHub-reposi nimi!
  projectName: 'Maritime-Portal',
  onBrokenLinks: 'ignore', // Estää kaatumisen rikkinäisiin 
  onBrokenMarkdownLinks: 'ignore',
  organizationName: 'sykis17',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Tekee dokumenteista etusivun
        },
        blog: false, // POISTAA blogin kokonaan käytöstä
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('docusaurus-lunr-search'),
      {
        languages: ['en', 'fi'], // Lisää suomi, jos kirjoitat suomeksi!
        indexBaseUrl: true,
      },
    ],
  ],
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true, // TÄMÄ korjattu (poistettu ArrayBlur)
        language: ["en", "fi"],
        docsRouteBasePath: "/", 
        highlightSearchTermsOnTargetPage: true, // Mukava lisä: korostaa hakusanat sivulla
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
      title: 'Maritime Portal',
      items: [
        // Poista täältä kaikki missä lukee 'blog' tai 'intro'
      ],
    },
  },
};

module.exports = config;