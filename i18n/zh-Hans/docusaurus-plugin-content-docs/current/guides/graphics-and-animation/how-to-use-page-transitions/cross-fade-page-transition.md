---
id: cross-fade-page-transition
title: Cross Fade Page Transition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cross Fade Page Transition

The cross fade page transition fades out the current page and fades in the new page by animating the opacity.

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

## More Information

:::info
For the complete API documentation about this transition, see [here](http://reference.avaloniaui.net/api/Avalonia.Animation/PageSlide/).
:::

:::info
View the source code on _GitHub_ [`CrossFade.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/CrossFade.cs)
:::
