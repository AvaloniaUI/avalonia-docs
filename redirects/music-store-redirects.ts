interface Redirect {
  to: string;
  from: string | string[];
}

const redirects: Redirect[] = [
    { to: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CompleteApps/Avalonia.MusicStore',
      from: [
            '/docs/tutorials/music-store-app/',
            '/docs/tutorials/music-store-app/creating-the-project',
            '/docs/tutorials/music-store-app/creating-a-modern-looking-window',
            '/docs/tutorials/music-store-app/add-and-layout-controls',
            '/docs/tutorials/music-store-app/button-command',
            '/docs/tutorials/music-store-app/opening-a-dialog',
            '/docs/tutorials/music-store-app/add-content-to-dialog',
            '/docs/tutorials/music-store-app/mock-search',
            '/docs/tutorials/music-store-app/album-view',
            '/docs/tutorials/music-store-app/searching-for-albums',
            '/docs/tutorials/music-store-app/displaying-images',
            '/docs/tutorials/music-store-app/return-from-dialog',
            '/docs/tutorials/music-store-app/add-items-to-users-collection',
            '/docs/tutorials/music-store-app/add-data-persistence',
            '/docs/tutorials/music-store-app/load-data-at-startup',
            '/docs/tutorials/music-store-app/summary',
            '/docs/tutorials/music-store-app/setup-development-environment',
          ],
    },
];

export const music_store_redirects = { redirects };
