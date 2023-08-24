---
id: index
title: 部署
---

```mdx-code-block
import {DocsCardList} from '../../../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
```