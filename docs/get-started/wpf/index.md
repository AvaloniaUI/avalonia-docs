---
description: REFERENCE
---

# Converting from WPF

This reference will help you leverage your existing knowledge of Windows Presentation Foundation (WPF) to learn _Avalonia UI_ quickly.

You will see how although _Avalonia UI_ is often very similar to WPF; there are some differences. In particular, in the way in which the following work:

* Styling
* Data Templates

```mdx-code-block
import {DocsCardList} from '../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
```