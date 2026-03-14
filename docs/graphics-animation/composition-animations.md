---
id: composition-animations
title: Composition animations
description: Code-driven render-thread animations using the composition animation API in Avalonia.
doc-type: explanation
---

Composition animations are a code-driven animation system that runs directly on the render thread. They provide fine-grained control over visual properties and deliver smooth, high-performance animations without blocking the UI thread.

This API is similar to the UWP/WinUI Composition layer. Use it when you need programmatic control over animations, want render-thread performance, or need to animate properties that XAML keyframe animations do not support.

## When to use composition animations

| | Keyframe Animations | Control Transitions | Composition Animations |
|---|---|---|---|
| **Defined in** | XAML | XAML | C# code |
| **Triggered by** | Style selectors | Property value changes | `StartAnimation()` or implicit property changes |
| **Runs on** | UI thread | UI thread | Render thread |
| **Best for** | Multi-step style-driven animations | Smooth feedback on property changes | Performance-sensitive or programmatic animations |

Choose composition animations when you need to:

- Animate visuals from code (e.g., in response to scroll position, gestures, or data changes)
- Run animations on the render thread for maximum smoothness
- Use expression-based or physics-based animation logic

For style-driven scenarios, [Keyframe Animations](keyframe-animations) and [Control Transitions](control-transitions) are simpler and more appropriate.

## Core concepts

### CompositionVisual and Compositor

Every Avalonia control has a corresponding [`CompositionVisual`](/api/avalonia/rendering/composition/compositionvisual) on the render thread. You obtain it with `ElementComposition.GetElementVisual()`:

```csharp
var visual = ElementComposition.GetElementVisual(myControl);
```

The [`Compositor`](/api/avalonia/rendering/composition/compositor) is the factory object that creates animations and animation collections. Access it from any `CompositionVisual`:

```csharp
var compositor = visual.Compositor;
```

All animation objects must be created through the `Compositor` associated with the target visual.

### Animatable Properties

The following properties on `CompositionVisual` can be animated:

| Property | Type | Description |
|---|---|---|
| `Offset` | `Vector3D` | The X, Y, Z position offset of the visual. |
| `Opacity` | `float` | The opacity of the visual (0.0 to 1.0). |
| `Size` | `Vector` | The width and height of the visual. |

## Explicit animations

Explicit animations run when you call `StartAnimation()` on a visual. You define keyframes, set a duration, and start the animation manually.

### Slide-in example

This example slides a control in from the left over 400 milliseconds:

```csharp
var visual = ElementComposition.GetElementVisual(myControl);
var compositor = visual.Compositor;

var animation = compositor.CreateVector3KeyFrameAnimation();
animation.Duration = TimeSpan.FromMilliseconds(400);
animation.InsertKeyFrame(0f, new Vector3D(-200, 0, 0));
animation.InsertKeyFrame(1f, new Vector3D(0, 0, 0));

visual.StartAnimation("Offset", animation);
```

Keyframe progress values range from `0f` (start) to `1f` (end). You can insert intermediate keyframes at any value between 0 and 1 for multi-step animations.

### Fade-in example

```csharp
var visual = ElementComposition.GetElementVisual(myControl);
var compositor = visual.Compositor;

var animation = compositor.CreateScalarKeyFrameAnimation();
animation.Duration = TimeSpan.FromMilliseconds(300);
animation.InsertKeyFrame(0f, 0f);
animation.InsertKeyFrame(1f, 1f);

visual.StartAnimation("Opacity", animation);
```

## Implicit animations

Implicit animations trigger automatically whenever a mapped property changes. Instead of calling `StartAnimation()`, you assign an `ImplicitAnimationCollection` to the visual. Any time one of the mapped properties changes, the corresponding animation runs.

### Smooth repositioning example

This example smoothly animates a control's position whenever its `Offset` changes:

