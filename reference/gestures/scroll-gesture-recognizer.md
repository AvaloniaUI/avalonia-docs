---
id: scroll-gesture-recognizer
title: ScrollGestureRecognizer
description: Reference for the ScrollGestureRecognizer gesture recognizer in Avalonia UI, which detects scrolling gestures on controls.
doc-type: reference
---

# ScrollGestureRecognizer

The `ScrollGestureRecognizer` tracks scrolling gestures on a control. You can use it to detect when a pointer moves in a specific direction inside a control's bounds. This is especially useful when a control pans its contents horizontally, vertically, or both.

## Using a ScrollGestureRecognizer

You attach a `ScrollGestureRecognizer` to a control through its `GestureRecognizers` property.

```xml title="XAML"
<Image Stretch="UniformToFill"
       Margin="5"
       Name="image"
       Source="/image.jpg">
  <Image.GestureRecognizers>
    <ScrollGestureRecognizer CanHorizontallyScroll="True"
                             CanVerticallyScroll="True"/>
  </Image.GestureRecognizers>
</Image>
```

```csharp title="C#"
image.GestureRecognizers.Add(new ScrollGestureRecognizer()
{
    CanVerticallyScroll = true,
    CanHorizontallyScroll = true,
});
```

## Events

The `ScrollGestureRecognizer` raises two events during its lifecycle:

- `Gestures.ScrollGestureEvent`: Raised when the recognizer detects the start of a scroll gesture. The event args (`ScrollGestureEventArgs`) provide the scroll delta.
- `Gestures.ScrollGestureEndedEvent`: Raised when the scroll ends, either because the pointer was released or another gesture started.

## Handling events

After you add the `ScrollGestureRecognizer` to your control, you can handle its events in code-behind using either an inline handler or a named event method.

**Inline handlers:**

```csharp title="C#"
image.AddHandler(Gestures.ScrollGestureEvent, (s, e) => { });
image.AddHandler(Gestures.ScrollGestureEndedEvent, (s, e) => { });
```

**Named event methods:**

```csharp title="C#"
image.AddHandler(Gestures.ScrollGestureEvent, Image_ScrollGesture);
image.AddHandler(Gestures.ScrollGestureEndedEvent, Image_ScrollGestureEnded);

// ...

private void Image_ScrollGesture(object? sender, ScrollGestureEventArgs e) { }
private void Image_ScrollGestureEnded(object? sender, ScrollGestureEndedEventArgs e) { }
```

If your event handler fully processes the gesture, you can mark the event as handled to prevent further propagation:

```csharp title="C#"
e.Handled = true;
```

## Properties

The following table lists the key properties of `ScrollGestureRecognizer`:

| Property | Type | Description |
|---|---|---|
| `CanVerticallyScroll` | `bool` | Gets or sets whether the content can be scrolled vertically. |
| `CanHorizontallyScroll` | `bool` | Gets or sets whether the content can be scrolled horizontally. |

## More information

:::info
For the complete API documentation about this gesture recognizer, see the [`ScrollGestureRecognizer`](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_GestureRecognizers_ScrollGestureRecognizer) API reference.
:::

:::info
View the source code on GitHub: [`ScrollGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/ScrollGestureRecognizer.cs)
:::

## See also

- [PullGestureRecognizer](pull-gesture-recognizer)
- [PinchGestureRecognizer](pinch-gesture-recognizer)
