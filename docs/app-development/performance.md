---
id: performance
title: Performance optimization
description: Optimize Avalonia app performance with virtualization, layout efficiency, compiled bindings, and profiling.
doc-type: how-to
---

This guide covers common performance considerations for Avalonia applications and techniques to keep your UI responsive.

## UI virtualization

When displaying large collections, virtualization ensures only visible items are created and rendered. Some controls support virtualization by default, such as [`ListBox`](/controls/data-display/collections/listbox) or [`ItemsRepeater`](/controls/data-display/collections/itemsrepeater).

### How virtualization works

Instead of creating a control for every item in the collection, the virtualizing panel creates controls only for visible items. As the user scrolls, controls that move off-screen are recycled and reused for new items coming into view.

### Ensuring virtualization is active

Virtualization requires a constrained height. If the item is inside a control that gives it infinite height, virtualization is disabled.

```xml
<!-- DON'T: StackPanel gives infinite height, disabling virtualization -->
<StackPanel>
    <ListBox ItemsSource="{Binding LargeCollection}" />
</StackPanel>

<!-- DO: Grid row with * constrains height -->
<Grid RowDefinitions="*">
    <ListBox ItemsSource="{Binding LargeCollection}" />
</Grid>

<!-- DO: DockPanel fill area constrains height -->
<DockPanel>
    <TextBlock DockPanel.Dock="Top" Text="Items" />
    <ListBox ItemsSource="{Binding LargeCollection}" />
</DockPanel>
```

### `ItemsRepeater` for custom layouts

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

`VirtualizingStackPanel` supports a `BufferFactor` property that keeps additional items beyond the visible viewport in a realized state. This reduces recycling frequency during scrolling, which can eliminate stutter, particularly on mobile devices.

```xml
<ListBox ItemsSource="{Binding LargeCollection}">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <VirtualizingStackPanel BufferFactor="1" />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
</ListBox>
```

A `BufferFactor` of `1` realizes items across one extra viewport height above and below the visible area. The default is `0` (no buffer). Higher values use more memory but produce smoother scrolling.

### Variable-height items

`VirtualizingStackPanel` is optimized for collections where all items have the same height. The panel estimates scroll extent based on number of items, meaning collections containing items with variable heights can cause scroll bar jumps and layout recalculations. If your items vary significantly in height, consider these strategies:

- **Use a uniform height.** Give all items a fixed `Height` or `MinHeight` so the virtualizing panel can calculate scroll extent accurately. Allow content to clip or scroll internally if it exceeds the estimated size.
- **Flatten hierarchical data.** Instead of nesting expanders inside a virtualizing list, flatten the tree into a single list with indent levels. This lets the virtualizing panel manage rows directly. `TreeView` uses this approach internally.
- **Limit realized items.** If virtualization is not feasible (for example, a complex property grid with expanders), limit how many controls exist at once. Load only the visible section and create additional items on demand as the user expands or scrolls.

### Reducing control template complexity

Complex controls like [`TextBox`](/controls/input/text-input/textbox) contain a deep visual tree with borders, scroll viewers and watermark layers. When you create many of them, template instantiation and measurement dominate startup time.

**Use lightweight controls for display and swap on interaction.** For example, you can show values with `TextBlock` (which has a minimal visual tree) and replace it with a `TextBox` only when the user clicks to edit:

```csharp
// In your DataTemplate code-behind or custom control
var display = new TextBlock { Text = field.Value };
display.PointerPressed += (s, e) =>
{
    var editor = new TextBox { Text = field.Value };
    editor.LostFocus += (s2, e2) =>
    {
        field.Value = editor.Text;
        parent.Children.Remove(editor);
        parent.Children.Add(display);
    };
    parent.Children.Remove(display);
    parent.Children.Add(editor);
};
```

**Re-template heavy controls.** If you must use `TextBox` everywhere, create a simplified control theme that removes unnecessary visual elements (e.g., watermark, clear button, scroll viewer) to reduce the visual tree depth:

```xml
<ControlTheme x:Key="LightTextBox" TargetType="TextBox">
    <Setter Property="Template">
        <ControlTemplate>
            <Border Background="{TemplateBinding Background}"
                    BorderBrush="{TemplateBinding BorderBrush}"
                    BorderThickness="{TemplateBinding BorderThickness}">
                <TextPresenter Name="PART_TextPresenter"
                               Text="{TemplateBinding Text}"
                               CaretBrush="{TemplateBinding CaretBrush}" />
            </Border>
        </ControlTemplate>
    </Setter>
</ControlTheme>
```

