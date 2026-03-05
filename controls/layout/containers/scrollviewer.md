---
id: scrollviewer
title: ScrollViewer
---

The `ScrollViewer` control can have content that is bigger than its content zone, and will provide scroll bars to move hidden content into view.

A `ScrollViewer` cannot be contained in a control that has infinite height or width (depending on scrolling direction) such as a `StackPanel`. To avoid it, you can either set fixed Height/Width or MaxHeight/MaxWidth or choose another container panel.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `HorizontalScrollBarVisibility` | `ScrollBarVisibility` | Controls the horizontal scrollbar: `Auto`, `Visible`, `Hidden`, `Disabled`. |
| `VerticalScrollBarVisibility` | `ScrollBarVisibility` | Controls the vertical scrollbar: `Auto`, `Visible`, `Hidden`, `Disabled`. |
| `AllowAutoHide` | `bool` | Default `true`. Sets whether scrollbars hide automatically when the pointer is not over the control. |
| `Offset` | `Vector` | The current scroll position (X, Y). |
| `Extent` | `Size` | The total size of the scrollable content. |
| `Viewport` | `Size` | The size of the visible area. |
| `IsScrollChainingEnabled` | `bool` | Attached property. Default `true`. When set on an inner scrollable control, determines whether scroll events chain to the outer scroll viewer. |

## Scroll chaining

If you have a control that can itself scroll (see list below) nested inside a scroll viewer, and the user hits a limit on the control, this property sets whether the outer scroll viewer should continue scrolling or not. You enable or disable this behaviour with an attached property on the inner control, using the format:

`ScrollViewer.IsScrollChainingEnabled=[true|false]`

This attached property is available on these controls:

* Scroll Viewer
* Data Grid
* List Box
* Text Box
* Tree View

## Example

This example creates a stack panel that is bigger than the border it is inside. The scroll viewer automatically creates a vertical scroll bar.

<XamlPreview>

```xml
<Border xmlns="https://github.com/avaloniaui" Background="Gray" Width="200" Height="200">
  <ScrollViewer>
    <StackPanel>
      <TextBlock FontSize="22" Height="50" Background="Blue">Block 1</TextBlock>
      <TextBlock FontSize="22" Height="50">Block 2</TextBlock>
      <TextBlock FontSize="22" Height="50" Background="Blue">Block 3</TextBlock>
      <TextBlock FontSize="22" Height="50">Block 4</TextBlock>
      <TextBlock FontSize="22" Height="50" Background="Blue">Block 5</TextBlock>
    </StackPanel>
  </ScrollViewer>
</Border>
```

</XamlPreview>

## Scrollbar Visibility Options

| Value | Behavior |
|---|---|
| `Auto` | Shows the scrollbar only when content overflows (default). |
| `Visible` | Always shows the scrollbar. |
| `Hidden` | Hides the scrollbar but still allows scrolling by touch, wheel, or keyboard. |
| `Disabled` | Disables scrolling in that direction entirely. |

```xml
<!-- Always show vertical scrollbar, disable horizontal scrolling -->
<ScrollViewer VerticalScrollBarVisibility="Visible"
              HorizontalScrollBarVisibility="Disabled">
    <TextBlock Text="{Binding LongText}" TextWrapping="Wrap" />
</ScrollViewer>
```

## Programmatic Scrolling

```csharp
// Scroll to a specific position
scrollViewer.Offset = new Vector(0, 500);

// Scroll a child element into view
targetControl.BringIntoView();
```

## See also

- [ScrollViewer API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_ScrollViewer)
- [`ScrollViewer.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ScrollViewer.cs)

