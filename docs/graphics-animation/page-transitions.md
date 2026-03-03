---
id: page-transitions
title: Setting page transitions
---

import CustomPageTransitionScreenshot from '/img/guides/ui-development/graphics/custom-page-transition.webp';

Page transitions animate between two views, typically used with controls like `TransitioningContentControl` or `Carousel`. Avalonia provides two built-in transitions and the ability to combine or create your own.

## CrossFade

Fades out the current view and fades in the new view by animating opacity.

```xml title='XAML'
<CrossFade Duration="0:00:00.500" />
```

```csharp title='C#'
var transition = new CrossFade(TimeSpan.FromMilliseconds(500));
```

## PageSlide

Slides the old view out and the new view in. The `Orientation` property controls the slide axis (default is horizontal).

```xml title='XAML'
<PageSlide Duration="0:00:00.500" Orientation="Vertical" />
```

```csharp title='C#'
var transition = new PageSlide(TimeSpan.FromMilliseconds(500),
                                PageSlide.SlideAxis.Vertical);
```

## CompositePageTransition

Combines two or more transitions into a single effect. The following example slides views diagonally (horizontal and vertical slide combined) while also crossfading:

```xml title='XAML'
<CompositePageTransition>
    <CrossFade Duration="0:00:00.500" />
    <PageSlide Duration="0:00:00.500" Orientation="Horizontal" />
    <PageSlide Duration="0:00:00.500" Orientation="Vertical" />
</CompositePageTransition>
```

```csharp title='C#'
var transition = new CompositePageTransition();
transition.PageTransitions.Add(new CrossFade(TimeSpan.FromMilliseconds(500)));
transition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Horizontal));
transition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500), PageSlide.SlideAxis.Vertical));
```

## Custom page transitions

Implement the `IPageTransition` interface to create your own transition. The interface has a single method:

```csharp
public Task Start(Visual? from, Visual? to, bool forward,
                  CancellationToken cancellationToken)
{
    // Animate from the old view (from) to the new view (to).
}
```

The following example shrinks the old view vertically, then expands the new view:

```csharp
using Avalonia.VisualTree;

public class CustomTransition : IPageTransition
{
    public CustomTransition() { }

    public CustomTransition(TimeSpan duration)
    {
        Duration = duration;
    }

    public TimeSpan Duration { get; set; }

    public async Task Start(Visual from, Visual to, bool forward,
                            CancellationToken cancellationToken)
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return;
        }

        var tasks = new List<Task>();
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
                        Setters = { new Setter { Property = scaleYProperty, Value = 0d } },
                        Cue = new Cue(1d)
                    }
                },
                Duration = Duration
            };
            tasks.Add(animation.RunAsync(from, cancellationToken));
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
                        Setters = { new Setter { Property = scaleYProperty, Value = 0d } },
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
            tasks.Add(animation.RunAsync(to, cancellationToken));
        }

        await Task.WhenAll(tasks);

        if (from != null && !cancellationToken.IsCancellationRequested)
        {
            from.IsVisible = false;
        }
    }
}
```

<img src={CustomPageTransitionScreenshot} alt=''/>
