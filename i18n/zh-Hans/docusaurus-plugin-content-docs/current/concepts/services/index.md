---
id: index
title: Services
---

这部分将向您介绍应用程序中包含的服务。

```mdx-code-block
import {DocsCardList} from '../../../../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
```