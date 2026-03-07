---
id: debugging-how-to
title: "How to: Debug Common Avalonia Issues"
description: Debug bindings, layout, styling, and rendering issues in Avalonia applications.
doc-type: how-to
---

This guide covers techniques for debugging bindings, layout, styling, and rendering issues in Avalonia applications.

## Debugging Data Bindings

### Enable binding error logging

Avalonia logs binding errors to the trace output. Configure logging in your `Program.cs`:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Warning);
```

Binding errors appear as warnings like:
```text
[Binding] Error in binding to 'MyProperty' on 'MyControl': Could not find a matching property accessor...
```

### Common binding mistakes

| Symptom | Likely cause |
|---|---|
| Control shows nothing | Property name typo, DataContext not set, or wrong DataContext type. |
| "Binding error" in output | Property doesn't exist on the DataContext. Check casing and spelling. |
| One-way works, two-way doesn't | Property setter missing, or property doesn't raise `PropertyChanged`. |
| Collection doesn't update | Using `List<T>` instead of `ObservableCollection<T>`. |

### Verify the DataContext

Check what DataContext a control has at runtime:

```csharp
// In code-behind for debugging
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    System.Diagnostics.Debug.WriteLine($"DataContext: {DataContext?.GetType().Name}");
}
```

### Use compiled bindings to catch errors at build time

```xml
<UserControl xmlns:vm="using:MyApp.ViewModels"
             x:DataType="vm:MainViewModel">
    <!-- Binding errors become compile errors -->
    <TextBlock Text="{Binding Name}" />
</UserControl>
```

## Debugging Layout Issues

### Make layout visible

Add temporary colored backgrounds to see how space is allocated:

```xml
<Grid ColumnDefinitions="200,*">
    <Border Grid.Column="0" Background="#10FF0000">
        <!-- Sidebar content -->
    </Border>
    <Border Grid.Column="1" Background="#100000FF">
        <!-- Main content -->
    </Border>
</Grid>
```

### Check for zero-size elements

A control with zero width or height is invisible. Common causes:

- Missing `Width`/`Height` on Canvas children.
- `StackPanel` with orientation perpendicular to the desired stretch.
- `Image` with no `Source` or a broken URI.

### Use DevTools

Press **F12** at runtime (debug builds) to open Avalonia DevTools:

- **Visual Tree** tab: Inspect the rendered tree and see each control's bounds.
- **Properties** tab: Check actual property values including sizes.
- **Styles** tab: See which styles are applied and their precedence.

## Debugging Styles

### Style not applying

| Symptom | Check |
|---|---|
| Style has no effect | Verify the selector matches. Open DevTools > Styles to see matched styles. |
| Local value overrides style | Local (inline) values have higher precedence than styles. Remove the inline value. |
| Style from a file not loaded | Ensure the `.axaml` file is included via `StyleInclude` in `App.axaml`. |

### Verify a style selector

Test your selector in DevTools. If it doesn't match, common issues include:

- Missing style class (forgot to add `Classes="myClass"` to the control).
- Wrong control type in the selector.
- Missing `/template/` for template parts.

## Debugging Rendering

### Control not visible

Check in this order:

1. **IsVisible** is `True`.
2. **Opacity** is greater than 0.
3. Control has non-zero **Width** and **Height** (or is in a panel that provides size).
4. Control is not **clipped** by a parent with `ClipToBounds="True"`.
5. Control is within the **viewport** (not scrolled out of view).

### Rendering artifacts

- **Blurry text or icons**: Check `RenderOptions.BitmapInterpolationMode` for images and `TextOptions.TextHintingMode` for text. Ensure `UseLayoutRounding="True"`.
- **Flickering**: May indicate a layout loop. Check for bindings that trigger layout during layout.

## Debugging Performance

### Identify layout thrashing

If your UI is slow, a common cause is excessive layout passes. The DevTools performance tab shows layout counts.

### Check virtualization

For large lists, ensure you're using a virtualizing panel:

```xml
<ListBox ItemsSource="{Binding LargeList}" />
<!-- ListBox virtualizes by default -->
```

Non-virtualizing panels like `StackPanel` inside an `ItemsControl` create all items upfront:

```xml
<!-- BAD: no virtualization -->
<ItemsControl ItemsSource="{Binding LargeList}" />

<!-- GOOD: use ListBox or configure VirtualizingStackPanel -->
<ListBox ItemsSource="{Binding LargeList}" />
```

## Useful Debugging Tools

| Tool | Purpose |
|---|---|
| **DevTools (F12)** | Inspect visual tree, properties, styles, and events at runtime. |
| **Compiled Bindings** | Catch binding errors at compile time instead of runtime. |
| **LogToTrace** | See binding errors and other warnings in the debug output. |
| **Conditional breakpoints** | Break on property changes in view model setters. |

## See Also

- [Binding Debugging](/docs/data-binding/binding-debugging): Detailed binding diagnostics.
- [Compiled Bindings](/docs/data-binding/compiled-bindings): Catch binding errors at build time.
- [Performance](/docs/app-development/performance): Performance optimization tips.
