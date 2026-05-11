export interface Env {
  DOCS_REDIRECTS: KVNamespace;
}

const STATIC_EXT = /\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|json|xml|txt|webp|avif|mp4|webm)$/i;

const EDGE_CACHE: RequestInitCfProperties = {
  cacheTtl: 604800,
  cacheEverything: true,
};

function isStaticAsset(path: string): boolean {
  return path.startsWith('/assets/') || path.startsWith('/img/') || STATIC_EXT.test(path);
}

function normalizePath(path: string): string {
  let p = path.toLowerCase();
  if (p.length > 1 && p.endsWith('/')) {
    p = p.slice(0, -1);
  }
  return p;
}

function hasFileExtension(path: string): boolean {
  const lastSegment = path.split('/').pop() || '';
  return lastSegment.includes('.');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Static assets: passthrough immediately, no KV lookup
    if (isStaticAsset(url.pathname)) {
      return fetch(request);
    }

    const normalized = normalizePath(url.pathname);

    // Check KV for a redirect
    const target = await env.DOCS_REDIRECTS.get(normalized);

    if (target) {
      // Build redirect URL, preserving query string from original request
      const redirectUrl = new URL(target, url);
      if (url.search) {
        url.searchParams.forEach((value, key) => {
          redirectUrl.searchParams.append(key, value);
        });
      }

      return new Response(null, {
        status: 301,
        headers: {
          'Location': redirectUrl.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Trailing-slash rewrite: if path has no file extension and no trailing
    // slash, internally fetch with trailing slash to avoid Scaleway 302
    if (!hasFileExtension(url.pathname) && !url.pathname.endsWith('/')) {
      const rewrittenUrl = new URL(request.url);
      rewrittenUrl.pathname = url.pathname + '/';
      const rewrittenRequest = new Request(rewrittenUrl.toString(), request);
      return withBrowserCache(await fetch(rewrittenRequest, { cf: EDGE_CACHE }));
    }

    // Default: passthrough to origin
    return withBrowserCache(await fetch(request, { cf: EDGE_CACHE }));
  },
};

function withBrowserCache(response: Response): Response {
  if (response.headers.has('Cache-Control')) {
    return response;
  }
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Cache-Control', 'public, max-age=300');
  return newResponse;
}
