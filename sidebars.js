/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Esittely',
    },
    {
      type: 'category',
      label: '👷 KENTTÄTYÖT',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'koonti',
          label: 'Työntekijän Dashboard',
        },
      ],
    },
    {
      type: 'category',
      label: '👔 HALLINTA & MONITOROINTI',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'interaktiiviset',
          label: 'Projektinhallinta',
        },
        {
          type: 'doc',
          id: 'lampotila',
          label: 'Reaaliaikainen Seuranta',
        },
        {
          type: 'link',
          label: 'Tehtävägeneraattori (Admin)',
          href: '/admin', // Ohjaa suoraan luomallesi admin-sivulle
        },
      ],
    },
    {
      type: 'category',
      label: '🛠️ KEHITYS & TYÖKALUT',
      collapsed: true, // Pidetään nämä piilossa oletuksena
      items: [
        {
          type: 'doc',
          id: 'style-guide',
          label: '🎨 Tyyliopas',
        },
        {
          type: 'doc',
          id: 'testi1',
          label: '🧪 Testisivu',
        },
      ],
    },
  ],
};

module.exports = sidebars;