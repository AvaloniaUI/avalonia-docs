---
description: REFERENCE - Gestures
---

# ScrollGestureRecognizer

A gesture recognizer that tracks a scrolling gesture. This can be attached to a control to detect when a pointer moves in a specific direction inside the control's bounds. This is especially useful when a control pans its contents, either horizontally, vertically or both.

## Using a ScrollGestureRecognizer
A ScrollGestureRecognizer can be attached to a control using the control's `GestureRecognizers` property.
```xml
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

```csharp title='C#'
image.GestureRecognizers.Add(new ScrollGestureRecognizer()
{
    CanVerticallyScroll = true,
    CanHorizontallyScroll = true,
});
```

The ScrollGestureRecognizer raises a `Gestures.ScrollGestureEvent` when it detects the start of a scroll gesture. When the scroll ends, from the pointer being released or another gesture start, it raises a `Gestures.ScrollGestureEndedEvent`.

## Binding Events
After the ScrollGestureRecognizer has been added to your control, you need to bind them in your code behind either through an inline handler or to an event function:
```csharp title='C#'
image.AddHandler(Gestures.ScrollGestureEvent, (s, e) => { });
image.AddHandler(Gestures.ScrollGestureEndedEvent, (s, e) => { });
```
```csharp title='C#'
image.AddHandler(Gestures.ScrollGestureEvent, Image_ScrollGesture);
image.AddHandler(Gestures.ScrollGestureEndedEvent, Image_ScrollGestureEnded);
...
private void Image_ScrollGesture(object? sender, ScrollGestureEventArgs e) { }
private void Image_ScrollGestureEnded(object? sender, ScrollGestureEndedEventArgs e) { }
```
If your event handles the gesture completely, you can mark the event as handled by setting:
```csharp title='C#'
e.Handled = true;
```
## Useful Properties

You will probably use these properties most often:

<table>
    <thead>
      <tr>
        <th width="266">Property</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CanVerticallyScroll</td>
        <td>Defines whether the content can be scrolled vertically. </td>
      </tr>
      <tr>
        <td>CanHorizontallyScroll</td>
        <td>Defines whether the content can be scrolled horizontally. </td>
      </tr>
    </tbody>
  </table>


## More Information

:::info
For the complete API documentation about this gesture recognizer, see [here](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_GestureRecognizers_ScrollGestureRecognizer).
:::

:::info
View the source code on _GitHub_ [`ScrollGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/ScrollGestureRecognizer.cs)
:::
