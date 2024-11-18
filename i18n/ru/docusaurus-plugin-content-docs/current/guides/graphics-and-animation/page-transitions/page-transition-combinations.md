---
id: page-transition-combinations
title: Page Transition Combinations
---

# Page Transition Combinations

You can combine two or more built-in page transitions to create a new effect.

Add a `CompositePageTransition` element to combine the effects of two or more different built-in transitions.

For example, the code here sample creates a transition that slides the views diagonally (the result of combining a horizontal and vertical slide), and also fades the old views out and the new in.

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
