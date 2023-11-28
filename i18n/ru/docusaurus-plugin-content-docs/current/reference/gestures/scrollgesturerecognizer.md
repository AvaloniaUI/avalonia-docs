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

The ScrollGestureRegonizer raises a `Gestures.ScrollGestureEvent` when it detects the start of a scroll gesture. When the scroll ends, from the pointer being released or another gesture start, it raises a `Gestures.ScrollGestureEndedEvent`.

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
For the complete API documentation about this gesture recognizer, see [here](https://reference.avaloniaui.net/api/Avalonia.Input.GestureRecognizers/ScrollGestureRecognizer/).
:::

:::info
View the source code on _GitHub_ [`ScrollGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/ScrollGestureRecognizer.cs)
:::
