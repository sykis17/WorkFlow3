const config = {
  title: 'Maritime-Portal',
  tagline: 'Modernizing Maritime Law',
  url: 'https://sykis17.github.io', 
  baseUrl: '/Maritime-Portal/', // TÄRKEÄ: Varmista että tämä on sama kuin GitHub-reposi nimi!
  projectName: 'Maritime-Portal',
  onBrokenLinks: 'ignore', // Estää kaatumisen rikkinäisiin linkkeihin
  onBrokenMarkdownLinks: 'ignore',
  organizationName: 'sykis17',
  projectName: 'legal-portal',

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
  
  themeConfig: {
    navbar: {
      title: 'Maritime Portal',
      items: [
        // Poista täältä kaikki missä lukee 'blog' tai 'intro'
      ],
    },
  },
};

module.exports = config;