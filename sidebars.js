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
        'worker/työvaiheet', // Viittaa docs/worker/työvaiheet.md
      ],
    },
    {
      type: 'category',
      label: '👔 HALLINTA & MONITOROINTI',
      collapsed: false,
      items: [
        'managment/koonti', // Jos siirsit koonti.mdx:n tänne, muuten tarkista polku
        'lampotila',       // Jos tämä on suoraan docs/ juuressa
      ],
    },
    {
      type: 'category',
      label: '📋 POHJAT & TEMPLATET',
      collapsed: false,
      items: [
        'templates/logistics-check',
        'templates/meeting-summary',
      ],
    },
    {
      type: 'category',
      label: '🛠️ INFO',
      collapsed: true,
      items: [
        'info/style-guide',
        'info/tyoaika',
      ],
    },
  ],
};

module.exports = sidebars;