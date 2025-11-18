# 开始使用

import {DocsCardList} from '../../../../../src/components/global/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
