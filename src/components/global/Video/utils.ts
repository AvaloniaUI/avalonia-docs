/**
 * Source parsing for the <Video> component.
 *
 * Everything here is pure and module-scope safe: no `window`, no `document`, and
 * `new URL()` is guarded so a malformed `src` can never throw during the static
 * site build.
 */

export type ParsedSource =
  | { kind: 'file'; src: string; type?: string }
  | { kind: 'embed'; src: string }
  | { kind: 'unknown'; src: string };

const MIME_TYPES: Record<string, string> = {
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  mov: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  ogg: 'video/ogg',
};

const YOUTUBE_HOSTS = ['youtube.com', 'youtube-nocookie.com', 'youtu.be'];
const VIMEO_HOSTS = ['vimeo.com', 'player.vimeo.com'];

function extensionOf(path: string): string | undefined {
  return /\.([a-z0-9]+)(?:[?#]|$)/i.exec(path)?.[1]?.toLowerCase();
}

/** YouTube's `t` parameter comes as either `90` or `1h2m3s`. */
function toSeconds(value: string | null): number | undefined {
  if (!value) return undefined;
  if (/^\d+$/.test(value)) return Number(value);

  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value);
  if (!match || !match[0]) return undefined;

  return (
    Number(match[1] ?? 0) * 3600 +
    Number(match[2] ?? 0) * 60 +
    Number(match[3] ?? 0)
  );
}

/**
 * Always embeds via youtube-nocookie.com. This is deliberate: the GTM consent
 * plugin in docusaurus.config.ts defaults every Google consent category to
 * `denied`, and a plain youtube.com/embed iframe writes third-party cookies on
 * load, straight past that gate. Do not "simplify" this to youtube.com.
 */
function parseYouTube(url: URL): ParsedSource | undefined {
  const host = url.hostname.replace(/^(?:www|m)\./, '').toLowerCase();

  let id = '';
  if (host === 'youtu.be') {
    id = url.pathname.slice(1);
  } else if (url.pathname === '/watch') {
    id = url.searchParams.get('v') ?? '';
  } else {
    id = /^\/(?:embed|shorts|v|live)\/([^/?#]+)/.exec(url.pathname)?.[1] ?? '';
  }
  id = id.split('/')[0];

  const list = url.searchParams.get('list');

  if (!/^[\w-]{6,}$/.test(id)) {
    // A playlist URL with no video id still embeds fine as a series.
    if (list) {
      return {
        kind: 'embed',
        src: `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(list)}&rel=0`,
      };
    }
    return undefined;
  }

  const params = new URLSearchParams({rel: '0'});
  const start = toSeconds(url.searchParams.get('t') ?? url.searchParams.get('start'));
  if (start) params.set('start', String(start));
  if (list) params.set('list', list);

  return {kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${id}?${params}`};
}

/** Handles vimeo.com/<id>, unlisted vimeo.com/<id>/<hash>, and player.vimeo.com URLs. */
function parseVimeo(url: URL): ParsedSource | undefined {
  const host = url.hostname.replace(/^www\./, '').toLowerCase();

  const match =
    host === 'player.vimeo.com'
      ? /^\/video\/(\d+)(?:\/([\w-]+))?/.exec(url.pathname)
      : /^\/(\d+)(?:\/([\w-]+))?/.exec(url.pathname);

  if (!match) return undefined;

  const [, id, pathHash] = match;
  const hash = pathHash ?? url.searchParams.get('h');

  return {
    kind: 'embed',
    src: hash
      ? `https://player.vimeo.com/video/${id}?h=${encodeURIComponent(hash)}`
      : `https://player.vimeo.com/video/${id}`,
  };
}

export function parseSource(rawSrc: string): ParsedSource {
  const src = (rawSrc ?? '').trim();
  if (!src) return {kind: 'unknown', src};

  if (/^https?:\/\//i.test(src)) {
    let url: URL;
    try {
      url = new URL(src);
    } catch {
      return {kind: 'unknown', src};
    }

    const host = url.hostname.replace(/^(?:www|m)\./, '').toLowerCase();

    if (YOUTUBE_HOSTS.includes(host)) {
      return parseYouTube(url) ?? {kind: 'unknown', src};
    }
    if (VIMEO_HOSTS.includes(host)) {
      return parseVimeo(url) ?? {kind: 'unknown', src};
    }

    // A remote URL that points straight at a media file is still playable.
    const extension = extensionOf(url.pathname);
    return extension && MIME_TYPES[extension]
      ? {kind: 'file', src, type: MIME_TYPES[extension]}
      : {kind: 'unknown', src};
  }

  const extension = extensionOf(src);
  if (!extension) return {kind: 'unknown', src};

  // An unrecognised extension still renders <video>, just without a type hint.
  return {kind: 'file', src, type: MIME_TYPES[extension]};
}

/** `maxWidth="720"` is invalid CSS and gets silently dropped, so add the unit. */
export function toCssLength(value?: string | number): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number') return `${value}px`;

  const trimmed = String(value).trim();
  return /^\d+(?:\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed;
}

/** MDX hands over strings for quoted props, and `"false"` must not read as true. */
export function asBool(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string') {
    return !(value === 'false' || value === '0' || value === '');
  }
  return Boolean(value);
}
