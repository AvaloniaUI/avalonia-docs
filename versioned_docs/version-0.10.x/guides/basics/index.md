---
id: index
title: Basics
---

```mdx-code-block
import {DocsCardList} from '../../../../src/components/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocsCardList list={useCurrentSidebarCategory().items} />
```

### ToDo List App

The "hello world" of the internet age. Lets build a todo list app using MVVM and Reactive UI. 

[Todo List App](../../tutorials/todo-list-app)