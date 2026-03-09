---
id: scrollviewer-how-to
title: "How to: Work with ScrollViewer"
description: Learn how to control scroll behavior, scroll programmatically, respond to scroll events, implement infinite scrolling, and handle nested scroll regions in Avalonia.
doc-type: how-to
---

This guide covers common [`ScrollViewer`](/api/avalonia/controls/scrollviewer) scenarios including controlling scroll behavior, programmatic scrolling, responding to scroll events, and handling nested scroll regions.

## Basic usage

Wrap any content that may exceed the available space inside a `ScrollViewer`:

```xml
<ScrollViewer>
    <StackPanel Spacing="8">
        <!-- Content that may be taller than the viewport -->
        <TextBlock Text="Item 1" />
        <TextBlock Text="Item 2" />
        <!-- ... many more items ... -->
    </StackPanel>
</ScrollViewer>
```

`ScrollViewer` shows scrollbars automatically when its content overflows the visible area.

:::tip
A `ScrollViewer` cannot be placed inside a container that offers infinite height or width in the scrolling direction, such as a `StackPanel`. If you do this, the `ScrollViewer` will never detect overflow because its parent gives it unlimited space. Use a container with constrained dimensions (for example, `Grid`, `DockPanel`, or a fixed `Height`/`MaxHeight`) instead.
:::

## Scrollbar visibility

You control when each scrollbar appears by setting `HorizontalScrollBarVisibility` and `VerticalScrollBarVisibility`:

```xml
<!-- Always show vertical scrollbar, never show horizontal -->
<ScrollViewer VerticalScrollBarVisibility="Visible"
              HorizontalScrollBarVisibility="Disabled">
    <TextBlock Text="{Binding LongText}" TextWrapping="Wrap" />
</ScrollViewer>
```

| Value | Behavior |
|---|---|
| `Auto` | Shows the scrollbar only when content overflows (default for vertical) |
| `Visible` | Always shows the scrollbar, even when content fits |
| `Hidden` | Hides the scrollbar but still allows scrolling via touch, mouse wheel, or keyboard |
| `Disabled` | Disables scrolling in that direction entirely |

:::note
If you set `HorizontalScrollBarVisibility` to `Disabled` (the default), content wider than the viewport will be clipped. Set it to `Auto` or `Visible` when you need horizontal scrolling.
:::

## Programmatic scrolling

### Scroll to a specific position

Set the `Offset` property to jump directly to a position:

```csharp
// Scroll to 500 pixels from the top
scrollViewer.Offset = new Vector(0, 500);
```

The `Offset` is measured in device-independent pixels. The value is clamped automatically, so setting a value beyond the scrollable range scrolls to the end rather than throwing an exception.

### Scroll to top or bottom

```csharp
// Scroll to top
scrollViewer.Offset = new Vector(scrollViewer.Offset.X, 0);

// Scroll to bottom
scrollViewer.Offset = new Vector(
    scrollViewer.Offset.X,
    scrollViewer.Extent.Height - scrollViewer.Viewport.Height);
```

### Bring a child element into view

Use `BringIntoView` on a child control to scroll just enough to make it visible. This is especially useful when you know the target control but not its exact position:

```csharp
targetControl.BringIntoView();
```

You can also specify a rectangle relative to the target control:

```csharp
targetControl.BringIntoView(new Rect(0, 0, targetControl.Bounds.Width, targetControl.Bounds.Height));
```

:::tip
`BringIntoView` works with virtualized panels as well. When you call it on an item inside an `ItemsControl` that uses virtualization, the panel materializes the item first and then scrolls to it.
:::

## Respond to scroll events

### Monitor scroll position changes

Subscribe to the `ScrollChanged` event to react when the user scrolls:

```csharp
scrollViewer.ScrollChanged += (sender, e) =>
{
    var offset = scrollViewer.Offset;
    var extent = scrollViewer.Extent;
    var viewport = scrollViewer.Viewport;

    // Check if scrolled to bottom (with a 1-pixel tolerance)
    var isAtBottom = offset.Y >= extent.Height - viewport.Height - 1;

    if (isAtBottom)
    {
        LoadMoreItems();
    }
};
```

### Observe the offset property

For reactive-style code, observe the `Offset` property directly:

```csharp
scrollViewer.GetObservable(ScrollViewer.OffsetProperty).Subscribe(offset =>
{
    Debug.WriteLine($"Scrolled to: {offset.Y}");
});
```

This approach integrates well with Avalonia's reactive property system and fires on every offset change, including programmatic ones.

## Implement infinite scrolling

A common pattern is to load more content as your user scrolls near the bottom. Combine a scroll position check with an async data-loading method:

```csharp
public partial class InfiniteListViewModel : ObservableObject
{
    private int _page = 0;
    private bool _isLoading;

    public ObservableCollection<Item> Items { get; } = new();

    public async Task LoadMoreAsync()
    {
        if (_isLoading) return;
        _isLoading = true;

        try
        {
            var newItems = await _api.GetItemsAsync(_page++, pageSize: 20);
            foreach (var item in newItems)
                Items.Add(item);
        }
        finally
        {
            _isLoading = false;
        }
    }
}
```

In your code-behind, trigger loading when the user scrolls within a threshold of the bottom:

```csharp
private async void OnScrollChanged(object? sender, ScrollChangedEventArgs e)
{
    if (sender is not ScrollViewer sv) return;

    var distanceFromBottom = sv.Extent.Height - sv.Viewport.Height - sv.Offset.Y;
    if (distanceFromBottom < 100)
    {
        await ((InfiniteListViewModel)DataContext!).LoadMoreAsync();
    }
}
```

:::note
The threshold value (100 pixels in this example) controls how early loading begins. A larger threshold gives your data source more time to respond before the user reaches the end, creating a smoother experience.
:::

## Handle nested ScrollViewers

When you nest scrollable content, disable the inner scroll direction that the outer `ScrollViewer` already handles. This prevents the two scroll regions from competing for the same input:

```xml
<ScrollViewer VerticalScrollBarVisibility="Auto">
    <StackPanel Spacing="16">
        <TextBlock Text="Section 1" FontSize="20" />

        <!-- Inner horizontal scroll only -->
        <ScrollViewer HorizontalScrollBarVisibility="Auto"
                      VerticalScrollBarVisibility="Disabled">
            <StackPanel Orientation="Horizontal" Spacing="8">
                <Border Width="200" Height="150" Background="Red" />
                <Border Width="200" Height="150" Background="Blue" />
                <Border Width="200" Height="150" Background="Green" />
            </StackPanel>
        </ScrollViewer>

        <TextBlock Text="Section 2" FontSize="20" />
        <!-- More content... -->
    </StackPanel>
</ScrollViewer>
```

If the inner control can scroll in the same direction as the outer one, you can control whether scroll events "chain" up to the parent by setting the `ScrollViewer.IsScrollChainingEnabled` attached property on the inner control:

```xml
<!-- Prevent inner scroll from chaining to the outer ScrollViewer -->
<ListBox ScrollViewer.IsScrollChainingEnabled="False"
         Height="200"
         ItemsSource="{Binding InnerItems}" />
```

## Use scroll snap points

Enable snap points for carousel-like scrolling:

```xml
<ScrollViewer HorizontalScrollBarVisibility="Auto"
              VerticalScrollBarVisibility="Disabled"
              IsScrollChainingEnabled="True">
    <StackPanel Orientation="Horizontal" Spacing="16">
        <!-- Cards that snap into view -->
        <Border Width="300" Height="200" Background="#6366F1" CornerRadius="8" />
        <Border Width="300" Height="200" Background="#8B5CF6" CornerRadius="8" />
        <Border Width="300" Height="200" Background="#A78BFA" CornerRadius="8" />
    </StackPanel>
</ScrollViewer>
```

## Create a sticky header layout

Use a `Grid` to keep a header fixed while content scrolls beneath it:

```xml
<Grid RowDefinitions="Auto,*">
    <!-- Fixed header -->
    <Border Grid.Row="0" Background="White" Padding="16"
            ZIndex="1" BoxShadow="0 2 4 0 #20000000">
        <TextBlock Text="Fixed Header" FontWeight="Bold" />
    </Border>

    <!-- Scrollable content -->
    <ScrollViewer Grid.Row="1">
        <StackPanel Spacing="8" Margin="16">
            <!-- Your scrollable content here -->
        </StackPanel>
    </ScrollViewer>
</Grid>
```

This pattern keeps the header visible at all times. The `ZIndex` on the header `Border` ensures it renders above the scrollable content if they overlap during transitions or animations.

## Key properties

| Property | Type | Description |
|---|---|---|
| `Offset` | `Vector` | Current scroll position (X, Y) |
| `Extent` | `Size` | Total size of the scrollable content |
| `Viewport` | `Size` | Size of the visible area |
| `HorizontalScrollBarVisibility` | `ScrollBarVisibility` | Controls horizontal scrollbar behavior |
| `VerticalScrollBarVisibility` | `ScrollBarVisibility` | Controls vertical scrollbar behavior |
| `AllowAutoHide` | `bool` | Whether scrollbars auto-hide after a period of inactivity (default `true`) |
| `IsScrollChainingEnabled` | `bool` | Whether scroll events chain to parent scroll regions |

## See also

- [ScrollViewer reference](../../controls/layout/containers/scrollviewer.md)
- [Choosing a layout panel](../layout/choosing-a-layout-panel.md)
- [Performance optimization](../app-development/performance.md)
- [ItemsControl how-to](itemscontrol-how-to.md)