Apply it to controls that do not need the full feature set:

```xml
<TextBox Theme="{StaticResource LightTextBox}" Text="{Binding Value}" />
```

## Layout optimization

### Avoiding deep nesting

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

### Replacing nested stack panels with grids

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

### Minimizing `InvalidateArrange` and `InvalidateMeasure`

Property changes that affect layout (e.g., `Width`, `Height`, `Margin`, `Padding`) trigger layout recalculations. Batch property changes when possible:

```csharp
// Set multiple properties together; Avalonia batches layout
// passes within a single dispatcher operation automatically.
myControl1.Width = 100;
myControl2.Height = 200;
```

## Rendering performance

### Hiding unused controls with `IsVisible`

Setting `IsVisible="False"` removes a control from both layout and rendering. The layout system skips the measure and arrange passes for that control and its entire subtree, and the renderer does not draw it. This makes `IsVisible` an effective way to reduce work for conditionally shown content:

```xml
<Panel>
    <StackPanel IsVisible="{Binding ShowDetails}">
        <!-- Complex content: only measured and rendered when visible -->
    </StackPanel>
</Panel>
```

If you need to hide a control visually while keeping its layout space reserved, use `Opacity="0"` instead. An element with `Opacity="0"` still participates in layout and can receive input.

### Using `ClipToBounds` judiciously

`ClipToBounds="True"` creates a clip layer. Only use it when child content actually exceeds the control bounds.

### Reducing hit-testing cost

When a pointer event occurs, Avalonia walks the visual tree and tests each element. This linear walk can cause a noticeable delay between clicking and receiving the event if a control contains many children.

