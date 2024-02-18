---
id: index
title: Создание компонентов UI
---

# Создание компонентов UI

import {DocsCardList} from '../../../../../../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
