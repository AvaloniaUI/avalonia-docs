---
id: index
title: Services
---

# Services

This section will introduce you to the services inlcuded in an application.

```mdx-code-block
import {DocsCardList} from '../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
```