Set `IsHitTestVisible="False"` on elements that do not need pointer interaction. Consider an overlay-based hit-test strategy or custom rendering for scenes with many objects. See [Hit Testing: Performance with many elements](/docs/graphics-animation/hit-testing#performance-with-many-elements) for patterns and code examples.

Transparent elements also participate in hit testing. If a transparent control does not need pointer interaction, set `IsHitTestVisible="False"` to exclude it from hit-testing.

```xml
<Border Background="Transparent" IsHitTestVisible="False">
    <!-- Overlay that should not capture clicks -->
</Border>
```

### Reducing visual complexity

- Minimize the number of `BoxShadow` effects, which add an individual render pass each.
- Avoid overlapping semi-transparent elements.
- Use `Opacity` on a parent element rather than on each child.

### Bitmap cache

For visuals that are expensive to render but change infrequently, use `BitmapCache` to rasterize them to a bitmap surface. The control and its children are rendered once into an intermediate bitmap, and that bitmap is reused for subsequent frames until the content changes.

```xml
<Border BoxShadow="0 4 8 0 #40000000" CornerRadius="8">
    <Border.CacheMode>
        <BitmapCache RenderAtScale="1" />
    </Border.CacheMode>
    <!-- Complex content rendered once and cached -->
</Border>
```

 #### `BitmapCache` properties

| Property | Type | Default | Description |
|---|---|---|---|
| `RenderAtScale` | `double` | `1` | Resolution multiplier for the cached bitmap. Values above 1 increase quality. Values below 1 reduce memory at the cost of quality. A value of 0 disables caching. |
| `SnapsToDevicePixels` | `bool` | `false` | Aligns the cached bitmap to device pixel boundaries for sharper text and line rendering. |
| `EnableClearType` | `bool` | `false` | Enables `ClearType` subpixel text rendering within the cached surface. Without this, text in the cache uses grayscale antialiasing. |

For text-heavy content, it is recommended to cache with `SnapsToDevicePixels` and `EnableClearType` enabled.

```xml
<Border>
    <Border.CacheMode>
        <BitmapCache SnapsToDevicePixels="True" EnableClearType="True" />
    </Border.CacheMode>
    <TextBlock Text="Cached text with ClearType rendering" />
</Border>
```

### Bitmap interpolation mode

For images that do not need high-quality scaling, use a lower interpolation mode:

```xml
<Image Source="avares://MyApp/Assets/thumbnail.png"
       RenderOptions.BitmapInterpolationMode="LowQuality" />
```

### GPU resource cache size

Avalonia uses Skia with GPU acceleration by default. Skia maintains a GPU resource cache for textures and other GPU-backed surfaces. The default cache limit is approximately 28 MB. If your app works with large images, tilesets, or many cached visuals, images that exceed the cache limit are re-uploaded to the GPU each frame, which can cause stuttering.

Increase the cache limit by configuring `SkiaOptions` at startup:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .With(new SkiaOptions
    {
        MaxGpuResourceSizeBytes = 256 * 1024 * 1024 // 256 MB
    });
```

Choose a value appropriate for your target hardware. Most integrated GPUs have at least 2 GB of shared memory, so values of 256 MB or 512 MB are safe for desktop apps. Mobile devices may require lower values.

### Region dirty rect clipping

When content changes, Avalonia repaints the affected (or "dirty") regions of the screen rather than the whole frame. [`CompositionOptions.UseRegionDirtyRectClipping`](/api/avalonia/rendering/composition/compositionoptions) enables more accurate dirty-rect tracking by utilizing regions, but adds extra CPU time to process the render pass.

This option is **disabled by default** starting with Avalonia 12.1 to minimize loss of frame rate.

To enable region clipping, you must explicitly set `UseRegionDirtyRectClipping = true` in `CompositionOptions` at startup. Enabling this option can be useful on some target platforms without GPU acceleration, such as [embedded Linux](/docs/platform-specific-guides/embedded-linux/embedded-linux) or other software-rendered devices, where reducing the painted area matters more than the clipping cost.

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .With(new CompositionOptions
    {
        UseRegionDirtyRectClipping = true
    });
```

When region clipping is enabled, `MaxDirtyRects` caps how many dirty rects are tracked per frame. The default is `8`. Setting it to zero or a negative value bypasses Avalonia's tracking and uses the underlying drawing context's region support directly.

## Data binding performance

### Compiled bindings

Compiled bindings resolve property paths at compile time, avoiding runtime reflection. They are [enabled by default from Avalonia version 12](/docs/avalonia12-breaking-changes#compiled-bindings-are-enabled-by-default).

### Avoiding unnecessary bindings

Use static values instead of bindings for properties that never change:

```xml
<!-- Unnecessary binding for a constant -->
<TextBlock Text="{Binding AppTitle}" />

<!-- Better: static resource or literal -->
<TextBlock Text="{StaticResource AppTitle}" />
<TextBlock Text="My Application" />
```

### Using one-time bindings for static data

If a value is set once and never changes, use `OneTime` mode to avoid ongoing change tracking:

```xml
<TextBlock Text="{Binding Version, Mode=OneTime}" />
```

## Collections

### Using `ObservableCollection` for small-to-medium lists

`ObservableCollection<T>` notifies the UI of individual item additions and removals efficiently.

### Batching large updates

When adding many items at once, consider replacing the collection rather than adding items one by one:

```csharp
// Slow: triggers UI update for each add
foreach (var item in newItems)
    Items.Add(item);

// Faster: single collection replacement
Items = new ObservableCollection<Item>(newItems);
OnPropertyChanged(nameof(Items));
```

### Incremental loading

If you must create many controls without virtualization (for example, a property grid or inspector panel), adding them all at once blocks the UI thread during measurement. Instead, add items in batches and yield to the dispatcher between each batch so the UI remains responsive:

```csharp
private async Task LoadItemsIncrementally(IList<ItemViewModel> items, Panel container)
{
    const int batchSize = 50;

    for (int i = 0; i < items.Count; i += batchSize)
    {
        var batch = items.Skip(i).Take(batchSize);
        foreach (var item in batch)
        {
            container.Children.Add(CreateControl(item));
        }

        // Yield to the UI thread so the frame can render
        await Dispatcher.UIThread.Yield(DispatcherPriority.Background);
    }
}
```

Choose a batch size large enough to fill the visible area on the first pass. This lets the user see content immediately, while the remaining items load progressively.

### Using `DynamicData` for large reactive collections

For collections with frequent sorting, filtering, or complex transformations, [DynamicData](https://github.com/reactivemarbles/DynamicData) provides optimized reactive pipelines that minimize UI updates.

## Async and threading

### Keeping the UI thread free

Move heavy computation to background threads:

```csharp
var data = await Task.Run(() => LoadLargeDataSet());
Items = new ObservableCollection<Item>(data);
```

### Debouncing rapid input

For search-as-you-type scenarios, debounce the input to avoid running expensive operations on every keystroke:

```csharp
this.WhenAnyValue(x => x.SearchText)
    .Throttle(TimeSpan.FromMilliseconds(300))
    .Subscribe(text => ApplyFilter(text));
```

### Using `DispatcherPriority.Background` for deferred work

Schedule low-priority updates to run when the UI thread is idle:

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

Enable the FPS overlay in `App.axaml.cs`:

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
- [Hit Testing](/docs/graphics-animation/hit-testing): Hit-test mechanics and performance with many elements.