```csharp
var visual = ElementComposition.GetElementVisual(myControl);
var compositor = visual.Compositor;

var offsetAnimation = compositor.CreateVector3KeyFrameAnimation();
offsetAnimation.Duration = TimeSpan.FromMilliseconds(300);
offsetAnimation.Target = "Offset";
offsetAnimation.InsertExpressionKeyFrame(1f, "this.FinalValue");

var implicitAnimations = compositor.CreateImplicitAnimationCollection();
implicitAnimations["Offset"] = offsetAnimation;

visual.ImplicitAnimations = implicitAnimations;
```

The expression keyframe `"this.FinalValue"` tells the animation to interpolate from the current value to whatever new value the property was set to. This makes the animation reusable regardless of the specific start and end positions.

You can map multiple properties in the same collection:

```csharp
var opacityAnimation = compositor.CreateScalarKeyFrameAnimation();
opacityAnimation.Duration = TimeSpan.FromMilliseconds(200);
opacityAnimation.Target = "Opacity";
opacityAnimation.InsertExpressionKeyFrame(1f, "this.FinalValue");

implicitAnimations["Opacity"] = opacityAnimation;
```

## Integrating with XAML via attached properties

To use composition animations declaratively, wrap the setup logic in an attached property. This lets you apply composition behavior from XAML styles.

### Attached property

```csharp
public class CompositionAnimationHelper : AvaloniaObject
{
    public static readonly AttachedProperty<bool> SmoothOffsetProperty =
        AvaloniaProperty.RegisterAttached<CompositionAnimationHelper, Visual, bool>(
            "SmoothOffset");

    public static bool GetSmoothOffset(Visual element) =>
        element.GetValue(SmoothOffsetProperty);

    public static void SetSmoothOffset(Visual element, bool value) =>
        element.SetValue(SmoothOffsetProperty, value);

    static CompositionAnimationHelper()
    {
        SmoothOffsetProperty.Changed.AddClassHandler<Visual>((element, args) =>
        {
            if (args.NewValue is true)
            {
                element.AttachedToVisualTree += (_, _) =>
                {
                    var visual = ElementComposition.GetElementVisual(element);
                    if (visual == null) return;
                    var compositor = visual.Compositor;

                    var animation = compositor.CreateVector3KeyFrameAnimation();
                    animation.Duration = TimeSpan.FromMilliseconds(300);
                    animation.Target = "Offset";
                    animation.InsertExpressionKeyFrame(1f, "this.FinalValue");

                    var implicit = compositor.CreateImplicitAnimationCollection();
                    implicit["Offset"] = animation;
                    visual.ImplicitAnimations = implicit;
                };
            }
        });
    }
}
```

### XAML usage

```xml
<Style Selector="ListBoxItem">
    <Setter Property="local:CompositionAnimationHelper.SmoothOffset" Value="True" />
</Style>
```

Every `ListBoxItem` now smoothly animates to its new position whenever the list reorders or items are added and removed.

## API reference

| Type / Member | Description |
|---|---|
| `ElementComposition.GetElementVisual(Visual)` | Returns the `CompositionVisual` for a control. |
| `CompositionVisual` | Represents a control's visual on the render thread. |
| `Compositor` | Factory for creating animation and collection objects. |
| `CreateScalarKeyFrameAnimation()` | Creates an animation for `float` properties (e.g., `Opacity`). |
| `CreateVector3KeyFrameAnimation()` | Creates an animation for `Vector3D` properties (e.g., `Offset`). |
| `InsertKeyFrame(float progress, T value)` | Adds a keyframe at the given progress (0.0 to 1.0). |
| `InsertExpressionKeyFrame(float progress, string expression)` | Adds an expression-based keyframe (e.g., `"this.FinalValue"`). |
| `StartAnimation(string property, CompositionAnimation animation)` | Starts an explicit animation on the named property. |
| `ImplicitAnimationCollection` | Maps property names to animations that run automatically on change. |
| `CompositionVisual.ImplicitAnimations` | Gets or sets the implicit animation collection for a visual. |

## See also

- [Keyframe Animations](keyframe-animations)
- [Control Transitions](control-transitions)
- [Custom Rendering](custom-rendering)
