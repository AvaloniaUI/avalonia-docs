# Avalonia WebDS RC pilot

This branch validates `@avaloniaui/web-ds@1.0.0-rc.2` in the documentation
portal's React 18.3, Docusaurus, and Tailwind CSS 4 application. The supported
platforms page is the representative production route: its existing
`TierBadge` adapter now renders the WebDS `Badge`, and Docusaurus loads the
package's collision-safe, namespaced Tailwind token adapter and precompiled
component styles from the same Tailwind 4 stylesheet. The namespaced adapter
does not remap the documentation portal's established generic gray palette.
`src/theme/Root.tsx` installs the WebDS provider
once and bridges package links to `@docusaurus/Link`, preserving Docusaurus
base-URL, client-routing, anchor, external-link, target, and modifier-key
semantics.

## Compatibility fixture

`npm run build:web-ds-compat` adds an opt-in route and builds the site under
the non-root `/web-ds-compat/` base URL. Normal builds do not expose this
route. Its generated files are isolated and persistent Webpack caching is
disabled so the non-root public path cannot leak into a subsequent normal
build. The fixture covers React 18.3 server rendering and hydration, the
Tailwind token adapter, distinct documentation and namespaced WebDS gray
utilities, light/dark package tokens, and the Docusaurus link bridge. Browser
verification should assert that internal and versioned paths
receive the configured base URL, hash and external URLs remain native,
targeted links retain their target/rel policy, and Ctrl/Command-click is not
cancelled.

## Reproduce the registry-backed dependency install

The package manifest pins the immutable RC version and `package-lock.json`
records the published GitHub Packages URL and integrity. With a
least-privilege package-read credential, reproduce the clean install and
validation with:

```sh
NODE_AUTH_TOKEN=<token-with-read-packages> \
  npm install --save-exact @avaloniaui/web-ds@1.0.0-rc.2
npm ci
npm run typecheck
npm run build
```

Do not commit a `file:` or workspace package reference. The registry-backed
lockfile is authoritative. For the credential-free local audit, the reviewed
RC tarball was used only to seed npm's cache before running `npm ci` against
that unchanged lockfile in offline-preferred mode.

## GitHub Packages authentication and CI isolation

The checked-in `.npmrc` maps only the `@avaloniaui` scope to GitHub Packages
and reads the credential from `NODE_AUTH_TOKEN`. Do not grant this public
repository direct Manage Actions access to the private package: GitHub warns
that doing so can make the package available to forks. Do not add a long-lived
package PAT to this repository's Actions secrets or deployment workflows.

Compatibility CI runs from the private `AvaloniaUI/AvaloniaWebDS` repository's
`Documentation compatibility` workflow. That workflow checks out the fixed
`AvaloniaUI/avalonia-docs` branch `codex/web-ds-compat`, verifies that the
requested 40-character commit is reachable from the branch, detaches the exact
commit, and gives its own short-lived package-readable `GITHUB_TOKEN` only to
`npm ci --ignore-scripts`. Type checking, the Docusaurus compatibility build,
and Chromium SSR/hydration/link checks run after the token has been removed.
The public documentation workflows and fork-triggered code never receive a
private-package credential.

Before dispatching that private workflow, push the `codex/web-ds-compat`
pilot branch and pass the exact commit SHA together with the exact WebDS
version. Local developers may still use a personal classic PAT with
`read:packages` solely to refresh the lockfile and run a clean install; no
token may be committed.
