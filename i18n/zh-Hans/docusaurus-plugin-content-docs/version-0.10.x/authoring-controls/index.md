# Authoring Controls

Learn how to create custom controls. 

import {DocsCardList} from '../../../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
