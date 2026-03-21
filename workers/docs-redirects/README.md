# Cloudflare Worker for Redirects

Cloudflare Worker that handles server-side redirects and trailing-slash normalization for `docs.avaloniaui.net`.

## What it does

1. **KV redirects** — Looks up the request path in the `DOCS_REDIRECTS` KV namespace. If a match is found, returns a `301` redirect to the target URL.
2. **Trailing-slash rewrite** — If no redirect is found and the path looks like a page (no file extension), the Worker internally rewrites the request to append a trailing slash. S3-compatible object storage (e.g. AWS, Scaleway) always returns a `302` redirect to the trailing-slash version when a path is requested without one (e.g. `/docs/welcome` → `302` → `/docs/welcome/`). This rewrite eliminates that round-trip by fetching the trailing-slash path internally, so the browser gets the page directly.
3. **Static asset bypass** — Requests for static assets (`.js`, `.css`, `.png`, etc. and `/assets/*` paths) skip KV lookup entirely and pass straight through to origin.

## Request flow

```
Browser request
       │
       ▼
  Static asset? ──YES──▶ passthrough to origin
       │
      NO
       ▼
  Normalize path (lowercase, strip trailing slash)
       │
       ▼
  KV lookup ──FOUND──▶ 301 redirect to target
       │
    NOT FOUND
       ▼
  Needs trailing slash? ──YES──▶ rewrite: fetch(path/) internally
       │
      NO
       ▼
  passthrough to origin
```

## Configuration

- **Route**: `docs.avaloniaui.net/*`
- **KV namespace**: `DOCS_REDIRECTS` (`ae8131374b0d409e9ab0537882dafe0b`)
- **Account**: Avalonia UI (`9ef53ed9991bad2f5dcb328e0792bb77`)

## Local development

```bash
npm install
npm run dev    # starts wrangler dev server
```

## Deployment

Deployed automatically via GitHub Actions (`.github/workflows/deploy-docs-redirect-worker.yml`) when files in this directory change on `main`.

Manual deploy:

```bash
npm run deploy
```

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` environment variables.

## KV data

KV entries are managed separately by the script in `redirects/cloudflare_worker_kv_redirects/`. The Worker only reads from KV — it never writes to it.
