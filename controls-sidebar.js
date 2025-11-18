// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  documentationSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['index'],
    },
     {
      type: 'category',
      label: 'Inputs',
      collapsed: false,
      items: ['autocompletebox', 'textbox'],
    },
  ],
};

module.exports = sidebars;
