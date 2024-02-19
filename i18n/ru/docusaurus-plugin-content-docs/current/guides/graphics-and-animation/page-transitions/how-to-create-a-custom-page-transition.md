---
id: how-to-create-a-custom-page-transition
title: How To Create a Custom Page Transition
---

import CustomPageTransitionScreenshot from '/img/guides/graphics-and-animations/custom-page-transition.webp';

# How To Create a Custom Page Transition

This guide will show you how to create your own custom page transition by implementing the `IPageTransition` interface.

The interface has a single method that you need to implement:

```csharp
public Task Start(Visual? from, Visual? to, bool forward, 
                                CancellationToken cancellationToken)
{
    // Setup the transition here.
}
```

## Example

This example will shrink the old view and then open up the new view vertically.

```csharp
using Avalonia.VisualTree;

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

    public async Task Start(Visual from, Visual to, bool forward, 
                                            CancellationToken cancellationToken)
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
                        Setters = { new Setter 
                        { Property = scaleYProperty, Value = 1d } },
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
                        Setters = { new Setter 
                        { 
                            Property = scaleYProperty, Value = 1d 
                        }},
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
    private static Visual GetVisualParent(Visual? from, Visual? to)
    {
        var p1 = (from ?? to)!.GetVisualParent();
        var p2 = (to ?? from)!.GetVisualParent();

        if (p1 != null && p2 != null && p1 != p2)
        {
            throw new ArgumentException(
                                "Controls for PageSlide must have same parent.");
        }

        return p1 ?? throw new InvalidOperationException(
                                                "Cannot determine visual parent.");
    }
}
```

<img src={CustomPageTransitionScreenshot} alt=''/>

## More Information

:::info
For the complete API documentation about this interface see [here](http://reference.avaloniaui.net/api/Avalonia.Animation/IPageTransition/).
:::

:::info
View the source code on _GitHub_ [`IPageTransition.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/IPageTransition.cs)
:::
