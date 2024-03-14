---
id: page-slide-transition
title: Page Slide Transition
---

# Page Slide Transition

The page slide transition moves the old page out of view, and the new page into view, for the given duration. You can specify the slide direction using the orientation property (default horizontal).

```xml title='XAML'
<PageSlide Duration="0:00:00.500" Orientation="Vertical" />
```

```csharp title='C#'
var transition = new PageSlide(TimeSpan.FromMilliseconds(500), 
                                PageSlide.SlideAxis.Vertical);
```

## More Information

:::info
For the complete API documentation about this transition, see [here](http://reference.avaloniaui.net/api/Avalonia.Animation/PageSlide/).
:::

:::info
View the source code on _GitHub_ [`PageSlide.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/PageSlide.cs)
:::
