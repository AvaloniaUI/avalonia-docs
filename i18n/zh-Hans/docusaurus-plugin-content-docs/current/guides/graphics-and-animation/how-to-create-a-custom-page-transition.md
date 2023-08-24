---
id: how-to-create-a-custom-page-transition
title: 如何创建自定义页面过渡效果
---


# 如何创建自定义页面过渡效果

本指南将向您展示如何通过实现 `IPageTransition` 接口来创建自己的自定义页面过渡效果。

该接口有一个需要实现的方法：

```csharp
public Task Start(Visual? from, Visual? to, bool forward, 
                                CancellationToken cancellationToken)
{
    // 在这里设置过渡效果。
}
```

## 示例

此示例将缩小旧视图，然后垂直打开新视图。

```csharp
public class CustomTransition : IPageTransition
{
    /// <summary>
    /// 初始化 <see cref="CustomTransition"/> 类的新实例。
    /// </summary>
    public CustomTransition()
    {
    }

    /// <summary>
    /// 初始化 <see cref="CustomTransition"/> 类的新实例。
    /// </summary>
    /// <param name="duration">The duration of the animation.</param>
    public CustomTransition(TimeSpan duration)
    {
        Duration = duration;
    }

    /// <summary>
    /// 获取或设置动画的持续时间。
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
                        Setters = { new Setter 
                        { 
                            Property = scaleYProperty, Value = 1d 
                        }},
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
    /// 获取两个控件的共同视觉父级。
    /// </summary>
    /// <param name="from">源控件。</param>
    /// <param name="to">目标控件。</param>
    /// <returns>共同的父级。</returns>
    /// <exception cref="ArgumentException">
    /// 两个控件没有共同的父级。
    /// </exception>
    /// <remarks>
    /// 任何一个参数可能为null，但不能都为null。
    /// </remarks>
    private static IVisual GetVisualParent(IVisual? from, IVisual? to)
    {
        var p1 = (from ?? to)!.VisualParent;
        var p2 = (to ?? from)!.VisualParent;

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

<img src='/img/gitbook-import/assets/TransitioningContentControl\_03.webp' alt=''/>

## 更多信息

:::info
有关此接口的完整 API 文档，请参阅 [此处](http://reference.avaloniaui.net/api/Avalonia.Animation/IPageTransition/).
:::

:::info
在 _GitHub_ 上查看源代码 [`IPageTransition.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Animation/IPageTransition.cs)
:::
