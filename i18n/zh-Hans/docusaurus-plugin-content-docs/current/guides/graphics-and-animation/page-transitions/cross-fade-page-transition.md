---
id: cross-fade-page-transition
title: Cross Fade Page Transition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 跨淡入淡出页面过渡

跨淡入淡出页面过渡通过动画方式改变不透明度，从而使当前页面淡出，新页面淡入。

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<CrossFade Duration="0:00:00.500" />
```

</TabItem>
<TabItem value="cs">

```cs
var transition = new CrossFade(TimeSpan.FromMilliseconds(500));
```
</TabItem>  

</Tabs>

## 更多信息

:::info
有关此过渡效果的完整 API 文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Animation/CrossFade/).
:::

:::info
在 _GitHub_ 上查看源代码 [`CrossFade.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/CrossFade.cs)
:::