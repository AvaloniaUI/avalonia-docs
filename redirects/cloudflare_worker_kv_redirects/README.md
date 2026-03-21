# Cloudflare Worker KV Redirects Generator

Generates the KV data that powers the `avalonia-docs-redirects` Cloudflare Worker.

## What it does

`generate-kv-redirects.mjs` parses the TypeScript redirect definitions from the sibling redirect files and outputs a JSON file (`kv-redirects.json`) in the format required by `wrangler kv bulk put`.

### Source files parsed

- `../get-started-redirects.ts`
- `../music-store-redirects.ts`
- `../v12-docs-redirects.ts`
- `../restructure-redirects.ts`
- `../index.ts` (explicit literal redirects only)

### Key normalization

- **Keys**: Path-only (no host), lowercase, trailing slashes stripped
- **Values**: Full absolute target URLs, trailing slashes stripped
- Self-referencing redirects are filtered out
- Duplicates are de-duped by key (first occurrence wins)

### Example output

```json
[
  { "key": "/accelerate/community", "value": "https://docs.avaloniaui.net/tools/community-edition" },
  { "key": "/docs/stay-up-to-date/release-notes", "value": "https://github.com/AvaloniaUI/Avalonia/releases" }
]
```

## Usage

```bash
cd redirects/cloudflare_worker_kv_redirects
node generate-kv-redirects.mjs
```

This produces `kv-redirects.json` (gitignored).

### Upload to KV

```bash
npx wrangler kv bulk put kv-redirects.json \
  --namespace-id ae8131374b0d409e9ab0537882dafe0b \
  --remote
```

> **Note:** Wrangler v4 defaults to local KV. The `--remote` flag is required to write to the production KV namespace.

## CI/CD

KV entries are automatically regenerated and uploaded on every deploy to `main` via the `docs.avaloniaui.net CI/CD` GitHub Actions workflow (`.github/workflows/docs-avaloniaui-net.yml`). A validation step checks that all redirect targets point to allowed domains (`docs.avaloniaui.net`, `github.com/AvaloniaUI`) before uploading.
