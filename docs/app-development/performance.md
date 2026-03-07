---
id: performance
title: Performance optimization
description: Optimize Avalonia app performance with virtualization, layout efficiency, compiled bindings, and profiling.
doc-type: how-to
---

This guide covers common performance considerations for Avalonia applications and techniques to keep your UI responsive.

## UI virtualization

When displaying large collections, virtualization ensures only visible items are created and rendered. Avalonia's `ListBox`, `TreeView`, `DataGrid`, and `ItemsRepeater` support virtualization by default.

### How virtualization works

Instead of creating a control for every item in the collection, the virtualizing panel creates controls only for visible items. As the user scrolls, controls that move off-screen are recycled and reused for new items coming into view.

### Ensuring virtualization is active

Virtualization requires a constrained height. If the items control is inside a `StackPanel` or another control that gives it infinite height, virtualization is disabled:

```xml
<!-- BAD: StackPanel gives infinite height, disabling virtualization -->
<StackPanel>
    <ListBox ItemsSource="{Binding LargeCollection}" />
</StackPanel>

<!-- GOOD: Grid row with * constrains height -->
<Grid RowDefinitions="*">
    <ListBox ItemsSource="{Binding LargeCollection}" />
</Grid>

<!-- GOOD: DockPanel fill area constrains height -->
<DockPanel>
    <TextBlock DockPanel.Dock="Top" Text="Items" />
    <ListBox ItemsSource="{Binding LargeCollection}" />
</DockPanel>
```

### ItemsRepeater for custom layouts

`ItemsRepeater` provides a lower-level virtualizing control for custom layouts:

```xml
<ScrollViewer>
    <ItemsRepeater ItemsSource="{Binding Items}">
        <ItemsRepeater.Layout>
            <StackLayout Spacing="4" />
        </ItemsRepeater.Layout>
        <ItemsRepeater.ItemTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding Name}" />
            </DataTemplate>
        </ItemsRepeater.ItemTemplate>
    </ItemsRepeater>
</ScrollViewer>
```

### Buffer factor for smooth scrolling

`VirtualizingStackPanel` supports a `BufferFactor` property that keeps additional items realized beyond the visible viewport. This reduces recycling frequency during scrolling, which can eliminate stutter caused by garbage collection, particularly on mobile devices.

```xml
<ListBox ItemsSource="{Binding LargeCollection}">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <VirtualizingStackPanel BufferFactor="1" />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
</ListBox>
```

A `BufferFactor` of `1` realizes items across one extra viewport height above and below the visible area. The default is `0` (no buffer). Higher values use more memory but produce smoother scrolling for complex item templates.

## Layout performance

### Avoid deep nesting

Each level of nesting adds measure and arrange passes. Flatten your layout where possible:

```xml
<!-- Avoid: deeply nested layout -->
<StackPanel>
    <Border>
        <StackPanel>
            <Border>
                <TextBlock Text="Hello" />
            </Border>
        </StackPanel>
    </Border>
</StackPanel>

<!-- Prefer: flat layout -->
<StackPanel>
    <TextBlock Text="Hello" Margin="8" />
</StackPanel>
```

### Use Grid instead of nested StackPanels

A single `Grid` with rows and columns is more efficient than multiple nested `StackPanel` controls:

```xml
<!-- Instead of nested StackPanels -->
<Grid ColumnDefinitions="Auto,*" RowDefinitions="Auto,Auto,Auto" RowSpacing="4">
    <TextBlock Grid.Row="0" Grid.Column="0" Text="Name:" />
    <TextBox Grid.Row="0" Grid.Column="1" Text="{Binding Name}" />
    <TextBlock Grid.Row="1" Grid.Column="0" Text="Email:" />
    <TextBox Grid.Row="1" Grid.Column="1" Text="{Binding Email}" />
</Grid>
```

### Minimize InvalidateArrange / InvalidateMeasure

Property changes that affect layout (e.g., Width, Height, Margin, Padding) trigger layout recalculations. Batch property changes when possible:

```csharp
// Batch visual updates
using (myPanel.BeginBatchUpdate())
{
    // Multiple changes, single layout pass
    myControl1.Width = 100;
    myControl2.Height = 200;
}
```

## Rendering performance

### Use ClipToBounds judiciously

`ClipToBounds="True"` creates a clip layer. Only use it when child content actually exceeds the control bounds.

### Avoid transparent backgrounds on large areas

Transparent elements still participate in hit testing and rendering. If a control does not need pointer interaction, set `IsHitTestVisible="False"`:

```xml
<Border Background="Transparent" IsHitTestVisible="False">
    <!-- Overlay that should not capture clicks -->
</Border>
```

### Reduce visual complexity

- Minimize the number of `BoxShadow` effects (each shadow adds a render pass)
- Avoid overlapping semi-transparent elements
- Use `Opacity` on a parent element rather than on each child individually

