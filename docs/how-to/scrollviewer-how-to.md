---
id: scrollviewer-how-to
title: "How to: Work with ScrollViewer"
description: Control scroll behavior, programmatic scrolling, scroll events, and virtualization integration.
doc-type: how-to
---

This guide covers common ScrollViewer scenarios: controlling scroll behavior, programmatic scrolling, scroll events, and integration with virtualization.

## Basic Usage

Wrap content that may exceed the available space:

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

ScrollViewer shows scrollbars automatically when content overflows.

## Scrollbar Visibility

Control when scrollbars appear:

```xml
<!-- Always show vertical scrollbar, never show horizontal -->
<ScrollViewer VerticalScrollBarVisibility="Visible"
              HorizontalScrollBarVisibility="Disabled">
    <TextBlock Text="{Binding LongText}" TextWrapping="Wrap" />
</ScrollViewer>
```

| Value | Behavior |
|---|---|
| `Auto` | Shows scrollbar only when content overflows (default) |
| `Visible` | Always shows the scrollbar |
| `Hidden` | Hides the scrollbar but still allows scrolling (by touch, wheel, or keyboard) |
| `Disabled` | Disables scrolling in that direction entirely |

## Programmatic Scrolling

### Scroll to a position

```csharp
scrollViewer.Offset = new Vector(0, 500); // Scroll to Y=500
```

### Scroll to top/bottom

```csharp
// Scroll to top
scrollViewer.Offset = new Vector(scrollViewer.Offset.X, 0);

// Scroll to bottom
scrollViewer.Offset = new Vector(
    scrollViewer.Offset.X,
    scrollViewer.Extent.Height - scrollViewer.Viewport.Height);
```

### Smooth scroll to position

Use `BringIntoView` on a child element for smooth scrolling:

```csharp
targetControl.BringIntoView();
```

Or with a specific rectangle:

```csharp
targetControl.BringIntoView(new Rect(0, 0, targetControl.Bounds.Width, targetControl.Bounds.Height));
```

## Scroll Events

### Monitoring scroll position

```csharp
scrollViewer.ScrollChanged += (sender, e) =>
{
    var offset = scrollViewer.Offset;
    var extent = scrollViewer.Extent;
    var viewport = scrollViewer.Viewport;

    // Check if scrolled to bottom
    var isAtBottom = offset.Y >= extent.Height - viewport.Height - 1;

    if (isAtBottom)
    {
        // Load more items (infinite scroll)
        LoadMoreItems();
    }
};
```

### Using property observation

```csharp
scrollViewer.GetObservable(ScrollViewer.OffsetProperty).Subscribe(offset =>
{
    Debug.WriteLine($"Scrolled to: {offset.Y}");
});
```

## Infinite Scroll (Load More)

Load more content as the user scrolls to the bottom:

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

        var newItems = await _api.GetItemsAsync(_page++, pageSize: 20);
        foreach (var item in newItems)
            Items.Add(item);

        _isLoading = false;
    }
}
```

```csharp
// In code-behind
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

## Nested ScrollViewers

When nesting scrollable content, disable the inner scroll direction that the outer scroll handles:

```xml
<ScrollViewer VerticalScrollBarVisibility="Auto">
    <StackPanel Spacing="16">
        <TextBlock Text="Section 1" FontSize="20" />

        <!-- Inner horizontal scroll -->
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

## Scroll Snap

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

## ScrollViewer with Sticky Headers

Create a layout where headers stay fixed while content scrolls:

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
            <!-- Scrollable content here -->
        </StackPanel>
    </ScrollViewer>
</Grid>
```

## Key Properties

| Property | Type | Description |
|---|---|---|
| `Offset` | `Vector` | Current scroll position (X, Y) |
| `Extent` | `Size` | Total size of the scrollable content |
| `Viewport` | `Size` | Size of the visible area |
| `HorizontalScrollBarVisibility` | `ScrollBarVisibility` | Horizontal scrollbar behavior |
| `VerticalScrollBarVisibility` | `ScrollBarVisibility` | Vertical scrollbar behavior |
| `AllowAutoHide` | `bool` | Whether scrollbars auto-hide after inactivity |
| `IsScrollChainingEnabled` | `bool` | Whether scroll events chain to parent scrollers |

## See Also

- [ScrollViewer Control Reference](/controls/layout/containers/scrollviewer): Property tables.
- [Performance](/docs/app-development/performance): Virtualization and scroll performance.
- [Layout](/docs/layout/layout): Overview of the layout system.
