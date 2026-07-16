import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {forwardRef} from 'react';
import type {LinkAdapterProps} from '@avaloniaui/web-ds';

/**
 * Bridges the native-style WebDS link contract to Docusaurus once at the app
 * boundary. Docusaurus keeps anchors and external/targeted links native while
 * applying the configured base URL to internal routes and preserving normal
 * browser modifier-key behaviour.
 */
export const DocusaurusLinkAdapter = forwardRef<
  HTMLAnchorElement,
  LinkAdapterProps
>(function DocusaurusLinkAdapter(
  {download, href, rel, target, ...anchorProps},
  ref,
) {
  const nativeHref = useBaseUrl(href);
  // Docusaurus supplies safe defaults for external links. Do not forward an
  // explicit `undefined`, because its final props spread would otherwise
  // overwrite target="_blank" and rel="noopener noreferrer".
  const optionalPolicyProps = {
    ...(rel !== undefined ? {rel} : {}),
    ...(target !== undefined ? {target} : {}),
  };

  if (download !== undefined) {
    return (
      <a
        {...anchorProps}
        {...optionalPolicyProps}
        ref={ref}
        href={nativeHref}
        download={download}
      />
    );
  }

  return (
    <Link
      {...anchorProps}
      {...optionalPolicyProps}
      ref={ref}
      href={href}
    />
  );
});
