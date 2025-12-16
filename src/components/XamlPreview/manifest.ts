/**
 * Preview manifest for build-time screenshot generation.
 * During SSR, XamlPreview components register themselves here.
 * After SSR, a script reads this manifest to generate missing screenshots.
 */

export interface PreviewManifestEntry {
  docId: string;
  previewPath: string;
  xaml: string;
  csharp?: string;
  height?: number;
}

// In-memory manifest collected during SSR
const manifestEntries: PreviewManifestEntry[] = [];

// Only import fs in Node.js environment
let fs: typeof import('fs') | null = null;
let manifestFilePath = '';

if (typeof window === 'undefined') {
  try {
    fs = require('fs');
    const path = require('path');
    manifestFilePath = path.join(process.cwd(), '.preview-manifest.json');
  } catch {
    // Not in Node.js environment
  }
}

export function registerPreview(entry: PreviewManifestEntry): void {
  // Only register during SSR (Node.js environment)
  if (typeof window !== 'undefined' || !fs) return;
  
  // Avoid duplicates (can happen with hot reloading)
  const existing = manifestEntries.find(e => e.previewPath === entry.previewPath);
  if (!existing) {
    manifestEntries.push(entry);
    
    // Write to file immediately so it persists across SSR
    try {
      fs.writeFileSync(manifestFilePath, JSON.stringify(manifestEntries, null, 2));
    } catch (err) {
      // Ignore write errors
    }
  }
}

export function getManifestEntries(): PreviewManifestEntry[] {
  // Try to read from file first (for postBuild hook)
  if (fs) {
    try {
      if (fs.existsSync(manifestFilePath)) {
        const content = fs.readFileSync(manifestFilePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch {
      // Fall back to in-memory
    }
  }
  return [...manifestEntries];
}

export function clearManifest(): void {
  manifestEntries.length = 0;
  if (fs) {
    try {
      if (fs.existsSync(manifestFilePath)) {
        fs.unlinkSync(manifestFilePath);
      }
    } catch {
      // Ignore
    }
  }
}

// For writing manifest to disk during build
export function getManifestJson(): string {
  return JSON.stringify(getManifestEntries(), null, 2);
}

export function getManifestFilePath(): string {
  return manifestFilePath;
}
