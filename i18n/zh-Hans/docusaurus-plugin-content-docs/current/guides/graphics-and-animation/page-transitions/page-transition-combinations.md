---
id: page-transition-combinations
title: 页面过渡组合
---

# 页面过渡组合

您可以组合两种或更多内置的页面过渡效果，以创建新的效果。

添加一个 `CompositePageTransition` 元素来结合两种或更多不同内置过渡的效果。

例如，这里的代码示例创建了一个过渡效果，它以对角线方式滑动视图（水平和垂直滑动的组合效果），并且还淡出旧视图并淡入新视图。

```xml title='XAML'
<CompositePageTransition>
    <CrossFade Duration="0:00:00.500" />
    <PageSlide Duration="0:00:00.500" Orientation="Horizontal" />
    <PageSlide Duration="0:00:00.500" Orientation="Vertical" />
</CompositePageTransition>
```

```csharp title='C#'
var compositeTransition = new CompositePageTransition();
compositeTransition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Vertical));
compositeTransition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Horizontal));
compositeTransition.PageTransitions.Add(new CrossFade(TimeSpan.FromMilliseconds(500)));
```

#### Source code

[CompositePageTransition.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Visuals/Animation/CompositePageTransition.cs)

#### Reference

[CompositePageTransition](http://reference.avaloniaui.net/api/Avalonia.Animation/CompositePageTransition/)
