---
id: page-transitions
title: Setting page transitions
description: Configure page transitions for animating between views in Avalonia using CrossFade, PageSlide, CompositePageTransition, or your own custom transitions.
doc-type: how-to
---

import CustomPageTransitionScreenshot from '/img/guides/ui-development/graphics/custom-page-transition.webp';

Page transitions animate between two views. You typically use them with controls such as `TransitioningContentControl` or `Carousel`. Avalonia provides two built-in transitions and the ability to combine or create your own.

To assign a transition, set the `PageTransition` property on the host control:

```xml title='XAML'
<TransitioningContentControl PageTransition="{StaticResource MyTransition}"
                              Content="{Binding CurrentPage}" />
```

## [`CrossFade`](/api/avalonia/animation/crossfade)

`CrossFade` fades out the current view and fades in the new view by animating opacity. This is a good default choice when you want a subtle, non-directional transition that works well for any content.

```xml title='XAML'
<CrossFade Duration="0:00:00.500" />
```

```csharp title='C#'
var transition = new CrossFade(TimeSpan.FromMilliseconds(500));
```

:::tip
`CrossFade` works well for tab-style navigation where there is no inherent forward/back direction. If your views have very different heights, a crossfade avoids the jarring jump that a slide can produce.
:::

## [`PageSlide`](/api/avalonia/animation/pageslide)

`PageSlide` slides the old view out and the new view in. The `Orientation` property controls the slide axis (the default is horizontal). This transition conveys directional navigation, making it ideal for wizard-style flows or sequential pages.

```xml title='XAML'
<PageSlide Duration="0:00:00.500" Orientation="Vertical" />
```

```csharp title='C#'
var transition = new PageSlide(TimeSpan.FromMilliseconds(500),
                                PageSlide.SlideAxis.Vertical);
```

:::tip
The `forward` parameter passed to the transition controls the slide direction. When you navigate backward (for example, pressing a "Back" button), set the parameter to `false` so the slide direction reverses automatically.
:::

## [`CompositePageTransition`](/api/avalonia/animation/compositepagetransition)

`CompositePageTransition` combines two or more transitions into a single effect. Every child transition runs in parallel. The following example slides views diagonally (horizontal and vertical slide combined) while also crossfading:

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
transition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500),
    PageSlide.SlideAxis.Horizontal));
transition.PageTransitions.Add(new PageSlide(TimeSpan.FromMilliseconds(500),
    PageSlide.SlideAxis.Vertical));
```

:::note
Keep the `Duration` values consistent across child transitions so they start and finish together. Mismatched durations can cause visual artifacts where one transition completes before the other.
:::

## Choosing the right transition

| Transition | Best for | Notes |
|---|---|---|
| `CrossFade` | Tabs, settings panels, content that changes in place | Subtle, non-directional |
| `PageSlide` (horizontal) | Wizard steps, forward/back navigation | Conveys sequential flow |
| `PageSlide` (vertical) | Expanding sections, drill-down navigation | Suggests hierarchy |
| `CompositePageTransition` | Rich, layered effects | Combine any of the above |

## Custom page transitions

When the built-in transitions do not match your design, you can implement the `IPageTransition` interface to create your own. The interface has a single method:

```csharp title='C#'
public Task Start(Visual? from, Visual? to, bool forward,
                  CancellationToken cancellationToken)
{
    // Animate from the old view (from) to the new view (to).
}
```

The `from` and `to` parameters can be `null` (for example, when the control first loads there is no outgoing view). The `forward` parameter indicates the navigation direction so you can reverse your animation accordingly. Always respect the `cancellationToken` to allow Avalonia to cancel the transition if the user navigates again before it completes.

The following example shrinks the old view vertically, then expands the new view:

```csharp title='C#'
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

<img src={CustomPageTransitionScreenshot} alt="Animation showing a custom page transition that shrinks and expands views vertically"/>

## See also

- [Animations](animations): Overview of animation types in Avalonia.
- [Keyframe animations](keyframe-animations): Multi-step keyframe animations.
- [Control transitions](control-transitions): Animating property changes.
- [Navigate between views](../how-to/navigation-how-to): Common patterns for switching between views.
