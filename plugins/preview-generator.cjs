/**
 * Docusaurus plugin for generating XAML preview screenshots.
 * 
 * This plugin:
 * 1. After SSR build completes, reads the preview manifest
 * 2. Uses Playwright to capture screenshots of missing previews
 * 3. Saves them to the build output directory
 */

const fs = require('fs');
const path = require('path');

const CONCURRENCY = 4; // Number of parallel browser pages

module.exports = function previewGeneratorPlugin(context, options) {
  return {
    name: 'preview-generator-plugin',

    async postBuild({ outDir, siteConfig }) {
      const manifestPath = path.join(outDir, 'preview-manifest.json');
      const previewDir = path.join(outDir, 'preview');
      
      // Ensure preview directory exists
      if (!fs.existsSync(previewDir)) {
        fs.mkdirSync(previewDir, { recursive: true });
      }

      // Check if we should generate previews
      const skipGenerate = process.env.DISABLE_GENERATE_PREVIEWS === 'true';
      
      if (skipGenerate) {
        console.log('[preview-generator] Skipping preview generation');
        return;
      }

      console.log('[preview-generator] Starting preview generation... Set DISABLE_GENERATE_PREVIEWS=true to skip.');

      // Read manifest from the temp file written during SSR
      const tempManifestPath = path.join(context.siteDir, '.preview-manifest.json');
      let manifest = [];
      
      try {
        if (fs.existsSync(tempManifestPath)) {
          const content = fs.readFileSync(tempManifestPath, 'utf-8');
          manifest = JSON.parse(content);
          // Clean up temp file
          fs.unlinkSync(tempManifestPath);
        } else {
          console.log('[preview-generator] No manifest file found at', tempManifestPath);
          return;
        }
      } catch (err) {
        console.log('[preview-generator] Failed to read manifest:', err.message);
        return;
      }

      if (manifest.length === 0) {
        console.log('[preview-generator] No previews to generate');
        return;
      }

      // Filter to default locale only (exclude /ru/, /zh-Hans/, etc.)
      const defaultLocale = siteConfig.i18n?.defaultLocale || 'en';
      const locales = siteConfig.i18n?.locales || ['en'];
      const nonDefaultLocales = locales.filter(l => l !== defaultLocale);
      
      const defaultLocaleManifest = manifest.filter(entry => {
        // Exclude entries that start with a non-default locale
        return !nonDefaultLocales.some(locale => 
          entry.previewPath.startsWith(`/preview/${locale}/`) ||
          entry.docId.startsWith(`${locale}/`)
        );
      });

      // Deduplicate by previewPath (same preview might be registered multiple times)
      const uniquePreviews = [];
      const seenPaths = new Set();
      for (const entry of defaultLocaleManifest) {
        if (!seenPaths.has(entry.previewPath)) {
          seenPaths.add(entry.previewPath);
          uniquePreviews.push(entry);
        }
      }

      console.log(`[preview-generator] Found ${uniquePreviews.length} unique previews (filtered from ${manifest.length} total)`);

      // Write manifest for debugging/caching
      fs.writeFileSync(manifestPath, JSON.stringify(uniquePreviews, null, 2));

      // Check which previews are missing (need both light and dark versions)
      const missingPreviews = uniquePreviews.filter(entry => {
        const lightPath = path.join(outDir, entry.previewPath);
        const darkPath = path.join(outDir, entry.previewPath.replace('.png', '-dark.png'));
        return !fs.existsSync(lightPath) || !fs.existsSync(darkPath);
      });

      if (missingPreviews.length === 0) {
        console.log('[preview-generator] All preview images already exist (light + dark)');
        return;
      }

      console.log(`[preview-generator] Generating ${missingPreviews.length} previews × 2 themes (${CONCURRENCY} parallel)...`);

      // Dynamic import of Playwright (dev dependency)
      let playwright;
      try {
        playwright = require('playwright');
      } catch {
        console.error('[preview-generator] Playwright not installed. Run: npm install -D playwright');
        return;
      }

      const previewUrl = siteConfig.customFields?.avaloniaPreviewUrl;
      if (!previewUrl) {
        console.error('[preview-generator] avaloniaPreviewUrl not configured');
        return;
      }

      // Launch browser
      const browser = await playwright.chromium.launch();

      // Process previews in parallel batches
      // Generates both light and dark mode screenshots
      // Default height 300px, scaled by 1.5x DPI
      const generatePreview = async (entry, theme = 'light') => {
        const previewHeight = entry.height || 300;
        const canvasHeight = Math.round(previewHeight * 1.5);
        
        const page = await browser.newContext({
          viewport: { width: 600, height: canvasHeight },
          deviceScaleFactor: 1.5,
          colorScheme: theme,
        }).then(ctx => ctx.newPage());

        try {
          const themeSuffix = theme === 'dark' ? '-dark' : '';
          const themedPath = entry.previewPath.replace('.png', `${themeSuffix}.png`);
          console.log(`[preview-generator] Generating: ${themedPath}`);

          // Set up message listener BEFORE navigation so we don't miss 'ready'
          await page.addInitScript(() => {
            window.__previewState = { ready: false, compiled: false, viewCreated: false, error: null };
            window.addEventListener('message', (event) => {
              const { type, message } = event.data || {};
              if (type === 'ready') window.__previewState.ready = true;
              if (type === 'compiled') window.__previewState.compiled = true;
              if (type === 'viewcreated') window.__previewState.viewCreated = true;
              if (type === 'error') window.__previewState.error = message;
            });
          });

          // Navigate to preview URL
          await page.goto(previewUrl, { waitUntil: 'domcontentloaded' });

          // Wait for ready message
          await page.waitForFunction(() => window.__previewState?.ready === true, { timeout: 30000 });

          // Send XAML to the preview
          await page.evaluate(({ xaml, csharp }) => {
            window.__previewState.compiled = false;
            window.__previewState.viewCreated = false;
            window.__previewState.error = null;
            window.postMessage({ type: 'update', xaml, csharp }, '*');
          }, { xaml: entry.xaml, csharp: entry.csharp || '' });

          // Wait for compiled and viewcreated
          await page.waitForFunction(
            () => window.__previewState?.compiled === true && window.__previewState?.viewCreated === true,
            { timeout: 20000 }
          ).catch(async () => {
            // Check if there was an error
            const error = await page.evaluate(() => window.__previewState?.error);
            if (error) {
              throw new Error(error);
            }
            throw new Error('Timeout waiting for compiled + viewcreated');
          });

          // Small delay for rendering to complete
          await page.waitForTimeout(100);

          // Ensure directory exists for nested paths
          const imagePath = path.join(outDir, themedPath);
          const imageDir = path.dirname(imagePath);
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
          }

          // Take screenshot
          await page.screenshot({ path: imagePath });
          console.log(`[preview-generator] Saved: ${themedPath}`);

        } catch (err) {
          const themeSuffix = theme === 'dark' ? '-dark' : '';
          const themedPath = entry.previewPath.replace('.png', `${themeSuffix}.png`);
          console.error(`[preview-generator] Failed to generate ${themedPath}:`, err.message);
        } finally {
          await page.close();
        }
      };

      // Build list of all tasks: each preview × both themes
      const tasks = [];
      for (const entry of missingPreviews) {
        tasks.push({ entry, theme: 'light' });
        tasks.push({ entry, theme: 'dark' });
      }

      // Process in parallel with concurrency limit
      const chunks = [];
      for (let i = 0; i < tasks.length; i += CONCURRENCY) {
        chunks.push(tasks.slice(i, i + CONCURRENCY));
      }

      for (const chunk of chunks) {
        await Promise.all(chunk.map(({ entry, theme }) => generatePreview(entry, theme)));
      }

      await browser.close();
      console.log('[preview-generator] Preview generation complete');
    },
  };
};
