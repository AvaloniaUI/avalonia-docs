// see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
// can be tested with this script https://gist.github.com/maxkatz6/760bc0615b1af2ead4bf1f0582fdcd10

import {from10to11} from './migrate-010-to-110.js';

const config = {
  redirects: [

    ...from10to11.redirects,

    // 'contro' typo
    { from: '/docs/next/basics/user-interface/controls/creating-controls/choosing-a-custom-contro-type', to: '/docs/basics/user-interface/controls/creating-controls/choosing-a-custom-control-type' },
    // Restructuring of 'page-transitions'
    { from: '/docs/next/guides/graphics-and-animation/how-to-create-a-custom-page-transition', to: '/docs/guides/graphics-and-animation/page-transitions/how-to-create-a-custom-page-transition' },
    { from: '/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/', to: '/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition' },
    { from: '/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/cross-fade-page-transition', to: '/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition' },
    { from: '/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/page-slide-transition', to: '/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition' },
    { from: '/docs/next/guides/graphics-and-animation/how-to-use-page-transitions/page-transition-combinations', to: '/docs/guides/graphics-and-animation/page-transitions/cross-fade-page-transition' },
    // Forgotten empty `upgrade-to-v11` page
    { from: '/docs/next/reference/upgrade-to-v11', to: '/docs/stay-up-to-date/upgrade-from-0.10' }
  ],
  createRedirects(existingPath) {
    const redirects = from10to11.createRedirects(existingPath) || [];

    if (!existingPath.includes('/0.10.x/') && existingPath.includes('/docs/')) {
      redirects.push(existingPath.replace('/docs/', '/docs/next/'));
    }

    console.log(existingPath, redirects);
    return redirects.length ? redirects : undefined;
  },
};

module.exports = config;