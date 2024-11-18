---
id: page-slide-transition
title: Page Slide Transition
---

# 页面滑动过渡

页面滑动过渡将旧页面移出视图，并将新页面视图移入，持续一定的时间。您可以使用orientation属性指定滑动方向（默认为水平）。

```xml title='XAML'
<PageSlide Duration="0:00:00.500" Orientation="Vertical" />
```

```csharp title='C#'
var transition = new PageSlide(TimeSpan.FromMilliseconds(500), 
                                PageSlide.SlideAxis.Vertical);
```

## 更多信息

:::info
有关此过渡的完整API文档，请参阅[这里](http://reference.avaloniaui.net/api/Avalonia.Animation/PageSlide/)。
:::

:::info
在_GitHub_上查看源代码 [`PageSlide.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/PageSlide.cs)
:::