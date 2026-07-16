import type {LoadContext, Plugin} from '@docusaurus/types';

/**
 * Adds a production-shaped WebDS compatibility route only when the dedicated
 * verification build opts in. Normal documentation builds expose no fixture.
 */
export default function webDsCompatibilityPlugin(
  context: LoadContext,
): Plugin {
  return {
    name: 'web-ds-compatibility-plugin',
    async contentLoaded({actions}) {
      if (process.env.WEB_DS_COMPATIBILITY_FIXTURE !== 'true') {
        return;
      }

      const basePath =
        context.baseUrl === '/' ? '' : context.baseUrl.replace(/\/$/, '');

      actions.addRoute({
        path: `${basePath}/__web-ds-compatibility`,
        component:
          '@site/src/components/web-ds/WebDSCompatibilityFixture.tsx',
        exact: true,
      });
    },
  };
}
