const redirects = [
    { to: '/docs/get-started/index',
      from: [
            '/docs/get-started/install',
            '/docs/get-started/set-up-an-editor',
            '/docs/get-started/getting-started',
            '/docs/get-started/introduction',
          ],
    },
    { to: '/docs/get-started/starter-tutorial/index',
      from: [
            '/docs/get-started/test-drive/index',
            '/docs/get-started/test-drive/introduction',
            '/docs/get-started/test-drive/create-a-project',
          ],
    },
    { to: '/docs/get-started/starter-tutorial/adding-a-control',
      from: [
            '/docs/get-started/test-drive/add-a-control',
          ],
    },
    { to: '/docs/get-started/starter-tutorial/adding-some-layout',
      from: [
            '/docs/get-started/test-drive/add-some-layout',
            '/docs/get-started/test-drive/input-controls',
          ],
    },
    { to: '/docs/get-started/starter-tutorial/customizing-the-avalonia-window',
      from: [
            '/docs/get-started/test-drive/main-window',
            '/docs/get-started/test-drive/the-design-preview',
          ],
    },
    { to: '/docs/get-started/starter-tutorial/establishing-events-and-responses',
      from: [
            '/docs/get-started/test-drive/respond-to-an-event',
          ],
    },
    { to: '/docs/get-started/starter-tutorial/converting-data',
      from: [
            '/docs/get-started/test-drive/code-with-controls',
          ],
    },
];

export const get_started_redirects = { redirects };
