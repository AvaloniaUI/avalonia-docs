---
id: scrollviewer
title: ScrollViewer
description: A container control that provides scrollbars when its content exceeds the visible area.
doc-type: reference
---

The [`ScrollViewer`](/api/avalonia/controls/scrollviewer) control can have content that is bigger than its content zone. It provides scroll bars so your users can move hidden content into view.

:::warning
You cannot place a `ScrollViewer` inside a control that has infinite height or width (depending on the scrolling direction), such as a `StackPanel`. To avoid this problem, set a fixed `Height`/`Width` or `MaxHeight`/`MaxWidth` on the `ScrollViewer`, or choose a different container panel.
:::

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `HorizontalScrollBarVisibility` | [`ScrollBarVisibility`](/api/avalonia/controls/primitives/scrollbarvisibility) | Controls the horizontal scrollbar: `Auto`, `Visible`, `Hidden`, `Disabled`. |
| `VerticalScrollBarVisibility` | `ScrollBarVisibility` | Controls the vertical scrollbar: `Auto`, `Visible`, `Hidden`, `Disabled`. |
| `AllowAutoHide` | `bool` | Default `true`. Sets whether scrollbars hide automatically when the pointer is not over the control. |
| `Offset` | `Vector` | The current scroll position (X, Y). |
| `Extent` | `Size` | The total size of the scrollable content. |
| `Viewport` | `Size` | The size of the visible area. |
| `IsScrollChainingEnabled` | `bool` | Attached property. Default `true`. When set on an inner scrollable control, determines whether scroll events chain to the outer `ScrollViewer`. |
| `IsDeferredScrollingEnabled` | `bool` | Default `false`. When `true`, the content does not scroll until the user releases the scrollbar thumb. Useful for performance with heavy content. |
| `BringIntoViewOnFocusChange` | `bool` | Default `true`. When a child control receives focus, the `ScrollViewer` automatically scrolls to bring it into view. |

## Scrollbar visibility options

Each scrollbar direction accepts one of the following `ScrollBarVisibility` values:

| Value | Behavior |
|---|---|
| `Auto` | Shows the scrollbar only when content overflows. This is the default for vertical scrolling. |
| `Visible` | Always shows the scrollbar, even when content fits within the viewport. |
| `Hidden` | Hides the scrollbar but still allows scrolling by touch, mouse wheel, or keyboard. |
| `Disabled` | Disables scrolling in that direction entirely. This is the default for horizontal scrolling. |

```xml
<!-- Always show the vertical scrollbar, disable horizontal scrolling -->
<ScrollViewer VerticalScrollBarVisibility="Visible"
              HorizontalScrollBarVisibility="Disabled">
    <TextBlock Text="{Binding LongText}" TextWrapping="Wrap" />
</ScrollViewer>
```

## Scroll chaining

When you nest a scrollable control inside a `ScrollViewer`, and the user reaches the scroll limit on the inner control, scroll chaining determines whether the outer `ScrollViewer` continues scrolling. You can enable or disable this behavior with the `IsScrollChainingEnabled` attached property on the inner control:

```xml
<ScrollViewer>
    <StackPanel>
        <!-- This inner ListBox will NOT chain scrolling to the outer ScrollViewer -->
        <ListBox ScrollViewer.IsScrollChainingEnabled="False"
                 ItemsSource="{Binding Items}"
                 MaxHeight="200" />
        <TextBlock Text="Other content below" />
    </StackPanel>
</ScrollViewer>
```

This attached property is available on the following controls:

* `ScrollViewer`
* `DataGrid`
* `ListBox`
* `TextBox`
* `TreeView`

## Programmatic scrolling

You can control the scroll position from code-behind or your view model:

```csharp
// Scroll to a specific position
scrollViewer.Offset = new Vector(0, 500);

// Scroll to the top
scrollViewer.Offset = new Vector(scrollViewer.Offset.X, 0);

// Scroll to the bottom
scrollViewer.Offset = new Vector(scrollViewer.Offset.X, scrollViewer.Extent.Height);

// Scroll a child element into view
targetControl.BringIntoView();
```

You can also listen for scroll position changes by subscribing to property changes on `Offset`:

```csharp
scrollViewer.GetObservable(ScrollViewer.OffsetProperty).Subscribe(offset =>
{
    // React to scroll position changes
    Debug.WriteLine($"Scrolled to: {offset.X}, {offset.Y}");
});
```

## Example

This example creates a `StackPanel` that is taller than the `Border` that contains it. The `ScrollViewer` automatically displays a vertical scrollbar.

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

### Horizontal scrolling

To enable horizontal scrolling, set `HorizontalScrollBarVisibility` to `Auto` or `Visible`:

```xml
<ScrollViewer HorizontalScrollBarVisibility="Auto"
              VerticalScrollBarVisibility="Disabled"
              Height="100">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <Border Width="200" Height="80" Background="CornflowerBlue" />
        <Border Width="200" Height="80" Background="SeaGreen" />
        <Border Width="200" Height="80" Background="Coral" />
        <Border Width="200" Height="80" Background="MediumPurple" />
    </StackPanel>
</ScrollViewer>
```

## See also

- [ScrollViewer API reference](/api/avalonia/controls/scrollviewer)
- [`ScrollViewer.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ScrollViewer.cs)

