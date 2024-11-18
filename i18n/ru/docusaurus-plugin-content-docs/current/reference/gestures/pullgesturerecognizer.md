---
description: REFERENCE - Gestures
---

# PullGestureRecognizer

A gesture recognizer that tracks a pull gesture. A pull gesture occurs when a pointer is dragged from the edge of a control. The direction of the pull is defined by the `PullDirection` property.

## Using a PullGestureRecognizer
A PullGestureRecognizer can be attached to a control using the control's `GestureRecognizers` property.
```xml
<Border Width="500"
        Height="500"
        Margin="5"
        Name="border">
  <Border.GestureRecognizers>
    <PullGestureRecognizer PullDirection="TopToBottom"/>
  </Border.GestureRecognizers>
</Border>
```

```csharp title='C#'
border.GestureRecognizers.Add(new PullGestureRecognizer()
            {
                PullDirection = PullDirection.TopToBottom,
            });
```

The PullGestureRegonizer raises a `Gestures.PullGestureEvent` when it detects the start of a pull gesture. When the pull ends, from the pointer being released or another gesture start, it raises a `Gestures.PullGestureEndedEvent`.

### PullDirection
This defines the direction of the pull. There are 4 available values;
* `PullDirection.TopToBottom` : Pull starts from the top edge and moves towards the buttom
* `PullDirection.BottomToTop` : Pull starts from the bottom edge and moves towards the top
* `PullDirection.LeftToRight` : Pull starts from the left edge and moves towards the right
* `PullDirection.RightToLeft` : Pull starts from the right edge and moves towards the top

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
        <td>PullDirection</td>
        <td>Defines the direction of the pull gesture. </td>
      </tr>
    </tbody>
  </table>


## More Information

:::info
View the source code on _GitHub_ 

[`PullGestureRecognizer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/GestureRecognizers/PullGestureRecognizer.cs)

[`PullGestureEventArgs.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/PullGestureEventArgs.cs)
:::
