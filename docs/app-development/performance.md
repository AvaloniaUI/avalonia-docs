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

### Variable-height items

`VirtualizingStackPanel` works best when all items have the same height. When items have variable heights, the panel must estimate total scroll extent based on measured items, which can cause scroll bar jumps and layout recalculations. If your items vary significantly in height, consider these strategies:

- **Use a uniform estimated height.** Give all items a fixed `Height` or `MinHeight` so the virtualizing panel can calculate scroll extent accurately. Allow content to clip or scroll internally if it exceeds the estimated size.
- **Flatten hierarchical data.** Instead of nesting expanders inside a virtualizing list, flatten the tree into a single list with indent levels. This lets the virtualizing panel manage all rows directly. `TreeView` uses this approach internally.
- **Limit realized items.** If virtualization is not feasible (for example, a complex property grid with expanders), limit how many controls exist at once. Load only the visible section and create additional items on demand as the user expands or scrolls.

### Reduce control template complexity

Complex controls like [`TextBox`](/api/avalonia/controls/textbox) contain a deep visual tree (borders, scroll viewers, watermark layers). When you create thousands of them, template instantiation and measurement dominate startup time.

**Use lightweight controls for display, swap on interaction.** Show values with `TextBlock` (which has a minimal visual tree) and replace with a `TextBox` only when the user clicks to edit:

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

**Re-template heavy controls.** If you must use `TextBox` everywhere, create a simplified control theme that removes unnecessary visual elements (watermark, clear button, scroll viewer) to reduce the visual tree depth:

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

### Hide unused controls with IsVisible

Setting `IsVisible="False"` completely removes a control from both layout and rendering. The layout system skips the measure and arrange passes for that control and its entire subtree, and the renderer does not draw it. This makes `IsVisible` an effective way to reduce work for conditionally shown content:

```xml
<Panel>
    <StackPanel IsVisible="{Binding ShowDetails}">
        <!-- Complex content: only measured and rendered when visible -->
    </StackPanel>
</Panel>
```

If you need to hide a control visually while keeping its layout space reserved, use `Opacity="0"` instead. An element with `Opacity="0"` still participates in layout and can receive input.

### Use ClipToBounds judiciously

`ClipToBounds="True"` creates a clip layer. Only use it when child content actually exceeds the control bounds.

### Reduce hit-testing cost

When a pointer event occurs, Avalonia walks the visual tree and tests each element. With hundreds or thousands of children in a `Canvas` or `Panel`, this linear walk adds a noticeable delay between clicking and receiving the event. Set `IsHitTestVisible="False"` on elements that do not need pointer interaction, and consider an overlay-based hit-test strategy or custom rendering for scenes with many objects. See [Hit Testing: Performance with many elements](/docs/graphics-animation/hit-testing#performance-with-many-elements) for patterns and code examples.

Transparent elements also participate in hit testing. If a control does not need pointer interaction, set `IsHitTestVisible="False"`:

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

### GPU resource cache size

Avalonia uses Skia with GPU acceleration by default. Skia maintains a GPU resource cache for textures and other GPU-backed surfaces. The default cache limit is approximately 28 MB. If your app works with large images, tilesets, or many cached visuals, images that exceed the cache limit are re-uploaded to the GPU each frame, causing stuttering.

Increase the cache by configuring `SkiaOptions` at startup:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .With(new SkiaOptions
    {
        MaxGpuResourceSizeBytes = 256 * 1024 * 1024 // 256 MB
    });
```

Choose a value appropriate for your target hardware. Most integrated GPUs have at least 2 GB of shared memory, so values of 256 MB or 512 MB are safe for desktop apps. Mobile devices may require lower values.

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

### Incremental loading

When you must create many controls without virtualization (for example, a property grid or inspector panel), adding them all at once blocks the UI thread during measurement. Instead, add items in batches and yield to the dispatcher between each batch so the UI remains responsive:

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

Choose a batch size large enough to fill the visible area on the first pass. This lets the user see content immediately while remaining items load progressively.

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
- [Hit Testing](/docs/graphics-animation/hit-testing): Hit-test mechanics and performance with many elements.
