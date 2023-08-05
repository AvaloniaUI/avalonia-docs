---
id: page-transitions
title: Page Transitions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`PageTransitions` are used to render a transition between two views, for example in a [Carousel](../controls/carousel) or [TransitioningContentControl](../controls/TransitioningContentControl)

:::warning
The duration must be set before the transition is used and must be greater than 0. If not, you will get an error. 
:::

## Build-In PageTransitions

### CrossFade

The `CrossFade` fades out the current view and fades in the new view by animating the opacity. 

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

#### Source code
[CrossFade.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Visuals/Animation/CrossFade.cs)

#### Reference
[CrossFade](http://reference.avaloniaui.net/api/Avalonia.Animation/CrossFade/)


### PageSlide

The `PageSlide` slides the content either horizontally or vertically. You can specify the slide axis via the `Orientation`-property. The default value is `Horizontal`.

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<PageSlide Duration="0:00:00.500" Orientation="Vertical" />
```

</TabItem>
<TabItem value="cs">

```cs
var transition = new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Vertical);
```
</TabItem>  

</Tabs>

#### Source code
[PageSlide.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Visuals/Animation/PageSlide.cs)

#### Reference
[PageSlide](http://reference.avaloniaui.net/api/Avalonia.Animation/PageSlide/)


### CompositePageTransition

The `CompositePageTransition` is used create a combined transition of several different transitions. The below sample creates a transition which slides the views diagonal (horizontally and vertically at the same time) and also fades the views out and in.

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<CompositePageTransition>
    <CrossFade Duration="0:00:00.500" />
    <PageSlide Duration="0:00:00.500" Orientation="Horizontal" />
    <PageSlide Duration="0:00:00.500" Orientation="Vertical" />
</CompositePageTransition>
```

</TabItem>
<TabItem value="cs">

```cs
var compositeTransition = new CompositePageTransition();
compositeTransition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Vertical));
compositeTransition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Horizontal));
compositeTransition.PageTransitions.Add(new CrossFade(TimeSpan.FromMilliseconds(500)));
```
</TabItem>  

</Tabs>

#### Source code
[CompositePageTransition.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Visuals/Animation/CompositePageTransition.cs)

#### Reference
[CompositePageTransition](http://reference.avaloniaui.net/api/Avalonia.Animation/CompositePageTransition/)


## Custom PageTransitions

You can also create your own `PageTransition` by implementing the `IPageTransition`-interface. 

The Interface has one member which you need to implement: 
```csharp
public Task Start(Visual? from, Visual? to, bool forward, CancellationToken cancellationToken)
{
    // Setup the transition here.
}
```

### Example

Below is a sample which will shrink the old view and grow the new view in vertically direction. 

```csharp
public class CustomTransition : IPageTransition
{
    /// <summary>
    /// Initializes a new instance of the <see cref="CustomTransition"/> class.
    /// </summary>
    public CustomTransition()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="CustomTransition"/> class.
    /// </summary>
    /// <param name="duration">The duration of the animation.</param>
    public CustomTransition(TimeSpan duration)
    {
        Duration = duration;
    }

    /// <summary>
    /// Gets the duration of the animation.
    /// </summary>
    public TimeSpan Duration { get; set; }

    public async Task Start(Visual from, Visual to, bool forward, CancellationToken cancellationToken)
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return;
        }

        var tasks = new List<Task>();
        var parent = GetVisualParent(from, to);
        var scaleYProperty = ScaleTransform.ScaleYProperty;

        if (from != null)
        {
            var animation = new Animation
            {
                FillMode = FillMode.Forward,
                Children =
                {
                    new KeyFrame
                    {
                        Setters = { new Setter { Property = scaleYProperty, Value = 1d } },
                        Cue = new Cue(0d)
                    },
                    new KeyFrame
                    {
                        Setters =
                        {
                            new Setter
                            {
                                Property = scaleYProperty,
                                Value = 0d
                            }
                        },
                        Cue = new Cue(1d)
                    }
                },
                Duration = Duration
            };
            tasks.Add(animation.RunAsync(from, null, cancellationToken));
        }

        if (to != null)
        {
            to.IsVisible = true;
            var animation = new Animation
            {
                FillMode = FillMode.Forward,
                Children =
                {
                    new KeyFrame
                    {
                        Setters =
                        {
                            new Setter
                            {
                                Property = scaleYProperty,
                                Value = 0d
                            }
                        },
                        Cue = new Cue(0d)
                    },
                    new KeyFrame
                    {
                        Setters = { new Setter { Property = scaleYProperty, Value = 1d } },
                        Cue = new Cue(1d)
                    }
                },
                Duration = Duration
            };
            tasks.Add(animation.RunAsync(to, null, cancellationToken));
        }

        await Task.WhenAll(tasks);

        if (from != null && !cancellationToken.IsCancellationRequested)
        {
            from.IsVisible = false;
        }
    }

    /// <summary>
    /// Gets the common visual parent of the two control.
    /// </summary>
    /// <param name="from">The from control.</param>
    /// <param name="to">The to control.</param>
    /// <returns>The common parent.</returns>
    /// <exception cref="ArgumentException">
    /// The two controls do not share a common parent.
    /// </exception>
    /// <remarks>
    /// Any one of the parameters may be null, but not both.
    /// </remarks>
    private static IVisual GetVisualParent(IVisual? from, IVisual? to)
    {
        var p1 = (from ?? to)!.VisualParent;
        var p2 = (to ?? from)!.VisualParent;

        if (p1 != null && p2 != null && p1 != p2)
        {
            throw new ArgumentException("Controls for PageSlide must have same parent.");
        }

        return p1 ?? throw new InvalidOperationException("Cannot determine visual parent.");
    }
}
```

  <div style={{textAlign: 'center'}}>
    <img src="/img/animations/page-transitions/TransitioningContentControl_03.webp" alt="Custom Transition Example" />
  </div>

#### Source code
[IPageTransition.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Visuals/Animation/IPageTransition.cs)

#### Reference
[IPageTransition](http://reference.avaloniaui.net/api/Avalonia.Animation/IPageTransition/)