### BitmapCache

For visuals that are expensive to render but change infrequently, use `BitmapCache` to rasterize them to a bitmap surface. The control and its children are rendered once into an intermediate bitmap, and that bitmap is reused for subsequent frames until the content changes.

```xml
<Border BoxShadow="0 4 8 0 #40000000" CornerRadius="8">
    <Border.CacheMode>
        <BitmapCache RenderAtScale="1" />
    </Border.CacheMode>
    <!-- Complex content rendered once and cached -->
</Border>
```

`BitmapCache` properties:

| Property | Type | Default | Description |
|---|---|---|---|
| `RenderAtScale` | `double` | `1` | Resolution multiplier for the cached bitmap. Values above 1 increase quality (useful for content that will be scaled up), values below 1 reduce memory at the cost of quality. Set to 0 to disable caching. |
| `SnapsToDevicePixels` | `bool` | `false` | Aligns the cached bitmap to device pixel boundaries for sharper text and line rendering. |
| `EnableClearType` | `bool` | `false` | Enables ClearType subpixel text rendering within the cached surface. Without this, text in the cache uses grayscale antialiasing. |

For best results with text-heavy cached content, enable both `SnapsToDevicePixels` and `EnableClearType`:

```xml
<Border>
    <Border.CacheMode>
        <BitmapCache SnapsToDevicePixels="True" EnableClearType="True" />
    </Border.CacheMode>
    <TextBlock Text="Cached text with ClearType rendering" />
</Border>
```

### BitmapInterpolationMode

For images that do not need high-quality scaling, use a lower interpolation mode:

```xml
<Image Source="avares://MyApp/Assets/thumbnail.png"
       RenderOptions.BitmapInterpolationMode="LowQuality" />
```

## Data binding performance

### Use compiled bindings

Compiled bindings resolve property paths at compile time, avoiding runtime reflection:

```xml
<UserControl x:CompileBindings="True" x:DataType="vm:MainViewModel">
    <TextBlock Text="{Binding Name}" />
</UserControl>
```

Or enable project-wide in `.csproj`:

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

### Avoid unnecessary bindings

Use static values instead of bindings for properties that never change:

```xml
<!-- Unnecessary binding for a constant -->
<TextBlock Text="{Binding AppTitle}" />

<!-- Better: static resource or literal -->
<TextBlock Text="{StaticResource AppTitle}" />
<TextBlock Text="My Application" />
```

### Use OneTime bindings for static data

If a value is set once and never changes, use `OneTime` mode to avoid ongoing change tracking:

```xml
<TextBlock Text="{Binding Version, Mode=OneTime}" />
```

## Collection performance

### Use ObservableCollection for small-to-medium lists

`ObservableCollection<T>` notifies the UI of individual item additions and removals efficiently.

### Batch large updates

When adding many items at once, consider replacing the collection rather than adding items one by one:

```csharp
// Slow: triggers UI update for each add
foreach (var item in newItems)
    Items.Add(item);

// Faster: single collection replacement
Items = new ObservableCollection<Item>(newItems);
OnPropertyChanged(nameof(Items));
```

### Use DynamicData for large reactive collections

For collections with frequent sorting, filtering, or complex transformations, [DynamicData](https://github.com/reactivemarbles/DynamicData) provides optimized reactive pipelines that minimize UI updates.

## Async and threading

### Keep the UI thread free

Move heavy computation to background threads:

```csharp
var data = await Task.Run(() => LoadLargeDataSet());
Items = new ObservableCollection<Item>(data);
```

### Debounce rapid input

For search-as-you-type scenarios, debounce the input to avoid running expensive operations on every keystroke:

```csharp
this.WhenAnyValue(x => x.SearchText)
    .Throttle(TimeSpan.FromMilliseconds(300))
    .Subscribe(text => ApplyFilter(text));
```

### Use DispatcherPriority.Background for deferred work

Schedule low-priority updates that run when the UI thread is idle:

```csharp
Dispatcher.UIThread.Post(() =>
{
    // Low priority work
    UpdateStatistics();
}, DispatcherPriority.Background);
```

## Profiling

### Avalonia DevTools

Press **F12** in debug builds to open DevTools. The **Performance** tab shows frame timing information.

### dotTrace and dotMemory

JetBrains profiling tools work with Avalonia applications. Use them to identify hot paths and memory leaks.

### Diagnostic overlays

Enable the FPS overlay in your `App.axaml.cs`:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    // Add FPS overlay in debug builds
#if DEBUG
    this.AttachDevTools();
#endif
}
```

## See also

- [Threading Model](/docs/app-development/threading): UI thread and Dispatcher usage.
- [Compiled Bindings](/docs/data-binding/compiled-bindings): Compile-time binding validation and performance.
- [Collection Views](/docs/data-binding/collection-views): Efficient collection filtering and sorting.
